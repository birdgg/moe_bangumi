"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartialSetting, SettingSchema } from "@repo/api/setting";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form } from "../ui/form";
import { FormInput, FormSectionHeader } from "./form-items";

const schema = SettingSchema.pick({ mikan: true, downloader: true });

export const GeneralForm: React.FC<{
	setting: PartialSetting;
	update: (data: PartialSetting) => void;
}> = ({ setting, update }) => {
	const { mikan, downloader } = setting;
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { mikan, downloader },
	});

	return (
		<Form {...form}>
			<form className="space-y-10" onSubmit={form.handleSubmit(update)}>
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
