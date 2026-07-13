async function carregarLoja() {
    try {
        const resposta = await fetch("https://fortnite-api.com/v2/shop/br");
        const dados = await resposta.json();

        const loja = document.getElementById("loja");
        loja.innerHTML = "";

        const itens = dados.data.entries.slice(0, 8);

        itens.forEach(item => {
            const nome = item.items[0].name;
            const imagem = item.items[0].images.icon;
            const preco = item.finalPrice;

            loja.innerHTML += `
                <div class="item-loja">
                    <img src="${imagem}" width="120">
                    <h4>${nome}</h4>
                    <p>${preco} V-Bucks</p>
                </div>
            `;
        });

    } catch (erro) {
        console.error(erro);
    }
}

carregarLoja();
