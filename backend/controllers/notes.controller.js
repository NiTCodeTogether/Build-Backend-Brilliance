const Note = require("../dbModels/note.model");

const createNotes = async (req, res) => {
	try {
		const { title, description } = req.body;

		if (!title || !description) {
			return res.status(400).json({
				message: "Title and description are required",
			});
		}

		const note = new Note({
			title,
			description,
			date: Date.now(),
		});

		await note.save();
		res.status(201).json({
			message: "Your note has been saved successfully.",
		});
	} catch (error) {
		console.log(error);
		res.status(503).json("Internal server error. Please try after some time.");
	}
};

const getNotes = async (req, res) => {
	try {
		const notes = await Note.find({});
		if (!notes || notes.length === 0) {
			return res
				.status(404)
				.json("No notes found. Try after creating a new note.");
		}
		res.status(200).json({ notes });
	} catch (error) {
		console.log(error);
		res.status(503).json("Internal server error. Please try after some time.");
	}
};

const updateNotes = async (req, res) => {
	try {
		const { id, title, description } = req.body;

		const updateData = {};
		if (title) updateData.title = title;
		if (description) updateData.description = description;
		updateData.date = Date.now();

		const updatedNote = await Note.findByIdAndUpdate(id, updateData, { new: true });

		if (!updatedNote) {
			return res.status(404).json("Note not found for the given ID.");
		}

		res.status(200).json({
			message: "Your note has been modified successfully.",
		});
	} catch (error) {
		console.log(error);
		res.status(503).json("Internal server error. Please try after some time.");
	}
};

const deleteNotes = async (req, res) => {
	try {
		const { id } = req.body;

		const deletedNote = await Note.findByIdAndDelete(id);

		if (!deletedNote) {
			return res.status(404).json("Note not found for the given ID.");
		}

		res.status(200).json({
			message: "Your note has been deleted successfully.",
		});
	} catch (error) {
		console.log(error);
		res.status(503).json("Internal server error. Please try after some time.");
	}
};

module.exports = { createNotes, getNotes, updateNotes, deleteNotes };
