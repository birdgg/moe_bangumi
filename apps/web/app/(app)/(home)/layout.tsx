export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="grid grid-cols-7 gap-4">{children}</div>;
}
