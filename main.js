
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes() {
    const notesList = document.getElementById("notesList");

    if (!notesList) return;

    notesList.innerHTML = "";

    notes.forEach((note) => {
        notesList.innerHTML += `
            <div class="note-card">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
                <button class="delete-button" data-id="${note.id}">
                    Delete
                </button>
            </div>
        `;
    });

    const emptyMessage = document.getElementById("emptyMessage");

    if (emptyMessage) {
        emptyMessage.style.display =
            notes.length === 0 ? "block" : "none";
    }
}

const form = document.getElementById("newnotes");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const noteId = document.getElementById("noteId").value.trim();
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!noteId || !title || !description) {
            alert("Please fill in all fields.");
            return;
        }

        if (notes.some(note => note.id === noteId)) {
            alert("Note ID already exists!");
            return;
        }

        notes.push({
            id: noteId,
            title: title,
            description: description
        });

        saveNotes();

        alert("Note saved successfully!");
        window.location.href = "./index.html";
    });
}

const notesList = document.getElementById("notesList");

if (notesList) {
    notesList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            const noteId = e.target.dataset.id;

            notes = notes.filter(note => note.id !== noteId);

            saveNotes();
            showNotes();
        }
    });
}

const closeBtn = document.getElementById("closeBtn");

if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "./index.html";
    });
}

showNotes();
