import mongoose from "mongoose";
import { env } from "$env/dynamic/private";

/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
	isConnected: 0,
};

export async function dbConnect() {
	if (mongoConnection.isConnected === 1) {
		return;
	}

	if (mongoose.connections.length) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoConnection.isConnected === 1) {
			return;
		}

		await mongoose.disconnect();
	}
	await mongoose.connect(env.MONGODB_URI);
	mongoConnection.isConnected = 1;
}

export async function dbDisconnect() {
	if (process.env.NODE_ENV === "development") return;
	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
}
