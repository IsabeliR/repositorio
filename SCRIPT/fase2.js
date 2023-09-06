//MOVIMENTAÇÃO -- INÍCIO

const personagem = document.getElementById('personagem');
let posicaoHorizontal = 0;
let posicaoVertical = 0;
const step = 10;
let tiroAcertados = 0;
let isJumping = false; // Definir a variável isJumping
let vidaInimigo = 3;




function updatePersonagemPosition() {
    

}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      jump();
      break;
    case 'a':
      posicaoHorizontal -= step;
      break;
    case 'd':
      posicaoHorizontal += step;
      break;
    case ' ':
      atirar();
      break;
  }

  updatePersonagemPosition();
});

//MOVIMENTAÇÃO -- FIM

//TIRO -- INÍCIO

let isMovingLeft = false; // Variável para rastrear o estado da tecla "a" pressionada

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a':
      isMovingLeft = true;
      break;
    case 'd':
      isMovingLeft = false; // Parar o movimento à esquerda se a tecla "d" for pressionada
      break;
    case ' ':
      atirar();
      break;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    isMovingLeft = false; // Parar o movimento à esquerda quando a tecla "a" for solta
  }
});

function atirar() {
  const tiro = document.createElement('div');
  tiro.classList.add('tiro');
  
  // Adicione a classe tiro-esquerda se isMovingLeft for verdadeiro
  if (isMovingLeft) {
    tiro.classList.add('tiro-esquerda');
  }

  document.body.appendChild(tiro);

  const personagemRect = personagem.getBoundingClientRect();
  const tiroLeft = personagemRect.left + (isMovingLeft ? -10 : personagemRect.width + 10);

  tiro.style.left = tiroLeft + 'px';
  tiro.style.top = (personagemRect.top + personagemRect.height / 5) + 'px';

  const tiroMovement = isMovingLeft ? -5 : 5; // Define o movimento do tiro

  const tiroInterval = setInterval(() => {
    const tiroRect = tiro.getBoundingClientRect();
    if (tiroRect.left > 0 && tiroRect.right < window.innerWidth) {
      tiro.style.left = (parseInt(tiro.style.left) || 0) + tiroMovement + 'px';
    } else {
      clearInterval(tiroInterval);
      document.body.removeChild(tiro);
    }
    checkCollisionTiro(tiro, inimigo);
    checkCollisionTiroB(tiro, inimigoB);
    
    
  }, 10);

  
}
//TIRO -- FIM

//INIMIGO -- INÍCIO

const inimigo = document.getElementById('inimigo');
let inimigoPositionX = window.innerWidth; // Inimigo começa na extremidade direita




function moverInimigo() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX -= 0.5; // Movimento para a esquerda

  // Reposicionar o inimigo quando ele sair da tela
  if (inimigoPositionX < -50) {
    inimigoPositionX = window.innerWidth;
    
  }
}


setInterval(moverInimigo, 10);



//INIMIGO -- FIM

//DETECÇÃO -- INÍCIO


function checkCollision() {
  const personagemRect = personagem.getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();

  if (
    personagemRect.left < inimigoRect.right &&
    personagemRect.right > inimigoRect.left &&
    personagemRect.top < inimigoRect.bottom &&
    personagemRect.bottom > inimigoRect.top
  ) {
    subtrairVida();
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      jump();
      break;
    case 'a':
      personagem.style.left = (parseInt(personagem.style.left) || 0) - 10 + 'px';
      break;
    case 'd':
      personagem.style.left = (parseInt(personagem.style.left) || 0) + 10 + 'px';
      break;
  }

  checkCollision(inimigo);
  checkCollisionB(inimigoB);
});

//DETECÇÃO -- FIM

//GANHAR VIDA -- INÍCIO

const character = document.getElementById('character');
const vidaCountElement = document.getElementById('vidaCount');

let vidaCount = 3;

function updateVidaCount() {
  vidaCountElement.textContent = vidaCount;
}

function subtrairVida() {
  vidaCount--;
  updateVidaCount();

  if (vidaCount <= 0) {
    alert('Game Over! Vidas esgotadas.');
    resetGame();
  }
}

function resetGame() {
  vidaCount = 3;
  updateVidaCount();
  character.style.left = '0px';
  character.style.top = '0px';
}


//GANHAR VIDA -- FIM

//DETECÇÃO TIRO -- INÍCIO
function checkCollisionTiro(tiro, inimigo) {
  const tiroRect = tiro.getBoundingClientRect();
  const inimigoRect = inimigo.getBoundingClientRect();

  if (
    tiroRect.left < inimigoRect.right &&
    tiroRect.right > inimigoRect.left &&
    tiroRect.top < inimigoRect.bottom &&
    tiroRect.bottom > inimigoRect.top
  ) {
    tiroAcertados++
    updateVidaCount()
    document.body.removeChild(tiro)
    window.location.href="cena3.html";
  }


  

  if (tiroAcertados === 3) {
    document.getElementById("inimigo").remove();
    tiroAcertados = 0; // Reinicia a contagem de tiros acertados
  }

}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a':
      tiro.style.left = (parseInt(tiro.style.left) || 0) - 10 + 'px';
      break;
    case 'd':
      tiro.style.left = (parseInt(tiro.style.left) || 0) + 10 + 'px';
      break;
  }

 
});

//DETECÇÃO TIRO -- FIM

//GANHAR VIDA -- INÍCIO
function updateVidaCount() {
  vidaCountElement.textContent = vidaCount;
}

function addVida() {
  vidaCount++;
  updateVidaCount();
}



document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    addVida();
  }


});
//GANHAR VIDA -- FIM

//PULAR -- INICIO
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      if (!isJumping) {
        jump();
      }
      break;
    case 'a':
      if (isJumping) {
        posicaoHorizontal -= step; // Mover para a esquerda durante o pulo
        updatePersonagemPosition();
      }
      break;
    case 'd':
      if (isJumping) {
        posicaoHorizontal += step; // Mover para a direita durante o pulo
        updatePersonagemPosition();
      }
      break;
    case ' ':
      atirar();
      break;
    case 'shiftKey':
        addVida();
  }
});

function jump() {
  personagem.classList.add('jump-animation');
  isJumping = true;

  const jumpInterval = setInterval(() => {
    if (!isJumping) {
      clearInterval(jumpInterval);
      return;
    }

    // Lógica para permitir movimento horizontal mais rápido durante o pulo
    if (posicaoHorizontal < 0) {
      posicaoHorizontal += 10; // Aumente o valor para um movimento mais rápido à direita
    } else if (posicaoHorizontal > 0) {
      posicaoHorizontal -= 10; // Aumente o valor para um movimento mais rápido à esquerda
    }
    updatePersonagemPosition();

    posicaoVertical -= 10; // Movimento vertical
    updatePersonagemPosition();

    if (posicaoVertical <= 0) {
      isJumping = false;
      clearInterval(jumpInterval);
      setTimeout(() => {
        personagem.classList.remove('jump-animation');
      }, 500);
    }
  }, 10);
}



//PULAR -- FIM


//REMOVE BALA -- INÍCIO

function removeBala(){
document.getElementById("tiro").remove();
}

//REMOVE BALA -- FIM


