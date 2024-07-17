"use client";
import { GeneralForm } from "@/components/setting/general-form";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSetting } from "@/queries/setting";

// const SETTINGS = [
//   {
//     title: "General",
//     Form: GeneralForm,
//   },
// ];

export default function SettingPage() {
	const { data } = useSetting();
	return (
		<GeneralForm setting={data} />
		// <Tabs defaultValue={SETTINGS[0]!.title}>
		//   <TabsList className="mb-4 h-10">
		//     {SETTINGS.map((setting) => (
		//       <TabsTrigger key={setting.title} value={setting.title}>
		//         {setting.title}
		//       </TabsTrigger>
		//     ))}
		//   </TabsList>
		//   {SETTINGS.map(({ title, Form }) => (
		//     <TabsContent key={title} value={title} className="w-1/3">
		//       <Form setting={data} />
		//     </TabsContent>
		//   ))}
		// </Tabs>
	);
}
