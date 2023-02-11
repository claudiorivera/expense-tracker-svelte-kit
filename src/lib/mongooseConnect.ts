import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
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

export const dbConnect = async () => {
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
  await mongoose.connect(MONGODB_URI ?? "");
  mongoConnection.isConnected = 1;
};

export const dbDisconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
};
