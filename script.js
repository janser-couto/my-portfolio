<<<<<<< HEAD
/* ==========================================================
   PORTFÓLIO PROFISSIONAL
   Desenvolvedor: Janser
   Arquivo: script.js
========================================================== */

/* NAVBAR AO ROLAR */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10,10,15,.90)";
        navbar.style.padding = "15px 30px";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.5)";
    } else {
        navbar.style.background = "rgba(24,24,27,.55)";
        navbar.style.padding = "18px 30px";
        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.45)";
    }
});

/* MENU MOBILE */
const mobileButton = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

if (mobileButton && menu) {
    mobileButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

/* REVEAL ON SCROLL */
const sections = document.querySelectorAll("section");

const revealSections = () => {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < trigger) {
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/* TYPING EFFECT (HERO) */
const texts = [
    "Desenvolvedor Back-end",
    "HTML • CSS • JavaScript",
    "Impondo ideias em Code"
];

const typingElement = document.querySelector(".hero h2");
let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (!deleting) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex++;
            if (textIndex >= texts.length) textIndex = 0;
        }
    }

    setTimeout(typeEffect, deleting ? 40 : 90);
}

if (typingElement) typeEffect();

/* BOTÃO VOLTAR AO TOPO */
const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* MENU ATIVO */
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("current");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("current");
        }
    });
});

/* ANIMAÇÃO DOS BOTÕES */
const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-5px) scale(1.03)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0px) scale(1)";
    });
});

/* FADE DA HERO */
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0px)";
    }
});

/* ANIMAÇÃO DA FOTO */
const profile = document.querySelector(".profile-circle");

if (profile) {
    let angle = 0;
    setInterval(() => {
        angle += 0.4;
        profile.style.transform = `translateY(${Math.sin(angle/8)*8}px)`;
    }, 16);
}

/* COPIAR EMAIL */
const copyButton = document.getElementById("copyEmail");

if (copyButton) {
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText("jansercouto@outlook.com");
        copyButton.innerHTML = "✔";
        setTimeout(() => {
            copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
    });
}

/* ==========================================================
   NEON NAS BORDAS (SEGUE O CURSOR)
========================================================== */
const codeBoxes = document.querySelectorAll(".code-box");

codeBoxes.forEach(box => {
    box.addEventListener("mousemove", (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        box.style.setProperty("--angle", `${angle}deg`);
    });
});

/* ==========================================================
   TYPING EFFECT (SOBRE MIM)
========================================================== */
const typingAbout = document.getElementById("typing-about");

if (typingAbout) {
    const textAbout = `const desenvolvedor = {
    Formação: "Cursando ADS",
    Stack: ["HTML", "CSS", "JavaScript"],
    Função: "Dev. Júnior",
    Diferencial: "Busco sempre Códigos limpos e boas práticas",
    Objetivo Principal: "Transformar minhas ideias em realidade"
};`;

    let index = 0;
    function typeAbout() {
        if (index <= textAbout.length) {
            typingAbout.innerHTML = textAbout.substring(0, index)
                .replace(/(const)/g, '<span class="token-keyword">$1</span>')
                .replace(/(".*?"|\[.*?\])/g, '<span class="token-string">$1</span>')
                .replace(/([{}:;,])/g, '<span class="token-punctuation">$1</span>');
            index++;
            setTimeout(typeAbout, 25);
        }
    }
    typeAbout();
}

    let index = 0;

    function typeAbout() {
        if (index <= textAbout.length) {
            const raw = textAbout.substring(0, index);
            typingAbout.innerHTML = highlightSyntax(raw);
            index++;
            setTimeout(typeAbout, 25);
        }
    }

    typeAbout();


