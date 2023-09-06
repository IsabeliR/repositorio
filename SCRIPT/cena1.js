const dialogueContent = document.getElementById("dialogue-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const dialogues = [
  "Peterson era diferente dos outros, ele não se encaixava na vila onde nasceu. ",
  "Certo dia ele percebeu que tinha um poder adormecido em seu corpo, então ele decidiu lutar contra o mal que atormentava seu povo.",
  "Esse mal era o único pecado que ainda não havia adormecido depois de uma grande luta que seu pai infelizmente não sobreviveu.",
  "Depois da morte ele queria vingança.",
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
    window.location.href = "fase1.html"; // Redirecionamento para outra página
  } else {
    updateDialogue();
  }
});

updateDialogue();