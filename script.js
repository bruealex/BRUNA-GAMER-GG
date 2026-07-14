const API_KEY_YT = "AIzaSyBbKchO-lmKebYMF6AE23PQEGDCn8LgDak"; // <- NÃO ESQUECE DE COLAR SUA CHAVE AQUI
const CHANNEL_ID = "UCJfZ8_3Ir0ExpXaEKk24qQw"; // <- ID DO SEU CANAL

async function carregarDadosYT() {
  try {
    // 1. Pega o ÚLTIMO VÍDEO
    const urlVideos = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`;
    const resVideos = await fetch(urlVideos);
    const dataVideos = await resVideos.json();

    if(dataVideos.items && dataVideos.items.length > 0){
      const videoId = dataVideos.items[0].id.videoId;
      document.getElementById("video").innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    // 2. Pega INSCRITOS
    const urlCanal = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY_YT}&id=${CHANNEL_ID}&part=statistics`;
    const resCanal = await fetch(urlCanal);
    const dataCanal = await resCanal.json();
    const inscritos = parseInt(dataCanal.items[0].statistics.subscriberCount).toLocaleString('pt-BR');
    document.getElementById("contInscritos").innerText = inscritos;

  } catch (error) {
    console.log("Erro ao carregar dados do YT:", error);
  }
}

carregarDadosYT();

// FUNÇÃO PRA COPIAR CÓDIGO DAS ILHAS
function copiarCodigo(codigo) {
  navigator.clipboard.writeText(codigo);
  alert("CÓDIGO COPIADO: " + codigo + " 💖");
}

// FUNÇÃO PRA COPIAR TAG
function copiarTag() {
  navigator.clipboard.writeText("BRUNAGAMER");
  alert("TAG BRUNAGAMER COPIADA! 💖");
}

// PUXAR LOJA DO FORTNITE EM TEMPO REAL
async function carregarLojaFortnite() {
  try {
    // API pública gratuita
    const res = await fetch('https://fortnite-api.com/v2/shop/br');
    const data = await res.json();
    const container = document.getElementById("itens-loja");
    container.innerHTML = ""; // limpa o "carregando"

    // Pega só os itens em destaque + diários
    const itens = [...data.data.featured.entries, ...data.data.daily.entries];

    itens.forEach(item => {
      const card = `
        <div class="card-loja">
          <img src="${item.items[0].images.icon}" alt="${item.items[0].name}">
          <h3>${item.items[0].name}</h3>
          <p class="raridade ${item.items[0].rarity.value}">${item.items[0].rarity.displayValue}</p>
          <p class="preco">💰 ${item.finalPrice} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    console.log("Erro ao carregar loja:", error);
    document.getElementById("itens-loja").innerHTML = "<p>Erro ao carregar loja 😢</p>";
  }
}

carregarLojaFortnite();
