<div align="center">
<h1>AUDIOBOOKS</h1>
<p><em>Stream free public domain audiobooks with a Netflix-style experience — tracks your progress, saves favorites, and never makes you re-find where you were.</em></p>
  
<img alt="last-commit" src="https://img.shields.io/github/last-commit/Raym-z/bookcase-audiobook-app?style=flat&logo=git&logoColor=white&color=F5C518" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/Raym-z/bookcase-audiobook-app?style=flat&color=F5C518" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/Raym-z/bookcase-audiobook-app?style=flat&color=F5C518" class="inline-block mx-1" style="margin: 0px 2px;">

<p><em>Built with the tools and technologies:</em></p>
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=next.js&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?style=flat&logo=Tailwind-CSS&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E.svg?style=flat&logo=Supabase&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Zustand" src="https://img.shields.io/badge/Zustand-DD6B20.svg?style=flat&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Howler.js" src="https://img.shields.io/badge/Howler.js-FF6B6B.svg?style=flat&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Google OAuth" src="https://img.shields.io/badge/Google_OAuth-4285F4.svg?style=flat&logo=Google&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="LibriVox" src="https://img.shields.io/badge/LibriVox-E8A317.svg?style=flat&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000.svg?style=flat&logo=Vercel&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

<br>
<hr>

<h2>Table of Contents</h2>
<ul class="list-disc pl-4 my-0">
<li class="my-0"><a href="#overview">Overview</a></li>
<li class="my-0"><a href="#features">Features</a></li>
<li class="my-0"><a href="#tech-stack">Tech Stack</a></li>
<li class="my-0"><a href="#getting-started">Getting Started</a>
<ul class="list-disc pl-4 my-0">
<li class="my-0"><a href="#prerequisites">Prerequisites</a></li>
<li class="my-0"><a href="#installation">Installation</a></li>
<li class="my-0"><a href="#environment-variables">Environment Variables</a></li>
<li class="my-0"><a href="#seeding-data">Seeding Data</a></li>
<li class="my-0"><a href="#running-the-app">Running the App</a></li>
</ul>
</li>
<li class="my-0"><a href="#screenshots">Screenshots</a></li>
<li class="my-0"><a href="#contributing">Contributing</a></li>
</ul>

<hr>

<h2>Overview</h2>
<p>AudioBooks is a Netflix-style audiobook streaming platform that gives you access to thousands of free public domain audiobooks from LibriVox. It features a dark, gold-accented theme, infinite listening with progress syncing, favorites, and a seamless experience across devices.</p>

<p><strong>Why AudioBooks?</strong></p>

<ul class="list-disc pl-4 my-0">
<li class="my-0">📚 <strong>Thousands of Free Audiobooks:</strong> Access public domain audiobooks from LibriVox — no subscriptions, no fees.</li>
<li class="my-0">▶️ <strong>Infinite Listening:</strong> Pick up exactly where you left off. Progress is saved automatically as you listen.</li>
<li class="my-0">❤️ <strong>Favorites Library:</strong> Save books you love and quickly find them later.</li>
<li class="my-0">🎨 <strong>Netflix-Style UI:</strong> Dark theme with gold accents, carousel rows, and a responsive sidebar that adapts to your workflow.</li>
<li class="my-0">🔐 <strong>Sign-In:</strong> Quick, secure authentication with Google OAuth or email/password.</li>
<li class="my-0">📱 <strong>Responsive Design:</strong> Built with Tailwind CSS v4 — works on desktop and mobile.</li>
</ul>

<hr>

<h2>Features</h2>

<h3>🏠 Home</h3>
<ul class="list-disc pl-4 my-0">
<li>Hero section featuring a highlighted audiobook</li>
<li>Carousel rows organized by category</li>
<li>Quick-click to start playing any book</li>
</ul>

<h3>🔍 Search</h3>
<ul class="list-disc pl-4 my-0">
<li>Search by title or author across the entire catalog</li>
<li>See all books on initial load</li>
<li>Press Enter or click Search to filter results</li>
</ul>

<h3>📖 Audiobook Detail</h3>
<ul class="list-disc pl-4 my-0">
<li>Book cover, description, language, and chapter count</li>
<li>Full chapter list with duration and play button per chapter</li>
<li>Mark as favorite with a single click</li>
<li>Play button starts from chapter 1</li>
</ul>

<h3>▶️ Audio Player</h3>
<ul class="list-disc pl-4 my-0">
<li>Persistent bottom player bar showing current book and chapter</li>
<li>Play/pause, previous/next chapter controls</li>
<li>Progress bar with current time and total duration</li>
<li>Auto-saves progress every 20 seconds during playback</li>
<li>Saves progress on pause and when tab loses focus</li>
<li>Resumes from saved position on return</li>
</ul>

<h3>❤️ Favorites</h3>
<ul class="list-disc pl-4 my-0">
<li>Save any audiobook to your favorites list</li>
<li>Persisted to Supabase under your account</li>
<li>One-click unfavorite</li>
</ul>

<h3>⏯️ Continue Listening</h3>
<ul class="list-disc pl-4 my-0">
<li>Shows all books with saved progress</li>
<li>Resume button jumps straight to saved chapter and position</li>
<li>Ordered by most recently listened</li>
</ul>

