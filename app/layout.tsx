import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { PlayerBar } from '@/components/player/PlayerBar';
import { Footer } from '@/components/layout/Footer';
import { ClientLayout } from '@/components/ClientLayout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AudioBooks - Free Audiobooks from LibriVox',
  description: 'Stream free public domain audiobooks from LibriVox',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="h-full">
        <ClientLayout>
          <div className="flex h-screen bg-bg-primary">
            <Sidebar />

              <div className="flex-1 flex flex-col overflow-hidden lg:pl-[var(--sidebar-width)] transition-all duration-300">
                <Navbar user={user} />

                <div className="flex-1 overflow-y-auto">
                  <div className="px-4 md:px-8 py-6 pb-24">
                    {children}
                  </div>
                  <Footer />
                </div>

                <PlayerBar />
              </div>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
