import { queryClient } from ".";
import { client } from "./client";

const settingKey = ["setting"];

export const useSetting = () => {
	return client.setting.get.useSuspenseQuery({
		queryKey: settingKey,
	});
};

export const useSettingMutation = () => {
	return client.setting.post.useMutation({
		onSuccess(data) {
			queryClient.setQueryData(settingKey, data);
		},
	});
};
