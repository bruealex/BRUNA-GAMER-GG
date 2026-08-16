const API_URL = "https://fortnite-api.com/v2/shop/br?language=pt-BR";
const API_COSMETICS = "https://fortnite-api.com/v2/cosmetics/br";

// CARREGAR LOJA EM TEMPO REAL
async function carregarLoja() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const grid = document.getElementById('grid-loja');
  grid.innerHTML = "";

  data.data.entries.forEach(item => {
    const card = `
      <div class="card-item">
        <button class="btn-favorito" onclick="toggleFavorito(this, '${item.items[0].id}')">⭐</button>
        <img src="${item.items[0].images.icon}" alt="${item.items[0].name}">
        <h3>${item.items[0].name}</h3>
        <p class="preco">${item.finalPrice} V-Bucks</p>
      </div>
    `;
    grid.innerHTML += card;
  });
}

// CARREGAR SKINS, EMOTES, PICARETAS
async function carregarCosmeticos() {
  const res = await fetch(API_COSMETICS);
  const data = await res.json();
  
  const skins = data.data.filter(i => i.type.value === 'outfit').slice(0,20);
  const emotes = data.data.filter(i => i.type.value === 'emote').slice(0,20);
  const picaretas = data.data.filter(i => i.type.value === 'pickaxe').slice(0,20);

  preencherGrid('grid-skins', skins);
  preencherGrid('grid-emotes', emotes);
  preencherGrid('grid-picaretas', picaretas);
}

function preencherGrid(id, itens) {
  const grid = document.getElementById(id);
  grid.innerHTML = "";
  itens.forEach(item => {
    grid.innerHTML += `
      <div class="card-item">
        <button class="btn-favorito" onclick="toggleFavorito(this, '${item.id}')">⭐</button>
        <img src="${item.images.icon}" alt="${item.name}">
        <h3>${item.name}</h3>
      </div>
    `;
  });
}

// SISTEMA DE FAVORITOS
function toggleFavorito(btn, id) {
  let favs = JSON.parse(localStorage.getItem('fav_brunagamer')) || [];
  if(favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.classList.remove('ativo');
  } else {
    favs.push(id);
    btn.classList.add('ativo');
  }
  localStorage.setItem('fav_brunagamer', JSON.stringify(favs));
}

// CURTIR ELEMENTAIS
function curtir(btn) {
  let span = btn.querySelector('span');
  span.innerText = parseInt(span.innerText) + 1;
}

// INICIAR
carregarLoja();
carregarCosmeticos();
