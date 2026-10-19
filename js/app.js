// ==========================================================
// Valencia — logique du site
// Pages affichées selon l'adresse après le "#"
// (ex. #/catalogue, #/produit/oxford-sofaset)
// ==========================================================

const contenu = document.getElementById("contenu");
const menu = document.getElementById("menu");
const boutonMenu = document.getElementById("bouton-menu");
const racine = document.documentElement;

// ---------- Fonctions utiles ----------

function securiser(texte) {
  const m = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(texte == null ? "" : texte).replace(/[&<>"]/g, (c) => m[c]);
}

function lienWhatsApp(message) {
  return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message);
}

// Les noms de fichiers contiennent des espaces et des accents : on les encode
function chemin(src) {
  return encodeURI(src).replace(/#/g, "%23");
}

// ---------- Données : nettoyage automatique de produits.js ----------
// Corrige les identifiants en double et les champs manquants sans toucher au fichier.

const PRODUITS_OK = (() => {
  const vus = new Set();
  return PRODUITS.map((p, i) => {
    let id = p.id || "produit-" + i;
    if (vus.has(id)) id += "-" + i;
    vus.add(id);
    const photos = [...new Set((p.photos || []).filter(Boolean))];
    return {
      ...p,
      id,
      photos,
      couleurs: (p.couleurs || []).filter(Boolean),
      matiere: p.matiere || "",
      prix: p.prix ? String(p.prix).trim() : ""
    };
  });
})();

// Supprime les doublons exacts (même nom + même première photo)
const CATALOGUE = PRODUITS_OK.filter((p, i, tab) =>
  tab.findIndex((q) => q.nom === p.nom && q.photos[0] === p.photos[0]) === i);

function trouverProduit(id) {
  return CATALOGUE.find((p) => p.id === id);
}

// Affiche tous les prix de la même façon : 4 625 000 FCFA
function nombrePrix(p) {
  const n = parseInt(String(p.prix).replace(/[^\d]/g, ""), 10);
  return isNaN(n) ? null : n;
}
function texteDuPrix(p) {
  const n = nombrePrix(p);
  return n === null ? "Prix sur demande" : n.toLocaleString("fr-FR") + " FCFA";
}

// ---------- Réglages (gardés dans le navigateur) ----------

const REGLAGES_DEFAUT = { theme: "auto", taille: "normal", densite: "normal", animations: true, auto: true, parPage: SITE.parPage || 12 };
let reglages = { ...REGLAGES_DEFAUT };
try { Object.assign(reglages, JSON.parse(localStorage.getItem("valencia-reglages") || "{}")); } catch (e) {}

const sombreSysteme = matchMedia("(prefers-color-scheme: dark)");

function themeActif() {
  return reglages.theme === "auto" ? (sombreSysteme.matches ? "sombre" : "clair") : reglages.theme;
}

function appliquerReglages() {
  racine.dataset.theme = themeActif();
  racine.dataset.taille = reglages.taille;
  racine.dataset.densite = reglages.densite;
  if (reglages.animations) delete racine.dataset.anim; else racine.dataset.anim = "off";
  document.getElementById("bouton-theme").textContent = themeActif() === "sombre" ? "☀" : "☾";
  try { localStorage.setItem("valencia-reglages", JSON.stringify(reglages)); } catch (e) {}
}
sombreSysteme.addEventListener("change", appliquerReglages);

// ---------- Favoris ----------

let favoris = [];
try { favoris = JSON.parse(localStorage.getItem("valencia-favoris") || "[]"); } catch (e) {}
favoris = favoris.filter((id) => trouverProduit(id)); // retire les produits supprimés

function sauvegarderFavoris() {
  try { localStorage.setItem("valencia-favoris", JSON.stringify(favoris)); } catch (e) {}
  document.getElementById("lien-favoris").textContent = favoris.length ? "Favoris (" + favoris.length + ")" : "Favoris";
}

function basculerFavori(id) {
  favoris = favoris.includes(id) ? favoris.filter((x) => x !== id) : [...favoris, id];
  sauvegarderFavoris();
}

// ---------- Éléments réutilisables ----------

function imageTemporaire(fond, nom) {
  const c1 = fond && fond[0] ? fond[0] : "#c9d3d6";
  const c2 = fond && fond[1] ? fond[1] : "#5b6b70";
  return '<div class="image-temp" role="img" aria-label="Image temporaire : ' + securiser(nom) + '" style="--c1:' + c1 + ";--c2:" + c2 + '"><span>Photo à venir</span></div>';
}

// Cadre 4/3 identique pour toutes les images ; si la photo manque ou ne charge pas, image temporaire
function cadreImage(p, numero = 0, chargement = "lazy") {
  const src = p.photos && p.photos[numero];
  // L'image temporaire reste dessous ; si la photo ne charge pas, on la retire et le cadre reste propre
  const img = src
    ? '<img src="' + chemin(src) + '" alt="' + securiser(p.nom) + '" loading="' + chargement + '" decoding="async" onerror="this.remove()">'
    : "";
  return '<span class="cadre">' + imageTemporaire(p.fond, p.nom) + img + "</span>";
}

function carteProduit(p) {
  const fav = favoris.includes(p.id);
  return `
    <article class="carte reveal">
      <a href="#/produit/${encodeURIComponent(p.id)}" aria-label="${securiser(p.nom)}">${cadreImage(p)}</a>
      <div class="texte">
        <span class="etiquette">${securiser(p.piece)} · ${securiser(p.categorie)}</span>
        <h3><a href="#/produit/${encodeURIComponent(p.id)}" style="text-decoration:none">${securiser(p.nom)}</a></h3>
        <p>${securiser(p.description)}</p>
        <p class="prix">${securiser(texteDuPrix(p))}</p>
        <div class="ligne" style="margin-top:auto">
          <a class="bouton bouton-petit" href="#/produit/${encodeURIComponent(p.id)}">Voir</a>
          <button class="bouton-favori" aria-pressed="${fav}" data-favori="${securiser(p.id)}">${fav ? "♥ Retirer" : "♡ Favori"}</button>
        </div>
      </div>
    </article>`;
}

// ---------- Diaporama d'accueil (vidéos ou images) ----------

let minuteurDiapo = null;

function diapositives() {
  const videos = (SITE.videos || []).filter((v) => v && v.src);
  return videos.length
    ? videos.map((v) => ({ ...v, type: "video" }))
    : (SITE.imagesSecours || []).map((v) => ({ ...v, type: "image" }));
}

function htmlDiaporama() {
  const slides = diapositives();
  if (!slides.length) return "";
  const piste = slides.map((s, i) => {
    const media = s.type === "video"
      ? `<video src="${chemin(s.src)}" ${s.poster ? 'poster="' + chemin(s.poster) + '"' : ""} muted playsinline preload="${i === 0 ? "auto" : "metadata"}"></video>`
      : `<img src="${chemin(s.src)}" alt="${securiser(s.titre || "Valencia")}" ${i === 0 ? 'loading="eager"' : 'loading="lazy"'}>`;
    return `<div class="diapo-slide" data-index="${i}" aria-hidden="true">${media}</div>`;
  }).join("");
  const points = slides.map((s, i) => `<button class="point" data-aller="${i}" aria-label="Diapositive ${i + 1}"></button>`).join("");
  const multi = slides.length > 1;

  return `
    <div class="diapo" role="region" aria-roledescription="diaporama" aria-label="Présentation Valencia">
      <div class="diapo-piste">${piste}</div>
      <div class="diapo-texte"><div class="conteneur"><div class="contenu-slide" id="diapo-contenu" aria-live="polite"></div></div></div>
      ${multi ? `<button class="diapo-fleche diapo-prec" data-fleche="-1" aria-label="Précédent">‹</button>
      <button class="diapo-fleche diapo-suiv" data-fleche="1" aria-label="Suivant">›</button>
      <div class="diapo-points"><div class="conteneur">${points}</div></div>` : ""}
    </div>`;
}

function lancerDiaporama() {
  clearTimeout(minuteurDiapo);
  const racineDiapo = document.querySelector(".diapo");
  if (!racineDiapo) return;
  const slides = diapositives();
  const elements = [...racineDiapo.querySelectorAll(".diapo-slide")];
  const points = [...racineDiapo.querySelectorAll(".point")];
  const message = "Bonjour Valencia, je souhaite des renseignements sur vos meubles.";
  let courant = -1;

  function suivantAuto(duree) {
    clearTimeout(minuteurDiapo);
    if (slides.length > 1 && reglages.auto) minuteurDiapo = setTimeout(() => aller(courant + 1), duree);
  }

  function aller(n) {
    n = (n + slides.length) % slides.length;
    if (!document.body.contains(racineDiapo)) return;
    elements.forEach((el, i) => {
      el.classList.toggle("actif", i === n);
      el.setAttribute("aria-hidden", i !== n);
      const v = el.querySelector("video");
      if (v && i !== n) { v.pause(); v.currentTime = 0; }
    });
    points.forEach((pt, i) => {
      pt.classList.remove("actif", "fait");
      if (i < n) pt.classList.add("fait");
    });
    courant = n;
    const s = slides[n];
    document.getElementById("diapo-contenu").innerHTML = `
      <h1>${securiser(s.titre || "L'élégance durable, le confort au quotidien")}</h1>
      <p>${securiser(s.texte || "")}</p>
      <div class="ligne">
        <a class="bouton bouton-wa" href="#/catalogue" style="background:#fff;color:#162f37;border-color:#fff">Découvrir nos collections</a>
        <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Nous contacter</a>
      </div>`;

    const v = elements[n].querySelector("video");
    let duree = SITE.dureeDiapo || 7000;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
      v.onended = () => aller(courant + 1);
      v.onerror = () => aller(courant + 1); // vidéo introuvable : on passe à la suivante
      duree = Math.max(duree, 60000); // sécurité ; la fin de la vidéo déclenche la suite
      if (v.readyState >= 1 && isFinite(v.duration)) duree = v.duration * 1000 + 500;
    }
    // Barre de progression du point actif
    if (points[n]) {
      points[n].style.setProperty("--duree-point", Math.min(duree, 60000) / 1000 + "s");
      requestAnimationFrame(() => requestAnimationFrame(() => points[n].classList.add("actif")));
    }
    suivantAuto(duree);
  }

  racineDiapo.addEventListener("click", (e) => {
    const fleche = e.target.closest("[data-fleche]");
    const point = e.target.closest("[data-aller]");
    if (fleche) aller(courant + Number(fleche.dataset.fleche));
    if (point) aller(Number(point.dataset.aller));
  });

  aller(0);
}

// ---------- Pages ----------

function pageAccueil() {
  const message = "Bonjour Valencia, je souhaite des renseignements sur vos meubles.";

  const collections = SITE.pieces.map((piece) => {
    const exemple = CATALOGUE.find((p) => p.piece === piece);
    if (!exemple) return "";
    return `
      <a class="carte reveal" href="#/catalogue/${encodeURIComponent(piece)}">
        ${cadreImage(exemple)}
        <div class="texte"><h3>${securiser(piece)}</h3><p>Voir les meubles</p></div>
      </a>`;
  }).join("");

  return `
    ${htmlDiaporama()}

    <section class="fond-doux">
      <div class="conteneur atouts">
        <div class="reveal"><b>Meubles de premier choix</b>Sélectionnés pour leur qualité et leur confort.</div>
        <div class="reveal" style="--delai:.1s"><b>Expédition gratuite à Brazzaville</b>Pour les autres destinations, contactez-nous.</div>
        <div class="reveal" style="--delai:.2s"><b>Installation offerte</b>Nos équipes installent vos meubles chez vous.</div>
      </div>
    </section>

    <section><div class="conteneur">
      <h2 class="reveal">Nos collections</h2>
      <div class="grille">${collections}</div>
    </div></section>

    <section class="fond-doux"><div class="conteneur">
      <h2 class="reveal">Dernières arrivées</h2>
      <div class="grille">${CATALOGUE.slice(-4).reverse().map(carteProduit).join("")}</div>
      <p style="margin-top:24px"><a class="bouton bouton-clair" href="#/catalogue">Voir tout le catalogue</a></p>
    </div></section>

    <section><div class="conteneur">
      <h2 class="reveal">Nos services</h2>
      <div class="atouts">
        <div class="reveal"><b>Conseil en aménagement</b>Parlez-nous de votre projet, nous vous orientons.</div>
        <div class="reveal" style="--delai:.1s"><b>Devis par WhatsApp</b>Envoyez-nous votre sélection de favoris.</div>
        <div class="reveal" style="--delai:.2s"><b>Livraison et installation</b><a href="#/livraison">Voir les modalités</a></div>
      </div>
      <p class="ligne" style="margin-top:28px"><a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Écrire sur WhatsApp</a></p>
    </div></section>`;
}

function options(valeurs, choisie) {
  return valeurs.map((v) => `<option value="${securiser(v)}"${v === choisie ? " selected" : ""}>${securiser(v)}</option>`).join("");
}

// État du catalogue (gardé quand on revient d'une fiche produit)
const etat = { page: 1, tri: "defaut" };

function pageCatalogue(pieceChoisie) {
  const categories = [...new Set(CATALOGUE.map((p) => p.categorie))].sort();
  const couleurs = [...new Set(CATALOGUE.flatMap((p) => p.couleurs))].sort();
  const matieres = [...new Set(CATALOGUE.flatMap((p) => p.matiere.split(" et ")).filter(Boolean))].sort();
  etat.page = 1;

  return `
    <section><div class="conteneur">
      <h1>Catalogue</h1>
      <div class="filtres">
        <div><label for="f-recherche">Recherche</label><input id="f-recherche" type="search" placeholder="Canapé, table…"></div>
        <div><label for="f-piece">Pièce</label><select id="f-piece"><option value="">Toutes</option>${options(SITE.pieces, pieceChoisie)}</select></div>
        <div><label for="f-categorie">Catégorie</label><select id="f-categorie"><option value="">Toutes</option>${options(categories)}</select></div>
        <div><label for="f-couleur">Couleur</label><select id="f-couleur"><option value="">Toutes</option>${options(couleurs)}</select></div>
        <div><label for="f-matiere">Matière</label><select id="f-matiere"><option value="">Toutes</option>${options(matieres)}</select></div>
        <div><label for="f-tri">Trier par</label>
          <select id="f-tri">
            <option value="defaut">Nouveautés</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="nom">Nom (A à Z)</option>
          </select></div>
      </div>
      <div class="barre-resultats"><p id="compteur" aria-live="polite" style="margin:0"></p></div>
      <div class="grille" id="liste-produits"></div>
      <nav class="pagination" id="pagination" aria-label="Pages du catalogue"></nav>
    </div></section>`;
}

function produitsFiltres() {
  const v = (id) => document.getElementById(id).value;
  const recherche = v("f-recherche").toLowerCase().trim();
  let liste = CATALOGUE.filter((p) => {
    const texte = (p.nom + " " + p.description + " " + p.categorie + " " + p.piece).toLowerCase();
    return (!recherche || texte.includes(recherche))
      && (!v("f-piece") || p.piece === v("f-piece"))
      && (!v("f-categorie") || p.categorie === v("f-categorie"))
      && (!v("f-couleur") || p.couleurs.includes(v("f-couleur")))
      && (!v("f-matiere") || p.matiere.includes(v("f-matiere")));
  });
  const tri = v("f-tri");
  if (tri === "nom") liste = [...liste].sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  if (tri === "prix-asc" || tri === "prix-desc") {
    const sens = tri === "prix-asc" ? 1 : -1;
    // Les produits sans prix passent toujours en dernier
    liste = [...liste].sort((a, b) => {
      const x = nombrePrix(a), y = nombrePrix(b);
      if (x === null && y === null) return 0;
      if (x === null) return 1;
      if (y === null) return -1;
      return (x - y) * sens;
    });
  }
  if (tri === "defaut") liste = [...liste].reverse(); // les derniers ajoutés d'abord
  return liste;
}

// Boutons 1, 2, 3 … n : leur nombre grandit tout seul avec les produits ajoutés
function listeBoutonsPages(total, courante) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, courante - 1, courante, courante + 1]);
  const tri = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const sortie = [];
  tri.forEach((n, i) => {
    if (i && n - tri[i - 1] > 1) sortie.push("…");
    sortie.push(n);
  });
  return sortie;
}

