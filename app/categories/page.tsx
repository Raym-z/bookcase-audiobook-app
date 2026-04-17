import Link from 'next/link';
import { BookOpen, Mic, Ghost, Cpu, Heart, History, Brain, Users, Sparkles } from 'lucide-react';

const categories = [
  { slug: 'fiction', name: 'Fiction', icon: BookOpen, color: 'from-blue-600 to-blue-800' },
  { slug: 'non-fiction', name: 'Non-Fiction', icon: Brain, color: 'from-green-600 to-green-800' },
  { slug: 'mystery', name: 'Mystery', icon: Ghost, color: 'from-purple-600 to-purple-800' },
  { slug: 'science-fiction', name: 'Science Fiction', icon: Cpu, color: 'from-cyan-600 to-cyan-800' },
  { slug: 'romance', name: 'Romance', icon: Heart, color: 'from-pink-600 to-pink-800' },
  { slug: 'history', name: 'History', icon: History, color: 'from-amber-600 to-amber-800' },
  { slug: 'biography', name: 'Biography', icon: Users, color: 'from-teal-600 to-teal-800' },
  { slug: 'self-help', name: 'Self-Help', icon: Sparkles, color: 'from-violet-600 to-violet-800' },
  { slug: 'classics', name: 'Classics', icon: BookOpen, color: 'from-yellow-600 to-yellow-800' },
  { slug: 'poetry', name: 'Poetry', icon: Mic, color: 'from-rose-600 to-rose-800' },
];

export default function CategoriesPage() {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Browse Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-bg-card hover:bg-bg-hover transition-all hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <Icon className="w-10 h-10 text-white" />
                <span className="text-sm font-semibold text-white text-center">
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
