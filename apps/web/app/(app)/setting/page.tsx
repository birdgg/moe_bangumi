"use client";
import { GeneralForm } from "@/components/setting/general-form";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/queries/client";
import { PartialSetting } from "@repo/api/setting";
import { useCallback } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const SETTINGS = [
//   {
//     title: "General",
//     Form: GeneralForm,
//   },
// ];

export default function SettingPage() {
	const { data } = client.setting.get.useQuery();
	const { toast } = useToast();
	const { mutate } = client.setting.post.useMutation({
		onSuccess() {
			toast({ description: "Setting updated" });
		},
	});

	const update = useCallback(
		(data: PartialSetting) => {
			mutate({ body: data });
		},
		[mutate],
	);

	if (!data) return null;
	return (
		<GeneralForm setting={data} update={update} />
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
