// Saved notes array
let notes = [];

// Return date value as DD/MM/YYYY
const dateOrder = (taskDate) => {
  taskDate = document.getElementById("taskDate").value.split("-");
  return `${taskDate[2]}/${taskDate[1]}/${taskDate[0]}`;
};

// Form input value to new Object and add to array & LocalStorage
const submitNote = () => {
  let noteData = new Object();
  noteData.taskDesc = document.getElementById("taskDesc").value;
  noteData.taskDate = dateOrder();
  noteData.taskTime = document.getElementById("taskTime").value;

  notes.push(noteData);
  pinNote();
  document.getElementById("noteForm").reset();
  localStorage.setItem("savedNotes", JSON.stringify(notes));
  $("#savedNotes").children().last().hide().fadeIn(1500); // Fade in new note
};

// Map array and add input value to div & inject to HTML
const pinNote = () => {
  let note = "";
  notes.map((item) => {
    note += `
    <div class="noteInfo" id="noteInfo">
      <img src="img/notebg.png" />

      <button class="removeNote" onclick="removeNote()">
      <span class="material-symbols-outlined">disabled_by_default</span>
      </button>

      <div class="noteText">
        ${item.taskDesc}
      </div>
    
      <div class="noteTime">
        ${item.taskDate}<br />
        ${item.taskTime}
      </div>
    </div>    
    `;
  });
  document.getElementById("savedNotes").innerHTML = note;
};

// remove note from HTML + localStorage
const removeNote = () => {
  $("#savedNotes div").click(function () {
    var index = $(this).index();
    notes.splice(index, 1);
    localStorage.setItem("savedNotes", JSON.stringify(notes));
    checkForData();
  });
};

// Check localStorage data & Inject to HTML
const checkForData = () => {
  notes = JSON.parse(localStorage.getItem("savedNotes")) || [];
  pinNote();
};
checkForData();

// fade in all notes on load
$("#savedNotes").children().hide().fadeIn(1500);
