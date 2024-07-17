"use client";

import { Button } from "@/components/ui/button";
import { useSettingMutation } from "@/queries/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { Setting, SettingSchema } from "@repo/api/setting";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { FormInput, FormSectionHeader } from "./form-items";

const schema = SettingSchema.pick({ mikan: true, downloader: true });

export const GeneralForm: React.FC<{ setting: Partial<Setting> }> = ({
	setting,
}) => {
	const { mikan, downloader } = setting;
	const { toast } = useToast();
	const { mutate } = useSettingMutation();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { mikan, downloader },
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		mutate(
			{ body: data },
			{
				onSuccess() {
					toast({ description: "Setting updated" });
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
				<FormSectionHeader title="Mikan" />
				<FormInput name="mikan.token" label="Mikan token" />
				<FormSectionHeader title="Downloader" />
				<FormInput name="downloader.host" label="Host" />
				<FormInput name="downloader.username" label="Username" />
				<FormInput name="downloader.password" label="Password" />
				<FormInput name="downloader.savePath" label="Save path" />
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
