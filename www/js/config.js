// ==========================================================
// Valencia — réglages du site (téléphone, promos, vidéos...)
// Les produits restent dans js/produits.js
// ==========================================================
const SITE = {
  whatsapp: "242067585858",
  telephone: "+242067585858",
  email: "social.valencia.cg@gmail.com",
  reseaux: {
    TikTok: "https://www.tiktok.com/@valencia.congo",
    Instagram: "https://www.instagram.com/valencia.congo/",
    Facebook: "https://www.facebook.com/Valencia.Congo.1"
  },
  parPage: 12,
  pieces: ["Salon", "Salle à manger", "Chambre", "Chambre pour enfant", "Bureau", "Rangement", "Luminaires"],

  // Bandeau affiché en haut du site (remplacé par la promo active, s'il y en a une)
  annonce: "🚚 Expédition gratuite à Brazzaville · Installation offerte",

  // ---------- PROMOTIONS ----------
  // Fuseau horaire des dates de promo (Pointe-Noire = +01:00). Ne pas changer.
  fuseau: "+01:00",
  // Les prix remisés sont arrondis aux 1 000 FCFA les plus proches (mettre 1 pour garder le prix exact).
  arrondi: 1000,

  // Mettre promos: [] pour tout masquer. Une promo démarre et s'arrête toute seule aux dates indiquées.
  // Pendant une promo :
  //   - les prix concernés sont barrés et remplacés par le prix remisé (badge « -40 % ») ;
  //   - sur l'accueil, « Nouveautés chez Valencia » devient « Promotion du <type> », avec un chrono ;
  //   - le menu « Promotions » et le bandeau du haut apparaissent.
  //
  // MODÈLE À COPIER dans promos: [ ... ] (retirer les // devant chaque ligne) :
  // {
  //   type: "Black Friday",                    // donne « Promotion du Black Friday » (pour « Promotion de Noël », écrire "de Noël")
  //   texte: "Jusqu'à -40 % sur nos salons.",  // facultatif : phrase sous le titre
  //   debut: "2026-11-20",                     // facultatif : AAAA-MM-JJ ou AAAA-MM-JJ HH:MM
  //   fin: "2026-11-30 23:59",                 // fin de la promo : le chrono compte jusque-là (sans heure = 23:59:59)
  //   reductions: {                            // % de réduction selon la catégorie
  //     "Salon": 40,                           // tous les salons -40 % (1 000 000 devient 600 000 FCFA)
  //     "Chambre": 30,                         // toutes les chambres -30 %
  //     "Chambre pour enfant": 30,
  //     "Luminaires": 15,
  //     "Lustres": 25,                         // une catégorie précise de produits.js (prioritaire sur la pièce)
  //     "puffy-sofaset": 0                     // un id de produit (le plus prioritaire) ; 0 = ce produit n'est pas en promo
  //   }
  // }
  //
  // À gauche des ":" on peut mettre : une pièce (Salon, Salle à manger, Chambre, Chambre pour enfant, Bureau,
  // Rangement, Luminaires), une catégorie de produits.js (salon complet, Tables, Lits...) ou un id de produit.
  // Si plusieurs règles visent le même produit, la plus précise gagne : id > catégorie > pièce.
  // Anciennes options toujours acceptées : produits: [ids], pieces: [...], remise: 10, prix: { id: "4.200.000" }.
  promos: [
],
  // Nouveautés : ids à mettre en avant. Vide = les derniers produits ajoutés.
  nouveautes: [],
  nombreNouveautes: 8,

  faq: [],   // facultatif : [{ q: "Question ?", r: "Réponse." }]
  avis: [],  // facultatif : [{ nom: "Prénom", texte: "Avis du client." }]

  // ---------- DIAPORAMA D'ACCUEIL ----------
  videos: [
    { src: "https://res.cloudinary.com/enepocmi/video/upload/v1792760549/1.mp4", titre: "Des espaces chaleureux", texte: "Des meubles confortables pour recevoir vos invités." },
    { src: "https://res.cloudinary.com/enepocmi/video/upload/v1792760551/3.mp4", titre: "Un style apaisant", texte: "Des matières douces pour bien se reposer." },
    { src: "https://res.cloudinary.com/enepocmi/video/upload/v1792760543/2.mp4", titre: "Un accord parfait", texte: "Des modèles assortis à votre vision." },
    { src: "https://res.cloudinary.com/enepocmi/video/upload/v1792760547/4.mp4", titre: "Des meubles de qualité", texte: "Des meubles de premier choix, principalement d'origine turque." },
    { src: "https://res.cloudinary.com/enepocmi/video/upload/v1792760527/she.mp4", titre: "Des services exceptionnels", texte: "Livraison gratuite à Brazzaville, installation offerte." }
  ],
  imagesSecours: [
    { src: "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_06_48 AM.png", titre: "L'élégance durable, le confort au quotidien", texte: "Des meubles de premier choix, principalement d'origine turque." }
  ],
  dureeDiapo: 7000,

  // ---------- AMBIANCES (page Inspirations) : ids de produits.js ----------
  ambiances: [
    { nom: "Salon chaleureux", texte: "Un grand salon pour recevoir en famille.", produits: ["oxford-sofaset", "kyoto-sofaset", "opus-berger", "meuble-tv-lizbon"], image: "oxford-sofaset" },
    { nom: "Repas en famille", texte: "Une salle à manger lumineuse, simple et élégante.", produits: ["arya-dining-set", "table-en-marbre", "mimoza-dining-set"], image: "arya-dining-set" },
    { nom: "Chambre apaisante", texte: "Matières douces et couleurs claires pour bien se reposer.", produits: ["ada-bedroom", "oxford-bedroom", "side-bedroom"], image: "ada-bedroom" },
    { nom: "Coin de travail", texte: "Un bureau sobre pour travailler au calme.", produits: ["bureau-pnt29-1", "bureau-secretaire", "table-de-reception"], image: "bureau-pnt29-1" }
  ]
};