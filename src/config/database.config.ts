import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default function database() {
    mongoose.connect("mongodb+srv://chuksaginamada:JhQ9FVxbd9gBGluK@cluster0.ela5hrz.mongodb.net/"!)
        .then(() => {
            console.log("Connection to database has been established successfully");
        })
        .catch((err) => {
            console.log("Unable to connect to database:", err);
        });
}