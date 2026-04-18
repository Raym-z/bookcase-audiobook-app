import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsOfServicePage() {
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

				<h1 className="text-3xl font-bold text-text-primary mb-2">Terms of Service</h1>
				<p className="text-sm text-text-muted mb-8">Last updated: April 2026</p>

				<div className="space-y-6 text-text-secondary text-sm leading-relaxed">
					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">1. Acceptance of Terms</h2>
						<p>
							By accessing or using AudioBooks, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">2. Description of Service</h2>
						<p>
							AudioBooks is a free audiobook streaming platform that provides access to public domain audiobooks sourced from LibriVox. Our service allows users to search, browse, play, and save audiobooks, as well as track listening progress across devices.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">3. User Accounts</h2>
						<p>
							Access to certain features requires a user account. You sign in using Google OAuth. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">4. Intellectual Property</h2>
						<p>
							All audiobooks available through AudioBooks are in the public domain and belong to their respective authors and LibriVox contributors. The AudioBooks platform, including its design, branding, and proprietary code, is owned by AudioBooks and protected by intellectual property laws. You retain rights to any data you submit, including your listening history and favorites.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">5. Disclaimer of Warranties</h2>
						<p>
							Our service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that the audiobooks will be available at all times or free of errors. The audiobooks are sourced from LibriVox, a third-party platform, and we have no control over their availability or accuracy.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">6. Limitation of Liability</h2>
						<p>
							To the fullest extent permitted by law, AudioBooks shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. We are not liable for any loss of data, listening progress, or other content associated with your account.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">7. Changes to These Terms</h2>
						<p>
							We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after any changes constitutes acceptance of the modified terms.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">8. Governing Law</h2>
						<p>
							These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-text-primary mb-2">9. Contact</h2>
						<p>
							For any questions regarding these Terms of Service, please contact us at{" "}
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
