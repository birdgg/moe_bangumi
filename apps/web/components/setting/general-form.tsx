"use client";

import { updateSetting } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@repo/shared-api";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { FormInput } from "./form-items";
import type { SettingFormProps } from "./types";

const generalSchema = schemas.setting.shape.general;

export const GeneralForm: React.FC<SettingFormProps<"general">> = ({
	defaultValues,
}) => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof generalSchema>>({
		resolver: zodResolver(generalSchema),
		defaultValues,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const { status, body } = await updateSetting({ general: data });
		if (status === 200) {
			toast({ description: "Setting updated" });
		} else {
			toast({ description: body as string, variant: "destructive" });
		}
	});

	return (
		<Form {...form}>
			<form className="space-y-10" onSubmit={onSubmit}>
				<FormInput name="mikanToken" label="Mikan token" />
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