function appliquerFiltres(remonter) {
  const liste = produitsFiltres();
  const parPage = Number(reglages.parPage) || 12;
  const total = Math.max(1, Math.ceil(liste.length / parPage));
  etat.page = Math.min(Math.max(1, etat.page), total);

  const debut = (etat.page - 1) * parPage;
  const visibles = liste.slice(debut, debut + parPage);

  document.getElementById("liste-produits").innerHTML =
    visibles.map(carteProduit).join("") || "<p>Aucun résultat. Essayez d'autres filtres.</p>";
  document.getElementById("compteur").textContent = liste.length
    ? liste.length + (liste.length > 1 ? " produits" : " produit") + " · page " + etat.page + " sur " + total
    : "0 produit";

  const nav = document.getElementById("pagination");
  if (total <= 1) {
    nav.innerHTML = "";
  } else {
    nav.innerHTML =
      `<button data-page="${etat.page - 1}" aria-label="Page précédente"${etat.page === 1 ? " disabled" : ""}>‹</button>` +
      listeBoutonsPages(total, etat.page).map((n) => n === "…"
        ? '<span class="points">…</span>'
        : `<button data-page="${n}" ${n === etat.page ? 'aria-current="page"' : ""} aria-label="Page ${n}">${n}</button>`).join("") +
      `<button data-page="${etat.page + 1}" aria-label="Page suivante"${etat.page === total ? " disabled" : ""}>›</button>`;
  }
  activerReveal();
  if (remonter) document.getElementById("liste-produits").scrollIntoView({ behavior: "smooth", block: "start" });
}

