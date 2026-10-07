import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connnected', () => {
      console.log('MongoDB connected');
    });
    await mongoose.connect(`${process.env.MONGO_URI}/moviefyhub`);
  } catch (error) {
    console.log("DB Connection Error:",error.message);
}
};

export default connectDB;