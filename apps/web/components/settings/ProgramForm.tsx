"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@/queries/generatedApi";
import { FormInput } from "./FormItems";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { updateSetting } from "@/queries/actions/setting";

interface Props {
  defaultValues: components["schemas"]["Setting"]["program"];
}

const formSchema = z.object({
  rssTime: z.coerce.number().min(7200),
  renameTime: z.coerce.number().min(60),
  mikanToken: z.string().min(1),
});

export default function ProgramForm({ defaultValues }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateSetting({ program: values });
    toast({
      description: "Update success",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormInput name="rssTime" label="Interval Time Of Rss" />
        <FormInput name="renameTime" label="Interval Time Of Rename" />
        <FormInput name="mikanToken" label="Mikan token" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
