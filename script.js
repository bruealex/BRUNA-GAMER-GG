<script src="script.js"></script>

async function carregarLoja() {
    try {
        const resposta = await fetch("https://fortnite-api.com/v2/shop/br");

        const dados = await resposta.json();

        console.log(dados);

    } catch (erro) {
        console.log("Erro ao carregar a loja:", erro);
    }
}

carregarLoja();
