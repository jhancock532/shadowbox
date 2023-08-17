import Link from "next/link";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div>
      <p>
        <Link href={`/${params.date}`}>{params.date}</Link>
      </p>
      {children}
    </div>
  );
}
