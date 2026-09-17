const form = document.getElementById("formProduto");
const inputProduto = document.getElementById("produto");

inputProduto.addEventListener("input", () => {
    inputProduto.value = inputProduto.value.replace(/[0-9]/g, "");
});

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const produto = document.getElementById("produto").value;
    const quant = document.getElementById("quant").value;
    const preco = document.getElementById("preco").value;

    const total = Number(quant) * Number(preco);

    const resposta = await fetch("/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: produto,
            quantidade: quant,
            preco: preco,
            total: total
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

        item.className = "produto-item";

        item.innerHTML = `
            <span>${produto.nome} - ${produto.quantidade}un. x R$ ${produto.preco} = R$ ${produto.total}</span>
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

