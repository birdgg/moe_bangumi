import { GeneralForm } from "@/components/setting/general-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/libs/client";

const SETTINGS = [
	{
		title: "General",
		Form: GeneralForm,
	},
];

export default async function SettingPage() {
	const { body, status } = await client.setting.get();
	if (status !== 200) {
		throw new Error("Failed to fetch settings");
	}

	return (
		<Tabs defaultValue={SETTINGS[0]!.title}>
			<TabsList className="mb-4 h-10">
				{SETTINGS.map((setting) => (
					<TabsTrigger key={setting.title} value={setting.title}>
						{setting.title}
					</TabsTrigger>
				))}
			</TabsList>
			{SETTINGS.map(({ title, Form }) => (
				<TabsContent key={title} value={title} className="w-1/3">
					<Form setting={body} />
				</TabsContent>
			))}
		</Tabs>
	);
}
