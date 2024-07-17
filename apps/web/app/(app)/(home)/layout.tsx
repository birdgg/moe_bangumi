export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-5">
			{children}
		</div>
	);
}
