const detalheSection = document.getElementById("detalhe-imovel");
const naoEncontradoSection = document.getElementById("imovel-nao-encontrado");
const metaDescription = document.getElementById("meta-description");

const idParam = new URLSearchParams(window.location.search).get("id");
const idImovel = idParam === null ? NaN : Number(idParam);
const imovelSelecionado = Number.isInteger(idImovel)
    ? imoveis.find((imovel) => imovel.id === idImovel)
    : null;

function caminhoDoAsset(caminho) {
    return caminho.startsWith("../") ? caminho : `../${caminho}`;
}

function criarPlaceholderImagem(imovel) {
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

    return placeholder;
}

function configurarImagemPrincipal(imovel, caminho, indice = 0) {
    const imagem = document.getElementById("detalhe-imagem");
    const placeholderAnterior = document.querySelector(
        ".detalhe-imagem-principal .imovel-imagem-placeholder"
    );

    if (placeholderAnterior) {
        placeholderAnterior.remove();
    }

    imagem.hidden = false;
    imagem.src = caminhoDoAsset(caminho);
    imagem.alt =
        `${imovel.nome}${imovel.regiao ? ` em ${imovel.regiao}` : ""} - ` +
        `imagem ${indice + 1}`;
    imagem.onerror = () => {
        imagem.hidden = true;
        imagem.parentElement.appendChild(criarPlaceholderImagem(imovel));
    };
}

function criarItemDado(rotulo, valor) {
    if (!valor) {
        return;
    }

    const item = document.createElement("div");
    const titulo = document.createElement("dt");
    const conteudo = document.createElement("dd");

    titulo.textContent = rotulo;
    conteudo.textContent = valor;

    item.append(titulo, conteudo);
    document.getElementById("detalhe-dados").appendChild(item);
}

function criarDescricao(imovel) {
    const paragrafos = [];

    if (imovel.nome && imovel.regiao) {
        paragrafos.push(
            `Conheça ${imovel.nome}, empreendimento na região de ${imovel.regiao}, no Distrito Federal.`
        );
    }

    const informacoes = [
        imovel.quartosTexto,
        imovel.area ? `áreas de ${imovel.area}` : "",
        imovel.vagas
    ].filter(Boolean);

    if (informacoes.length) {
        paragrafos.push(`As informações cadastradas incluem ${informacoes.join(", ")}.`);
    }

    if (imovel.destaque) {
        paragrafos.push(`${imovel.destaque}.`);
    }

    return paragrafos.join(" ");
}

function configurarGaleria(imovel) {
    const imagens = [
        imovel.imagem,
        ...(Array.isArray(imovel.galeria) ? imovel.galeria : [])
    ].filter((imagem, indice, lista) => imagem && lista.indexOf(imagem) === indice);

    if (!imagens.length) {
        document.getElementById("detalhe-galeria").hidden = true;
        return;
    }

    configurarImagemPrincipal(imovel, imagens[0]);

    if (imagens.length === 1) {
        return;
    }

    const miniaturas = document.getElementById("detalhe-miniaturas");
    miniaturas.hidden = false;

    imagens.forEach((caminho, indice) => {
        const botao = document.createElement("button");
        const imagem = document.createElement("img");

        botao.type = "button";
        botao.className = "detalhe-miniatura";
        botao.classList.toggle("is-active", indice === 0);
        botao.setAttribute("aria-label", `Ver imagem ${indice + 1} de ${imovel.nome}`);

        imagem.src = caminhoDoAsset(caminho);
        imagem.alt = "";
        botao.appendChild(imagem);

        botao.addEventListener("click", () => {
            configurarImagemPrincipal(imovel, caminho, indice);
            miniaturas.querySelectorAll(".detalhe-miniatura").forEach((item) => {
                item.classList.toggle("is-active", item === botao);
            });
        });

        miniaturas.appendChild(botao);
    });
}

function mostrarImovel(imovel) {
    document.getElementById("detalhe-nome").textContent = imovel.nome;

    const regiao = document.getElementById("detalhe-regiao");
    regiao.textContent = imovel.regiao ? `${imovel.regiao} • Brasília/DF` : "";
    regiao.hidden = !imovel.regiao;

    const status = document.getElementById("detalhe-status");
    status.textContent = imovel.status || "";
    status.hidden = !imovel.status;

    criarItemDado("Quartos", imovel.quartosTexto);
    criarItemDado("Metragem", imovel.area);
    criarItemDado("Vagas", imovel.vagas);
    criarItemDado("Situação", imovel.status);

    const destaqueBox = document.getElementById("detalhe-destaque-box");
    const destaque = document.getElementById("detalhe-destaque");
    destaque.textContent = imovel.destaque || "";
    destaqueBox.hidden = !imovel.destaque;

    const descricao = criarDescricao(imovel);
    document.getElementById("detalhe-descricao").textContent = descricao;
    document.getElementById("detalhe-descricao-box").hidden = !descricao;

    configurarGaleria(imovel);

    const mensagemWhatsApp =
        `Olá, Gabriel! Vi o ${imovel.nome} no seu site e gostaria de consultar disponibilidade e informações.`;

    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
        link.dataset.whatsappMessage = mensagemWhatsApp;
    });

    document.title = imovel.regiao
        ? `${imovel.nome} em ${imovel.regiao} | Gabriel Antunes`
        : `${imovel.nome} | Gabriel Antunes`;
    metaDescription.content = imovel.regiao
        ? `${imovel.nome} em ${imovel.regiao}, Brasília/DF. ` +
            "Consulte disponibilidade e informações com Gabriel Antunes."
        : `${imovel.nome}. Consulte disponibilidade e informações com Gabriel Antunes.`;

    detalheSection.hidden = false;
}

function mostrarImovelNaoEncontrado() {
    document.title = "Imóvel não encontrado | Gabriel Antunes";
    metaDescription.content =
        "Consulte os imóveis selecionados por Gabriel Antunes em Brasília e no Distrito Federal.";
    naoEncontradoSection.hidden = false;
}

if (imovelSelecionado) {
    mostrarImovel(imovelSelecionado);
} else {
    mostrarImovelNaoEncontrado();
}
