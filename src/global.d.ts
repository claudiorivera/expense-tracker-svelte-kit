/// <reference types="@sveltejs/kit" />
declare namespace NodeJS {
	export interface ProcessEnv {
		MONGODB_URI: string;
	}
}
