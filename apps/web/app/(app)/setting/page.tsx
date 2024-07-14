import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { client } from "@/libs/client";
import { GeneralForm } from "@/components/setting/general-form";

const SETTINGS = [
  {
    title: "General",
    Form: GeneralForm,
    key: "general",
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
      {SETTINGS.map(({ title, Form, key }) => (
        <TabsContent key={key} value={title}>
          {/* @ts-expect-error -- i can not solve out */}
          <Form defaultValues={body[key]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
