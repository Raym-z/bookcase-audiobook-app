"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, PlayCircle, Library, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";

interface NavItem {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
	{ label: "Home", href: "/", icon: Home },
	{ label: "Search", href: "/search", icon: Search },
	{ label: "Favorites", href: "/favorites", icon: Heart },
	{ label: "Continue Listening", href: "/continue-listening", icon: PlayCircle },
	{ label: "Categories", href: "/categories", icon: Library },
];

export function Sidebar() {
	const pathname = usePathname();
	const { isExpanded, toggle, isMobileOpen, setMobileOpen } = useSidebar();

	return (
		<>
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-40 lg:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			<aside
				className={cn(
					"fixed left-0 top-0 h-full bg-bg-card border-r border-border z-40 transition-all duration-300 flex flex-col",
					(isMobileOpen || isExpanded) ? "w-60" : "w-16",
					isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				)}
			>
				<div className="p-4 flex items-center border-b border-border">
					<button
						onClick={() => isMobileOpen ? setMobileOpen(false) : toggle()}
						className={cn(
							"flex items-center gap-3 rounded-lg transition-colors",
							isExpanded ? "" : "justify-center w-full cursor-pointer hover:bg-bg-hover"
						)}
						aria-label={isExpanded ? "AudioBooks" : "Expand sidebar"}
					>
						<div className="w-10 h-8 rounded-lg bg-accent flex items-center justify-center">
							<PlayCircle className="w-6 h-6 text-bg-primary" />
						</div>
						{isExpanded && (
							<span className="font-bold text-lg text-text-primary">BookCast</span>
						)}
					</button>
					{isExpanded && !isMobileOpen && (
						<>
							<button
								onClick={() => setMobileOpen(true)}
								className="flex lg:hidden p-1 rounded hover:bg-bg-hover transition-colors ml-auto"
								aria-label="Close sidebar"
							>
								<X className="w-5 h-5 text-text-muted" />
							</button>
							<button
								onClick={toggle}
								className="hidden lg:flex p-1 rounded hover:bg-bg-hover transition-colors ml-auto"
								aria-label="Collapse sidebar"
							>
								<ChevronLeft className="w-5 h-5 text-text-muted" />
							</button>
						</>
					)}
					{isExpanded && isMobileOpen && (
						<button
							onClick={() => setMobileOpen(false)}
							className="flex lg:hidden p-1 rounded hover:bg-bg-hover transition-colors ml-auto"
							aria-label="Close sidebar"
						>
							<X className="w-5 h-5 text-text-muted" />
						</button>
					)}
				</div>

				<nav className="flex-1 p-3 space-y-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;
						const isNavExpanded = isExpanded || isMobileOpen;
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={cn(
									"flex items-center gap-3 rounded-lg transition-all duration-200",
									isNavExpanded ? "px-3 py-3" : "justify-center p-2",
									isActive
										? "bg-accent/10 text-accent"
										: "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
								)}
							>
								<Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-accent")} />
								{isNavExpanded && <span className="font-medium">{item.label}</span>}
							</Link>
						);
					})}
				</nav>
			</aside>
		</>
	);
}