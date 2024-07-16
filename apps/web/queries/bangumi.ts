import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "./client";

export const useBangumis = () => {
	const { data } = useSuspenseQuery({
		queryKey: ["bangumis"],
		queryFn: async () => {
			const { body } = await client.bangumi.get();
			return body;
		},
	});

	return data;
};
