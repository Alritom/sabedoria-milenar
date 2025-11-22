const cardContainer = document.querySelector(".card-container");
const buscaInput = document.querySelector("#busca-input");

let dados = [];

// Função para carregar os dados do JSON e renderizar os cards iniciais
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
    }
}

function iniciarBusca() {
    const termoBusca = buscaInput.value.toLowerCase();
    
    const resultadosFiltrados = dados.filter(dado => {
        const assunto = dado.assunto.toLowerCase();
        const descricao = dado.descrição.toLowerCase();
        return assunto.includes(termoBusca) || descricao.includes(termoBusca);
    });

    renderizarCards(resultadosFiltrados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    for (const dado of cardsParaRenderizar) {
        const article = document.createElement("article");
        article.classList.add("card"); // Adiciona a classe 'card' para estilização
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Imagem ilustrativa sobre ${dado.assunto}">
            <h2>${dado.assunto}</h2>
            <p>${dado.descrição}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Carrega os dados assim que o script é executado
carregarDados();
