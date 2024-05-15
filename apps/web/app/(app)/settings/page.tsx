import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgramForm from "@/components/settings/ProgramForm";
import { bangumiClient } from "@/queries/api";
import DownloaderForm from "@/components/settings/DownloaderForm";
import type { components } from "@/queries/generatedApi";

const SETTINGS: {
  title: string;
  Form: React.ComponentType<any>;
  key: keyof components["schemas"]["Setting"];
}[] = [
  {
    title: "Program",
    Form: ProgramForm,
    key: "program",
  },
  {
    title: "Downloader",
    Form: DownloaderForm,
    key: "downloader",
  },
];

export default async function Settings() {
  const { data } = await bangumiClient.GET("/api/setting");
  console.log({ data });
  if (!data) {
    throw new Error("Failed to fetch settings data.");
  }
  return (
    <Tabs defaultValue={SETTINGS[0]!.title} className="w-[400px]">
      <TabsList className="mb-4">
        {SETTINGS.map((setting, index) => (
          <TabsTrigger key={index} value={setting.title}>
            {setting.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {SETTINGS.map(({ title, Form, key }) => (
        <TabsContent key={key} value={title}>
          <Form defaultValues={data[key]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
