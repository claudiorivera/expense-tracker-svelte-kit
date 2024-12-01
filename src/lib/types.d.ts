/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

export type Transaction = {
	description: string;
	amount: number;
};
