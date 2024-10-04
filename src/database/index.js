import mongoose from "mongoose";
const connectToDB = async () => {
  const mongoUrl = "mongodb+srv://ajeet:ajeetjha@cluster0.ytu3e.mongodb.net/";
  await mongoose
    .connect(mongoUrl)
    .then(() => console.log("mongodb connected successfully"))
    .catch((e) => console.log("mongodb not connected", e));
};
export default connectToDB;
