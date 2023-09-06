const dialogueContent = document.getElementById("dialogue-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const dialogues = [
  "Vou trazer seu pai de volta se me ajudar a acabar com a vila e te deixarei em paz!"
];

let currentDialogueIndex = 0;

function updateDialogue() {
  dialogueContent.textContent = dialogues[currentDialogueIndex];
}

prevButton.addEventListener("click", () => {
  window.location.href="finalRuim.html"
});

nextButton.addEventListener("click", () => {
  currentDialogueIndex++;
  if (currentDialogueIndex >= dialogues.length) {
    window.location.href = "finalBom.html"; // Redirecionamento para outra página
  } else {
    updateDialogue();
  }
});

updateDialogue();