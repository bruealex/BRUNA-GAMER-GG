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

function copiarTag() { navigator.clipboard.writeText("BRUNAGAMER"); alert("TAG BRUNAGAMER COPIADA! 💖"); }

// LOJA FORTNITE - VERSÃO QUE NUNCA DÁ ERRO
const lojaFixa = [
  {name: "Capa do Caos", rarity: "Lendário", price: 2000, img: "https://media.fortniteapi.io/images/featured/2024/01/01/abc123.png"},
  {name: "Picareta Estelar", rarity: "Épico", price: 800, img: "https://media.fortniteapi.io/images/featured/2024/01/01/def456.png"},
  {name: "Mochila Rosa", rarity: "Raro", price: 500, img: "https://media.fortniteapi.io/images/featured/2024/01/01/ghi789.png"},
  {name: "Skin Fada Neon", rarity: "Épico", price: 1200, img: "https://media.fortniteapi.io/images/featured/2024/01/01/jkl012.png"},
  {name: "Dança Floss", rarity: "Incomum", price: 200, img: "https://media.fortniteapi.io/images/featured/2024/01/01/mno345.png"},
  {name: "Planador Nuvem", rarity: "Raro", price: 500, img: "https://media.fortniteapi.io/images/featured/2024/01/01/pqr678.png"},
  {name: "Gesto Coração", rarity: "Comum", price: 200, img: "https://media.fortniteapi.io/images/featured/2024/01/01/stu901.png"},
  {name: "Skin Cavaleira", rarity: "Lendário", price: 2000, img: "https://media.fortniteapi.io/images/featured/2024/01/01/vwx234.png"}
];

function carregarLojaFortnite() {
  const container = document.getElementById("itens-loja");
  if(!container) return;

  container.innerHTML = "";

  lojaFixa.forEach(item => {
    const card = `
      <div class="card-loja ${item.rarity}">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p class="raridade">${item.rarity}</p>
        <p class="preco">💰 ${item.price} V-Bucks</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

window.addEventListener('load', carregarLojaFortnite);
