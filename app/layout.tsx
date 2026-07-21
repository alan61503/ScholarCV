import type { Metadata } from "next";
import "./globals.css";
import { profile } from "../data/profile";

export const metadata: Metadata = {
  title: `${profile.personalInfo.name} — ${profile.personalInfo.title}`,
  description: profile.personalInfo.biography,
};

// Inline, blocking script so the correct theme class is applied before the
// first paint — avoids a light/dark flash on load or refresh.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('scholarcv-theme');
    var theme = stored ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
