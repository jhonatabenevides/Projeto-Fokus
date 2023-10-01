const html = document.querySelector("[data-contexto]");

const botaoFc = document.querySelector(".app__card-button--foco");
const botaoDc = document.querySelector(".app__card-button--curto");
const botaoDl = document.querySelector(".app__card-button--longo");

const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const appCardButton = document.querySelectorAll(".app__card-button");
const botaoStartPause = document.querySelector("#start-pause");
const comecaOuPausar = document.querySelector("#start-pause span")
const botaoPlay = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.getElementById("timer");


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const inputMusica = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const iniciarTempo = new Audio("/sons/play.wav");
const pausarTempo = new Audio("/sons/pause.mp3");
const finalizarTempo = new Audio("/sons/beep.mp3");

musica.loop = true;
inputMusica.addEventListener("change", ()=> {
  if (musica.paused) {
    musica.play()
  } else {
      musica.pause()
  }
})

botaoFc.addEventListener("click", ()=> {
  tempoDecorridoEmSegundos = 1500;
  alteraContexto("foco");
  botaoFc.classList.add("active");
});
botaoDc.addEventListener("click", ()=> {
  tempoDecorridoEmSegundos = 300;
  alteraContexto("descanso-curto");
  botaoDc.classList.add("active")
});
botaoDl.addEventListener("click", ()=> {
  tempoDecorridoEmSegundos = 900;
  alteraContexto("descanso-longo");
  botaoDl.classList.add("active")
});

function alteraContexto(contexto) {
  mostrarTempo()
  appCardButton.forEach((contexto)=> {
    contexto.classList.remove("active")
  })

  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa</strong>`
      break;

      case "descanso-curto":
        titulo.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;

        case "descanso-longo":
          titulo.innerHTML = `Hora de voltar à superfície.<br>
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    default:
      break;
  }
}

const contagemRegressiva = ()=> {
  if (tempoDecorridoEmSegundos <= 0) {
      finalizarTempo.play()
      alert("Tempo Finalizado!")
      zerar()    
      return;
  }
  tempoDecorridoEmSegundos -=1;
  mostrarTempo()
}

botaoStartPause.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
  if (intervaloId) {
      pausarTempo.play()
      zerar()
      return; 
  }
  iniciarTempo.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  comecaOuPausar.textContent = "Pausar"
  botaoPlay.setAttribute("src", `/imagens/pause.png`)

}
function zerar() {
  clearInterval(intervaloId)
  intervaloId = null;
  comecaOuPausar.textContent = "Iniciar"
  botaoPlay.setAttribute("src", `/imagens/play_arrow.png`)
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = tempoFormatado;
}
mostrarTempo()