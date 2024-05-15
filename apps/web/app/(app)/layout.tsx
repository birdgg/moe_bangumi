import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

export const revalidate = 10;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-screen w-full pl-[53px]">
      <Sidebar />
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 h-full overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
