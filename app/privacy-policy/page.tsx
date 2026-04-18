import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
			<div className="w-full max-w-2xl bg-bg-card rounded-2xl border border-border p-8">
				<div className="flex items-center gap-3 mb-8">
					<Link
						href="/login"
						className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
					>
						<ChevronLeft className="w-5 h-5" />
						<span className="text-sm">Back to Login</span>
					</Link>
				</div>

				<h1 className="text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
				<p className="text-sm text-text-muted mb-8">Last updated: April 2026</p>

				<div className="space-y-6 text-text-secondary text-sm leading-relaxed">
					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">1. Information We Collect</h2>
						<p className="mb-2">When you sign in with Google OAuth, we collect:</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Your Google account email address</li>
							<li>Your name and profile picture</li>
							<li>Unique user identifier assigned by Google</li>
						</ul>
						<p className="mt-2">When you use AudioBooks, we store:</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Your audiobook favorites (book metadata you have saved)</li>
							<li>Your listening progress (current chapter and playback position)</li>
						</ul>
						<p className="mt-2">
							We also automatically collect basic usage data such as your IP address, browser type, and timestamps when you access the service.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">2. How We Use Your Information</h2>
						<p>We use the information we collect to:</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Provide and maintain the AudioBooks service</li>
							<li>Sync your listening progress across devices</li>
							<li>Save and display your favorites list</li>
							<li>Authenticate you via Google OAuth</li>
							<li>Improve and optimize the user experience</li>
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">3. Data Storage</h2>
						<p>
							Your personal data, including your Google account information, favorites, and listening history, is stored in Supabase, a cloud-based database service. Data is stored on servers that may be located outside of Indonesia.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">4. Data Sharing</h2>
						<p>
							We do not sell, trade, or rent your personal information to third parties. The audiobook content is sourced from LibriVox, a public domain platform, and is not subject to this privacy policy — please refer to LibriVox&apos;s own policies regarding their content.
						</p>
						<p className="mt-2">
							We share data with the following third-party service providers, which are necessary for the operation of AudioBooks:
						</p>
						<ul className="list-disc pl-5 space-y-1">
							<li><strong>Google</strong> — used for OAuth sign-in authentication</li>
							<li><strong>Supabase</strong> — used for authentication, database storage, and backend infrastructure</li>
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">5. Cookies</h2>
						<p>
							AudioBooks uses cookies for authentication and session management via Supabase and Next.js. These are essential for the service to function properly. We do not use advertising or tracking cookies.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">6. Your Rights</h2>
						<p>You have the right to:</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Access the personal data we hold about you</li>
							<li>Request correction of inaccurate data</li>
							<li>Request deletion of your account and all associated personal data</li>
						</ul>
						<p className="mt-2">
							To delete your account and personal data, please contact us at{" "}
							<a
								href="mailto:thinkpositifman@gmail.com"
								className="text-accent hover:text-accent-hover"
							>
								thinkpositifman@gmail.com
							</a>
							. Deleting your account will remove all favorites and listening history associated with your Google account.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">7. Children&apos;s Privacy</h2>
						<p>
							AudioBooks is not intended for use by children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information promptly.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">8. Changes to This Policy</h2>
						<p>
							We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the service after any changes constitutes acceptance of the updated policy.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">9. Contact</h2>
						<p>
							If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
							<a
								href="mailto:thinkpositifman@gmail.com"
								className="text-accent hover:text-accent-hover"
							>
								thinkpositifman@gmail.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
