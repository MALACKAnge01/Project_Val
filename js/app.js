// ==========================================================
// Valencia — logique du site
// Les pages sont affichées selon l'adresse après le "#"
// (ex. #/catalogue, #/produit/lit).
// ==========================================================

const contenu = document.getElementById("contenu");
const menu = document.getElementById("menu");
const boutonMenu = document.getElementById("bouton-menu");

// ---------- Petites fonctions utiles ----------

// Évite qu'un texte casse le HTML
function securiser(texte) {
  const remplacements = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(texte).replace(/[&<>"]/g, (c) => remplacements[c]);
}

// Crée un lien WhatsApp avec un message déjà écrit
function lienWhatsApp(message) {
  return "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(message);
}

function trouverProduit(id) {
  return PRODUITS.find((produit) => produit.id === id);
}

function texteDuPrix(produit) {
  return produit.prix ? produit.prix : "Prix sur demande";
}

function sansExemple(nom) {
  return nom.replace(" (exemple)", "");
}

// ---------- Favoris (gardés dans le navigateur) ----------

let favoris = [];

try {
  favoris = JSON.parse(localStorage.getItem("valencia-favoris") || "[]");
} catch (erreur) {
  favoris = [];
}

function sauvegarderFavoris() {
  try {
    localStorage.setItem("valencia-favoris", JSON.stringify(favoris));
  } catch (erreur) {
    // Si le navigateur refuse, les favoris restent valables jusqu'au rechargement
  }
  const lien = document.getElementById("lien-favoris");
  lien.textContent = favoris.length ? "Favoris (" + favoris.length + ")" : "Favoris";
}

function basculerFavori(id) {
  if (favoris.includes(id)) {
    favoris = favoris.filter((x) => x !== id);
  } else {
    favoris.push(id);
  }
  sauvegarderFavoris();
}

// ---------- Éléments d'affichage réutilisables ----------

// Photo du produit (par défaut la première, ou selon le numéro), ou image temporaire si indisponible
function afficherImage(produit, numero = 0) {
  if (produit && produit.photos && produit.photos[numero]) {
    return `<img src="${securiser(produit.photos[numero])}" alt="${securiser(produit.nom)}" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:6px">`;
  }
  
  // Fallback sur le bloc SVG temporaire si aucune photo n'est trouvée
  return imageTemporaire(produit ? produit.fond : null, produit ? produit.nom : "");
}

function imageTemporaire(fond, nom) {
  const c1 = (fond && fond[0]) ? fond[0] : '#d8c6a8';
  const c2 = (fond && fond[1]) ? fond[1] : '#9a7a58';

  return '<div class="image-temp" role="img" aria-label="Image temporaire : ' + securiser(nom) + '"' +
         ' style="--c1:' + c1 + ';--c2:' + c2 + '">' +
         '<svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">' +
         '<path d="M0 45h100v15H0zM10 45V30h30v15M50 45V35h40v10M14 30c0-6 24-6 24 0" fill="#fff"/></svg>' +
         '<span>Image temporaire</span></div>';
}

function carteProduit(produit) {
  const estFavori = favoris.includes(produit.id);

  return `
    <article class="carte">
      <a href="#/produit/${produit.id}" aria-label="${securiser(produit.nom)}">
        ${afficherImage(produit)}
      </a>
      <div class="texte">
        <span class="etiquette">${securiser(produit.piece)} · ${securiser(produit.categorie)}</span>
        <h3><a href="#/produit/${produit.id}" style="text-decoration:none">${securiser(produit.nom)}</a></h3>
        <p>${securiser(produit.description)}</p>
        <p><b>${texteDuPrix(produit)}</b></p>
        <div class="ligne" style="margin-top:auto">
          <a class="bouton bouton-petit" href="#/produit/${produit.id}">Voir</a>
          <button class="bouton-favori" aria-pressed="${estFavori}" data-favori="${produit.id}">
            ${estFavori ? "♥ Retirer" : "♡ Favori"}
          </button>
        </div>
      </div>
    </article>`;
}

// ---------- Les pages ----------

function pageAccueil() {
  const message = "Bonjour Valencia, je souhaite des renseignements sur vos meubles.";

  const collections = PIECES.map((piece) => {
    // Trouve le produit correspondant à cette pièce (ex: Salon)
    const exemple = PRODUITS.find((p) => p.piece === piece);
    
    // Si un produit existe pour cette pièce, on utilise afficherImage(), sinon un fallback
    const imageAffichee = exemple ? afficherImage(exemple) : imageTemporaire(null, piece);

    return `
      <a class="carte" href="#/catalogue/${encodeURIComponent(piece)}" style="text-decoration:none">
        ${imageAffichee}
        <div class="texte">
          <h3>${securiser(piece)}</h3>
          <p>Voir les meubles</p>
        </div>
      </a>`;
  }).join("");

  // ... le reste de votre code de page d'accueil ...


  return `
    <section class="accueil-haut">
      <div>
        <h1>L'élégance durable, le confort au quotidien</h1>
        <p class="intro">Valencia propose à Pointe-Noire des meubles de premier choix, principalement d'origine turque, choisis pour leur durabilité, leur confort et leur design moderne.</p>
        <div class="ligne">
          <a class="bouton" href="#/catalogue">Découvrir nos collections</a>
          <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Nous contacter sur WhatsApp</a>
        </div>
      </div>
      <img src="images/produits/salon/OXFORD/ChatGPT Image Oct 8, 2026, 11_06_48 AM.png" 
           alt="Salon Valencia" 
           class="image-hero" 
           loading="eager">
    </section>

    <section class="fond-sable">
      <div class="atouts">
        <div><b>Meubles de premier choix</b>Sélectionnés pour leur qualité et leur confort.</div>
        <div><b>Expédition gratuite à Brazzaville</b>Pour les autres destinations, contactez-nous.</div>
        <div><b>Installation offerte</b>Nos équipes installent vos meubles chez vous.</div>
      </div>
    </section>

    <section>
      <h2>Nos collections</h2>
      <div class="grille">${collections}</div>
    </section>

    <section>
      <h2>Nouveautés</h2>
      <p class="note">Exemples de présentation, à remplacer par vos produits réels.</p>
      <div class="grille">${PRODUITS.slice(0, 4).map(carteProduit).join("")}</div>
    </section>

    <section class="fond-sable">
      <h2>Nos services</h2>
      <div class="atouts">
        <div><b>Conseil en aménagement</b>Parlez-nous de votre projet, nous vous orientons.</div>
        <div><b>Devis par WhatsApp</b>Envoyez-nous votre sélection de favoris.</div>
        <div><b>Livraison et installation</b><a href="#/livraison">Voir les modalités</a></div>
      </div>
    </section>`;
}

// Construit une liste d'options pour un menu déroulant
function options(valeurs, choisie) {
  return valeurs.map((v) => "<option" + (v === choisie ? " selected" : "") + ">" + v + "</option>").join("");
}

function pageCatalogue(pieceChoisie) {
  const categories = [...new Set(PRODUITS.map((p) => p.categorie))];
  const couleurs = [...new Set(PRODUITS.flatMap((p) => p.couleurs))];
  const matieres = [...new Set(PRODUITS.flatMap((p) => p.matiere.split(" et ")))];

  return `
    <section>
      <h1 style="font-size:2.6rem">Catalogue</h1>
      <div class="filtres">
        <div><label for="f-recherche">Recherche</label><input id="f-recherche" type="search" placeholder="Canapé, table…"></div>
        <div><label for="f-piece">Pièce</label><select id="f-piece"><option value="">Toutes</option>${options(PIECES, pieceChoisie)}</select></div>
        <div><label for="f-categorie">Catégorie</label><select id="f-categorie"><option value="">Toutes</option>${options(categories)}</select></div>
        <div><label for="f-couleur">Couleur</label><select id="f-couleur"><option value="">Toutes</option>${options(couleurs)}</select></div>
        <div><label for="f-matiere">Matière</label><select id="f-matiere"><option value="">Toutes</option>${options(matieres)}</select></div>
      </div>
      <p class="note">Les filtres de prix et de dimensions apparaîtront quand ces informations seront renseignées.</p>
      <p id="compteur" aria-live="polite"></p>
      <div class="grille" id="liste-produits"></div>
    </section>`;
}

// Affiche uniquement les produits qui correspondent aux filtres choisis
function appliquerFiltres() {
  const valeur = (id) => document.getElementById(id).value;
  const recherche = valeur("f-recherche").toLowerCase();

  const resultats = PRODUITS.filter((p) => {
    const texte = (p.nom + " " + p.description + " " + p.categorie).toLowerCase();
    return (!recherche || texte.includes(recherche))
      && (!valeur("f-piece") || p.piece === valeur("f-piece"))
      && (!valeur("f-categorie") || p.categorie === valeur("f-categorie"))
      && (!valeur("f-couleur") || p.couleurs.includes(valeur("f-couleur")))
      && (!valeur("f-matiere") || p.matiere.includes(valeur("f-matiere")));
  });

  document.getElementById("liste-produits").innerHTML =
    resultats.map(carteProduit).join("") || "<p>Aucun résultat. Essayez d'autres filtres.</p>";
  document.getElementById("compteur").textContent =
    resultats.length + (resultats.length > 1 ? " produits" : " produit");
}

function pageProduit(id) {
  const produit = trouverProduit(id);
  if (!produit) return pageCatalogue();

  const estFavori = favoris.includes(produit.id);
  const message = (phrase) => lienWhatsApp("Bonjour Valencia, " + phrase + " : " + produit.nom + ".");

  return `
    <section>
      <p><a href="#/catalogue">← Retour au catalogue</a></p>
      <div class="deux-colonnes">
        <div>
          ${afficherImage(produit)}
          <div class="miniatures">${[1, 2, 3].map((n) => afficherImage(produit, n)).join("")}</div>
        </div>
        <div>
          <span class="etiquette">${produit.piece} · ${produit.categorie}</span>
          <h1 style="font-size:2.4rem;margin-top:8px">${securiser(produit.nom)}</h1>
          <p>${securiser(produit.description)}</p>
          <dl>
            <dt>Dimensions</dt><dd>${securiser(produit.dimensions)}</dd>
            <dt>Matières</dt><dd>${securiser(produit.matiere)}</dd>
            <dt>Couleurs</dt><dd>${produit.couleurs.join(", ")}</dd>
            <dt>Entretien</dt><dd>${securiser(produit.entretien)}</dd>
            <dt>Disponibilité</dt><dd>${securiser(produit.disponibilite)}</dd>
            <dt>Prix</dt><dd>${texteDuPrix(produit)}</dd>
          </dl>
          <div class="ligne">
            <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${message("je souhaite connaître le prix de")}">Demander le prix sur WhatsApp</a>
            <a class="bouton bouton-clair" target="_blank" rel="noopener" href="${message("pouvez-vous vérifier la disponibilité de")}">Vérifier la disponibilité</a>
            <button class="bouton-favori" aria-pressed="${estFavori}" data-favori="${produit.id}">${estFavori ? "♥ Retirer" : "♡ Favori"}</button>
          </div>
        </div>
      </div>
    </section>`;
}

function pageInspirations() {
  const ambiances = AMBIANCES.map((a) => `
    <article class="carte">
      ${imageTemporaire(a.fond, a.nom)}
      <div class="texte">
        <h3>${a.nom}</h3>
        <p>${a.texte}</p>
        <p>${a.produits.map((id) => '<a href="#/produit/' + id + '">' + securiser(sansExemple(trouverProduit(id).nom)) + "</a>").join(" · ")}</p>
      </div>
    </article>`).join("");

  return `
    <section>
      <h1 style="font-size:2.6rem">Inspirations</h1>
      <p class="intro">Des ambiances pour imaginer votre intérieur, avec les meubles correspondants.</p>
      <div class="grille">${ambiances}</div>
    </section>`;
}

function pageFavoris() {
  const produits = favoris.map(trouverProduit).filter(Boolean);

  if (produits.length === 0) {
    return `
      <section>
        <h1 style="font-size:2.6rem">Favoris</h1>
        <p>Aucun favori pour l'instant. Parcourez le <a href="#/catalogue">catalogue</a> et enregistrez les meubles qui vous plaisent.</p>
      </section>`;
  }

  const message = "Bonjour Valencia, je souhaite un devis pour : " + produits.map((p) => sansExemple(p.nom)).join(", ") + ".";
  const lienMail = "mailto:social.valencia.cg@gmail.com?subject=" + encodeURIComponent("Demande de devis") +
                   "&body=" + encodeURIComponent(message);

  return `
    <section>
      <h1 style="font-size:2.6rem">Favoris</h1>
      <div class="ligne" style="margin-bottom:20px">
        <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Envoyer ma sélection sur WhatsApp</a>
        <a class="bouton bouton-clair" href="${lienMail}">Envoyer par e-mail</a>
      </div>
      <div class="grille">${produits.map(carteProduit).join("")}</div>
      <p class="note">Vos favoris sont gardés sur cet appareil.</p>
    </section>`;
}

function pageAPropos() {
  return `
    <section style="max-width:720px">
      <h1 style="font-size:2.6rem">À propos de Valencia</h1>
      <p class="intro">Valencia est un magasin de meubles du centre-ville de Pointe-Noire.</p>
      <p>Nous proposons des meubles de premier choix, principalement d'origine turque, sélectionnés pour quatre qualités : la durabilité, le confort, le design moderne et l'élégance.</p>
      <p>Notre objectif est simple : vous aider à aménager un intérieur qui vous ressemble, du choix des pièces jusqu'à l'installation chez vous.</p>
      <div class="ligne">
        <a class="bouton" href="#/catalogue">Voir le catalogue</a>
        <a class="bouton bouton-clair" href="#/contact">Nous rendre visite</a>
      </div>
    </section>`;
}

function pageLivraison() {
  return `
    <section style="max-width:720px">
      <h1 style="font-size:2.6rem">Livraison et installation</h1>
      <div class="atouts" style="margin:24px 0">
        <div><b>Expédition gratuite à Brazzaville</b></div>
        <div><b>Installation offerte</b></div>
      </div>
      <p>Pour les autres destinations, contactez le magasin afin de connaître les modalités.</p>
      <div class="ligne">
        <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp("Bonjour Valencia, je souhaite connaître les modalités de livraison vers : ")}">Poser la question sur WhatsApp</a>
        <a class="bouton bouton-clair" href="tel:+242067585858">Appeler le magasin</a>
      </div>
    </section>`;
}

function pageContact() {
  return `
    <section>
      <h1 style="font-size:2.6rem">Contact</h1>
      <div class="deux-colonnes">
        <div>
          <p><b>Adresse</b><br>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p>
          <p><b>Téléphone</b><br><a href="tel:+242067585858">+242 06 758 5858</a></p>
          <p><b>E-mail</b><br><a href="mailto:social.valencia.cg@gmail.com">social.valencia.cg@gmail.com</a></p>
          <p><b>Horaires</b><br>À communiquer prochainement.</p>
          <div class="image-temp" style="aspect-ratio:16/9;--c1:#e5dac7;--c2:#cbb99c">
            <span>Carte de localisation : à ajouter après vérification de l'adresse</span>
          </div>
        </div>
        <form id="formulaire" novalidate>
          <div><label for="nom">Nom</label><input id="nom" autocomplete="name" required></div>
          <div><label for="telephone">Téléphone</label><input id="telephone" type="tel" autocomplete="tel"></div>
          <div><label for="message">Votre projet ou votre question</label><textarea id="message" rows="5" required></textarea></div>
          <p><button class="bouton bouton-wa" type="submit">Envoyer sur WhatsApp</button></p>
          <p class="note" id="retour" aria-live="polite">Le formulaire ouvre WhatsApp avec votre message prérempli.</p>
        </form>
      </div>
    </section>`;
}

// Le formulaire de contact n'envoie rien lui-même : il ouvre WhatsApp
function brancherFormulaire() {
  const formulaire = document.getElementById("formulaire");
  if (!formulaire) return;

  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const message = document.getElementById("message").value.trim();
    const retour = document.getElementById("retour");

    if (!nom || !message) {
      retour.textContent = "Merci d'indiquer votre nom et votre message.";
      return;
    }

    const texte = "Bonjour Valencia, je suis " + nom + (telephone ? " (" + telephone + ")" : "") + ". " + message;
    window.open(lienWhatsApp(texte), "_blank", "noopener");
    retour.textContent = "WhatsApp s'ouvre avec votre message.";
  });
}