function pageProduit(id) {
  const p = trouverProduit(id);
  if (!p) return pageCatalogue("");

  const fav = favoris.includes(p.id);
  const msg = (phrase) => lienWhatsApp("Bonjour Valencia, " + phrase + " : " + p.nom + ".");
  const nbPhotos = Math.max(p.photos.length, 1);
  const miniatures = nbPhotos > 1
    ? p.photos.map((ph, i) => `<button type="button" data-photo="${i}" aria-current="${i === 0}" aria-label="Photo ${i + 1}"><img src="${chemin(ph)}" alt="" loading="lazy"></button>`).join("")
    : "";

  return `
    <section><div class="conteneur">
      <p><a href="#/catalogue">← Retour au catalogue</a></p>
      <div class="deux-colonnes">
        <div class="galerie">
          <div id="photo-principale">${cadreImage(p, 0, "eager")}</div>
          <div class="miniatures">${miniatures}</div>
        </div>
        <div>
          <span class="etiquette">${securiser(p.piece)} · ${securiser(p.categorie)}</span>
          <h1 style="font-size:2.6rem;margin-top:10px">${securiser(p.nom)}</h1>
          <p>${securiser(p.description)}</p>
          <dl>
            <dt>Dimensions</dt><dd>${securiser(p.dimensions)}</dd>
            <dt>Matières</dt><dd>${securiser(p.matiere)}</dd>
            <dt>Couleurs</dt><dd>${securiser(p.couleurs.join(", "))}</dd>
            <dt>Entretien</dt><dd>${securiser(p.entretien)}</dd>
            <dt>Disponibilité</dt><dd>${securiser(p.disponibilite)}</dd>
            <dt>Prix</dt><dd><b>${securiser(texteDuPrix(p))}</b></dd>
          </dl>
          <div class="ligne">
            <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${msg("je souhaite connaître le prix de")}">Demander le prix sur WhatsApp</a>
            <a class="bouton bouton-clair" target="_blank" rel="noopener" href="${msg("pouvez-vous vérifier la disponibilité de")}">Vérifier la disponibilité</a>
            <button class="bouton-favori" aria-pressed="${fav}" data-favori="${securiser(p.id)}">${fav ? "♥ Retirer" : "♡ Favori"}</button>
          </div>
        </div>
      </div>
    </div></section>`;
}

