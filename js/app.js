// ======================================
// ELEMENTOS DOS IMÓVEIS
// ======================================

const listaImoveis = document.getElementById("lista-imoveis");

const filtroRegiao = document.getElementById("filtro-regiao");
const filtroQuartos = document.getElementById("filtro-quartos");
const filtroStatus = document.getElementById("filtro-status");

const btnBuscar = document.getElementById("btn-buscar");

const nenhumImovel = document.getElementById("nenhum-imovel");


// ======================================
// CRIAR CARDS
// ======================================

function mostrarImoveis(lista) {

    listaImoveis.innerHTML = "";

    if (lista.length === 0) {

        nenhumImovel.style.display = "block";

        return;
    }

    nenhumImovel.style.display = "none";


    lista.forEach((imovel) => {

        const card = document.createElement("article");

        card.classList.add("imovel-card");


        card.innerHTML = `

            <div class="imovel-imagem">

    <img
        src="${imovel.imagem}"
        alt="${imovel.nome} - ${imovel.regiao}"
    >

    <span class="imovel-status">
        ${imovel.status}
    </span>

</div>


            <div class="imovel-conteudo">

                <span class="imovel-regiao">
                    ${imovel.regiao} • Brasília/DF
                </span>

                <h3>
                    ${imovel.nome}
                </h3>

                <p class="imovel-destaque">
                    ${imovel.destaque}
                </p>


                <div class="imovel-dados">

                    <span>
                        <small>Quartos</small>
                        <strong>${imovel.quartosTexto}</strong>
                    </span>

                    <span>
                        <small>Área</small>
                        <strong>${imovel.area}</strong>
                    </span>

                    <span>
                        <small>Vagas</small>
                        <strong>${imovel.vagas}</strong>
                    </span>

                </div>


                <div class="imovel-footer">

                    <div>

                        <small>
                            Valores e unidades
                        </small>

                        <strong>
                            Sob consulta
                        </strong>

                    </div>


                    <a class="btn-detalhes" href="pages/imovel.html?id=${imovel.id}">
                        Ver detalhes
                    </a>

                </div>

            </div>

        `;

        const imagem = card.querySelector(".imovel-imagem img");

        imagem.addEventListener("error", () => {
            const placeholder = document.createElement("div");

            placeholder.className = "imovel-imagem-placeholder";
            placeholder.setAttribute("role", "img");
            placeholder.setAttribute(
                "aria-label",
                `Imagem indisponível de ${imovel.nome}`
            );
            placeholder.innerHTML = `
                <span>Gabriel Antunes</span>
                <strong>Imagem em breve</strong>
            `;

            imagem.replaceWith(placeholder);
        }, { once: true });


        listaImoveis.appendChild(card);

    });

}


// ======================================
// FILTRAR IMÓVEIS
// ======================================

function filtrarImoveis() {

    const regiaoSelecionada = filtroRegiao.value;

    const quartosSelecionados = filtroQuartos.value;

    const statusSelecionado = filtroStatus.value;


    const resultado = imoveis.filter((imovel) => {

        const correspondeRegiao =
            regiaoSelecionada === "todos" ||
            imovel.regiao === regiaoSelecionada;


        const correspondeQuartos =
            quartosSelecionados === "todos" ||
            imovel.quartos.includes(Number(quartosSelecionados));


        const correspondeStatus =
            statusSelecionado === "todos" ||
            imovel.status === statusSelecionado;


        return (
            correspondeRegiao &&
            correspondeQuartos &&
            correspondeStatus
        );

    });


    mostrarImoveis(resultado);

}


// ======================================
// EVENTO DO BOTÃO
// ======================================

btnBuscar.addEventListener("click", filtrarImoveis);


// ======================================
// ATALHOS POR REGIÃO
// ======================================

document.querySelectorAll("[data-regiao]").forEach((cardRegiao) => {
    cardRegiao.addEventListener("click", () => {
        filtroRegiao.value = cardRegiao.dataset.regiao;
        filtroQuartos.value = "todos";
        filtroStatus.value = "todos";

        filtrarImoveis();
    });
});


// ======================================
// MOSTRAR TODOS AO ABRIR A PÁGINA
// ======================================

mostrarImoveis(imoveis);