// ---------- Navigation ----------

function afficherPage() {
  // "#/produit/lit" devient ["", "produit", "lit"]
  const [, page, parametre] = location.hash.split("/");
  let html;
  let titre = "Valencia — Meubles haut de gamme à Pointe-Noire";

  if (page === "catalogue") {
    html = pageCatalogue(parametre ? decodeURIComponent(parametre) : "");
    titre = "Catalogue — Valencia";
  } else if (page === "produit") {
    html = pageProduit(parametre);
    const produit = trouverProduit(parametre);
    titre = (produit ? produit.nom : "Produit") + " — Valencia";
  } else if (page === "inspirations") {
    html = pageInspirations();
  } else if (page === "favoris") {
    html = pageFavoris();
  } else if (page === "a-propos") {
    html = pageAPropos();
  } else if (page === "livraison") {
    html = pageLivraison();
  } else if (page === "contact") {
    html = pageContact();
  } else {
    html = pageAccueil();
  }

  contenu.innerHTML = html;
  document.title = titre;
  window.scrollTo(0, 0);

  // Referme le menu mobile et marque la page active
  menu.classList.remove("ouvert");
  boutonMenu.setAttribute("aria-expanded", "false");
  document.querySelectorAll("nav a").forEach((lien) => {
    lien.toggleAttribute("aria-current", lien.getAttribute("href") === "#/" + (page || ""));
  });

  if (page === "catalogue") {
    ["f-recherche", "f-piece", "f-categorie", "f-couleur", "f-matiere"].forEach((id) => {
      document.getElementById(id).addEventListener("input", appliquerFiltres);
    });
    appliquerFiltres();
  }

  brancherFormulaire();
}

