const express = require("express");
const cors = require("cors");
const connectDb = require("./dbConfig/db.config");
const noteRouter = require("./routes/notes.routes");
const userRouter = require("./routes/users.routes");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend Server is running.");
});

app.use("/api/users", userRouter);

app.use("/api/notes", noteRouter);

app.use((req, res) => {
	res.status(404).send({ message: "Endpoint not found" });
});

app.listen(port, async () => {
	try {
		await connectDb();
		console.log(`Server is running at port: ${port}`);
		console.log(`http://localhost:${port}`);
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		process.exit(1);
	}
});
