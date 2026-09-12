"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/", label: "Shorts", icon: ShortsIcon, muted: true },
  {
    href: "#",
    label: "Subscriptions",
    icon: SubscriptionsIcon,
    disabled: true,
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r border-[var(--yt-border)] bg-[var(--yt-bg)] px-2 py-3 md:block ${
        collapsed ? "w-[72px]" : "w-60"
      }`}
    >
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="mb-2 flex w-full items-center gap-4 rounded-lg px-3 py-2 text-sm hover:bg-[var(--yt-hover)]"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <MenuIcon />
        {!collapsed && <span>Menu</span>}
      </button>

      <nav className="flex flex-col gap-0.5" aria-label="Primary">
        {navItems.map((item) => {
          const active = item.href === "/" && pathname === "/" && item.label === "Home";
          const className = `flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm ${
            active ? "bg-[var(--yt-hover)] font-medium" : "hover:bg-[var(--yt-hover)]"
          } ${"disabled" in item && item.disabled ? "cursor-not-allowed opacity-50" : ""} ${
            "muted" in item && item.muted ? "opacity-70" : ""
          }`;

          if ("disabled" in item && item.disabled) {
            return (
              <span key={item.label} className={className} aria-disabled>
                <item.icon />
                {!collapsed && <span>{item.label}</span>}
              </span>
            );
          }

          return (
            <Link key={item.label} href={item.href} className={className}>
              <item.icon />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <path fill="currentColor" d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function ShortsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <path
        fill="currentColor"
        d="M10 14.65v-5.3L15 12l-5 2.65Zm7.77-13.05-1.15 1.14C15.88 1.6 14.2 1 12.48 1 8.2 1 4.72 4.48 4.72 8.76c0 1.72.6 3.4 1.74 4.74l-1.14 1.15C3.9 13.12 3 10.98 3 8.76 3 3.93 6.93 0 11.76 0c2.22 0 4.36.9 5.89 2.48l.12.12ZM18.25 10.24c0-1.72-.6-3.4-1.74-4.74l1.14-1.15C19.1 5.64 20 7.78 20 10c0 4.83-3.93 8.76-8.76 8.76-2.22 0-4.36-.9-5.89-2.48l-.12-.12 1.15-1.14c.74.88 2.42 1.48 4.14 1.48 4.28 0 7.76-3.48 7.76-7.76Z"
      />
    </svg>
  );
}

function SubscriptionsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <path
        fill="currentColor"
        d="M10 18v-6l5 3-5 3Zm7-15H7v2h10V3Zm3 4H4v2h16V7Zm2 4H2v10h20V11Z"
      />
    </svg>
  );
}