function pageInspirations() {
  const cartes = SITE.ambiances.map((a) => {
    const liés = a.produits.map(trouverProduit).filter(Boolean); // ignore les id introuvables
    const vitrine = trouverProduit(a.image) || liés[0];
    return `
      <article class="carte reveal">
        ${vitrine ? cadreImage(vitrine) : '<span class="cadre">' + imageTemporaire(null, a.nom) + "</span>"}
        <div class="texte">
          <h3>${securiser(a.nom)}</h3>
          <p>${securiser(a.texte)}</p>
          <p style="display:block">${liés.map((p) => `<a href="#/produit/${encodeURIComponent(p.id)}">${securiser(p.nom)}</a>`).join(" · ")}</p>
        </div>
      </article>`;
  }).join("");

  return `
    <section><div class="conteneur">
      <h1>Inspirations</h1>
      <p class="intro">Des ambiances pour imaginer votre intérieur, avec les meubles correspondants.</p>
      <div class="grille">${cartes}</div>
    </div></section>`;
}

function pageFavoris() {
  const produits = favoris.map(trouverProduit).filter(Boolean);
  if (!produits.length) {
    return `<section><div class="conteneur"><h1>Favoris</h1>
      <p>Aucun favori pour l'instant. Parcourez le <a href="#/catalogue">catalogue</a> et enregistrez les meubles qui vous plaisent.</p></div></section>`;
  }
  const message = "Bonjour Valencia, je souhaite un devis pour : " + produits.map((p) => p.nom).join(", ") + ".";
  const mail = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Demande de devis") + "&body=" + encodeURIComponent(message);
  return `
    <section><div class="conteneur">
      <h1>Favoris</h1>
      <div class="ligne" style="margin-bottom:24px">
        <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Envoyer ma sélection sur WhatsApp</a>
        <a class="bouton bouton-clair" href="${mail}">Envoyer par e-mail</a>
      </div>
      <div class="grille">${produits.map(carteProduit).join("")}</div>
      <p class="note" style="margin-top:16px">Vos favoris sont gardés sur cet appareil.</p>
    </div></section>`;
}

