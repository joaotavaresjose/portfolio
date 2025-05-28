// script.js

// Função para mudar o texto do botão ao clicar
const betaButton = document.querySelector(".beta-button");
betaButton.addEventListener("click", () => {
  betaButton.textContent = "Joined!";
  betaButton.disabled = true;
  betaButton.style.opacity = 0.6;
});

// Animação simples de destaque ao passar o mouse nas seções
const features = document.querySelectorAll(".feature-box");
features.forEach((box) => {
  box.addEventListener("mouseover", () => {
    box.style.transform = "scale(1.05)";
    box.style.transition = "transform 0.3s ease";
  });
  box.addEventListener("mouseout", () => {
    box.style.transform = "scale(1)";
  });
});
