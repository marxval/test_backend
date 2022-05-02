import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
  } catch (error) {
    console.log("Error conectando a la base de datos");
  }
};

export default connectDB;