function pageAPropos() {
  return `
    <section><div class="conteneur" style="max-width:760px">
      <h1>À propos de Valencia</h1>
      <p class="intro">Valencia est un magasin de meubles du centre-ville de Pointe-Noire.</p>
      <p>Nous proposons des meubles de premier choix, principalement d'origine turque, sélectionnés pour quatre qualités : la durabilité, le confort, le design moderne et l'élégance.</p>
      <p>Notre objectif est simple : vous aider à aménager un intérieur qui vous ressemble, du choix des pièces jusqu'à l'installation chez vous.</p>
      <div class="ligne">
        <a class="bouton" href="#/catalogue">Voir le catalogue</a>
        <a class="bouton bouton-clair" href="#/contact">Nous rendre visite</a>
      </div>
    </div></section>`;
}

function pageLivraison() {
  return `
    <section><div class="conteneur" style="max-width:760px">
      <h1>Livraison et installation</h1>
      <div class="atouts" style="margin:24px 0">
        <div><b>Expédition gratuite à Brazzaville</b></div>
        <div><b>Installation offerte</b></div>
      </div>
      <p>Pour les autres destinations, contactez le magasin afin de connaître les modalités.</p>
      <div class="ligne">
        <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp("Bonjour Valencia, je souhaite connaître les modalités de livraison vers : ")}">Poser la question sur WhatsApp</a>
        <a class="bouton bouton-clair" href="tel:${SITE.telephone}">Appeler le magasin</a>
      </div>
    </div></section>`;
}

