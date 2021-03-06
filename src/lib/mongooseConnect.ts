import mongoose from "mongoose";

export const mongooseConnect = async (): Promise<void> => {
  // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(process.env.MONGODB_URI);
};
