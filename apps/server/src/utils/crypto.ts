import crypto from "node:crypto";

interface HashOptions {
	length?: number;
}
export function md5Hash(data: string, options?: HashOptions) {
	const hex = crypto.createHash("md5").update(data).digest("hex");
	if (options?.length) {
		return hex.substring(0, options.length);
	}

	return hex;
}
