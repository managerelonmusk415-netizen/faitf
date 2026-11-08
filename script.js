// ========================================================
// 1. GESTION DE LA NAVIGATION MULTI-PAGES (SPA)
// ========================================================
function switchPage(pageId) {
  // Masquer toutes les pages
  const pages = document.querySelectorAll(".page-content");
  pages.forEach((page) => page.classList.add("hidden"));

  // Réinitialiser les boutons du menu
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));

  // Afficher la page sélectionnée
  const selectedPage = document.getElementById(`page-${pageId}`);
  if (selectedPage) {
    selectedPage.classList.remove("hidden");
  }

  // Marquer le bouton comme actif
  const selectedNav = document.getElementById(`nav-${pageId}`);
  if (selectedNav) {
    selectedNav.classList.add("active");
  }

  // Défiler vers le haut de la page
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================================
// 2. TÉMOIGNAGES ANIMÉS EN NOTIFICATIONS POP-UP (TOAST)
// ========================================================
const testimonialsList = [
  {
    name: "Lucas M.",
    country: "Brésil",
    gift: "200 000$ Maillot Dédicacé 2026 plus financement des projets",
    icon: "fa-shirt",
  },
  {
    name: "Sami R.",
    country: "Algérie",
    gift: "20 Milions de $",
    icon: "fa-shoe-prints",
  },
  {
    name: "David P.",
    country: "Espagne",
    gift: " 100 000$ plus financrment des projets",
    icon: "fa-trophy",
  },
  {
    name: "Elena V.",
    country: "Italie",
    gift: "Photo Signée à la main et j'ai recureçu une  somme de 300 000$",
    icon: "fa-image",
  },
  {
    name: "jonh A.",
    country: "London",
    gift: "Casquette Officielle CR7 et j'ai recureçu une somme de 250 000$ ",
    icon: "fa-hat-cowboy",
  },
];

let currentTestimonialIndex = 0;

function showNextTestimonialToast() {
  const toast = document.getElementById("gift-toast");
  const toastBody = document.getElementById("toast-body");
  const toastIcon = document.getElementById("toast-icon");

  const currentItem = testimonialsList[currentTestimonialIndex];

  // Mettre à jour les données du toast
  toastBody.innerHTML = `<strong>${currentItem.name}</strong> (${currentItem.country}) vient de recevoir : <span class="text-amber-400 font-semibold">${currentItem.gift}</span>`;
  toastIcon.className = `fa-solid ${currentItem.icon} text-lg`;

  // Faire apparaître la notification
  toast.classList.add("show");

  // Masquer la notification après 4 secondes
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);

  // Passer au témoignage suivant
  currentTestimonialIndex =
    (currentTestimonialIndex + 1) % testimonialsList.length;
}

// Lancer les notifications en boucle
setTimeout(() => {
  showNextTestimonialToast();
  setInterval(showNextTestimonialToast, 7000);
}, 2000);

// ========================================================
// 3. EFFET SONORE ET ANIMATION "SIUUU"
// ========================================================
function playSiuuu() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    console.log("Audio Web-API non disponible.");
  }

  alert("SIUUUUUUUUUU ! ⚽🔥");
}

// ========================================================
// 4. ENVOI DU FORMULAIRE VERS WHATSAPP DIRECT
// ========================================================
function sendFormToWhatsapp(event) {
  event.preventDefault();

  const name = document.getElementById("fan-name").value;
  const country = document.getElementById("fan-country").value;
  const message = document.getElementById("fan-message").value;

  // Numéro WhatsApp configuré
  const phoneNumber = "33748464220";

  // Formater le texte pour WhatsApp
  const text = `Bonjour Manager,%0AJe suis ${encodeURIComponent(name)} depuis ${encodeURIComponent(country)}.%0A%0AMessage: ${encodeURIComponent(message)}`;

  // Ouvrir WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
}
