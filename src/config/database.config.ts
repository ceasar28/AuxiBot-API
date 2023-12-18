import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default function database() {
  mongoose
    .connect(process.env.DATABASE_URI!)
    .then(() => {
      console.log("Connection to database has been established successfully");
    })
    .catch((err) => {
      console.log("Unable to connect to database:", err);
    });
}
