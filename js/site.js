// ======================================
// MENU RESPONSIVO
// ======================================

const siteMenuButton = document.getElementById("menu-mobile");
const siteNav = document.getElementById("nav");

function definirEstadoMenu(aberto) {
    if (!siteMenuButton || !siteNav) {
        return;
    }

    siteNav.classList.toggle("nav-active", aberto);
    siteMenuButton.classList.toggle("is-active", aberto);
    siteMenuButton.setAttribute("aria-expanded", String(aberto));
    siteMenuButton.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", aberto);
}

if (siteMenuButton && siteNav) {
    siteMenuButton.addEventListener("click", () => {
        definirEstadoMenu(!siteNav.classList.contains("nav-active"));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
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
}


// ======================================
// WHATSAPP
// ======================================

const siteWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    const mensagem =
        link.dataset.whatsappMessage || SITE_CONFIG.defaultWhatsappMessage;

    if (siteWhatsappNumber) {
        link.href =
            `https://wa.me/${siteWhatsappNumber}?text=${encodeURIComponent(mensagem)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.removeAttribute("aria-disabled");

        return;
    }

    link.setAttribute("aria-disabled", "true");
    link.title = "Número de WhatsApp ainda não configurado";
});


// ======================================
// RODAPÉ
// ======================================

const siteCurrentYear = document.getElementById("ano-atual");

if (siteCurrentYear) {
    siteCurrentYear.textContent = new Date().getFullYear();
}