<h3>📚 Categories</h3>
<ul class="list-disc pl-4 my-0">
<li>Browse books by category (Adventure, Romance, Sci-Fi, etc.)</li>
<li>Category pages with filtered carousel view</li>
</ul>

<hr>

<h2>Tech Stack</h2>

<ul class="list-disc pl-4 my-0">
<li><strong>Frontend:</strong> Next.js 16 (App Router) + React 19 + Tailwind CSS v4</li>
<li><strong>State:</strong> Zustand (player state)</li>
<li><strong>Backend:</strong> Supabase (Auth + Database + Realtime)</li>
<li><strong>Data Source:</strong> LibriVox API (seeded into Supabase)</li>
<li><strong>Auth:</strong> Google OAuth + Email/Password (both enabled)</li>
<li><strong>Audio:</strong> Howler.js</li>
<li><strong>Icons:</strong> Lucide React</li>
<li><strong>Deployment:</strong> Vercel</li>
</ul>

<hr>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<ul class="list-disc pl-4 my-0">
<li><strong>Node.js:</strong> v18 or higher</li>
<li><strong>Supabase:</strong> A Supabase project with the database schema set up</li>
<li><strong>Google OAuth:</strong> Configured in Supabase for authentication</li>
<li><strong>Email/Password:</strong> Enable the Email provider in Supabase Dashboard → Authentication → Providers. For email confirmations, set Confirm Email to OFF if you want users to sign in immediately without verification.</li>
<li><strong>LibriVox API:</strong> No API key needed — free public API</li>
</ul>

<h3>Installation</h3>

<ol>
<li class="my-0">
<p><strong>Clone the repository:</strong></p>
<pre><code class="language-sh">git clone https://github.com/Raym-z/bookcase-audiobook-app
</code></pre>
</li>
<li class="my-0">
<p><strong>Navigate to the project directory:</strong></p>
<pre><code class="language-sh">cd audiobook-app
</code></pre>
</li>
<li class="my-0">
<p><strong>Install dependencies:</strong></p>
<pre><code class="language-sh">npm install
</code></pre>
</li>
</ol>

<h3>Environment Variables</h3>
<p>Create a <code>.env.local</code> file in the root directory:</p>
<pre><code class="language-sh">NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
</code></pre>
<p>You can find these in your Supabase project dashboard under <em>Project Settings → API</em>.</p>

<h3>Database Setup</h3>
<p>Run the following SQL in your Supabase SQL Editor to create the required tables and policies:</p>
<pre><code class="language-sql">-- Audiobooks cache table
CREATE TABLE audiobooks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  language TEXT DEFAULT 'English',
  num_sections INTEGER DEFAULT 0,
  url TEXT,
  chapters JSONB NOT NULL DEFAULT '[]',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  audiobook_id TEXT NOT NULL,
  audiobook_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, audiobook_id)
);

-- Listening history / progress table
CREATE TABLE listening_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  audiobook_id TEXT NOT NULL,
  audiobook_data JSONB NOT NULL,
  chapter_index INTEGER DEFAULT 0,
  progress_seconds INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, audiobook_id)
);

-- Enable Row Level Security
ALTER TABLE audiobooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow anon read" ON audiobooks FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON audiobooks FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own history"
  ON listening_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history"
  ON listening_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own history"
  ON listening_history FOR UPDATE USING (auth.uid() = user_id);
</code></pre>

<h3>Seeding Data</h3>
<p>The audiobook catalog is seeded from the LibriVox API into your Supabase database. To seed ~200 books across 10 categories:</p>
<pre><code class="language-sh">cmd /c "set NEXT_PUBLIC_SUPABASE_URL=your_url && set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key && npx tsx scripts/seed.ts"
</code></pre>
<p>This script fetches audiobooks from LibriVox using their extended API (to get chapter audio URLs) and upserts them into the <code>audiobooks</code> table. Run once — the data persists in your Supabase instance.</p>

<h3>Running the App</h3>
<pre><code class="language-sh">npm run dev
</code></pre>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> to see the app.</p>

<hr>

<h2>Screenshots</h2>
<img width="1866" height="948" alt="image" src="https://github.com/user-attachments/assets/7dc2396b-f2f6-4633-a34d-009b19faef9f" />

<hr>

<h2>Contributing</h2>
<p>Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.</p>

<h3>How to Contribute</h3>
<ol>
<li class="my-0">Fork the repository</li>
<li class="my-0">Create a feature branch (<code>git checkout -b feature/AmazingFeature</code>)</li>
<li class="my-0">Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>)</li>
<li class="my-0">Push to the branch (<code>git push origin feature/AmazingFeature</code>)</li>
<li class="my-0">Open a Pull Request</li>
</ol>

<hr>

<div align="left">
<a href="#top">⬆ Return to Top</a>
</div>

Thanks to these platforms and open initiatives for making this possible:
<table align="left">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6347c0cf-04ef-4580-a31f-83603b6bd2a0" height="35"><br>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d1517892-faca-481e-bb3d-77aa4e14737f" height="35"><br>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2f47dc92-4cc9-4c70-b3de-3f5f823bf8a6" height="35"><br>
    </td>
  </tr>
</table>

