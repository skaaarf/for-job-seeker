"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, User, Map, FileText, Settings, Sparkles } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/modules/self", label: "自己理解", icon: User },
    { href: "/modules/career", label: "キャリア設計", icon: Map },
    { href: "/modules/es", label: "ESと面接", icon: FileText },
];

export function Sidebar() {
    const pathname = usePathname();
    // Fix hydration mismatch by ensuring we only conditionally render after mount or handle it consistently.
    // However, returning null on client but rendering on server causes mismatch.
    // Best practice for layout changes: use CSS or ensure server knows the path (not possible in layout easily).
    // Or, just return null, but wrapping element mismatch might persist.
    // Let's use a "mounted" check to ensure we match server first (which likely renders sidebar), then hide it.
    // OR better: Just return null immediately if we are sure, but suppress hydration warning?
    // Actually, layout.tsx renders Sidebar. Server renders it. Client comes, sees pathname, returns null. -> Mismatch.

    // To solve this cleanly: use `display: none` via CSS class if correct, or use a client-side only render barrier.

    // Let's go with CSS approach to avoid DOM structure mismatch errors during hydration.
    const shouldHide = pathname?.startsWith("/modules/self");

    return (
        <aside className={clsx(
            "w-64 bg-white border-r border-secondary h-screen sticky top-0 flex flex-col shrink-0 text-slate-600 font-sans shadow-sm z-30 transition-all",
            // Responsive visibility: hidden using md:flex usually, but here we override if shouldHide
            shouldHide ? "hidden" : "hidden md:flex"
        )}>
            {/* Branding */}
            <div className="p-6 border-b border-secondary/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">味方くん</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Settings */}
            <div className="p-4 border-t border-secondary/50">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <Settings className="w-5 h-5 text-slate-400" />
                    設定
                </Link>
                <div className="mt-4 px-4 text-xs text-slate-400 text-center">
                    © 2025 Mikata-kun
                </div>
            </div>
        </aside>
    );
}
