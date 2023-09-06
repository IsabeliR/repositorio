const dialogueContent = document.getElementById("dialogue-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const dialogues = [
  "Os capangas ja foram!",
  "Agora só resta a IRA!",
  "Sera que sou forte o bastante?"
  
];

let currentDialogueIndex = 0;

function updateDialogue() {
  dialogueContent.textContent = dialogues[currentDialogueIndex];
}

prevButton.addEventListener("click", () => {
  currentDialogueIndex = Math.max(currentDialogueIndex - 1, 0);
  updateDialogue();
});

nextButton.addEventListener("click", () => {
  currentDialogueIndex++;
  if (currentDialogueIndex >= dialogues.length) {
    window.location.href = "fase2.html"; // Redirecionamento para outra página
  } else {
    updateDialogue();
  }
});

updateDialogue();