// ---------- Clics sur la page ----------

document.addEventListener("click", (evenement) => {
  // Bouton favori
  const boutonFavori = evenement.target.closest("[data-favori]");
  if (boutonFavori) {
    basculerFavori(boutonFavori.dataset.favori);
    if (location.hash === "#/favoris") {
      afficherPage(); // la liste doit se mettre à jour
    } else {
      const actif = favoris.includes(boutonFavori.dataset.favori);
      boutonFavori.setAttribute("aria-pressed", actif);
      boutonFavori.textContent = actif ? "♥ Retirer" : "♡ Favori";
    }
    return;
  }

  // Liens des réseaux sociaux (tant qu'ils ne sont pas renseignés)
  const lienReseau = evenement.target.closest("[data-reseau]");
  if (lienReseau) {
    const adresse = LIENS_RESEAUX[lienReseau.dataset.reseau];
    if (adresse) {
      lienReseau.href = adresse;
      lienReseau.target = "_blank";
      lienReseau.rel = "noopener";
    } else {
      evenement.preventDefault();
      alert("Le lien " + lienReseau.dataset.reseau + " sera ajouté prochainement.");
    }
  }
});

boutonMenu.addEventListener("click", () => {
  const ouvert = menu.classList.toggle("ouvert");
  boutonMenu.setAttribute("aria-expanded", ouvert);
});

window.addEventListener("hashchange", afficherPage);

// ---------- Démarrage ----------
sauvegarderFavoris();
afficherPage();
