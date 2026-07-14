const API_KEY_YT = "AIzaSyBbKchO-lmKebYMF6AE23PQEGDCn8LgDak";
const CHANNEL_ID = "UCJfZ8_3Ir0ExpXaEKk24qQw";

async function carregarDadosYT() {
  try {
    const urlVideos = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`;
    const resVideos = await fetch(urlVideos);
    const dataVideos = await resVideos.json();
    if(dataVideos.items && dataVideos.items.length > 0){
      const videoId = dataVideos.items[0].id.videoId;
      document.getElementById("video").innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    const urlCanal = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY_YT}&id=${CHANNEL_ID}&part=statistics`;
    const resCanal = await fetch(urlCanal);
    const dataCanal = await resCanal.json();
    const inscritos = parseInt(dataCanal.items[0].statistics.subscriberCount).toLocaleString('pt-BR');
    document.getElementById("contInscritos").innerText = inscritos;
  } catch (error) { console.log("Erro YT:", error); }
}
carregarDadosYT();

function copiarCodigo(codigo) { navigator.clipboard.writeText(codigo); alert("CÓDIGO COPIADO: " + codigo + " 💖"); }
function copiarTag() { navigator.clipboard.writeText("BRUNAGAMER"); alert("TAG BRUNAGAMER COPIADA! 💖"); }

// LOJA FORTNITE COM PROXY
async function carregarLojaFortnite() {
  const container = document.getElementById("itens-loja");
  if(!container) return;

  try {
    const res = await fetch('https://api.allorigins.win/raw?url=https://fnbr.co/api/shop');
    const data = await res.json();
    container.innerHTML = "";

    data.data.slice(0, 12).forEach(item => {
      const card = `
        <div class="card-loja ${item.rarity}">
          <img src="${item.images.icon}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p class="raridade">${item.rarity}</p>
          <p class="preco">💰 ${item.price} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (error) {
    console.log("Erro loja:", error);
    container.innerHTML = "<p>Erro ao carregar loja 😢 Recarrega a página</p>";
  }
}

window.addEventListener('load', carregarLojaFortnite);
