import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <p>
          <Link href="/">Torchbox.com Shadow Site</Link>
        </p>
        {children}
      </body>
    </html>
  );
}
