export function isDataCreated(data: { createdAt: Date; updatedAt: Date }) {
	return data.createdAt === data.updatedAt;
}
