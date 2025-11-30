import { json } from "@sveltejs/kit";
import { seed } from "$lib/seed";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const secret = request.headers.get("authorization")?.split(" ")[1];

	if (secret !== process.env.CRON_SECRET) {
		return json({ message: "Unauthorized" }, { status: 401 });
	}

	await seed();

	return json({
		status: 204,
	});
};