function pageContact() {
  return `
    <section><div class="conteneur">
      <h1>Contact</h1>
      <div class="deux-colonnes">
        <div>
          <p><b>Adresse</b><br>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p>
          <p><b>Téléphone</b><br><a href="tel:${SITE.telephone}">+242 06 758 5858</a></p>
          <p><b>E-mail</b><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          <p><b>Horaires</b><br>À communiquer prochainement.</p>
        </div>
        <form id="formulaire" novalidate>
          <p><label for="nom">Nom</label><input id="nom" autocomplete="name" required></p>
          <p><label for="telephone">Téléphone</label><input id="telephone" type="tel" autocomplete="tel"></p>
          <p><label for="message">Votre projet ou votre question</label><textarea id="message" rows="5" required></textarea></p>
          <p><button class="bouton bouton-wa" type="submit">Envoyer sur WhatsApp</button></p>
          <p class="note" id="retour" aria-live="polite">Le formulaire ouvre WhatsApp avec votre message prérempli.</p>
        </form>
      </div>
    </div></section>`;
}

function brancherFormulaire() {
  const f = document.getElementById("formulaire");
  if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const tel = document.getElementById("telephone").value.trim();
    const msg = document.getElementById("message").value.trim();
    const retour = document.getElementById("retour");
    if (!nom || !msg) { retour.textContent = "Merci d'indiquer votre nom et votre message."; return; }
    window.open(lienWhatsApp("Bonjour Valencia, je suis " + nom + (tel ? " (" + tel + ")" : "") + ". " + msg), "_blank", "noopener");
    retour.textContent = "WhatsApp s'ouvre avec votre message.";
  });
}

