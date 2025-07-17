const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
// const URI = "mongodb+srv://wasimrahii98:khan123@cluster0.tlujdxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected successfully to the Database");
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1); // Use 1 to indicate a failure in the process exit code
    }
};

module.exports = connectdb;
