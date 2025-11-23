const cardContainer = document.querySelector(".card-container"); // Seleciona o elemento que vai conter os cards de conteúdo.
const buscaInput = document.querySelector("#busca-input"); // Seleciona o campo de input da busca.

let dados = []; // Inicializa um array vazio para armazenar os dados carregados do arquivo JSON.

// Função para carregar os dados do JSON e renderizar os cards iniciais
async function carregarDados() {
    try {
        const resposta = await fetch("data.json"); // Faz uma requisição para buscar o arquivo data.json.
        dados = await resposta.json(); // Converte a resposta em formato JSON e armazena na variável 'dados'.
        renderizarCards(dados); // Chama a função para renderizar todos os cards na tela inicialmente.
    } catch (error) {
        console.error("Erro ao carregar os dados:", error); // Exibe um erro no console se a requisição falhar.
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>"; // Exibe uma mensagem de erro na página.
    }
}

// Função que filtra os dados com base no termo de busca e chama a renderização.
function iniciarBusca() {
    const termoBusca = buscaInput.value.toLowerCase(); // Pega o valor do input, converte para minúsculas para uma busca case-insensitive.
    
    // Filtra o array 'dados' para encontrar itens que correspondam ao termo de busca.
    const resultadosFiltrados = dados.filter(dado => {
        const assunto = dado.assunto.toLowerCase(); // Converte o assunto do item para minúsculas.
        const descricao = dado.descrição.toLowerCase(); // Converte a descrição do item para minúsculas.
        return assunto.includes(termoBusca) || descricao.includes(termoBusca); // Retorna true se o termo de busca estiver no assunto ou na descrição.
    });

    renderizarCards(resultadosFiltrados); // Chama a função para renderizar apenas os cards filtrados.
}

// Adiciona um "ouvinte de evento" para a tecla pressionada no campo de busca.
buscaInput.addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada foi a "Enter".
    if (event.key === "Enter") {
        // Impede o comportamento padrão da tecla "Enter" (que poderia ser submeter um formulário).
        event.preventDefault();
        // Chama a função de busca.
        iniciarBusca();
    }
});

// Função para renderizar os cards na tela.
function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ''; // Limpa o conteúdo atual do container para evitar duplicatas.

    // Itera sobre cada item do array de cards que deve ser renderizado.
    for (const dado of cardsParaRenderizar) {
        const article = document.createElement("article"); // Cria um novo elemento <article>.
        article.classList.add("card"); // Adiciona a classe 'card' para estilização
        // Define o conteúdo HTML do card usando os dados do item atual.
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Imagem ilustrativa sobre ${dado.assunto}">
            <h2>${dado.assunto}</h2>
            <p>${dado.descrição}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article); // Adiciona o novo card ao container na página.
    }
}

// Chama a função para carregar os dados iniciais assim que o script é executado.
carregarDados();