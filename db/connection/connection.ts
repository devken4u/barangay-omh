import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "barangay174OMH",
    });
  }

  cached.conn = await cached.promise;
  console.log(cached.conn);
  return cached.conn;
}

if (process.env.NODE_ENV !== "production") {
  (global as any).mongoose = cached;
}
