/* ==========================================================
   PORTFÓLIO PROFISSIONAL
   Desenvolvedor: Janser
   Arquivo: script.js
========================================================== */


/* NAVBAR AO ROLAR */

const navbar = document.querySelector(".navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(10, 10, 15, .90)";
        navbar.style.padding = "15px 30px";
        navbar.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, .5)";

    } else {

        navbar.style.background =
            "rgba(24, 24, 27, .55)";

        navbar.style.padding = "18px 30px";

        navbar.style.boxShadow =
            "0 10px 35px rgba(0, 0, 0, .45)";
    }
}

window.addEventListener("scroll", updateNavbar);


/* MENU MOBILE */

const mobileButton =
    document.querySelector(".menu-mobile");

const menu =
    document.querySelector(".menu");

if (mobileButton && menu) {

    mobileButton.addEventListener("click", (event) => {

        event.stopPropagation();

        menu.classList.toggle("active");

        const isOpen =
            menu.classList.contains("active");

        mobileButton.textContent =
            isOpen ? "✕" : "☰";
    });


    const menuLinks =
        menu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            mobileButton.textContent = "☰";

        });

    });


    document.addEventListener("click", (event) => {

        if (
            !menu.contains(event.target) &&
            !mobileButton.contains(event.target)
        ) {

            menu.classList.remove("active");

            mobileButton.textContent = "☰";
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            menu.classList.remove("active");

            mobileButton.textContent = "☰";

        }

    });

}


/* REVEAL DAS SEÇÕES */

const sections =
    document.querySelectorAll("section");

function revealSections() {

    const trigger =
        window.innerHeight * 0.85;

    sections.forEach(section => {

        const top =
            section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("show");

        }

    });

}

window.addEventListener(
    "scroll",
    revealSections
);

window.addEventListener(
    "load",
    revealSections
);


/* TYPING EFFECT - HERO */

const typingElement =
    document.querySelector(".hero h2");

const heroTexts = [

    "Full Stack Developer",

    "React • TypeScript • Node.js",

    "Construindo Aplicações Modernas",

    "Front-end • Back-end • Banco de Dados"

];

let heroTextIndex = 0;

let heroCharIndex = 0;

let heroDeleting = false;


function typeHero() {

    if (!typingElement) return;

    const currentText =
        heroTexts[heroTextIndex];


    if (!heroDeleting) {

        typingElement.textContent =
            currentText.substring(
                0,
                heroCharIndex
            );

        heroCharIndex++;


        if (
            heroCharIndex >
            currentText.length
        ) {

            heroDeleting = true;

            setTimeout(
                typeHero,
                1600
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(
                0,
                heroCharIndex
            );

        heroCharIndex--;


        if (heroCharIndex < 0) {

            heroDeleting = false;

            heroTextIndex++;


            if (
                heroTextIndex >=
                heroTexts.length
            ) {

                heroTextIndex = 0;

            }

        }

    }


    setTimeout(
        typeHero,
        heroDeleting ? 45 : 85
    );

}


if (typingElement) {

    typeHero();

}


/* BOTÃO VOLTAR AO TOPO */

const backToTop =
    document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.id = "backToTop";

backToTop.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

document.body.appendChild(
    backToTop
);


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* MENU ATIVO */

const navLinks =
    document.querySelectorAll(".menu a");


function updateActiveMenu() {

    let currentSection = "";


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        const sectionTop =
            rect.top;

        const sectionBottom =
            rect.bottom;


        if (
            sectionTop <= 180 &&
            sectionBottom > 180
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "current"
        );


        const target =
            link.getAttribute("href");


        if (
            target ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "current"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveMenu
);

window.addEventListener(
    "load",
    updateActiveMenu
);


/* ANIMAÇÃO DOS BOTÕES */

const buttons =
    document.querySelectorAll(
        ".btn-primary, .btn-secondary"
    );


buttons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-5px) scale(1.03)";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translateY(0) scale(1)";

        }
    );

});


