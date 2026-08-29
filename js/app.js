const menuButton = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");

function definirEstadoMenu(aberto) {
    nav.classList.toggle("nav-active", aberto);
    menuButton.classList.toggle("is-active", aberto);
    menuButton.setAttribute("aria-expanded", String(aberto));
    menuButton.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", aberto);
}

menuButton.addEventListener("click", () => {
    definirEstadoMenu(!nav.classList.contains("nav-active"));
});

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => definirEstadoMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        definirEstadoMenu(false);
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        definirEstadoMenu(false);
    }
});


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


                    <button class="btn-detalhes" type="button">
                        Ver detalhes
                    </button>

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
// WHATSAPP
// Preencha somente com números, incluindo DDI e DDD.
// Exemplo de formato: 55 + DDD + número.
// ======================================

const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE =
    "Olá, Gabriel. Gostaria de receber opções de imóveis compatíveis com meu perfil.";

const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const numeroWhatsApp = WHATSAPP_NUMBER.replace(/\D/g, "");

whatsappLinks.forEach((link) => {
    if (numeroWhatsApp) {
        link.href =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        return;
    }

    link.setAttribute("aria-disabled", "true");
    link.title = "Número de WhatsApp ainda não configurado";
});


// ======================================
// RODAPÉ
// ======================================

document.getElementById("ano-atual").textContent = new Date().getFullYear();


// ======================================
// MOSTRAR TODOS AO ABRIR A PÁGINA
// ======================================

mostrarImoveis(imoveis);