// ---------- Apparition douce au défilement ----------

let observateur = null;
function activerReveal() {
  const cibles = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) { cibles.forEach((c) => c.classList.add("visible")); return; }
  if (!observateur) {
    observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observateur.unobserve(e.target); } });
    }, { threshold: 0.12 });
  }
  cibles.forEach((c, i) => { c.style.setProperty("--delai", (i % 4) * 0.07 + "s"); observateur.observe(c); });
}

// ---------- Navigation ----------

function afficherPage() {
  clearTimeout(minuteurDiapo);
  const [, page, parametre] = location.hash.split("/");
  const param = parametre ? decodeURIComponent(parametre) : "";
  let html, titre = "Valencia — Meubles haut de gamme à Pointe-Noire";

  if (page === "catalogue") { html = pageCatalogue(param); titre = "Catalogue — Valencia"; }
  else if (page === "produit") { html = pageProduit(param); const p = trouverProduit(param); titre = (p ? p.nom : "Produit") + " — Valencia"; }
  else if (page === "inspirations") { html = pageInspirations(); titre = "Inspirations — Valencia"; }
  else if (page === "favoris") { html = pageFavoris(); titre = "Favoris — Valencia"; }
  else if (page === "a-propos") { html = pageAPropos(); titre = "À propos — Valencia"; }
  else if (page === "livraison") { html = pageLivraison(); titre = "Livraison — Valencia"; }
  else if (page === "contact") { html = pageContact(); titre = "Contact — Valencia"; }
  else { html = pageAccueil(); }

  contenu.innerHTML = html;
  document.title = titre;
  window.scrollTo(0, 0);

  menu.classList.remove("ouvert");
  boutonMenu.setAttribute("aria-expanded", "false");
  document.querySelectorAll("nav a").forEach((l) => {
    l.toggleAttribute("aria-current", l.getAttribute("href") === "#/" + (page || ""));
  });

  if (page === "catalogue") {
    ["f-recherche", "f-piece", "f-categorie", "f-couleur", "f-matiere", "f-tri"].forEach((id) => {
      document.getElementById(id).addEventListener("input", () => { etat.page = 1; appliquerFiltres(false); });
    });
    appliquerFiltres(false);
  }
  if (!page) lancerDiaporama();
  brancherFormulaire();
  activerReveal();
}

