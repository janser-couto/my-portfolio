/*

PORTFÓLIO PROFISSIONAL
Desenvolvedor: Janser
Arquivo: script.js

JavaScript usado apenas para:
- Menu mobile
- Navegação
- Typewriter
- Botão voltar ao topo
- Menu ativo
- Copiar e-mail

O conteúdo principal permanece no HTML.

*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    
    ELEMENTOS
    
    */

    const navbar = document.querySelector(".navbar");
    const mobileButton = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");
    const navLinks = document.querySelectorAll(".menu a");

    const sections = document.querySelectorAll("section");

    const backToTop = document.getElementById("backToTop");

    const typingElement =
        document.querySelector(".hero-role");

    const copyButton =
        document.getElementById("copyEmail");

    const emailElement =
        document.getElementById("email");


    /*
    
    REDUÇÃO DE MOVIMENTO
    
    */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
    
    ESTADO DO SCROLL
    
    */

    let scrollTicking = false;


    /*
    
    NAVBAR
    
    */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }


    /*
    
    BOTÃO VOLTAR AO TOPO
    
    */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }


    /*
    
    MENU ATIVO
    
    */

    function updateActiveMenu() {

        if (!sections.length) {
            return;
        }

        const marker = 180;

        let currentSection = "";


        for (const section of sections) {

            const rect =
                section.getBoundingClientRect();


            if (
                rect.top <= marker &&
                rect.bottom > marker
            ) {

                currentSection =
                    section.id;

                break;

            }

        }


        if (!currentSection) {
            return;
        }


        navLinks.forEach(link => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "current",
                target = `#${currentSection}`
            );

        });

    }


    /*
    
    SCROLL OTIMIZADO
    

    Em vez de executar várias funções diretamente
    a cada evento de scroll, tudo passa por um único
    requestAnimationFrame.
    */

    function handleScroll() {

        if (scrollTicking) {
            return;
        }

        scrollTicking = true;


        requestAnimationFrame(() => {

            updateNavbar();
            updateBackToTop();
            updateActiveMenu();

            scrollTicking = false;

        });

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /*
    
    MENU MOBILE
    
    */

    function setMenuIcon(isOpen) {

        if (!mobileButton) {
            return;
        }

        mobileButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

        mobileButton.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

        mobileButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }


    function closeMobileMenu() {

        if (!menu || !mobileButton) {
            return;
        }

        menu.classList.remove("active");

        setMenuIcon(false);

    }


    function toggleMobileMenu() {

        if (!menu || !mobileButton) {
            return;
        }

        const isOpen =
            menu.classList.toggle("active");

        setMenuIcon(isOpen);

    }


    if (mobileButton && menu) {

        mobileButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMobileMenu();

            }
        );


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !menu.contains(event.target) &&
                    !mobileButton.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 900) {

                    closeMobileMenu();

                }

            }
        );

    }


    /*
    
    TYPEWRITER DO HERO
    
    */

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

        if (!typingElement) {
            return;
        }


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
                    1500
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

                heroTextIndex =
                    (heroTextIndex + 1) %
                    heroTexts.length;

            }

        }


        setTimeout(
            typeHero,
            heroDeleting ? 40 : 75
        );

    }


    if (
        typingElement &&
        !prefersReducedMotion
    ) {

        typeHero();

    }


    /*
    
    BOTÃO VOLTAR AO TOPO
    
    */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /*
    
    COPIAR E-MAIL
    
    */

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
                        '<i class="fa-solid fa-check" aria-hidden="true"></i>';


                    copyButton.setAttribute(
                        "aria-label",
                        "E-mail copiado"
                    );


                    setTimeout(() => {

                        copyButton.innerHTML =
                            '<i class="fa-regular fa-copy" aria-hidden="true"></i>';


                        copyButton.setAttribute(
                            "aria-label",
                            "Copiar endereço de e-mail"
                        );

                    }, 1800);


                } catch (error) {

                    console.error(
                        "Erro ao copiar e-mail:",
                        error
                    );

                }

            }
        );

    }


    /*
    
    ESTADO INICIAL
    
    */

    updateNavbar();
    updateBackToTop();
    updateActiveMenu();

});