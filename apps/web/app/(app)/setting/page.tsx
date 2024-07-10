import { GeneralForm } from "@/components/setting/GeneralForm";
import { SettingFormProps } from "@/components/setting/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { client } from "@/libs/client";
import type { Setting } from "@repo/shared-api";

const SETTINGS: {
  title: string;
  // eslint-disable-next-line no-unused-vars
  Form: (_: SettingFormProps<any>) => JSX.Element;
  key: keyof Setting;
}[] = [
  {
    title: "General",
    Form: GeneralForm,
    key: "general",
  },
];

export default async function () {
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
          <Form defaultValues={body[key]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