// ---------- Clics ----------

document.addEventListener("click", (e) => {
  const bf = e.target.closest("[data-favori]");
  if (bf) {
    basculerFavori(bf.dataset.favori);
    if (location.hash === "#/favoris") { afficherPage(); return; }
    const actif = favoris.includes(bf.dataset.favori);
    document.querySelectorAll('[data-favori="' + bf.dataset.favori + '"]').forEach((b) => {
      b.setAttribute("aria-pressed", actif);
      b.textContent = actif ? "♥ Retirer" : "♡ Favori";
    });
    return;
  }

  const bp = e.target.closest("[data-page]");
  if (bp && !bp.disabled) { etat.page = Number(bp.dataset.page); appliquerFiltres(true); return; }

  const ph = e.target.closest("[data-photo]");
  if (ph) {
    const p = trouverProduit(decodeURIComponent(location.hash.split("/")[2] || ""));
    if (p) {
      document.getElementById("photo-principale").innerHTML = cadreImage(p, Number(ph.dataset.photo), "eager");
      document.querySelectorAll("[data-photo]").forEach((b) => b.setAttribute("aria-current", b === ph));
    }
  }
});

boutonMenu.addEventListener("click", () => {
  boutonMenu.setAttribute("aria-expanded", menu.classList.toggle("ouvert"));
});

document.getElementById("bouton-theme").addEventListener("click", () => {
  reglages.theme = themeActif() === "sombre" ? "clair" : "sombre";
  appliquerReglages();
});

// ---------- Panneau des paramètres ----------

const boite = document.getElementById("reglages");

function remplirReglages() {
  document.querySelector('[name="theme"][value="' + reglages.theme + '"]').checked = true;
  document.querySelector('[name="taille"][value="' + reglages.taille + '"]').checked = true;
  document.getElementById("r-par-page").value = String(reglages.parPage);
  document.getElementById("r-densite").value = reglages.densite;
  document.getElementById("r-anim").checked = reglages.animations;
  document.getElementById("r-auto").checked = reglages.auto;
}

document.getElementById("bouton-reglages").addEventListener("click", () => { remplirReglages(); boite.showModal(); });
boite.addEventListener("click", (e) => { if (e.target === boite) boite.close(); });

boite.addEventListener("change", (e) => {
  const c = e.target;
  if (c.name === "theme") reglages.theme = c.value;
  if (c.name === "taille") reglages.taille = c.value;
  if (c.id === "r-par-page") { reglages.parPage = Number(c.value); etat.page = 1; }
  if (c.id === "r-densite") reglages.densite = c.value;
  if (c.id === "r-anim") reglages.animations = c.checked;
  if (c.id === "r-auto") { reglages.auto = c.checked; if (!c.checked) clearTimeout(minuteurDiapo); }
  appliquerReglages();
  if (document.getElementById("liste-produits")) appliquerFiltres(false);
});

document.getElementById("r-reinit").addEventListener("click", () => {
  reglages = { ...REGLAGES_DEFAUT };
  appliquerReglages(); remplirReglages();
  if (document.getElementById("liste-produits")) appliquerFiltres(false);
});

// ---------- Réseaux sociaux (pied de page) ----------

document.getElementById("reseaux").innerHTML = Object.entries(SITE.reseaux)
  .filter(([, url]) => url)
  .map(([nom, url]) => `<a href="${securiser(url)}" target="_blank" rel="noopener">${securiser(nom)}</a>`)
  .join(" · ");

// Barre de progression de lecture
addEventListener("scroll", () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  document.getElementById("barre-progression").style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
}, { passive: true });

addEventListener("hashchange", afficherPage);

// ---------- Démarrage ----------
appliquerReglages();
sauvegarderFavoris();
afficherPage();
