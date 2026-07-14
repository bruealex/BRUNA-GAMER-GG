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

// TODOS OS COSMÉTICOS - LISTA FIXA
const todosCosmeticos = [
  {name: "Fada Aurora", rarity: "Épico", type: "Skin", img: "https://media.fortniteapi.io/images/cosmetics/br/CID_891_Athena_Commando_Fairy/featured.png"},
  {name: "Cavaleiro do Caos", rarity: "Lendário", type: "Skin", img: "https://media.fortniteapi.io/images/cosmetics/br/CID_720_Athena_Commando_M_DarkKnight/featured.png"},
  {name: "Ninja Rosa", rarity: "Raro", type: "Skin", img: "https://media.fortniteapi.io/images/cosmetics/br/CID_567_Athena_Commando_F_Pink/featured.png"},
  {name: "Floss", rarity: "Incomum", type: "Dança", img: "https://media.fortniteapi.io/images/cosmetics/br/EID_Floss/featured.png"},
  {name: "Dab", rarity: "Comum", type: "Dança", img: "https://media.fortniteapi.io/images/cosmetics/br/EID_Dab/featured.png"},
  {name: "Coração Neon", rarity: "Incomum", type: "Dança", img: "https://media.fortniteapi.io/images/cosmetics/br/EID_HeartHands/featured.png"},
  {name: "Varinha Mágica", rarity: "Raro", type: "Picareta", img: "https://media.fortniteapi.io/images/cosmetics/br/PID_678_Fairy/featured.png"},
  {name: "Machado", rarity: "Comum", type: "Picareta", img: "https://media.fortniteapi.io/images/cosmetics/br/PID_111_Axe/featured.png"},
  {name: "Asas de Cristal", rarity: "Raro", type: "Mochila", img: "https://media.fortniteapi.io/images/cosmetics/br/BID_452_Fairy/featured.png"},
  {name: "Planador Unicórnio", rarity: "Épico", type: "Planador", img: "https://media.fortniteapi.io/images/cosmetics/br/GLD_456_Unicorn/featured.png"},
  {name: "Skin Gato", rarity: "Épico", type: "Skin", img: "https://media.fortniteapi.io/images/cosmetics/br/CID_345_Athena_Commando_F_Cat/featured.png"},
  {name: "Capa do Batman", rarity: "Épico", type: "Mochila", img: "https://media.fortniteapi.io/images/cosmetics/br/BID_789_Batman/featured.png"}
];

function carregarTodosCosmeticos() {
  const container = document.getElementById("grid-cosmeticos");
  if(!container) return;

  container.innerHTML = "";
  todosCosmeticos.forEach(item => {
    const card = `
      <div class="card-loja ${item.rarity}">
        <img src="${item.img}" alt="${item.name}">
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
  container.innerHTML = "";

  const filtrados = todosCosmeticos.filter(item => 
    item.name.toLowerCase().includes(busca)
  );

  if(filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum cosmético encontrado 😢</p>";
    return;
  }

  filtrados.forEach(item => {
    const card = `
      <div class="card-loja ${item.rarity}">
        <img src="${item.img}" alt="${item.name}">
        <p class="raridade">${item.type}</p>
        <h3>${item.name}</h3>
        <p class="raridade">${item.rarity}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Chama quando a página carregar
window.addEventListener('load', () => {
  carregarLojaFortnite();
  carregarTodosCosmeticos();
});

const API_URL = "https://fortniteapi.io/v2"; // API que você mostrou na print

// 1. LOJA ATUALIZANDO 21H
async function carregarLojaFortnite() {
  const container = document.getElementById("grid-loja");
  if(!container) return;
  
  container.innerHTML = "<p>Carregando loja...</p>";

  try {
    const resposta = await fetch(`${API_URL}/shop?lang=pt-BR`);
    const dados = await resposta.json();
    
    container.innerHTML = "";
    dados.items.forEach(item => {
      const card = `
        <div class="card-loja ${item.rarity}">
          <div class="raridade">${item.rarity}</div>
          <img src="${item.images.icon}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p class="preco">${item.price} V-Bucks</p>
        </div>
      `;
      container.innerHTML += card;
    });

    // Mostra quando atualiza
    const proxUpdate = new Date();
    proxUpdate.setHours(21, 0, 0, 0);
    if(proxUpdate < new Date()) proxUpdate.setDate(proxUpdate.getDate() + 1);
    
    document.getElementById("timer-loja").innerText = `Próxima atualização: ${proxUpdate.toLocaleTimeString('pt-BR')}`;

  } catch(erro) {
    console.log("Erro loja:", erro);
  }
}

// 2. MISSÕES SALVE O MUNDO EM TEMPO REAL
async function carregarMissoesSTM() {
  const container = document.getElementById("grid-missoes");
  if(!container) return;
  
  container.innerHTML = "<p>Carregando missões...</p>";

  try {
    const resposta = await fetch(`${API_URL}/stwmissions?lang=pt-BR`);
    const dados = await resposta.json();
    
    container.innerHTML = "";
    dados.missions.forEach(missao => {
      const card = `
        <div class="card-missao">
          <h3>${missao.name}</h3>
          <p><b>Tipo:</b> ${missao.type}</p>
          <p><b>Recompensa:</b> ${missao.reward}</p>
          <p><b>Mapa:</b> ${missao.map}</p>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch(erro) {
    console.log("Erro missões:", erro);
  }
}

// 3. ILHAS
async function carregarIlhas() {
  const container = document.getElementById("grid-ilhas");
  if(!container) return;
  
  // Se a API de ilhas não funcionar, deixa manual aqui
  const minhasIlhas = [
    {nome: "NITRO RAMP 1V1", codigo: "7154-6149-1460", descricao: "Treino de Ramp", img: "https://placehold.co/300x160/8A2BE2/FFFFFF"}
  ];

  container.innerHTML = "";
  minhasIlhas.forEach(ilha => {
    const card = `
      <div class="card-ilha">
        <img src="${ilha.img}" alt="${ilha.nome}">
        <h3>${ilha.nome}</h3>
        <p>${ilha.descricao}</p>
        <div class="codigo-ilha" onclick="navigator.clipboard.writeText('${ilha.codigo}')">CÓDIGO: ${ilha.codigo} 📋</div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// ATUALIZA AUTOMÁTICO A CADA 5 MINUTOS
window.addEventListener('load', () => {
  carregarLojaFortnite();
  carregarMissoesSTM();
  carregarIlhas();
  carregarTodosCosmeticos();
  
  setInterval(carregarLojaFortnite, 300000); // 5 min
  setInterval(carregarMissoesSTM, 300000); // 5 min
});
