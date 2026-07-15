const API_KEY_YT = "AIzaSyBbKchO-lmKebYMF6AE23PQEGDCn8LgDak";
const CHANNEL_ID = "UCJfZ8_3Ir0ExpXaEKk24qQw";
const API_KEY_FORT = "a549184f-2a7a-43f3-bad2-d19ca68a7f85";
const API_URL = "https://dash.fortnite-api.com/v2/shop"; // MUDOU AQUI

// 1. YOUTUBE
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
  const res = await fetch('https://fortnite-api.com/v2/shop');
  const shop = await res.json();
console.log(shop.data);  // Today's shop items

// 2. COPIAR TAG
function copiarTag() {
  navigator.clipboard.writeText("BRUNAGAMER");
  alert("TAG BRUNAGAMER COPIADA! 💖");
}

// 3. LOJA FORTNITE TEMPO REAL 21H
async function carregarLojaFortnite() {
  const container = document.getElementById("itens-loja");
  if(!container) return;

  container.innerHTML = "<p>Carregando loja...</p>";

  try {
    const resposta = await fetch(`${API_URL}/shop?lang=pt-BR`, {
      headers: { 'Authorization': API_KEY_FORT }
    });
    const dados = await resposta.json();

    container.innerHTML = "";
    dados.shop.forEach(item => { // fortniteapi.io usa dados.shop
      const card = `
        <div class="card-loja ${item.rarity.name}">
          <img src="${item.displayAssets[0].background}" alt="${item.displayName}">
          <h3>${item.displayName}</h3>
          <p class="raridade">${item.rarity.name}</p>
          <p class="preco">💰 ${item.price.finalPrice} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

    document.getElementById("timer-loja").innerText = `Próxima atualização: Hoje às 21:00 BRT`;

  } catch(erro) {
    console.log("Erro loja:", erro);
    container.innerHTML = "<p>Erro ao carregar. Recarrega a página.</p>";
  }
}

// 4. TODOS OS COSMÉTICOS DA API
let todosCosmeticos = [];
async function carregarTodosCosmeticos() {
  const container = document.getElementById("grid-cosmeticos");
  if(!container) return;

  try {
    const resposta = await fetch(`${API_URL}/cosmetics/br?lang=pt-BR`, {
      headers: { 'Authorization': API_KEY_FORT }
    });
    const dados = await resposta.json();
    todosCosmeticos = dados.items;
    mostrarCosmeticos(todosCosmeticos);

  } catch(erro) {
    console.log("Erro cosmeticos:", erro);
  }
}

function mostrarCosmeticos(lista) {
  const container = document.getElementById("grid-cosmeticos");
  container.innerHTML = "";
  lista.slice(0, 60).forEach(item => {
    const card = `
      <div class="card-loja ${item.rarity}">
        <img src="${item.images.icon}" alt="${item.name}">
        <p class="raridade">${item.type}</p>
        <h3>${item.name}</h3>
        <p class="raridade">${item.rarity}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

function filtrarCosmeticos() {
  const busca = document.getElementById("buscaCosmetico").value.toLowerCase();
  const container = document.getElementById("grid-cosmeticos");
  const filtrados = todosCosmeticos.filter(item => item.name.toLowerCase().includes(busca));

  if(filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum cosmético encontrado 😢</p>";
    return;
  }
  mostrarCosmeticos(filtrados);
}

// CARREGA TUDO
window.addEventListener('load', () => {
  carregarDadosYT();
  carregarLojaFortnite();
  carregarTodosCosmeticos();

  // ATUALIZA LOJA A CADA 5 MIN
  setInterval(carregarLojaFortnite, 300000);
});
