import { createClient } from '@supabase/supabase-js';

const LIBRIVOX_BASE = 'https://librivox.org/api/feed/audiobooks';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface LibriVoxAuthor {
  first_name: string;
  last_name: string;
}

interface LibriVoxSection {
  id: string;
  section_number?: string;
  title: string;
  listen_url: string;
  playtime: string;
}

interface LibriVoxBook {
  id: string;
  title: string;
  description: string;
  url_librivox: string;
  language: string;
  num_sections: string;
  authors: LibriVoxAuthor[];
  sections?: LibriVoxSection[];
  coverart_jpg?: string;
  coverart_thumbnail?: string;
}

interface LibriVoxResponse {
  books?: LibriVoxBook[] | LibriVoxBook;
}

const categoryKeywords: Record<string, string[]> = {
  fiction: ['fiction', 'novel', 'story', 'tale', 'romance', 'drama'],
  'non-fiction': ['history', 'biography', 'essay', 'philosophy', 'science', 'politics'],
  mystery: ['mystery', 'detective', 'crime', 'murder', 'sherlock', 'investigation'],
  'science-fiction': ['science fiction', 'sci-fi', 'space', 'future', 'robot', 'alien'],
  romance: ['romance', 'love', 'marriage', 'wedding', 'heart', 'passion'],
  history: ['history', 'ancient', 'war', 'civilization', 'empire', 'century'],
  biography: ['biography', 'memoir', 'life of', 'autobiography', 'diary'],
  'self-help': ['self-help', 'self help', 'improvement', 'success', 'happiness', 'wisdom'],
  classics: ['greek', 'roman', 'shakespeare', 'dostoevsky', 'tolstoy', 'austen', 'dickens'],
  poetry: ['poetry', 'poems', 'verse', 'sonnet', 'ballad', 'poet'],
};

function parsePlaytime(playtime: string): number {
  const trimmed = playtime.trim();
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') return num;
  const parts = trimmed.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function normalizeAuthor(authors: LibriVoxAuthor[]): string {
  if (!authors || authors.length === 0) return 'Unknown Author';
  const author = authors[0];
  return `${author.first_name} ${author.last_name}`.trim();
}

function normalizeCover(book: LibriVoxBook): string {
  return book.coverart_thumbnail || book.coverart_jpg || '';
}

function categorizeBook(book: LibriVoxBook): string {
  const text = `${book.title} ${normalizeAuthor(book.authors)} ${book.description || ''}`.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => text.includes(kw))) return category;
  }
  return 'fiction';
}

function normalizeChapters(sections: LibriVoxSection[] = []) {
  return sections
    .filter((s) => parsePlaytime(s.playtime) > 0 && s.listen_url)
    .map((s, i) => ({
      id: s.id || String(i + 1),
      title: s.title || `Chapter ${s.id || i + 1}`,
      playUrl: s.listen_url,
      length: parsePlaytime(s.playtime),
    }));
}

async function fetchBooksPage(offset: number, limit: number): Promise<LibriVoxBook[]> {
  const params = new URLSearchParams({
    format: 'json',
    limit: String(limit),
    offset: String(offset),
    coverart: '1',
  });
  const res = await fetch(`${LIBRIVOX_BASE}?${params}`);
  if (!res.ok) throw new Error(`LibriVox error: ${res.status}`);
  const data: LibriVoxResponse = await res.json();
  return Array.isArray(data.books) ? data.books : data.books ? [data.books] : [];
}

async function fetchBookWithChapters(id: string): Promise<LibriVoxBook | null> {
  const params = new URLSearchParams({ format: 'json', id, coverart: '1', extended: '1' });
  const res = await fetch(`${LIBRIVOX_BASE}?${params}`);
  if (!res.ok) return null;
  const data: LibriVoxResponse = await res.json();
  if (!data.books) return null;
  return Array.isArray(data.books) ? data.books[0] : data.books;
}

async function seed() {
  console.log('Fetching ~200 unique books from LibriVox...\n');

  const seenIds = new Set<string>();
  const allBookIds: string[] = [];
  const categories = Object.keys(categoryKeywords);

  for (const category of categories) {
    let offset = 0;
    let found = 0;
    const target = 20;

    while (found < target) {
      const books = await fetchBooksPage(offset, 50);
      if (books.length === 0) break;

      for (const book of books) {
        if (!book.title || seenIds.has(book.id)) continue;
        seenIds.add(book.id);
        allBookIds.push(book.id);
        found++;
        if (found >= target) break;
      }

      offset += 50;
    }

    console.log(`${category}: ${found} new books (total unique: ${seenIds.size})`);

    if (seenIds.size >= 200) break;
  }

  console.log(`\nTotal unique books: ${seenIds.size}`);
  console.log(`Fetching extended data (chapters) in batches of 10...\n`);

  const booksToInsert: Array<{
    id: string;
    title: string;
    author: string;
    description: string;
    cover_url: string;
    language: string;
    num_sections: number;
    url: string;
    chapters: ReturnType<typeof normalizeChapters>;
    category: string;
  }> = [];

  const BATCH_SIZE = 10;
  for (let i = 0; i < allBookIds.length; i += BATCH_SIZE) {
    const batch = allBookIds.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((id) => fetchBookWithChapters(id)));

    for (const book of results) {
      if (!book) continue;

      const chapters = normalizeChapters(book.sections);
      if (chapters.length === 0) {
        console.log(`  [skip] ${book.title || book.id} — no valid audio chapters`);
        continue;
      }

      booksToInsert.push({
        id: book.id,
        title: book.title,
        author: normalizeAuthor(book.authors),
        description: book.description || '',
        cover_url: normalizeCover(book),
        language: book.language || 'English',
        num_sections: chapters.length,
        url: book.url_librivox || '',
        chapters,
        category: categorizeBook(book),
      });
    }

    process.stdout.write(`\r  Progress: ${Math.min(i + BATCH_SIZE, allBookIds.length)}/${allBookIds.length}`);
  }

  console.log(`\n\nUpserting ${booksToInsert.length} books into Supabase...`);

  const { error } = await supabase.from('audiobooks').upsert(
    booksToInsert.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      description: b.description,
      cover_url: b.cover_url,
      language: b.language,
      num_sections: b.num_sections,
      url: b.url,
      chapters: b.chapters,
      category: b.category,
    })),
    { onConflict: 'id' }
  );

  if (error) {
    console.error('Supabase upsert error:', error);
    process.exit(1);
  }

  const categoryCounts: Record<string, number> = {};
  for (const b of booksToInsert) {
    categoryCounts[b.category] = (categoryCounts[b.category] || 0) + 1;
  }

  console.log(`\n✅ Seeded ${booksToInsert.length} books by category:`);
  for (const [cat, count] of Object.entries(categoryCounts).sort()) {
    console.log(`  ${cat}: ${count}`);
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
