const API_KEY_YT = "AIzaSyBbKchO-lmKebYMF6AE23PQEGDCn8LgDak";
const CHANNEL_ID = "UCJfZ8_3Ir0ExpXaEKk24qQw";
const API_KEY_FORT = "e90b3fda0fa58e5e071b2d8a516d9469684d6b4c1d26243f41bb02781f740319"; // PEGA EM https://fortniteapi.io
const API_URL = "https://fortniteapi.io/v2";

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

// 2. COPIAR TAG
function copiarTag() {
  navigator.clipboard.writeText("BRUNAGAMER");
  alert("TAG BRUNAGAMER COPIADA! 💖");
}

// 3. LOJA FORTNITE TEMPO REAL 21H
async function carregarLojaFortnite() {
  const container = document.getElementById("itens-loja"); // SEU ID É ESSE
  if(!container) return;

  container.innerHTML = "<p>Carregando loja...</p>";

  try {
    const resposta = await fetch(`${API_URL}/shop?lang=pt-BR`, {
      headers: { 'Authorization': API_KEY_FORT }
    });
    const dados = await resposta.json();

    container.innerHTML = "";
    dados.shop.forEach(item => { // MUDOU: é dados.shop não dados.items
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

    // TIMER 21H
    const proxUpdate = new Date();
    proxUpdate.setHours(21, 0, 0, 0);
    if(proxUpdate < new Date()) proxUpdate.setDate(proxUpdate.getDate() + 1);
    document.getElementById("timer-loja").innerText = `Próxima atualização: Hoje às 21:00 BRT`;

  } catch(erro) {
    console.log("Erro loja:", erro);
    container.innerHTML = "<p>Erro ao carregar. Verifica a Key.</p>";
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
  lista.slice(0, 60).forEach(item => { // 60 pra não travar
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

// 5. MISSÕES STM
async function carregarMissoesSTM() {
  const container = document.getElementById("grid-missoes");
  if(!container) return;

  container.innerHTML = "<p>Carregando missões...</p>";
  try {
    const resposta = await fetch(`${API_URL}/stw/missions?lang=pt-BR`, {
      headers: { 'Authorization': API_KEY_FORT }
    });
    const dados = await resposta.json();
    container.innerHTML = "";
    dados.alerts.forEach(missao => {
      const card = `
        <div class="card-missao">
          <h3>${missao.name}</h3>
          <p><b>Tipo:</b> ${missao.missionType}</p>
          <p><b>Recompensa:</b> ${missao.rewardItem.name}</p>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch(erro) { console.log("Erro missões:", erro); }
}

// 6. ILHAS MANUAL
function carregarIlhas() {
  const container = document.getElementById("grid-ilhas");
  if(!container) return;
  const minhasIlhas = [
    {nome: "NITRO RAMP 1V1", codigo: "7154-6149-1460", descricao: "Treino de Ramp", img: "https://placehold.co/300x160/8A2BE2/FFFFFF"}
  ];
  container.innerHTML = "";
  minhasIlhas.forEach(ilha => {
    const card = `<div class="card-ilha"><img src="${ilha.img}"><h3>${ilha.nome}</h3><p>${ilha.descricao}</p><div class="codigo-ilha" onclick="navigator.clipboard.writeText('${ilha.codigo}')">CÓDIGO: ${ilha.codigo} 📋</div></div>`;
    container.innerHTML += card;
  });
}

// CARREGA TUDO 1 VEZ SÓ
window.addEventListener('load', () => {
  carregarDadosYT();
  carregarLojaFortnite();
  carregarTodosCosmeticos();
  carregarMissoesSTM();
  carregarIlhas();

  // ATUALIZA LOJA E STM A CADA 5 MIN
  setInterval(carregarLojaFortnite, 300000);
  setInterval(carregarMissoesSTM, 300000);
});
