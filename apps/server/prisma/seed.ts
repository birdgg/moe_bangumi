import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const rssItem = await prisma.rssItem.upsert({
		where: { id: 1 },
		update: {},
		create: {
			title: "Mikan Project - 我的番组",
			url: "https://mikanani.me/RSS/MyBangumi?token=IrNydFnGd1%2fZ56onK1aljQ%3d%3d",
			enabled: true,
			aggregate: true,
		},
	});
	console.log({ rssItem });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
