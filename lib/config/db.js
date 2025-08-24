// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//   await mongoose.connect(
//     process.env.MONGODB_URL
//   );
//   console.log("connected");
// };


import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
