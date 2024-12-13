document.addEventListener("DOMContentLoaded", () => {
	const notesContainer = document.getElementById("notesContainer");
	const authButtons = document.getElementById("authButtons");
	const addNoteBtn = document.getElementById("addNoteBtn");

	// Check login status
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

	// Update navbar based on login status
	if (isLoggedIn) {
		authButtons.innerHTML = ` <img src="dp.jpeg" alt="User DP" class="user-dp">
            <button class="logout-btn">Logout</button>
        `;
        
		const logoutButton = document.querySelector(".logout-btn");
		logoutButton.addEventListener("click", logout);
	} else {
		authButtons.innerHTML = `
                    <button class="login-btn" onclick="location.href='login.html'">Login</button>
                    <button class="signup-btn" onclick="location.href='signup.html'">Signup</button>
                `;
	}

	function logout() {
		localStorage.setItem("isLoggedIn", "false");
		alert("You have been logged out!");
		location.reload();
	}

	async function fetchNotes() {
		try {
			const response = await fetch(
				"http://localhost:3000/api/notes/get-notes"
			);
			const notes = await response.json();
			renderNotes(notes.notes);
		} catch (error) {
			console.error("Error fetching notes:", error);
		}
	}

	function renderNotes(notes) {
		notesContainer.innerHTML = "";
		notes.forEach((note) => {
			const noteCard = document.createElement("div");
			noteCard.className = "note-card";

			noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <div class="note-date">${new Date(
					note.date
				).toLocaleDateString()}</div>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNote('${
						note._id
					}', '${note.title}', '${note.description}')">Edit</button>
                    <button class="delete-btn" onclick="deleteNote('${
						note._id
					}')">Delete</button>
                </div>
            `;

			notesContainer.appendChild(noteCard);
		});
	}

	window.editNote = (id, title, description) => {
		notesContainer.innerHTML = ""; // Hide the notes list

		const noteFormPopup = document.createElement("div");
		noteFormPopup.className = "note-form-popup";

		noteFormPopup.innerHTML = `
            <div class="note-form">
                <h2>Edit Note</h2>
                <label for="noteTitle">Title:</label>
                <input type="text" id="noteTitle" name="noteTitle" value="${title}" required>
                <label for="noteDescription">Description:</label>
                <textarea id="noteDescription" name="noteDescription" required>${description}</textarea>
                <button id="updateNoteBtn">Update</button>
                <button id="cancelNoteBtn">Cancel</button>
            </div>
        `;

		document.body.appendChild(noteFormPopup);

		const updateNoteBtn = document.getElementById("updateNoteBtn");
		const cancelNoteBtn = document.getElementById("cancelNoteBtn");

		updateNoteBtn.addEventListener("click", async () => {
			const updatedTitle = document.getElementById("noteTitle").value;
			const updatedDescription =
				document.getElementById("noteDescription").value;

			if (updatedTitle && updatedDescription) {
				try {
					const response = await fetch(
						"http://localhost:3000/api/notes/update-notes",
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								id,
								title: updatedTitle,
								description: updatedDescription,
							}),
						}
					);

					if (response.ok) {
						alert("Note updated successfully!");
						fetchNotes(); // Fetch the updated notes
						document.body.removeChild(noteFormPopup);
					} else {
						console.error(
							"Error updating note:",
							response.statusText
						);
					}
				} catch (error) {
					console.error("Error updating note:", error);
				}
			} else {
				alert("Please fill out all fields.");
			}
		});

		cancelNoteBtn.addEventListener("click", () => {
			document.body.removeChild(noteFormPopup);
			fetchNotes(); // Re-show the notes list when the form is canceled
		});
	};

	window.deleteNote = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/notes/delete-notes`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id }),
				}
			);

			if (response.ok) {
				alert("Note deleted successfully!");
				fetchNotes();
			} else {
				console.error("Failed to delete note.");
			}
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	};

	addNoteBtn.addEventListener("click", () => {
		notesContainer.innerHTML = ""; // Hide the notes list
		const noteFormPopup = document.createElement("div");
		noteFormPopup.className = "note-form-popup";

		noteFormPopup.innerHTML = `
            <div class="note-form">
                <h2>Create Note</h2>
                <label for="noteTitle">Title:</label>
                <input type="text" id="noteTitle" name="noteTitle" required>
                <label for="noteDescription">Description:</label>
                <textarea id="noteDescription" name="noteDescription" required></textarea>
                <button id="saveNoteBtn">Save</button>
                <button id="cancelNoteBtn">Cancel</button>
            </div>
        `;

		document.body.appendChild(noteFormPopup);

		const saveNoteBtn = document.getElementById("saveNoteBtn");
		const cancelNoteBtn = document.getElementById("cancelNoteBtn");

		saveNoteBtn.addEventListener("click", async () => {
			const title = document.getElementById("noteTitle").value;
			const description =
				document.getElementById("noteDescription").value;

			if (title && description) {
				try {
					const response = await fetch(
						"http://localhost:3000/api/notes/create-notes",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ title, description }),
						}
					);

					if (response.ok) {
						alert("Note created successfully!");
						fetchNotes(); // Fetch the updated notes
						document.body.removeChild(noteFormPopup);
					} else {
						console.error(
							"Error creating note:",
							response.statusText
						);
					}
				} catch (error) {
					console.error("Error creating note:", error);
				}
			} else {
				alert("Please fill out all fields.");
			}
		});

		cancelNoteBtn.addEventListener("click", () => {
			document.body.removeChild(noteFormPopup);
			fetchNotes(); // Re-show the notes list when the form is canceled
		});
	});

	fetchNotes(); // Load notes initially
});
