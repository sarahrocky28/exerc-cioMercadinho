const form = document.getElementById("formProduto");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const produto = document.getElementById("produto").value;
    const quant = document.getElementById("quant").value;
    const preco = document.getElementById("preco").value;

    const resposta = await fetch("/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: produto,
            quantidade: quant,
            preco: preco
        })
    });

    const item = await resposta.json();

    console.log(item);

    form.reset();

    carregarProdutos();
});

async function carregarProdutos() {

    const resposta = await fetch("/produtos");
    const produtos = await resposta.json();

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto) => {

        const item = document.createElement("p");

        item.innerHTML = `
            ${produto.nome} - ${produto.quantidade} un. - R$ ${produto.preco}
            <button onclick="excluirProduto(${produto.id})">
                Excluir
            </button>
        `;

        lista.appendChild(item);
    });
}

async function excluirProduto(id) {

    const resposta = await fetch(`/produtos/${id}`, {
        method: "DELETE"
    });

    const resultado = await resposta.json();

    console.log(resultado);

    carregarProdutos();
}

carregarProdutos();