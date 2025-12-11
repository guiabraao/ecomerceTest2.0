// utils/carrinho.js

// PEGAR O CARRINHO
export function getCarrinho() {
    const carrinho = localStorage.getItem("carrinho");
    return carrinho ? JSON.parse(carrinho) : [];
}

// SALVAR
export function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function dispatchCarrinhoUpdate() {
    window.dispatchEvent(new Event("carrinho_atualizado"));
}

// ADICIONAR PRODUTO
export function adicionarAoCarrinho(produto, tamanho = null, quantidade = 3) {
    const carrinho = getCarrinho();

    // Verifica se já existe o mesmo produto + mesmo tamanho
    const itemExistente = carrinho.find(
        item => item.id === produto.id && item.tamanho === tamanho
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            categoria: produto.categoria,
            tamanho: tamanho,
            quantidade: quantidade
        });
    }

    salvarCarrinho(carrinho);
    dispatchCarrinhoUpdate();
}

// REMOVER PRODUTO
export function removerDoCarrinho(id, tamanho = null) {
    let carrinho = getCarrinho();

    carrinho = carrinho.filter(
        item => !(item.id === id && item.tamanho === tamanho)
    );

    salvarCarrinho(carrinho);
    dispatchCarrinhoUpdate();
}

// ALTERAR QUANTIDADE
export function alterarQuantidade(id, tamanho, novaQtd) {
    const carrinho = getCarrinho();

    carrinho.forEach(item => {
        if (item.id === id && item.tamanho === tamanho) {
            if (novaQtd <= 0) {
                removerDoCarrinho(id, tamanho);
            } else {
                item.quantidade = novaQtd;
            }
        }
    });

    salvarCarrinho(carrinho);
    dispatchCarrinhoUpdate();
}

// CALCULAR TOTAL
export function totalCarrinho() {
    const carrinho = getCarrinho();
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}
