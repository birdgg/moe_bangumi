import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "./client";

const bangumisKey = ["bangumis"];

export const useSuspenseBangumis = () => {
	return client.bangumi.get.useSuspenseQuery({
		queryKey: bangumisKey,
	});
};
