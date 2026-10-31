// Numéro WhatsApp du magasin (format international, sans le +)
const NUMERO_WHATSAPP = "242067585858";

// Liens officiels des réseaux sociaux : à compléter
const LIENS_RESEAUX = {
  TikTok: "https://www.tiktok.com/@valencia.congo",
  Instagram: "https://www.instagram.com/valencia.congo/",
  Facebook: "https://www.facebook.com/Valencia.Congo.1"
};

const PIECES = ["Salon", "Salle à manger", "Chambre", "Bureau", "Rangement", "Luminaires"];

// Pour ajouter un produit, copiez un bloc ci-dessous et changez les valeurs.
//  - photos     : liste d'adresses d'images (vide = image temporaire)
//  - prix       : laissez null tant que le prix n'est pas confirmé
//  - fond       : deux couleurs de fond pour l'image temporaire
//
// RÈGLES D'ÉCRITURE (pour que les filtres du catalogue n'affichent pas de doublons) :
//  - couleurs  : une liste, chaque couleur commence par une majuscule.
//                Mots à réutiliser tels quels : Argenté, Beige, Blanc, Bleu cyan, Bois naturel,
//                Bordeaux, Doré, Gris, Jaune, Marron, Noir, Orange, Rose, Rouge, Vert
//  - matiere   : une liste, un seul mot par matière, majuscule au début.
//                Mots à réutiliser tels quels : Acier, Bois, Cuir, Marbre, Métal, Tissu, Verre
//  - categorie : toujours au pluriel avec une majuscule (voir la liste utilisée plus bas)
const PRODUITS = [
  {
    id: "puffy-sofaset",
    nom: "PUFFY SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Blanc"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "4.625.000 XAF",
    description: "Grand salon moelleux aux assises rembourrées et aux coussins généreux : un canapé 5 places, un canapé 3 places et 2 fauteuils d'une place, habillés d'un tissu texturé gris clair. Idéal pour recevoir toute la famille.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_13 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_19 AM (1).png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_20 AM (2).png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_21 AM (3).png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_22 AM (4).png",
      "images/iloveimg-compressed (2)/puffy-22 (1).jpg",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_47_22 AM (5).png"
    ]
  },
  {
    id: "oxford-sofaset",
    nom: "OXFORD SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Bois naturel", "Doré", "Blanc", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "14.209.000 XAF",
    description: "Ensemble d'exception : deux canapés 3 places crème, 2 fauteuils d'une place à structure en bois travaillé, 3 tables basses et 2 tables de coin aux finitions dorées. Les panneaux de bois et les reflets dorés donnent à la pièce une allure de salon d'apparat.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_06_48 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_07_23 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_07_26 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_07_29 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_07_35 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_07_39 AM.png"
    ]
  },
  {
    id: "Pollen-sofaset",
    nom: "POLLEN SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Blanc"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "4.126.000 XAF",
    description: "Salon aux teintes douces de gris taupe : deux canapés 3 places et deux fauteuils d'une place aux coussins moelleux. Il se marie très bien avec une table basse claire et quelques accents dorés.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_27_28 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_28_11 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_27_23 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_26_17 PM.png"
    ]
  },
  {
    id: "T-BLACK-SOFASET",
    nom: "BLACK SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Noir"],
    matiere: ["Cuir"],
    dimensions: "À confirmer",
    prix: "1.830.000 XAF",
    description: "Salon en cuir noir brillant souligné de surpiqûres blanches : un canapé 3 places, un canapé 2 places et un fauteuil d'une place. Pieds métalliques chromés et lignes épurées pour une allure moderne, facile à entretenir.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Sep 26, 2026, 11_06_20 AM (2).png",
      "images/iloveimg-compressed (1)/ChatGPT Image Sep 26, 2026, 11_06_20 AM (1).png",
      "images/iloveimg-compressed (1)/ChatGPT Image Sep 26, 2026, 11_06_20 AM (3).png",
      "images/iloveimg-compressed (1)/ChatGPT Image Sep 26, 2026, 11_06_21 AM (4).png",
      "images/iloveimg-compressed (1)/ChatGPT Image Sep 26, 2026, 11_06_21 AM (5).png"
    ]
  },
  {
    id: "T-ARYA-SOFASET",
    nom: "ARYA SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Noir"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "3.684.000 XAF",
    description: "Salon aux formes courbes et enveloppantes : deux canapés 3 places et deux fauteuils d'une place en tissu bouclé gris chiné. Ses volumes arrondis adoucissent la pièce et invitent à s'y blottir.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_55_12 AM (4).png",
      "images/iloveimg-compressed (2)/bb799699-840d-4b75-b37c-a2262e78f388.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_55_11 AM (1).png",
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 29, 2026, 10_55_11 AM (2).png"
    ]
  },
  {
    id: "T-BONBON-SOFASET",
    nom: "BONBON SOFASET",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Jaune"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "3.463.000 XAF",
    description: "Long canapé 6 places en forme d'arc, habillé d'un tissu jaune moutarde chaleureux et agrémenté de coussins rayés. Une pièce maîtresse qui apporte de la couleur et de la gaieté à un grand séjour.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 2, 2026, 12_13_31 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 2, 2026, 12_14_31 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 2, 2026, 12_14_39 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 2, 2026, 12_13_31 PM.png"
    ]
  },
  {
    id: "T-BUBBLE-SOFASET",
    nom: "BUBBLE SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Orange"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "4.239.000 XAF",
    description: "Salon d'angle aux lignes arrondies en tissu gris foncé, relevé de coussins orange, accompagné d'un berger d'une place en bouclé orange à l'allure de bulle. Parfait pour un séjour convivial et plein de couleur.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 5, 2026, 09_51_44 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 5, 2026, 09_51_59 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 5, 2026, 09_52_03 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 5, 2026, 09_52_11 AM.png"
    ]
  },
  {
    id: "T-BUGATTI-SOFASET",
    nom: "BUGATTI SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Blanc"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "salon électrique : 4.444.000 XAF , salon manuel : 3.865.000 XAF",
    description: "Grand salon d'angle aux assises profondes et aux lignes sobres, proposé en version électrique (relax à commande) ou en version manuelle. Conçu pour les grands salons où l'on aime s'allonger devant un film.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 15, 2026, 12_04_30 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 14, 2026, 03_41_02 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 15, 2026, 12_04_40 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 14, 2026, 03_40_42 PM.png"
    ]
  },
  {
    id: "electrical-SOFASET",
    nom: "SALON ELECTRIQUE (rétractables)",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Beige", "Blanc", "Noir"],
    matiere: ["Cuir"],
    dimensions: "À confirmer",
    prix: "3.424.000 XAF",
    description: "Salon relax en cuir avec 5 places inclinables à commande électrique : un canapé 3 places, un canapé 2 places et un fauteuil d'une place. Disponible en beige, en blanc ou en noir.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_23_30 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_24_27 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_24_30 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_27_33 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_27_29 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_24_43 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 16, 2026, 11_27_36 AM.png"
    ]
  },
  {
    id: "picasso-sofaset",
    nom: "PICASSO SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Argenté"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "5.214.000 XAF",
    description: "Salon baroque aux cadres en bois sculpté et patiné, tapissé de tissu gris argenté : deux canapés 3 places, deux fauteuils d'une place, une table basse et deux tables de coin. Un style de caractère pour les amateurs de décor classique.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 3, 2026, 10_41_58 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 3, 2026, 10_42_13 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 3, 2026, 10_42_17 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_26_17 PM.png"
    ]
  },
  {
    id: "glenda-sofaset",
    nom: "GLENDA SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Rose"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "2.409.000 XAF",
    description: "Salon frais et lumineux : deux canapés 3 places gris et deux fauteuils d'une place, rehaussés de coussins et d'une touche de rose poudré. Un ensemble facile à marier avec une décoration douce.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/9c6e76aa-d1e0-4dd2-a3e7-a5d463fffd85.png",
      "images/iloveimg-compressed (2)/82fbb479-c3c9-4211-bef7-b55b2c813988.png",
      "images/iloveimg-compressed (2)/45544675-82fd-4500-ae7e-ef2a84472cbf.png",
      "images/iloveimg-compressed (2)/cd277cd5-73bb-4a47-b993-4f7ee7930e8f.png"
    ]
  },
  {
    id: "lizbon-sofaset",
    nom: "LIZBON SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Blanc", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "4.878.000 XAF",
    description: "Salon contemporain : deux canapés 3 places et deux fauteuils en tissu blanc cassé, soulignés par une base en bois brun. Le contraste entre le crème et le marron lui donne beaucoup de chaleur.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 7, 2026, 12_38_38 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 7, 2026, 12_38_42 PM.png",
      "images/iloveimg-compressed (2)/furniture_house.ng_1774944972729.jpeg",
      "images/iloveimg-compressed (2)/furniture_house.ng_1774944972729 (1).jpeg",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 7, 2026, 12_44_54 PM.png"
    ]
  },
  {
    id: "girit-sofaset",
    nom: "GIRIT SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Gris", "Argenté"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "7.227.000 XAF",
    description: "Grand salon moderne composé de deux canapés 4 places et de deux fauteuils d'une place, en tissu gris argenté avec des détails en bois sombre. De la place pour toute la famille et pour les réceptions.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_02_15 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_02_23 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_02_28 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_02_31 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 11_03_11 AM.png"
    ]
  },
  {
    id: "otto-sofaset",
    nom: "OTTO SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Marron", "Bordeaux"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "5.081.000 XAF",
    description: "Salon d'angle livré avec son berger d'une place et ses 2 poufs, pour un confort moderne dans les grandes pièces. Le berger à motif pied-de-poule et accoudoirs en bois apporte une note graphique.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 15, 2026, 01_19_56 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 15, 2026, 01_31_04 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 15, 2026, 01_31_08 PM.png"
    ]
  },
  {
    id: "sofaset-sf65",
    nom: "OFFICE SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Beige", "Rouge"],
    matiere: ["Cuir"],
    dimensions: "À confirmer",
    prix: "4.635.000 XAF",
    description: "Salon en cuir beige rehaussé de liserés bordeaux : un canapé 3 places et deux fauteuils d'une place aux larges accoudoirs. Une allure sobre et élégante, qui convient aussi bien à un salon qu'à un espace d'accueil.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 11_39_25 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 11_39_30 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 11_39_35 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 11_39_38 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 11_39_42 AM.png"
    ]
  },
  {
    id: "valencia-sofaset",
    nom: "VALENCIA SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Rouge", "Jaune", "Noir", "Bleu cyan"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "850.000 XAF",
    description: "Salon capitonné à boutons composé d'un canapé 3 places, d'un canapé 2 places et d'un fauteuil d'une place. Disponible en rouge, jaune, noir ou bleu cyan, il donne du caractère à un séjour classique.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 11_43_29 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 11_46_47 AM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_35_03 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_36_11 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_37_38 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_44_42 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_44_58 PM.png",
      "images/iloveimg-compressed (2)/ChatGPT Image Oct 6, 2026, 12_45_12 PM.png"
    ]
  },
  {
    id: "canape-3-places",
    nom: "CANAPÉ 3 PLACES",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Gris", "Blanc", "Beige"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "630.000 XAF",
    description: "Canapé 3 places bicolore, crème sur le haut et gris foncé à la base, aux accoudoirs évasés et aux pieds fins. Deux coussins assortis complètent cette assise confortable au design élégant.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_51_09 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_51_14 PM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 8, 2026, 01_51_18 PM.png"
    ]
  },
  {
    id: "sofaset-3-plus-1",
    nom: "SOFASET 3+1",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Noir"],
    matiere: ["Cuir"],
    dimensions: "À confirmer",
    prix: "1.300.000 XAF",
    description: "Duo en cuir noir : un canapé 3 places et un fauteuil d'une place aux dossiers matelassés et aux accoudoirs enveloppants. Compact et facile d'entretien, il convient aux salons de taille moyenne.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "images/iloveimg-compressed (2)/93baeb7f-bcb4-41dc-ba89-6a055ef4bdb8.png",
      "images/iloveimg-compressed (2)/a0ac37a5-9b08-4c97-99af-d2be06af000f.png",
      "images/iloveimg-compressed (2)/db50d298-ee0f-4aaa-b0cd-e9d0e1daeadf.png",
      "images/iloveimg-compressed (2)/e4f0e059-9514-4803-a16e-2e9de1cd8218.png"
    ]
  },
  {
    id: "opus-longseater",
    nom: "OPUS 4PLACES + ANGLE",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "2.140.000 XAF",
    description: "Canapé d'angle 4 places en tissu beige, rehaussé de touches marron foncé. Sa forme en angle optimise l'espace et son assise profonde invite à la détente.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748183/ChatGPT_Image_Oct_13_2026_10_43_58_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748180/ChatGPT_Image_Oct_13_2026_10_29_41_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748185/ChatGPT_Image_Oct_13_2026_10_31_25_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748179/ChatGPT_Image_Oct_13_2026_10_29_05_AM.png"
    ]
  },
  {
    id: "opus-pouf",
    nom: "OPUS POUF",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Gris", "Blanc"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "200.000 XAF",
    description: "Pouf en tissu gris clair, à utiliser comme repose-pieds ou comme assise d'appoint. Il complète le salon de la collection Opus avec ses lignes sobres.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748181/ChatGPT_Image_Oct_13_2026_10_31_02_AM.png"
    ]
  },
  {
    id: "opus-berger",
    nom: "OPUS BERGER",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "428.000 XAF",
    description: "Fauteuil berger au dossier enveloppant, qui associe un tissu beige à une structure en bois marron. Parfait pour un coin lecture ou en complément du canapé Opus.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748181/ChatGPT_Image_Oct_13_2026_10_30_32_AM.png"
    ]
  },
  {
    id: "heritage-longseater",
    nom: "HERITAGE LONGSEATER",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Noir"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "3.521.000 XAF",
    description: "Long canapé 5 places au revêtement noir à piqûres verticales, avec un élément central formant tablette au plateau façon marbre. Une pièce imposante, faite pour les grandes pièces de réception.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748155/ChatGPT_Image_Oct_7_2026_11_30_17_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748159/ChatGPT_Image_Oct_7_2026_11_30_30_AM.png"
    ]
  },
  {
    id: "heritage-4-seater",
    nom: "HERITAGE 4-SEATER",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Gris"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "2.004.000 XAF",
    description: "Canapé 4 places en tissu gris chiné d'aspect tweed, aux lignes droites et aux coussins carrés. Il se marie à merveille avec le berger rond de la même collection.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748162/ChatGPT_Image_Oct_7_2026_11_40_20_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748156/ChatGPT_Image_Oct_7_2026_11_30_22_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748157/ChatGPT_Image_Oct_7_2026_11_30_26_AM.png"
    ]
  },
  {
    id: "heritage-berger",
    nom: "HERITAGE BERGER",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Gris"],
    matiere: ["Tissu"],
    dimensions: "À confirmer",
    prix: "668.000 XAF",
    description: "Fauteuil berger rond en bouclé gris, au dossier enveloppant et relevé d'un coussin noir. Un siège cocon individuel pour lire, se reposer ou accompagner le canapé Heritage.",
    entretien: "Aspirer régulièrement ; nettoyer les taches avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#d8c6a8", "#9a7a58"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748155/ChatGPT_Image_Oct_7_2026_11_30_12_AM.png"
    ]
  },
  {
    id: "verona-2",
    nom: "VERONA 2",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "636.000 XAF",
    description: "Fauteuil habillé d'un tissu pied-de-poule beige et noir, monté sur une structure en bois finition noyer. Ses accoudoirs galbés et son motif graphique en font aussi une belle pièce de décoration.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "images/iloveimg-compressed (2)/dd9ee782-a332-4b9c-b59c-bf5fa6489079.png",
      "images/iloveimg-compressed (2)/6dab4acf-9362-4e6e-9727-20ee1c6087d7.png",
      "images/iloveimg-compressed (2)/14ef4d15-09dd-4ed4-be5b-4ac00c8140a4.png",
      "images/iloveimg-compressed (2)/f514e910-9808-412d-9c8f-9c4a45b2da35.png"
    ]
  },
  {
    id: "verona-sofaset",
    nom: "VERONA SOFASET",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "1.497.000 XAF",
    description: "Canapé 3 places de la collection Verona, en tissu beige sur une ossature en bois marron. Sa structure apparente lui donne un style chaleureux et intemporel.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748259/090ffaa8-268f-4268-b8b2-a18565a1f2dd.png"
    ]
  },
  {
    id: "verona-berger",
    nom: "VERONA BERGER",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "445.000 XAF",
    description: "Berger individuel de la collection Verona, qui reprend le tissu beige et la structure en bois marron du canapé. Idéal pour compléter le salon ou créer un petit coin détente.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748260/41f6e578-19cf-4fed-9100-79dfe0135bf5.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748270/bf5528c5-d998-4a4d-8fdc-bc8fc7e77942.png"
    ]
  },
  {
    id: "chaise-à-bascule",
    nom: "CHAISE À BASCULE",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Gris", "Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "646.000 XAF",
    description: "Fauteuil à bascule au tissu gris texturé et aux patins courbes en bois brun, pour se balancer tout en douceur. Un siège relaxant pour un coin lecture ou une chambre.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 10_07_29 AM.png"
    ]
  },
  {
    id: "fauteuil-retractable",
    nom: "FAUTEUIL RETRACTABLE",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "507.000 XAF",
    description: "Fauteuil relax à repose-pieds rétractable : on le déploie pour s'allonger confortablement, on le replie pour gagner de la place. Tissu beige et détails en bois marron.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748101/ChatGPT_Image_Oct_9_2026_10_23_04_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748101/ChatGPT_Image_Oct_9_2026_10_24_42_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748101/ChatGPT_Image_Oct_9_2026_10_22_47_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748101/ChatGPT_Image_Oct_9_2026_10_23_00_AM.png"
    ]
  },
  {
    id: "kyoto-sofaset",
    nom: "KYOTO SOFASET",
    piece: "Salon",
    categorie: "Salon complet",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "3.480.000 XAF",
    description: "Salon sobre et chaleureux : un canapé 3 places gris beige et deux fauteuils d'une place à structure en bois brun et assise coussinée crème. Les angles adoucis de la collection Kyoto lui donnent une allure zen.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "images/iloveimg-compressed (2)/ChatGPT Image Sep 25, 2026, 01_24_40 PM.png",
      "images/iloveimg-compressed (2)/2424c878-5218-4016-b534-5a1965f237eb.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 10_07_37 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 10_07_52 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 10_07_56 AM.png",
      "images/iloveimg-compressed (1)/ChatGPT Image Oct 9, 2026, 10_08_04 AM.png"
    ]
  },
  {
    id: "kyoto-berger",
    nom: "KYOTO BERGER",
    piece: "Salon",
    categorie: "Fauteuils",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "975.000 XAF",
    description: "Fauteuil berger à structure en bois brun aux arêtes arrondies, avec une assise coussinée beige. Sobre et solide, il s'intègre dans tous les salons.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748161/c79c4453-5c69-4aac-a6a0-3a0a8a211c08.png"
    ]
  },
  {
    id: "kyoto-4-seater",
    nom: "KYOTO 4-SEATER",
    piece: "Salon",
    categorie: "Canapés",
    couleurs: ["Beige", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "À confirmer",
    prix: "2.505.000 XAF",
    description: "Canapé 4 places aux courbes douces, en tissu gris clair. Spacieux, il est idéal pour recevoir et s'associe aux bergers en bois de la même collection.",
    entretien: "Dépoussiérer ; éviter l'exposition prolongée au soleil.",
    disponibilite: "Sur demande",
    fond: ["#cdb89a", "#6e4f35"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748163/ChatGPT_Image_Sep_25_2026_01_24_40_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748162/ChatGPT_Image_Sep_25_2026_01_20_43_PM.png"
    ]
  },
  {
    id: "arya-dining-set",
    nom: "ARYA DINING SET",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Marron", "Beige"],
    matiere: ["Bois", "Tissu"],
    dimensions: "À confirmer",
    prix: "3.961.000 XAF",
    description: "Table au plateau brun foncé posée sur un piétement clair, entourée de chaises tapissées crème aux fins pieds noirs. Une ligne sobre et contemporaine pour réunir la famille.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 8, 2026, 09_52_02 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 8, 2026, 09_50_47 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 8, 2026, 09_50_59 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 8, 2026, 09_52_06 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 8, 2026, 10_13_10 AM.png"
    ]
  },
  {
    id: "Opus-dining-set",
    nom: "OPUS DINING SET",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Bois", "Marbre"],
    dimensions: "À confirmer",
    prix: "5.335.000 XAF",
    description: "Grande table rectangulaire au plateau sombre et au large piétement central, pensée pour les grandes tablées. Ses chaises tapissées crème aux pieds noirs apportent de la douceur à l'ensemble.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 21, 2026, 11_03_19 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 21, 2026, 11_03_35 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 21, 2026, 10_57_29 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 21, 2026, 10_57_21 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 21, 2026, 10_57_15 AM.png"
    ]
  },
  {
    id: "Oxford-dining-set",
    nom: "OXFORD DINING SET",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Bois naturel", "Marron"],
    matiere: ["Bois"],
    dimensions: "À confirmer",
    prix: "13.994.000 XAF",
    description: "Table en bois sombre au vernis brillant, entourée de chaises aux dossiers arrondis en tissu beige. Une salle à manger de réception qui prend tout son éclat sous un beau lustre.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_46_04 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_45_51 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_15 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_22 AM.png"
    ]
  },
  {
    id: "Alberta-dining-set",
    nom: "ALBERTA DINING SET",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Bois naturel"],
    matiere: ["Bois"],
    dimensions: "À confirmer",
    prix: "14.209.000 XAF",
    description: "Table rectangulaire au plateau brun brillant sur un élégant piétement central, accompagnée de chaises à haut dossier en tissu crème. Un ensemble taillé pour les repas de fête.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_46_01 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_11 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_18 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 22, 2026, 10_49_22 AM.png"
    ]
  },
  {
    id: "arpege-dining-set",
    nom: "ARPEGE DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Bois naturel", "Marron"],
    matiere: ["Bois", "Acier"],
    dimensions: "À confirmer",
    prix: "1.809.000 XAF",
    description: "Table au plateau brun brillant parcouru de fins filets cuivrés, montée sur un piétement en bois et acier. Ses chaises noires rembourrées en font un ensemble moderne et affirmé.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748372/ChatGPT_Image_Sep_22_2026_01_41_46_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748372/IMG-20240403-WA0000.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748371/IMG-20231024-WA0016.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748368/5.jpg"
    ]
  },
  {
    id: "arpege-console-set",
    nom: "ARPEGE CONSOLESET",
    piece: "Salle à manger",
    categorie: "Consoles",
    couleurs: ["Bois naturel", "Marron"],
    matiere: ["Bois", "Acier"],
    dimensions: "À confirmer",
    prix: "2.018.000 XAF",
    description: "Buffet en bois brun à filets dorés pour ranger la vaisselle et les accessoires de table, accompagné de 3 miroirs qui agrandissent l'espace et donnent de la profondeur à la pièce.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748372/ChatGPT_Image_Sep_22_2026_01_41_46_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748372/IMG-20240403-WA0000.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748371/IMG-20231024-WA0016.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748368/5.jpg"
    ]
  },
  {
    id: "table-en-marbre",
    nom: "TABLE EN MARBRE",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Gris", "Beige"],
    matiere: ["Acier", "Marbre"],
    dimensions: "À confirmer",
    prix: "2.191.000 XAF",
    description: "Table en marbre sur piétement en acier, entourée de ses 8 chaises capitonnées à motif losange. Un ensemble haut de gamme à l'allure glamour, pour de belles tablées.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/6401813f-e818-4e02-aa71-f76e6451b71e.png",
      "images/iloveimg-compressed (3)/6db3394b-50a5-4c82-98ea-c387839e487c.png",
      "images/iloveimg-compressed (3)/e0b0b775-0ea9-4eb1-ad86-7fa018b4968c.png",
      "images/iloveimg-compressed (3)/51904a86-794f-4444-8afd-402cda1740e9.png"
    ]
  },
  {
    id: "mimoza-dining-set",
    nom: "MIMOZA DINING SET",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Beige", "Vert", "Doré"],
    matiere: ["Bois"],
    dimensions: "À confirmer",
    prix: "4.899.000 XAF",
    description: "Table beige à piétement en X rehaussé de dorures, avec ses 8 chaises tapissées de vert aux pieds dorés. Ce duo vert et or apporte une touche de luxe à la salle à manger.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240112-WA0005.jpg",
      "images/iloveimg-compressed (3)/IMG-20240112-WA0006.jpg",
      "images/iloveimg-compressed (3)/IMG-20240112-WA0007.jpg",
      "images/iloveimg-compressed (3)/IMG-20240112-WA0008.jpg",
      "images/iloveimg-compressed (3)/IMG-20240112-WA0009.jpg"
    ]
  },
  {
    id: "t230-dining",
    nom: "T230 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: [],
    matiere: [],
    dimensions: "À confirmer",
    prix: "600.000 XAF",
    description: "Table de salle à manger T230, proposée avec ses chaises assorties pour équiper la pièce d'un seul coup. Contactez-nous pour connaître les finitions et les dimensions disponibles.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748430/IMG-20240814-WA0006.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748432/ChatGPT_Image_Sep_23_2026_12_51_35_PM.png0",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748431/IMG-20240814-WA0013.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748430/IMG-20231016-WA0091.jpg",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748429/3-1200x800.jpg"
    ]
  },
  {
    id: "t240-dining",
    nom: "T240 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Marron", "Orange", "Beige"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "600.000 XAF",
    description: "Table ronde au plateau brun foncé posée sur un large pied central métallique, entourée de chaises orange et beige. Idéale pour les petites salles à manger : le pied unique laisse de la place aux jambes.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0017.jpg",
      "images/iloveimg-compressed (3)/ChatGPT Image Sep 22, 2026, 01_35_19 PM.png",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0016.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0018.jpg"
    ]
  },
  {
    id: "t250-dining",
    nom: "T250 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Noir", "Marron"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "600.000 XAF",
    description: "Table ronde au plateau sombre veiné façon pierre, sur un piétement croisé noir, avec des chaises à dossier rond et assise brune. Un esprit industriel chic, parfait près d'une grande baie vitrée.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0019.jpg",
      "images/iloveimg-compressed (3)/5c4d2dc1-fd87-4e65-ad47-0cff97c28f9c.png",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0021.jpg",
      "images/iloveimg-compressed (3)/e0e40d72-2bc5-4ce9-b625-be86b30dfd8a.png"
    ]
  },
  {
    id: "t740-dining",
    nom: "T740 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Gris", "Noir"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "630.000 XAF",
    description: "Table rectangulaire au plateau effet marbre gris, sur un piétement fin en métal noir, accompagnée de chaises en velours gris foncé. Une élégance sobre pour les repas du quotidien.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0027.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0028.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0026.jpg"
    ]
  },
  {
    id: "t720-dining",
    nom: "T720 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Noir", "Beige"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "647.000 XAF",
    description: "Longue table noire à piétement croisé en X, associée à des chaises beige clair. Un contraste moderne qui met en valeur les repas en grande tablée.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 10, 2026, 10_54_01 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 10, 2026, 10_58_30 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 10, 2026, 10_58_27 AM.png",
      "images/iloveimg-compressed (3)/ChatGPT Image Oct 10, 2026, 10_58_22 AM.png"
    ]
  },
  {
    id: "t687-dining",
    nom: "T687 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Blanc", "Jaune", "Orange", "Rouge"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "394.000 XAF",
    description: "Table blanche effet marbre sur pieds clairs, associée à des chaises en velours côtelé aux couleurs vives : moutarde, orange et rouge. Une salle à manger joyeuse, pour mettre de la gaieté à table.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0040.jpg",
      "images/iloveimg-compressed (3)/535899d3-7010-477e-b4ba-19021da503eb.png",
      "images/iloveimg-compressed (3)/558bae22-4b88-4011-b213-591c9de0c90f.png",
      "images/iloveimg-compressed (3)/9f0288b7-3308-4faa-903b-8bc6582b2c5f.png"
    ]
  },
  {
    id: "t670-dining",
    nom: "T670 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Noir", "Blanc"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "487.000 XAF",
    description: "Coin repas complet : table au plateau blanc effet marbre cerclé de noir, banquette d'angle noire et chaises en velours noir. Une solution maligne pour optimiser les petits espaces.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0001.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0002.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0003.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0009.jpg",
      "images/iloveimg-compressed (3)/ChatGPT Image Sep 22, 2026, 11_26_37 AM.png"
    ]
  },
  {
    id: "t650-dining",
    nom: "T650 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Marron", "Beige"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "415.000 XAF",
    description: "Table en bois brun foncé accompagnée de chaises au dossier en bois et à l'assise camel. Un ensemble chaleureux et classique, qui va bien avec un tapis aux tons froids.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0000.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0011.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0012.jpg"
    ]
  },
  {
    id: "t610-dining",
    nom: "T610 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Noir"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "647.000 XAF",
    description: "Table noire effet marbre à piétement en X, entourée de chaises capitonnées noires. Un look sombre et luxueux, parfait pour une salle à manger moderne.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0049.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0046.jpg",
      "images/iloveimg-compressed (3)/ChatGPT Image Sep 22, 2026, 01_47_40 PM.png"
    ]
  },
  {
    id: "t550-dining",
    nom: "T550 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Marron", "Beige"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "459.000 XAF",
    description: "Table ronde en bois brun dotée d'un plateau central, entourée de chaises au dossier courbe en bois et à l'assise marron. Pratique pour partager les plats en famille.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0039.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0038.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0036.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0035.jpg"
    ]
  },
  {
    id: "t414-dining",
    nom: "T414 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Noir", "Gris"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "634.000 XAF",
    description: "Table ronde au plateau noir effet marbre et au piétement noir, avec des chaises gris anthracite aux dossiers galbés. Compacte et élégante, elle est idéale pour 4 convives.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0053.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0052.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0050.jpg",
      "images/iloveimg-compressed (3)/ChatGPT Image Sep 23, 2026, 12_58_34 PM (2).png",
      "images/iloveimg-compressed (3)/ChatGPT Image Sep 23, 2026, 12_58_35 PM (3).png"
    ]
  },
  {
    id: "t320-dining",
    nom: "T320 DINING",
    piece: "Salle à manger",
    categorie: "Tables",
    couleurs: ["Marron", "Noir"],
    matiere: [],
    dimensions: "À confirmer",
    prix: "781.000 XAF",
    description: "Table rectangulaire au plateau brun cuivré sur un pied central sombre, avec des chaises matelassées en velours noir. Un ensemble contemporain et raffiné.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "images/iloveimg-compressed (3)/IMG-20240814-WA0025.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0024.jpg",
      "images/iloveimg-compressed (3)/IMG-20240814-WA0022.jpg"
    ]
  },
  {
    id: "chaise-1",
    nom: "Chaise de salle à manger",
    piece: "Salle à manger",
    categorie: "Chaises",
    couleurs: [],
    matiere: [],
    dimensions: "À confirmer",
    prix: "52.000 XAF",
    description: "Chaise de salle à manger à l'assise confortable, à associer aux tables de la collection. Consultez les photos pour découvrir ses finitions et ses détails.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747696/1db6942d-6ce4-47b9-9110-00a45a79ab59.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747732/e09a0ae7-30a5-430e-a5b1-6a01aabd2528.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747728/e75d7ebc-4756-4ba0-a643-262956e7e808.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747698/74682cce-a602-4402-ab3b-f20017c8ea0d.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747697/a033d287-4090-41d9-b1fa-ffc66cd242f2.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747693/5a1af749-afda-4bdb-88c6-c182b4be1eb4.png"
    ]
  },
  {
    id: "chaise-2",
    nom: "Chaise de salle à manger",
    piece: "Salle à manger",
    categorie: "Chaises",
    couleurs: [],
    matiere: [],
    dimensions: "À confirmer",
    prix: "50.000 XAF",
    description: "Modèle de chaise au profil léger, facile à glisser autour de la table et à déplacer. Un siège polyvalent pour la salle à manger comme pour la cuisine.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747704/ChatGPT_Image_Oct_16_2026_12_05_13_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747704/ChatGPT_Image_Oct_16_2026_12_05_24_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747701/ChatGPT_Image_Oct_16_2026_12_05_05_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747714/ChatGPT_Image_Oct_16_2026_12_05_19_PM.png"
    ]
  },
  {
    id: "chaise-3",
    nom: "Chaise de salle à manger",
    piece: "Salle à manger",
    categorie: "Chaises",
    couleurs: [],
    matiere: [],
    dimensions: "À confirmer",
    prix: "50.000 XAF",
    description: "Chaise pensée pour le quotidien, simple à entretenir et agréable pour les repas de famille. Vendue à l'unité : prévoyez-en autant que de places autour de votre table.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747709/ChatGPT_Image_Oct_16_2026_12_05_29_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747710/ChatGPT_Image_Oct_16_2026_12_05_09_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747703/ChatGPT_Image_Oct_16_2026_12_04_59_PM.png"
    ]
  },
  {
    id: "chaise-4",
    nom: "Chaise de salle à manger",
    piece: "Salle à manger",
    categorie: "Chaises",
    couleurs: [],
    matiere: [],
    dimensions: "À confirmer",
    prix: "50.000 XAF",
    description: "Chaise au style soigné pour équiper ou renouveler votre salle à manger. Elle s'accorde facilement avec l'ensemble de nos tables.",
    entretien: "Utiliser des sous-plats ; nettoyer avec un chiffon humide.",
    disponibilite: "Sur demande",
    fond: ["#c2a47e", "#6d4b30"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747714/ChatGPT_Image_Oct_6_2026_10_43_41_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747709/ChatGPT_Image_Oct_6_2026_10_43_31_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747714/ChatGPT_Image_Oct_6_2026_10_43_37_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747724/ChatGPT_Image_Oct_6_2026_10_43_47_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747724/ChatGPT_Image_Oct_6_2026_10_43_44_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747731/ChatGPT_Image_Oct_6_2026_10_44_30_AM.png"
    ]
  },
  {
    id: "oxford-bedroom",
    nom: "OXFORD BEDROOM",
    piece: "Chambre",
    categorie: "Lits",
    couleurs: ["Bois naturel", "Marron"],
    matiere: ["Tissu", "Bois"],
    dimensions: "Lit : 180 cm × 200 cm",
    prix: "13.768.000 XAF",
    description: "Chambre haut de gamme articulée autour d'une tête de lit capitonnée en tissu et d'une structure en bois, pour un lit de 180 × 200 cm. Les tons bois et marron créent une ambiance feutrée et luxueuse.",
    entretien: "Aspirer la tête de lit ; ne pas frotter les taches.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747743/ChatGPT_Image_Oct_22_2026_10_31_24_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747745/ChatGPT_Image_Oct_22_2026_10_31_10_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747744/ChatGPT_Image_Oct_22_2026_10_31_06_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747744/ChatGPT_Image_Oct_22_2026_10_31_28_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747743/ChatGPT_Image_Oct_22_2026_10_31_20_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747742/ChatGPT_Image_Oct_22_2026_10_31_00_AM.png"
    ]
  },
  {
    id: "ada-bedroom",
    nom: "ADA BEDROOM",
    piece: "Chambre",
    categorie: "Lits",
    couleurs: ["Noir", "Gris"],
    matiere: ["Tissu", "Bois"],
    dimensions: "Lit : 180 cm × 200 cm",
    prix: "3.854.000 XAF",
    description: "Lit de 180 × 200 cm à tête de lit capitonnée dans un tissu gris et noir, sur une structure en bois. Un style moderne et sobre pour une chambre reposante.",
    entretien: "Aspirer la tête de lit ; ne pas frotter les taches.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747733/ChatGPT_Image_2_avr._2026_16_31_46.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747735/e4a5cca9-aca0-4ad0-8f01-7dc9914ffac9.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747734/ba8467aa-1b0b-4da2-a31b-454c0d24c9e7.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747732/74d57e99-3bf2-4ad8-afcd-c24ced863502.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747721/11.jpg"
    ]
  },
  {
    id: "side-bedroom",
    nom: "SIDE BEDROOM",
    piece: "Chambre",
    categorie: "Lits",
    couleurs: ["Blanc"],
    matiere: ["Tissu", "Bois"],
    dimensions: "Lit : 180 cm × 200 cm",
    prix: "4.132.000 XAF",
    description: "Lit de 180 × 200 cm à la tête de lit capitonnée blanche et aux finitions en bois. Lumineux et épuré, il convient aux chambres claires où l'on cherche le calme.",
    entretien: "Aspirer la tête de lit ; ne pas frotter les taches.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184511/ChatGPT_Image_Oct_27_2026_01_17_26_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184510/ChatGPT_Image_Oct_27_2026_01_17_23_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184510/ChatGPT_Image_Oct_27_2026_01_17_21_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184508/ChatGPT_Image_Oct_27_2026_01_17_07_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184506/ChatGPT_Image_Oct_27_2026_01_17_02_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184505/ChatGPT_Image_Oct_27_2026_01_16_58_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184502/ChatGPT_Image_Oct_27_2026_01_16_47_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184502/ChatGPT_Image_Oct_27_2026_01_16_45_PM.png"
    ]
  },
  {
    id: "alberta-bedroom",
    nom: "ALBERTA BEDROOM",
    piece: "Chambre",
    categorie: "Lits",
    couleurs: ["Bois naturel"],
    matiere: ["Tissu", "Bois"],
    dimensions: "Lit : 180 cm × 200 cm",
    prix: "12.560.000 XAF",
    description: "Chambre au style classique et chaleureux : tête de lit capitonnée en tissu, finitions en bois et lit de 180 × 200 cm. Un ensemble généreux pour une chambre parentale élégante.",
    entretien: "Aspirer la tête de lit ; ne pas frotter les taches.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747752/ChatGPT_Image_Oct_22_2026_10_37_43_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747751/ChatGPT_Image_Oct_22_2026_10_37_34_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747751/ChatGPT_Image_Oct_22_2026_10_37_31_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747749/ChatGPT_Image_Oct_22_2026_10_37_37_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747747/ChatGPT_Image_Oct_22_2026_10_37_17_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747747/ChatGPT_Image_Oct_22_2026_10_34_04_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747747/ChatGPT_Image_Oct_22_2026_10_37_13_AM.png"
    ]
  },
  {
    id: "mimoza-dressing",
    nom: "MIMOZA DRESSING",
    piece: "Chambre",
    categorie: "Armoires",
    couleurs: ["Beige", "Doré"],
    matiere: ["Tissu", "Bois"],
    dimensions: "",
    prix: "à demander",
    description: "Immense armoire dressing beige aux détails dorés, pour ranger toute une garde-robe avec élégance. Elle apporte une touche de luxe à la chambre.",
    entretien: "Dépoussiérer avec un chiffon doux ; éviter l'humidité.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184498/ChatGPT_Image_Oct_23_2026_11_40_13_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184495/ChatGPT_Image_Oct_23_2026_11_40_04_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184495/ChatGPT_Image_Oct_23_2026_11_40_01_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184494/ChatGPT_Image_Oct_23_2026_11_39_57_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793182941/ChatGPT_Image_Oct_23_2026_11_40_10_AM.png"
    ]
  },
  {
    id: "vita-dressing",
    nom: "VITA DRESSING",
    piece: "Chambre",
    categorie: "Armoires",
    couleurs: ["Beige", "Noir"],
    matiere: ["Tissu", "Bois"],
    dimensions: "",
    prix: "à demander",
    description: "Grande armoire dressing alliant le beige et le noir pour un rendu contemporain et contrasté. Ses grands volumes de rangement conviennent aux garde-robes bien remplies.",
    entretien: "Dépoussiérer avec un chiffon doux ; éviter l'humidité.",
    disponibilite: "Sur demande",
    fond: ["#e0d3bd", "#8a6b4d"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184514/ChatGPT_Image_Oct_27_2026_01_17_50_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184515/ChatGPT_Image_Oct_27_2026_01_17_53_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184514/ChatGPT_Image_Oct_27_2026_01_17_47_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184513/ChatGPT_Image_Oct_27_2026_01_17_44_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184512/ChatGPT_Image_Oct_27_2026_01_17_41_PM.png"
    ]
  },
  {
    id: "Luna-bedroom",
    nom: "LUNA BEDROOM",
    piece: "Chambre pour enfant",
    categorie: "Chambres enfants",
    couleurs: ["Gris", "Bois naturel"],
    matiere: ["Bois"],
    dimensions: "Lit : 120 cm × 200 cm",
    prix: null,
    description: "Chambre d'enfant en bois naturel et gris, avec un lit de 120 × 200 cm et des rangements spacieux aux finitions soignées. Un décor doux qui accompagne l'enfant en grandissant.",
    entretien: "Dépoussiérer ; éviter l'humidité.",
    disponibilite: "Sur demande",
    fond: ["#e8dfd0", "#a98660"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747764/ChatGPT_Image_Oct_10_2026_11_55_07_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747736/ChatGPT_Image_Oct_10_2026_11_53_44_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747738/ChatGPT_Image_Oct_10_2026_11_55_45_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747736/ChatGPT_Image_Oct_10_2026_11_55_02_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747736/ChatGPT_Image_Oct_10_2026_11_54_55_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747764/ChatGPT_Image_Oct_10_2026_11_54_44_AM.png"
    ]
  },
  {
    id: "lit-bedroom",
    nom: "BEDROOM",
    piece: "Chambre pour enfant",
    categorie: "Chambres enfants",
    couleurs: ["Gris", "Bois naturel"],
    matiere: ["Bois"],
    dimensions: "Lit : 120 cm × 200 cm",
    prix: null,
    description: "Lit en bois de 120 × 200 cm aux teintes gris et bois naturel, au look simple et douillet. Il convient à la chambre d'un enfant comme à celle d'un adolescent.",
    entretien: "Dépoussiérer ; éviter l'humidité.",
    disponibilite: "Sur demande",
    fond: ["#e8dfd0", "#a98660"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747763/f1ce44c5-6350-48f1-928a-a432c8024768.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747763/a57772c0-3c72-4419-8b3d-0ead8b4e2187.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747760/c4b43b01-5f37-409c-87fa-8ab42d262510.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747760/6e483a3a-8d73-4639-9651-7564a128468d.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747758/1e1c3d7d-1990-41dc-8060-099efae7efc6.png"
    ]
  },
  {
    id: "trio-bedroom",
    nom: "TRIO BEDROOM",
    piece: "Chambre pour enfant",
    categorie: "Chambres enfants",
    couleurs: ["Gris", "Bois naturel"],
    matiere: ["Bois"],
    dimensions: "Lit : 120 cm × 200 cm",
    prix: "565.000 XAF",
    description: "Ensemble Trio pour chambre d'enfant, en bois gris et naturel, avec un lit de 120 × 200 cm. Pensé pour optimiser l'espace tout en gardant des finitions soignées.",
    entretien: "Dépoussiérer ; éviter l'humidité.",
    disponibilite: "Sur demande",
    fond: ["#e8dfd0", "#a98660"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184498/ChatGPT_Image_Oct_19_2026_02_05_54_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1793184498/ChatGPT_Image_Oct_19_2026_02_05_57_PM.png"
    ]
  },
  {
    id: "bureau-pnt29-1",
    nom: "BUREAU PNT29-1",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: [],
    matiere: [],
    dimensions: "2,40 m × 1,80 m",
    prix: "930.000 XAF",
    description: "Grand bureau de 2,40 m sur 1,80 m, qui offre un vaste plan de travail et de la place pour les dossiers et l'ordinateur. Un format de direction pour un espace professionnel confortable.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846630/ChatGPT_Image_Oct_24_2026_01_23_47_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846628/ChatGPT_Image_Oct_24_2026_01_23_36_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846629/ChatGPT_Image_Oct_24_2026_01_23_44_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846630/ChatGPT_Image_Oct_24_2026_01_23_53_PM.png"
    ]
  },
  {
    id: "bureau-pnt11-18",
    nom: "BUREAU PNT11-18",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: [],
    matiere: [],
    dimensions: "3,02 m × 2,20 m × 0,76 m",
    prix: "2.142.000 XAF",
    description: "Imposant bureau de direction de 3,02 m sur 2,20 m, haut de 0,76 m. Il est conçu pour les grands espaces de travail et les bureaux de responsables.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846642/ChatGPT_Image_Oct_24_2026_01_33_03_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846641/ChatGPT_Image_Oct_24_2026_01_24_21_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846644/ChatGPT_Image_Oct_24_2026_01_33_11_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846645/ChatGPT_Image_Oct_24_2026_01_33_21_PM.png"
    ]
  },
  {
    id: "bureau-pnt12-1",
    nom: "BUREAU PNT12-1",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: [],
    matiere: [],
    dimensions: "3,20 m × 2,05 m × 0,75 m",
    prix: "1.441.000 XAF",
    description: "Bureau grand format de 3,20 m sur 2,05 m, à 0,75 m de hauteur, pour disposer d'une surface de travail très généreuse. Un choix adapté aux directions et aux cabinets spacieux.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846647/ChatGPT_Image_Oct_24_2026_01_33_27_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846648/ChatGPT_Image_Oct_24_2026_01_33_31_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846650/ChatGPT_Image_Oct_24_2026_01_33_35_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792846652/ChatGPT_Image_Oct_24_2026_01_33_40_PM.png"
    ]
  },
  {
    id: "bureau-secretaire",
    nom: "BUREAU SECRETAIRE",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: ["Gris", "Noir"],
    matiere: ["Acier"],
    dimensions: "1,40 m × 0,80 m",
    prix: "451.000 XAF",
    description: "Bureau de secrétariat en acier gris et noir, de 1,40 m sur 0,80 m. Un plan de travail sobre et robuste pour la maison ou le cabinet.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747633/ChatGPT_Image_Oct_14_2026_03_35_12_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747667/ChatGPT_Image_Oct_14_2026_10_44_54_AM.png"
    ]
  },
  {
    id: "bureau-4PLACES",
    nom: "BUREAU 4PLACES",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: ["Gris", "Noir"],
    matiere: ["Acier"],
    dimensions: "1,40 m × 0,80 m",
    prix: "451.000 XAF",
    description: "Bureau collectif en acier pensé pour 4 postes de travail, afin d'équiper une salle d'équipe ou un open space. Gris et noir pour un rendu professionnel et sans fioriture.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747665/ChatGPT_Image_Oct_14_2026_10_24_39_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747679/ChatGPT_Image_Oct_14_2026_10_24_22_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747698/ChatGPT_Image_Oct_14_2026_10_24_29_AM.png"
    ]
  },
  {
    id: "bureau-2PLACES",
    nom: "BUREAU 2PLACES",
    piece: "Bureau",
    categorie: "Bureaux",
    couleurs: ["Gris", "Noir"],
    matiere: ["Acier"],
    dimensions: "1,40 m × 0,80 m",
    prix: "451.000 XAF",
    description: "Bureau double en acier pour 2 postes de travail, idéal pour deux collaborateurs qui travaillent côte à côte. Structure solide, finition grise et noire.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747664/ChatGPT_Image_Oct_14_2026_10_24_17_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747640/ChatGPT_Image_Oct_14_2026_10_24_11_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747638/ChatGPT_Image_Oct_14_2026_10_24_01_AM.png"
    ]
  },
  {
    id: "table-de-reception",
    nom: "TABLE DE RECEPTION",
    piece: "Bureau",
    categorie: "Réception",
    couleurs: ["Gris", "Noir"],
    matiere: ["Acier"],
    dimensions: "2 m × 0,70 m × 1,05 m",
    prix: "583.000 XAF",
    description: "Banque d'accueil moderne en acier gris et noir, de 2 m de long et 1,05 m de haut. Elle structure l'entrée d'un cabinet ou d'un espace professionnel.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747627/c03a52dc-489d-4626-a518-87c869920168.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747543/325e2615-718e-4033-be6c-1c6ec2d380b8.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792450261/1e96ec9b-8271-415d-885c-fc2c1c633e19.png"
    ]
  },
  {
    id: "chaise-de-reception",
    nom: "CHAISE DE RECEPTION",
    piece: "Bureau",
    categorie: "Réception",
    couleurs: ["Gris", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise d'accueil en acier gris et noir, assortie à la banque de réception. Pour que l'hôtesse ou le réceptionniste travaille assis confortablement.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747689/ChatGPT_Image_Oct_2_2026_11_39_49_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747687/ChatGPT_Image_Oct_2_2026_11_39_33_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747685/ChatGPT_Image_Oct_2_2026_11_39_40_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747683/ChatGPT_Image_Oct_2_2026_11_39_23_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747682/ChatGPT_Image_Oct_2_2026_11_39_14_AM.png"
    ]
  },
  {
    id: "pupitre-de-bureau",
    nom: "PUPITRE DE BUREAU",
    piece: "Bureau",
    categorie: "Réception",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Pupitre d'accueil en acier beige et noir, à placer à l'entrée pour accueillir et orienter les visiteurs. Un meuble discret et pratique pour un cabinet ou une entreprise.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747622/ChatGPT_Image_Oct_6_2026_10_11_09_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747617/ChatGPT_Image_Oct_6_2026_10_09_50_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747617/ChatGPT_Image_Oct_6_2026_10_09_15_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747616/ChatGPT_Image_Oct_6_2026_10_09_43_AM.png"
    ]
  },
  {
    id: "chaise-ISO",
    nom: "CHAISE ISO",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise de bureau ISO à structure en acier, en beige et noir. Un siège simple et pratique pour un poste de travail ou une salle d'attente.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747589/Gemini_Generated_Image_rvqd21rvqd21rvqd.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747590/Gemini_Generated_Image_xvuhwkxvuhwkxvuh.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747611/enhanced_1761744756519_n6qgw2.webp"
    ]
  },
  {
    id: "chaise-de-bureau",
    nom: "CHAISE DE BUREAU C1",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Modèle C1 de chaise de bureau, en acier beige et noir, conçu pour les longues journées devant l'ordinateur. Une assise stable pour un poste de travail quotidien.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747674/ChatGPT_Image_Oct_16_2026_02_38_13_PM.png"
    ]
  },
  {
    id: "chaise-de-bureau-b1",
    nom: "CHAISE DE BUREAU B1",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise de bureau B1 aux lignes sobres, en acier beige et noir. Un siège de travail qui s'intègre facilement dans un bureau professionnel.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747677/ChatGPT_Image_Oct_16_2026_02_38_16_PM.png"
    ]
  },
  {
    id: "chaise-de-bureau-a1",
    nom: "CHAISE DE BUREAU A1",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise de bureau A1 en acier beige et noir, présentée sous plusieurs angles dans la galerie. Un modèle polyvalent pour équiper un poste de travail.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747671/ChatGPT_Image_Oct_16_2026_02_37_54_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747681/ChatGPT_Image_Oct_16_2026_02_38_25_PM.png"
    ]
  },
  {
    id: "chaise-de-bureau-a2",
    nom: "CHAISE D'INVITÉ A2",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise d'invité A2 en acier beige et noir, à placer face au bureau pour recevoir clients et visiteurs. Un siège accueillant et discret.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747679/ChatGPT_Image_Oct_16_2026_02_38_19_PM.png"
    ]
  },
  {
    id: "chaise-de-bureau-d1",
    nom: "CHAISE DE BUREAU D1",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise de bureau D1 au design épuré, en acier beige et noir. Pensée pour se glisser sous un bureau et rester agréable à vivre.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747673/ChatGPT_Image_Oct_16_2026_02_38_10_PM.png"
    ]
  },
  {
    id: "chaise-de-bureau-e1",
    nom: "CHAISE DE BUREAU E1",
    piece: "Bureau",
    categorie: "Chaises de bureau",
    couleurs: ["Beige", "Noir"],
    matiere: ["Acier"],
    dimensions: "À confirmer",
    prix: "583.000 XAF",
    description: "Chaise de bureau E1 en acier beige et noir, dernière de la série. Une option sobre pour compléter l'équipement d'un espace professionnel.",
    entretien: "Essuyer avec un chiffon doux.",
    disponibilite: "Sur demande",
    fond: ["#bd9a70", "#40302a"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747669/ChatGPT_Image_Oct_16_2026_02_38_06_PM.png"
    ]
  },
  {
    id: "meuble-tv-lizbon",
    nom: "MEUBLE TV LIZBON",
    piece: "Meuble télé",
    categorie: "Meubles TV",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Bois"],
    dimensions: "À confirmer",
    prix: "",
    description: "Meuble TV en bois naturel et blanc, avec des rangements fermés sous un plateau prévu pour le téléviseur. Il s'accorde au salon Lizbon et garde le séjour bien rangé.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748011/ChatGPT_Image_Oct_1_2026_01_15_08_PM_1.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748011/ChatGPT_Image_Oct_1_2026_01_15_09_PM_2.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748017/ChatGPT_Image_Oct_1_2026_01_15_10_PM_5.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792748015/ChatGPT_Image_Oct_1_2026_01_15_10_PM_4.png"
    ]
  },
  {
    id: "console",
    nom: "CONSOLE LOUIS VITTON",
    piece: "Consoles",
    categorie: "Consoles",
    couleurs: ["Gris", "Doré"],
    matiere: ["Marbre", "Acier"],
    dimensions: "À confirmer",
    prix: "",
    description: "Console au plateau en marbre gris, soutenue par une structure en acier doré. Une pièce décorative à poser dans une entrée ou un salon pour une touche de luxe.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747772/ChatGPT_Image_Oct_10_2026_01_44_51_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747772/ChatGPT_Image_Oct_10_2026_01_44_48_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747770/ChatGPT_Image_Oct_10_2026_01_34_10_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747769/ChatGPT_Image_Oct_10_2026_01_34_07_PM.png"
    ]
  },
  {
    id: "Diffuseurs-1",
    nom: "DIFFUSEUR ÉLECTRIQUE",
    piece: "Diffuseurs",
    categorie: "Diffuseurs de parfum",
    couleurs: ["Gris", "Noir"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Diffuseur de parfum électrique sans fumée, gris et noir, pilotable à la main ou depuis votre téléphone grâce à l'application. Il parfume toute la pièce sans effort.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747802/ChatGPT_Image_Oct_10_2026_10_15_39_AM.png"
    ]
  },
  {
    id: "Diffuseurs-2",
    nom: "DIFFUSEUR ÉLECTRIQUE",
    piece: "Diffuseurs",
    categorie: "Diffuseurs de parfum",
    couleurs: ["Blanc"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Diffuseur de parfum électrique blanc, sans fumée, avec commande manuelle ou via l'application sur téléphone. Son coloris clair se fond dans tous les décors.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747800/ChatGPT_Image_Oct_10_2026_10_12_17_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747796/ChatGPT_Image_Oct_10_2026_10_11_13_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747796/ChatGPT_Image_Oct_10_2026_10_12_14_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747796/ChatGPT_Image_Oct_10_2026_10_12_09_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747796/ChatGPT_Image_Oct_10_2026_10_11_10_AM.png"
    ]
  },
  {
    id: "panier-à-linge1",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Blanc"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge blanc pour la salle de bain ou la buanderie, qui garde le linge sale à l'abri des regards. Un modèle clair et facile à intégrer.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747804/ChatGPT_Image_Oct_13_2026_11_52_15_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747804/ChatGPT_Image_Oct_13_2026_11_52_12_AM.png"
    ]
  },
  {
    id: "panier-à-linge2",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Blanc"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge blanc au format pratique, pour trier et ranger le linge à portée de main. Une solution discrète pour une salle de bain bien tenue.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747804/ChatGPT_Image_Oct_13_2026_11_52_15_AM.png"
    ]
  },
  {
    id: "panier-à-linge3",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Blanc"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge blanc au style épuré, pour organiser le linge dans la salle de bain ou la chambre. Simple, léger et pratique au quotidien.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747804/ChatGPT_Image_Oct_13_2026_11_52_18_AM.png"
    ]
  },
  {
    id: "panier-à-linge4",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Gris"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge gris, un coloris sobre qui masque bien les traces d'usage. Il trouve sa place dans la salle de bain comme dans le dressing.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747806/ChatGPT_Image_Oct_13_2026_11_52_22_AM.png"
    ]
  },
  {
    id: "panier-à-linge5",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Gris"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge gris aux lignes simples, pour ranger le linge sale sans encombrer la pièce. Un accessoire utile et facile à assortir à la décoration.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747808/ChatGPT_Image_Oct_13_2026_11_52_27_AM.png"
    ]
  },
  {
    id: "panier-à-linge6",
    nom: "PANIER À LINGE",
    piece: "Rangement",
    categorie: "Accessoires de douche",
    couleurs: ["Gris"],
    matiere: [],
    dimensions: "",
    prix: "",
    description: "Panier à linge gris, dernier modèle de la série, pour garder la salle de bain ordonnée. Pratique à déplacer et à vider le jour de la lessive.",
    entretien: "Dépoussiérer ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747808/ChatGPT_Image_Oct_13_2026_11_52_30_AM.png"
    ]
  },
  {
    id: "applique-murale-c140",
    nom: "APPLIQUE MURALE C140",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "48.000 XAF",
    description: "Applique murale à finition bois naturel et blanc, qui associe métal et verre pour une lumière chaleureuse. Compacte, elle habille aussi bien un couloir qu'un chevet.",
    entretien: "Nettoyer avec un chiffon microfibre sec hors tension.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747845/ChatGPT_Image_Oct_13_2026_09_55_30_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747846/ChatGPT_Image_Oct_13_2026_09_55_34_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747843/ChatGPT_Image_Oct_13_2026_09_55_26_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747842/ChatGPT_Image_Oct_13_2026_09_55_22_AM.png"
    ]
  },
  {
    id: "applique-murale-c235",
    nom: "APPLIQUE MURALE C235",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "44.000 XAF",
    description: "Applique C235 dont le verre diffuse une lumière douce, montée sur une structure en métal. Son format discret s'insère partout, du salon à la chambre.",
    entretien: "Nettoyer avec un chiffon microfibre sec hors tension.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747849/ChatGPT_Image_Oct_13_2026_09_56_02_AM.png"
    ]
  },
  {
    id: "applique-murale-w250",
    nom: "APPLIQUE MURALE W250",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "52.000 XAF",
    description: "Applique W250 où le métal et le verre se répondent pour mettre un mur en valeur. À poser de chaque côté d'un miroir ou d'une tête de lit pour un éclairage symétrique.",
    entretien: "Nettoyer avec un chiffon microfibre sec hors tension.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747855/ChatGPT_Image_Oct_13_2026_09_57_26_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747855/ChatGPT_Image_Oct_13_2026_09_58_00_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747855/ChatGPT_Image_Oct_13_2026_09_57_20_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747853/ChatGPT_Image_Oct_13_2026_09_56_38_AM.png"
    ]
  },
  {
    id: "applique-murale-w350",
    nom: "APPLIQUE MURALE W350",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "63.000 XAF",
    description: "Applique W350 au format généreux, en métal et verre, qui éclaire largement un grand pan de mur. Elle fait aussi office de pièce décorative dans un salon ou une entrée.",
    entretien: "Nettoyer avec un chiffon microfibre sec hors tension.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747860/ChatGPT_Image_Oct_13_2026_09_58_08_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747860/ChatGPT_Image_Oct_13_2026_09_58_04_AM.png"
    ]
  },
  {
    id: "applique-murale-s285",
    nom: "APPLIQUE MURALE S285",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "48.000 XAF",
    description: "Applique S285 aux lignes sobres, qui mêle bois naturel, blanc et verre pour une ambiance accueillante. Un éclairage d'appoint idéal pour un couloir, un escalier ou une chambre.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747966/ChatGPT_Image_Oct_13_2026_10_04_46_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747868/ChatGPT_Image_Oct_13_2026_10_05_14_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747865/ChatGPT_Image_Oct_13_2026_10_04_32_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747865/ChatGPT_Image_Oct_13_2026_10_04_36_AM.png"
    ]
  },
  {
    id: "applique-murale-b232",
    nom: "APPLIQUE MURALE B232",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "44.000 XAF",
    description: "Applique B232 dont le verre diffuse une lumière douce et chaleureuse. Facile à poser, elle crée une atmosphère tamisée le soir.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747873/ChatGPT_Image_Oct_13_2026_10_05_31_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747872/ChatGPT_Image_Oct_13_2026_10_05_35_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747871/ChatGPT_Image_Oct_13_2026_10_05_27_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747868/ChatGPT_Image_Oct_13_2026_10_05_20_AM.png"
    ]
  },
  {
    id: "applique-murale-b140",
    nom: "APPLIQUE MURALE B140",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "50.000 XAF",
    description: "Applique B140 en métal et verre, qui diffuse une lumière douce. Elle se pose volontiers en paire pour encadrer un lit ou un canapé.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747885/ChatGPT_Image_Oct_13_2026_10_05_58_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747887/ChatGPT_Image_Oct_13_2026_10_05_54_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747888/ChatGPT_Image_Oct_13_2026_10_06_02_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747883/ChatGPT_Image_Oct_13_2026_10_05_50_AM.png"
    ]
  },
  {
    id: "applique-murale-o350",
    nom: "APPLIQUE MURALE O350",
    piece: "Luminaires",
    categorie: "Appliques murales",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "63.000 XAF",
    description: "Applique O350 au format large, en métal et verre aux finitions bois naturel et blanc. Elle crée une ambiance lumineuse et chaleureuse dans un salon ou une entrée.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747890/ChatGPT_Image_Oct_13_2026_10_06_17_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747893/ChatGPT_Image_Oct_13_2026_10_07_42_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747895/ChatGPT_Image_Oct_13_2026_10_07_48_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747895/ChatGPT_Image_Oct_13_2026_10_07_45_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747889/ChatGPT_Image_Oct_13_2026_10_06_09_AM.png"
    ]
  },
  {
    id: "lustre-g510",
    nom: "LUSTRE G510",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "131.000 XAF",
    description: "Lustre suspension G510 en métal et verre, pensé pour apporter une touche sophistiquée au salon ou à la salle à manger.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747915/ChatGPT_Image_Oct_10_2026_01_50_28_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747909/ChatGPT_Image_Oct_10_2026_01_50_25_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747908/ChatGPT_Image_Oct_10_2026_01_50_21_PM.png"
    ]
  },
  {
    id: "lustre-w45",
    nom: "LUSTRE W45",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "73.000 XAF",
    description: "Suspension W45 aux finitions bois naturel et blanc, qui s'intègre facilement dans une petite pièce, un couloir ou une entrée.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747916/ChatGPT_Image_Oct_10_2026_01_53_03_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747918/ChatGPT_Image_Oct_10_2026_01_53_34_PM.png"
    ]
  },
  {
    id: "lustre-r38",
    nom: "LUSTRE R38",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "73.000 XAF",
    description: "Lustre R38 en métal et verre, élégant et léger visuellement, pour éclairer une chambre ou un coin repas.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747919/ChatGPT_Image_Oct_10_2026_03_13_32_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747919/ChatGPT_Image_Oct_10_2026_03_13_28_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747931/ChatGPT_Image_Oct_10_2026_03_13_36_PM.png"
    ]
  },
  {
    id: "lustre-w330-2",
    nom: "LUSTRE W330/2",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "77.000 XAF",
    description: "Lustre W330/2 en métal et verre, une suspension raffinée qui se remarque sans surcharger la pièce.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747933/ChatGPT_Image_Oct_10_2026_03_13_46_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747933/ChatGPT_Image_Oct_10_2026_03_13_51_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747946/ChatGPT_Image_Oct_10_2026_03_13_54_PM.png"
    ]
  },
  {
    id: "lustre-g330",
    nom: "LUSTRE G330",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "79.000 XAF",
    description: "Lustre G330 de la série G, en métal et verre : une suspension moderne qui habille un salon ou une chambre d'une lumière douce.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747948/ChatGPT_Image_Oct_10_2026_03_14_05_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747953/ChatGPT_Image_Oct_10_2026_03_14_16_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747953/ChatGPT_Image_Oct_10_2026_03_14_28_PM.png"
    ]
  },
  {
    id: "lustre-w450",
    nom: "LUSTRE W450",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "61.000 XAF",
    description: "Lustre W450 sobre, aux finitions bois naturel et blanc, qui diffuse une lumière douce au-dessus d'une table ou d'un lit.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747958/ChatGPT_Image_Oct_10_2026_03_14_44_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747958/ChatGPT_Image_Oct_10_2026_03_14_47_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747953/ChatGPT_Image_Oct_10_2026_03_14_31_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747953/ChatGPT_Image_Oct_10_2026_03_14_35_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747953/ChatGPT_Image_Oct_10_2026_03_14_40_PM.png"
    ]
  },
  {
    id: "lustre-w520",
    nom: "LUSTRE W520",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "61.000 XAF",
    description: "Lustre W520 au design contemporain, en métal et verre, pour donner du relief au plafond d'un salon.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747965/ChatGPT_Image_Oct_10_2026_03_14_51_PM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747964/ChatGPT_Image_Oct_13_2026_09_43_25_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747960/ChatGPT_Image_Oct_13_2026_09_41_51_AM.png"
    ]
  },
  {
    id: "lustre-r500",
    nom: "LUSTRE R500",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "73.000 XAF",
    description: "Lustre R500 en métal et verre aux finitions claires, qui apporte une lumière régulière et agréable dans les pièces de vie.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747966/ChatGPT_Image_Oct_13_2026_09_53_03_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747966/ChatGPT_Image_Oct_13_2026_09_53_08_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747980/ChatGPT_Image_Oct_13_2026_09_53_12_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747981/ChatGPT_Image_Oct_13_2026_09_53_15_AM.png"
    ]
  },
  {
    id: "lustre-b600",
    nom: "LUSTRE B600",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "129.000 XAF",
    description: "Lustre suspension B600 grand format, qui offre une luminosité optimale et un design raffiné. À privilégier pour les grands salons et les entrées spacieuses.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747985/ChatGPT_Image_Oct_13_2026_09_53_43_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747985/ChatGPT_Image_Oct_13_2026_09_53_48_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747991/ChatGPT_Image_Oct_13_2026_09_53_56_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747992/ChatGPT_Image_Oct_13_2026_09_53_51_AM.png"
    ]
  },
  {
    id: "lustre-w600",
    nom: "LUSTRE W600",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "129.000 XAF",
    description: "Grand lustre W600 aux finitions bois naturel et blanc, qui sublime une pièce spacieuse d'une lumière abondante et élégante.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747981/ChatGPT_Image_Oct_13_2026_09_53_35_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747983/ChatGPT_Image_Oct_13_2026_09_53_38_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747984/ChatGPT_Image_Oct_13_2026_09_53_24_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747998/ChatGPT_Image_Oct_13_2026_09_53_29_AM.png"
    ]
  },
  {
    id: "jardin-salon-terrasse",
    nom: "SALON DE JARDIN ET TERRASSE",
    piece: "JARDIN",
    categorie: "Jardin",
    couleurs: ["Gris", "Vert"],
    matiere: ["Métal", "Tissu"],
    dimensions: "À confirmer",
    prix: null,
    description: "Salon de jardin et terrasse en métal et tissu, aux coloris gris et vert, pour profiter de l'extérieur. Des assises confortables pour déjeuner dehors ou se détendre en soirée.",
    entretien: "Nettoyer avec un chiffon humide ; ranger à l'abri en cas de forte pluie.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747824/ChatGPT_Image_Oct_10_2026_11_17_35_AM.png",
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747821/ChatGPT_Image_Oct_10_2026_11_17_29_AM.png"
    ]
  },
  {
    id: "lustre-145-800",
    nom: "LUSTRE 145/800",
    piece: "Luminaires",
    categorie: "Lustres",
    couleurs: ["Bois naturel", "Blanc"],
    matiere: ["Métal", "Verre"],
    dimensions: "À confirmer",
    prix: "268.000 XAF",
    description: "Lustre majestueux conçu pour sublimer les hauts plafonds et les grands espaces de vie. Une pièce maîtresse en métal et verre pour un séjour de réception ou une grande entrée.",
    entretien: "Dépoussiérer avec un chiffon doux hors tension ; éviter les produits abrasifs.",
    disponibilite: "Sur demande",
    fond: ["#cbb08a", "#5d4430"],
    photos: [
      "https://res.cloudinary.com/enepocmi/image/upload/v1792747865/ChatGPT Image Oct 10, 2026, 01_45_11 PM.png"
    ]
  }
];


// Ambiances de la page Inspirations : "produits" = identifiants des meubles
const AMBIANCES = [
  {
    nom: "Salon chaleureux",
    texte: "Tons sable et bois naturel pour un salon où l'on aime se retrouver.",
    produits: ["canape-angle", "fauteuil", "table-basse", "meuble-tv"],
    fond: ["#d8c6a8", "#7a5233"]
  },
  {
    nom: "Repas en famille",
    texte: "Une salle à manger lumineuse, simple et élégante.",
    produits: ["table-repas", "chaises"],
    fond: ["#e5d8c2", "#6d4b30"]
  },
  {
    nom: "Chambre apaisante",
    texte: "Matières douces et couleurs claires pour bien se reposer.",
    produits: ["lit", "armoire"],
    fond: ["#e8ddca", "#8a6b4d"]
  },
  {
    nom: "Coin de travail",
    texte: "Un bureau et un fauteuil pour travailler au calme.",
    produits: ["bureau", "fauteuil"],
    fond: ["#cdb89a", "#40302a"]
  }
];