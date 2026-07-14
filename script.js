const API_KEY_YT = "AIzaSyBbKchO-lmKebYMF6AE23PQEGDCn8LgDak";
const CHANNEL_ID = "UCJfZ8_3Ir0ExpXaEKk24qQw";

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

// 3. LOJA FORTNITE TEMPO REAL 21H - API SEM KEY
async function carregarLojaFortnite() {
  const container = document.getElementById("itens-loja");
  if(!container) return;

  container.innerHTML = "<p>Carregando loja...</p>";

  try {
    const res = await fetch('https://fortnite-api.com/v2/shop');
    const shop = await res.json();
    console.log(shop.data);

    container.innerHTML = "";

    // ITENS EM DESTAQUE
    shop.data.featured.entries.forEach(item => {
      const card = `
        <div class="card-loja ${item.items[0].rarity.name}">
          <img src="${item.items[0].images.icon}" alt="${item.items[0].name}">
          <h3>${item.items[0].name}</h3>
          <p class="raridade">${item.items[0].rarity.name}</p>
          <p class="preco">💰 ${item.finalPrice} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

    // ITENS DIÁRIOS
    shop.data.daily.entries.forEach(item => {
      const card = `
        <div class="card-loja ${item.items[0].rarity.name}">
          <img src="${item.items[0].images.icon}" alt="${item.items[0].name}">
          <h3>${item.items[0].name}</h3>
          <p class="raridade">${item.items[0].rarity.name}</p>
          <p class="preco">💰 ${item.finalPrice} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

    document.getElementById("timer-loja").innerText = `Próxima atualização: Hoje às 21:00 BRT`;

  } catch(erro) {
    console.log("Erro loja:", erro);
    container.innerHTML = "<p>Erro ao carregar loja.</p>";
  }
}

// 4. TODOS OS COSMÉTICOS DA API
let todosCosmeticos = [];
async function carregarTodosCosmeticos() {
  const container = document.getElementById("grid-cosmeticos");
  if(!container) return;

  try {
    const res = await fetch('https://fortnite-api.com/v2/cosmetics/br?language=pt-BR');
    const data = await res.json();
    todosCosmeticos = data.data;
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
      <div class="card-loja ${item.rarity.name}">
        <img src="${item.images.icon}" alt="${item.name}">
        <p class="raridade">${item.type.name}</p>
        <h3>${item.name}</h3>
        <p class="raridade">${item.rarity.name}</p>
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

// 5. ILHAS MANUAL
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

// CARREGA TUDO
window.addEventListener('load', () => {
  carregarDadosYT();
  carregarLojaFortnite();
  carregarTodosCosmeticos();
  carregarIlhas();

  // ATUALIZA LOJA A CADA 5 MIN
  setInterval(carregarLojaFortnite, 300000);
});
