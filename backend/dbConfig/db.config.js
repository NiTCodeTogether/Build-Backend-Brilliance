const mongoose = require("mongoose");

const uri =
	"mongodb+srv://j6362254:j6se9EVld7lqQ0lr@codetogether.vtzzo.mongodb.net/codeTogether";

const connectDb = async () => {
	try {
		await mongoose.connect(uri);
		console.log("You are successfully connected to MongoDB!");
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error);
	}
};

module.exports = connectDb;
