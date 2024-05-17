"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@/queries/generatedApi";
import { FormInput } from "./FormItems";
import { Form } from "../ui/form";
import { updateSetting } from "@/queries/actions/setting";
import { useToast } from "../ui/use-toast";

interface Props {
  defaultValues: components["schemas"]["Setting"]["downloader"];
}

const formSchema = z.object({
  host: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  path: z.string().min(1),
});

export default function DownloaderForm({ defaultValues }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateSetting({ downloader: values });
    toast({ description: "Update success" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormInput name="host" label="Host" />
        <FormInput name="username" label="Username" />
        <FormInput name="password" label="Password" />
        <FormInput name="path" label="Bangumi save path" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
