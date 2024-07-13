import mongoose from "mongoose";//Import de mongoose
import envs from "./env.config.js";//Import de config de variables de entorno

export const connectMongoDB = async () => {
  try {
    // Conexión con la base de datos
    mongoose.connect(envs.MONGO_URL);
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.log(error);
  }
};