const express = require("express");
const {
	createNotes,
	getNotes,
	updateNotes,
	deleteNotes,
} = require("../controllers/notes.controller");

const noteRouter = express.Router();

noteRouter.post("/create-notes", createNotes);
noteRouter.get("/get-notes", getNotes);
noteRouter.put("/update-notes", updateNotes);
noteRouter.delete("/delete-notes", deleteNotes);

module.exports = noteRouter;
