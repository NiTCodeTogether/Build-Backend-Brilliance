document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.getElementById("notesContainer");
    const authButtons = document.getElementById("authButtons");

    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Update navbar based on login status
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <img src="https://via.placeholder.com/40" alt="User DP" class="user-dp">
            <button class="logout-btn">Logout</button>
        `;

        // Attach event listener for the logout button
        const logoutButton = document.querySelector(".logout-btn");
        logoutButton.addEventListener("click", logout);
    } else {
        authButtons.innerHTML = `
            <button class="login-btn" onclick="location.href='login.html'">Login</button>
            <button class="signup-btn" onclick="location.href='signup.html'">Signup</button>
        `;
    }

    // Logout function
    function logout() {
        localStorage.setItem('isLoggedIn', 'false');
        alert("You have been logged out!");
        location.reload(); // Reload the page to update the UI
    }

    // Sample notes
    const sampleNotes = [
        {
            title: "Meeting Notes",
            description: "Discuss project deliverables and timelines.",
            date: "2024-12-12"
        },
        {
            title: "Grocery List",
            description: "Milk, Bread, Eggs, Butter.",
            date: "2024-12-10"
        },
        {
            title: "Workout Plan",
            description: "Morning run, Yoga, Strength training.",
            date: "2024-12-11"
        }
    ];

    function renderNotes(notes) {
        notesContainer.innerHTML = "";
        notes.forEach((note, index) => {
            const noteCard = document.createElement("div");
            noteCard.className = "note-card";

            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <div class="note-date">${note.date}</div>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
                </div>
            `;

            notesContainer.appendChild(noteCard);
        });
    }

    window.editNote = (index) => {
        alert(`Edit Note #${index + 1} - This feature is under construction.`);
    };

    window.deleteNote = (index) => {
        sampleNotes.splice(index, 1);
        renderNotes(sampleNotes);
    };

    renderNotes(sampleNotes);
});
