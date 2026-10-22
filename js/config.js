// ==========================================================
// Valencia — réglages du site (le seul fichier à modifier
// pour le téléphone, les vidéos, les réseaux, etc.)
// Les produits restent dans js/produits.js
// ==========================================================
const SITE = {
  whatsapp: "242067585858",          // format international, sans le +
  telephone: "+242067585858",
  email: "social.valencia.cg@gmail.com",

  reseaux: {
    TikTok: "https://www.tiktok.com/@valencia.congo",
    Instagram: "https://www.instagram.com/valencia.congo/",
    Facebook: "https://www.facebook.com/Valencia.Congo.1"
  },

  // Nombre de produits affichés par page dans le catalogue (modifiable par le client)
  parPage: 12,

  pieces: ["Salon", "Salle à manger", "Chambre", "Bureau", "Rangement", "Luminaires"],

  // ---------- DIAPORAMA D'ACCUEIL ----------
  // Ajoutez autant de vidéos que vous voulez : une ligne = une diapositive.
  //  - src    : chemin de la vidéo (mp4 conseillé, légère, sans son)
  //  - titre  : texte affiché par-dessus (facultatif)
  //  - texte  : sous-titre (facultatif)
  //  - poster : image affichée pendant le chargement (facultatif)
  // Si la liste est vide, le site affiche les photos de "imagesSecours".
  videos: [
    { src: "images/iloveimg-compressed (1)/ChatGPT Image Oct 2, 2026, 12_13_31 PM.png", titre: "Des espaces chaleureux", texte: "Des mobilier confortables pour recevoir vos invités." },
    { src: "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_22 AM.png", titre: "Un style apaisant", texte: "Des matières douces pour bien se reposer." },
     { src: "images/iloveimg-compressed (4)/ChatGPT Image Oct 22, 2026, 10_31_00 AM.png", titre: "Un accord parfait", texte: "Des modeles assortis à votre vision." }
  ],
  imagesSecours: [
    { src: "images/produits/salon/OXFORD/ChatGPT Image Oct 8, 2026, 11_06_48 AM.png", titre: "L'élégance durable, le confort au quotidien", texte: "Des meubles de premier choix, principalement d'origine turque." },
    { src: "images/produits/salon/PUFFY/ChatGPT Image Sep 29, 2026, 10_47_22 AM (6).png", titre: "Des salons pensés pour vous recevoir", texte: "Livraison gratuite à Brazzaville, installation offerte." }
  ],
  dureeDiapo: 7000, // millisecondes (pour les images, et si une vidéo est très longue)

  // ---------- AMBIANCES (page Inspirations) ----------
  // "produits" = id exacts de produits.js
  ambiances: [
    { nom: "Salon chaleureux", texte: "Un grand salon et sa table basse pour recevoir en famille.", produits: ["oxford-sofaset", "opus-berger", "piero-table-basse", "meuble-tv-lizbon"], image: "oxford-sofaset" },
    { nom: "Repas en famille", texte: "Une salle à manger lumineuse, simple et élégante.", produits: ["arya-dining-set", "chaises-salle-a-manger-1"], image: "arya-dining-set" },
    { nom: "Chambre apaisante", texte: "Matières douces et couleurs claires pour bien se reposer.", produits: ["ada-bedroom", "titan-dressing"], image: "titan-dressing" },
    { nom: "Coin de travail", texte: "Un bureau sobre pour travailler au calme.", produits: ["bureau-office", "table-de-reception"], image: "bureau-office" }
  ]
};