/* FADE IN DA HERO */

window.addEventListener(
    "load",
    () => {

        const hero =
            document.querySelector(".hero");


        if (!hero) return;


        requestAnimationFrame(() => {

            hero.style.opacity = "1";

            hero.style.transform =
                "translateY(0)";

        });

    }
);


/* ANIMAÇÃO FLUTUANTE DA FOTO */

const profile =
    document.querySelector(
        ".profile-circle"
    );


if (profile) {

    let profileAngle = 0;


    setInterval(() => {

        profileAngle += 0.04;


        const movement =
            Math.sin(profileAngle) * 8;


        profile.style.transform =
            `translateY(${movement}px)`;

    }, 16);

}


/* COPIAR E-MAIL */

const copyButton =
    document.getElementById(
        "copyEmail"
    );


const emailElement =
    document.getElementById(
        "email"
    );


if (
    copyButton &&
    emailElement
) {

    copyButton.addEventListener(
        "click",
        async () => {

            const email =
                emailElement.textContent.trim();


            try {

                await navigator.clipboard.writeText(
                    email
                );


                copyButton.innerHTML =
                    "✔";


                copyButton.setAttribute(
                    "aria-label",
                    "E-mail copiado"
                );


                setTimeout(() => {

                    copyButton.innerHTML =
                        '<i class="fa-regular fa-copy"></i>';


                    copyButton.setAttribute(
                        "aria-label",
                        "Copiar e-mail"
                    );

                }, 2000);


            } catch (error) {

                console.error(
                    "Erro ao copiar e-mail:",
                    error
                );

            }

        }
    );

}


/* ==========================================================
   BORDA NEON DA CAIXA DE CÓDIGO
========================================================== */

const codeBoxes =
    document.querySelectorAll(
        ".code-box"
    );


codeBoxes.forEach(box => {

    box.addEventListener(
        "mousemove",
        event => {

            const rect =
                box.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const angle =
                Math.atan2(
                    y - centerY,
                    x - centerX
                ) *
                (180 / Math.PI) +
                90;


            box.style.setProperty(
                "--angle",
                `${angle}deg`
            );

        }
    );

});


/* ==========================================================
   TYPING EFFECT - SOBRE MIM
========================================================== */

const typingAbout =
    document.getElementById(
        "typing-about"
    );


const textAbout = `const desenvolvedor = {

    Formacao: "Cursando ADS",

    Stack: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma"
    ],

    Funcao: "Full Stack Developer",

    Diferencial:
        "Busco sempre codigo limpo e boas praticas",

    Objetivo:
        "Transformar minhas ideias em realidade"

};`;


/* HIGHLIGHT DO CÓDIGO */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


function highlightSyntax(code) {

    let highlighted =
        escapeHTML(code);


    highlighted =
        highlighted.replace(
            /\b(const)\b/g,
            '<span class="token-keyword">$1</span>'
        );


    highlighted =
        highlighted.replace(
            /"([^"]*)"/g,
            '<span class="token-string">"$1"</span>'
        );


    highlighted =
        highlighted.replace(
            /(\b(Formacao|Stack|Funcao|Diferencial|Objetivo)\b)/g,
            '<span class="token-var">$1</span>'
        );


    highlighted =
        highlighted.replace(
            /([{}[\]:;,])/g,
            '<span class="token-punctuation">$1</span>'
        );


    return highlighted;

}


/* DIGITAÇÃO DO CÓDIGO */

if (typingAbout) {

    let aboutIndex = 0;


    function typeAbout() {

        if (
            aboutIndex <=
            textAbout.length
        ) {

            const raw =
                textAbout.substring(
                    0,
                    aboutIndex
                );


            typingAbout.innerHTML =
                highlightSyntax(raw);


            aboutIndex++;


            setTimeout(
                typeAbout,
                25
            );

        }

    }


    typeAbout();

}