function highlightSyntax(code) {
    return code
        .replace(/(const)/g, '<span class="token-keyword">$1</span>')
        .replace(/(formacao|stack|foco|diferencial|objetivo)/g, '<span class="token-var">$1</span>')
        .replace(/(".*?"|\[.*?\])/g, '<span class="token-string">$1</span>')
        .replace(/([{}:;,])/g, '<span class="token-punctuation">$1</span>');
=======
/* ==========================================================
   PORTFÓLIO PROFISSIONAL
   Desenvolvedor: Janser
   Arquivo: script.js
========================================================== */

/* NAVBAR AO ROLAR */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10,10,15,.90)";
        navbar.style.padding = "15px 30px";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.5)";
    } else {
        navbar.style.background = "rgba(24,24,27,.55)";
        navbar.style.padding = "18px 30px";
        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.45)";
    }
});

/* MENU MOBILE */
const mobileButton = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

if (mobileButton && menu) {
    mobileButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

/* REVEAL ON SCROLL */
const sections = document.querySelectorAll("section");

const revealSections = () => {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < trigger) {
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/* TYPING EFFECT (HERO) */
const texts = [
    "Desenvolvedor Back-end",
    "HTML • CSS • JavaScript",
    "Impondo ideias em Code"
];

const typingElement = document.querySelector(".hero h2");
let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (!deleting) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex++;
            if (textIndex >= texts.length) textIndex = 0;
        }
    }

    setTimeout(typeEffect, deleting ? 40 : 90);
}

if (typingElement) typeEffect();

/* BOTÃO VOLTAR AO TOPO */
const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* MENU ATIVO */
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("current");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("current");
        }
    });
});

/* ANIMAÇÃO DOS BOTÕES */
const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-5px) scale(1.03)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0px) scale(1)";
    });
});

/* FADE DA HERO */
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0px)";
    }
});

/* ANIMAÇÃO DA FOTO */
const profile = document.querySelector(".profile-circle");

if (profile) {
    let angle = 0;
    setInterval(() => {
        angle += 0.4;
        profile.style.transform = `translateY(${Math.sin(angle/8)*8}px)`;
    }, 16);
}

/* COPIAR EMAIL */
const copyButton = document.getElementById("copyEmail");

if (copyButton) {
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText("jansercouto@outlook.com");
        copyButton.innerHTML = "✔";
        setTimeout(() => {
            copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
    });
}

/* ==========================================================
   NEON NAS BORDAS (SEGUE O CURSOR)
========================================================== */
const codeBoxes = document.querySelectorAll(".code-box");

codeBoxes.forEach(box => {
    box.addEventListener("mousemove", (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        box.style.setProperty("--angle", `${angle}deg`);
    });
});

/* ==========================================================
   TYPING EFFECT (SOBRE MIM)
========================================================== */
const typingAbout = document.getElementById("typing-about");

if (typingAbout) {
    const textAbout = `const desenvolvedor = {
    Formação: "Cursando ADS",
    Stack: ["HTML", "CSS", "JavaScript"],
    Função: "Dev. Júnior",
    Diferencial: "Busco sempre Códigos limpos e boas práticas",
    Objetivo Principal: "Transformar minhas ideias em realidade"
};`;

    let index = 0;
    function typeAbout() {
        if (index <= textAbout.length) {
            typingAbout.innerHTML = textAbout.substring(0, index)
                .replace(/(const)/g, '<span class="token-keyword">$1</span>')
                .replace(/(".*?"|\[.*?\])/g, '<span class="token-string">$1</span>')
                .replace(/([{}:;,])/g, '<span class="token-punctuation">$1</span>');
            index++;
            setTimeout(typeAbout, 25);
        }
    }
    typeAbout();
}

    let index = 0;

    function typeAbout() {
        if (index <= textAbout.length) {
            const raw = textAbout.substring(0, index);
            typingAbout.innerHTML = highlightSyntax(raw);
            index++;
            setTimeout(typeAbout, 25);
        }
    }

    typeAbout();


function highlightSyntax(code) {
    return code
        .replace(/(const)/g, '<span class="token-keyword">$1</span>')
        .replace(/(formacao|stack|foco|diferencial|objetivo)/g, '<span class="token-var">$1</span>')
        .replace(/(".*?"|\[.*?\])/g, '<span class="token-string">$1</span>')
        .replace(/([{}:;,])/g, '<span class="token-punctuation">$1</span>');
>>>>>>> 953641f1e72730412072b4710bd9039df95893dc
}