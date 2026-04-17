import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlayCircle } from "lucide-react";

export default async function LoginPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		redirect("/");
	}

	async function signInWithGoogle() {
		"use server";
		const supabase = await createClient();
		const { data } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
			},
		});
		if (data.url) {
			redirect(data.url);
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-bg-primary p-4'>
			<div className='w-full max-w-md'>
				<div className='bg-bg-card rounded-2xl p-8 border border-border'>
					<div className='flex flex-col items-center mb-8'>
						<div className='w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mb-6'>
							<PlayCircle className='w-12 h-12 text-bg-primary' />
						</div>
						<h1 className='text-3xl font-bold text-text-primary mb-2'>AudioBooks</h1>
						<p className='text-text-muted text-center'>Free audiobooks from LibriVox</p>
					</div>

					<form action={signInWithGoogle}>
						<button type='submit' className='w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors'>
							<svg className='w-5 h-5' viewBox='0 0 24 24'>
								<path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
								<path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
								<path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
								<path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
							</svg>
							Continue with Google
						</button>
					</form>

					<p className='mt-6 text-xs text-text-muted text-center'>By continuing, you agree to our Terms of Service and Privacy Policy</p>
				</div>
			</div>
		</div>
	);
}
