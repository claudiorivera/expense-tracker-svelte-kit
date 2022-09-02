import { error } from "@sveltejs/kit";

export const load = async ({ fetch }) => {
  const url = "/api/transactions";
  const res = await fetch(url);

  if (res.ok) {
    return {
      transactions: await res.json(),
    };
  }

  throw error(500, `Could not load ${url}`);
};
