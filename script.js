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

// LOJA FORTNITE DE HOJE - 04/10/2026
const lojaFixa = [
  {name: "Fada Aurora", rarity: "Épico", price: 1200, img: "https://media.fortniteapi.io/images/cosmetics/br/CID_891_Athena_Commando_Fairy/featured.png"},
  {name: "Capa Asas de Cristal", rarity: "Raro", price: 500, img: "https://media.fortniteapi.io/images/cosmetics/br/BID_452_Fairy/featured.png"},
  {name: "Picareta Varinha Mágica", rarity: "Raro", price: 800, img: "https://media.fortniteapi.io/images/cosmetics/br/PID_678_Fairy/featured.png"},
  {name: "Gesto Coração Neon", rarity: "Incomum", price: 200, img: "https://media.fortniteapi.io/images/cosmetics/br/EID_HeartHands/featured.png"},
  {name: "Skin Cavaleiro do Caos", rarity: "Lendário", price: 2000, img: "https://media.fortniteapi.io/images/cosmetics/br/CID_720_Athena_Commando_M_DarkKnight/featured.png"},
  {name: "Mochila Tesouro", rarity: "Raro", price: 500, img: "https://media.fortniteapi.io/images/cosmetics/br/BID_123_Treasure/featured.png"},
  {name: "Dança Floss", rarity: "Incomum", price: 200, img: "https://media.fortniteapi.io/images/cosmetics/br/EID_Floss/featured.png"},
  {name: "Planador Unicórnio", rarity: "Épico", price: 1200, img: "https://media.fortniteapi.io/images/cosmetics/br/GLD_456_Unicorn/featured.png"},
  {name: "Skin Ninja Rosa", rarity: "Raro", price: 1200, img: "https://media.fortniteapi.io/images/cosmetics/br/CID_567_Athena_Commando_F_Pink/featured.png"},
  {name: "Emote Dab", rarity: "Comum", price: 200, img: "https://media.fortniteapi.io/images/cosmetics/br/EID_Dab/featured.png"},
  {name: "Capa do Batman", rarity: "Épico", price: 800, img: "https://media.fortniteapi.io/images/cosmetics/br/BID_789_Batman/featured.png"},
  {name: "Picareta Machado", rarity: "Comum", price: 500, img: "https://media.fortniteapi.io/images/cosmetics/br/PID_111_Axe/featured.png"}
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
