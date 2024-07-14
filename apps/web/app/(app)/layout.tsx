import { Sidebar } from "@/components/sidebar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-screen w-full flex flex-row">
			<Sidebar />
			<div className="flex-grow h-full">
				<main className="flex-1 h-full overflow-auto p-4">{children}</main>
			</div>
		</div>
	);
}
