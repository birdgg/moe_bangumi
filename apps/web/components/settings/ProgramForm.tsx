"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@/queries/generatedApi";
import { FormInput, FormSwitch } from "./FormItems";
import { Form } from "../ui/form";
import { bangumiClient } from "@/queries/api";

interface Props {
  defaultValues: components["schemas"]["Setting"]["program"];
}

const formSchema = z.object({
  rssTime: z.coerce.number(),
  renameTime: z.coerce.number(),
  mikanToken: z.string(),
  debug: z.boolean(),
});

export default function GeneralForm({ defaultValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await bangumiClient.PATCH("/api/settings", {
      body: { program: values },
    });
    console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormInput name="rssTime" label="Interval Time Of Rss" />
        <FormInput name="renameTime" label="Interval Time Of Rename" />
        <FormInput name="mikanToken" label="Mikan token" />
        <FormSwitch name="debug" label="Debug" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
