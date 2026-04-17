import { Audiobook, Chapter } from '@/types/audiobook';

const BASE_URL = 'https://librivox.org/api/feed/audiobooks';

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

function parsePlaytime(playtime: string): number {
  const trimmed = playtime.trim();
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') {
    return num;
  }
  const parts = trimmed.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
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

function normalizeChapters(sections: LibriVoxSection[] = []): Chapter[] {
  return sections
    .filter((section) => {
      const length = parsePlaytime(section.playtime);
      return length > 0 && section.listen_url;
    })
    .map((section, index) => ({
      id: section.id || String(index + 1),
      title: section.title || `Chapter ${section.id || index + 1}`,
      playUrl: section.listen_url,
      length: parsePlaytime(section.playtime),
    }));
}

function normalizeBook(book: LibriVoxBook, chapters: Chapter[] = []): Audiobook {
  return {
    id: book.id,
    title: book.title || 'Untitled',
    author: normalizeAuthor(book.authors),
    description: book.description || '',
    coverUrl: normalizeCover(book),
    language: book.language || 'English',
    numSections: parseInt(book.num_sections) || 0,
    url: book.url_librivox || '',
    chapters,
  };
}

export async function getAudiobooks(params?: {
  limit?: number;
  offset?: number;
  title?: string;
  author?: string;
}): Promise<Audiobook[]> {
  const searchParams = new URLSearchParams({
    format: 'json',
    limit: String(params?.limit || 20),
    coverart: '1',
    ...(params?.offset && { offset: String(params.offset) }),
    ...(params?.title && { title: params.title }),
    ...(params?.author && { author: params.author }),
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch audiobooks');

  const data: LibriVoxResponse = await response.json();
  const books = Array.isArray(data.books) ? data.books : [];

  return books.map((book) => normalizeBook(book, []));
}

export async function getAudiobookById(id: string): Promise<Audiobook> {
  const searchParams = new URLSearchParams({
    format: 'json',
    id,
    coverart: '1',
    extended: '1',
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch audiobook');

  const data: LibriVoxResponse = await response.json();
  if (!data.books) throw new Error('Audiobook not found');

  const book = Array.isArray(data.books) ? data.books[0] : data.books;
  const chapters = normalizeChapters(book.sections || []);

  return normalizeBook(book, chapters);
}

export async function searchAudiobooks(query: string): Promise<Audiobook[]> {
  const searchParams = new URLSearchParams({
    format: 'json',
    title: query,
    coverart: '1',
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);
  if (!response.ok) throw new Error('Failed to search audiobooks');

  const data: LibriVoxResponse = await response.json();
  const books = Array.isArray(data.books) ? data.books : [];

  return books.map((book) => normalizeBook(book, []));
}
