// ==========================================================
// Valencia — extensions du site
// À charger APRÈS app.js (voir index.html).
// Ajoute : promotions, nouveautés, accueil enrichi, catalogue qui
// garde sa place, photos valides en premier, fiches par photo.
// ==========================================================
(function () {
  "use strict";

  const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";
  const avecImage = (p) => p.photos.length > 0;
  const imagesDabord = (l) => [...l.filter(avecImage), ...l.filter((p) => !avecImage(p))];

  // ---------- Promotions (réglées dans config.js → SITE.promos) ----------

  function promosActives() {
    const now = new Date();
    return (SITE.promos || []).filter((pr) => {
      const d = pr.debut ? new Date(pr.debut + "T00:00:00") : null;
      const f = pr.fin ? new Date(pr.fin + "T23:59:59") : null;
      return (!d || now >= d) && (!f || now <= f);
    });
  }

  function concerne(pr, p) {
    return (pr.produits || []).includes(p.id) || (pr.pieces || []).includes(p.piece);
  }

  function calcul(pr, p) {
    if (!concerne(pr, p)) return null;
    const ancien = nombrePrix(p);
    let nouveau = NaN;
    if (pr.prix && pr.prix[p.id] != null) nouveau = parseInt(String(pr.prix[p.id]).replace(/\D/g, ""), 10);
    else if (pr.remise && ancien) nouveau = Math.round((ancien * (1 - pr.remise / 100)) / 1000) * 1000;
    if (!nouveau || isNaN(nouveau) || (ancien && nouveau >= ancien)) return null;
    return { pr, ancien, nouveau, pourcent: ancien ? Math.round((1 - nouveau / ancien) * 100) : null };
  }

  function promoDe(p) {
    for (const pr of promosActives()) { const c = calcul(pr, p); if (c) return c; }
    return null;
  }

  function produitsDePromo(pr) {
    return imagesDabord(CATALOGUE.filter((p) => calcul(pr, p)));
  }

  function reste(pr) {
    if (!pr.fin) return "";
    const auj = new Date(); auj.setHours(0, 0, 0, 0);
    const j = Math.round((new Date(pr.fin + "T00:00:00") - auj) / 864e5);
    return j <= 0 ? "Dernier jour !" : j === 1 ? "Plus qu'un jour" : "Encore " + j + " jours";
  }

  function prixHtml(p) {
    const c = promoDe(p);
    if (!c) return securiser(texteDuPrix(p));
    return '<span class="prix-promo">' + fmt(c.nouveau) + "</span>" +
      (c.ancien ? ' <s class="prix-barre">' + fmt(c.ancien) + "</s>" : "");
  }

  // ---------- Nouveautés ----------

  function nouveautes() {
    const ids = SITE.nouveautes || [];
    const liste = ids.length ? ids.map(trouverProduit).filter(Boolean) : [...CATALOGUE].reverse();
    return imagesDabord(liste).slice(0, SITE.nombreNouveautes || 8);
  }
  const estNouveau = (p) => (SITE.nouveautes || []).includes(p.id);

  // ---------- Cartes produit (badges + prix promo) ----------

  carteProduit = function (p) {
    const fav = favoris.includes(p.id);
    const c = promoDe(p);
    const badges = (c ? '<span class="badge badge-promo">' + (c.pourcent ? "-" + c.pourcent + "%" : "Promo") + "</span>" : "") +
      (estNouveau(p) ? '<span class="badge badge-new">Nouveau</span>' : "");
    const lien = "#/produit/" + encodeURIComponent(p.id);
    return `
    <article class="carte reveal">
      <div class="media-carte">
        <a href="${lien}" aria-label="${securiser(p.nom)}">${cadreImage(p)}</a>
        ${badges ? '<span class="badges">' + badges + "</span>" : ""}
      </div>
      <div class="texte">
        <span class="etiquette">${securiser(p.piece)} · ${securiser(p.categorie)}</span>
        <h3><a href="${lien}" style="text-decoration:none">${securiser(p.nom)}</a></h3>
        <p>${securiser(p.description)}</p>
        <p class="prix">${prixHtml(p)}</p>
        <div class="ligne" style="margin-top:auto">
          <a class="bouton bouton-petit" href="${lien}">Voir</a>
          <button class="bouton-favori" aria-pressed="${fav}" data-favori="${securiser(p.id)}">${fav ? "♥ Retirer" : "♡ Favori"}</button>
        </div>
      </div>
    </article>`;
  };

  // ---------- Pages : promotions + accueil enrichi ----------

  function pagePromotions() {
    const promos = promosActives();
    if (!promos.length) {
      return `<section><div class="conteneur"><h1>Promotions</h1>
        <p>Aucune promotion en ce moment. Découvrez nos <a href="#/catalogue">nouveautés</a> ou écrivez-nous sur
        <a target="_blank" rel="noopener" href="${lienWhatsApp("Bonjour Valencia, je souhaite être informé de vos prochaines promotions.")}">WhatsApp</a>.</p></div></section>`;
    }
    return `<section><div class="conteneur"><h1>Promotions</h1>` + promos.map((pr) => {
      const r = reste(pr);
      const fin = pr.fin ? "Jusqu'au " + new Date(pr.fin + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + ". " : "";
      return `<div class="bloc-promo">
        <div class="promo-entete"><div><h2>${securiser(pr.titre)}</h2><p>${fin}${securiser(pr.texte || "")}</p></div>
        ${r ? '<span class="compte">' + r + "</span>" : ""}</div>
        <div class="grille">${produitsDePromo(pr).map(carteProduit).join("")}</div></div>`;
    }).join("") + `</div></section>`;
  }

  const FAQ_DEFAUT = [
    { q: "La livraison est-elle gratuite ?", r: "L'expédition est gratuite à Brazzaville. Pour les autres destinations, contactez-nous pour connaître les modalités." },
    { q: "L'installation est-elle comprise ?", r: "Oui, l'installation est offerte : nos équipes installent vos meubles chez vous." },
    { q: "Comment connaître le prix et la disponibilité d'un meuble ?", r: "Ouvrez la fiche du produit puis cliquez sur « Demander le prix sur WhatsApp » ou « Vérifier la disponibilité »." },
    { q: "D'où viennent vos meubles ?", r: "Principalement de Turquie, sélectionnés pour leur durabilité, leur confort et leur design moderne." },
    { q: "Comment obtenir un devis pour plusieurs articles ?", r: "Ajoutez-les à vos favoris, puis envoyez votre sélection sur WhatsApp ou par e-mail depuis la page Favoris." }
  ];

  function sectionPromos() {
    const pr = promosActives().find((x) => produitsDePromo(x).length);
    if (!pr) return "";
    const r = reste(pr);
    return `<section class="section-promo"><div class="conteneur">
      <div class="promo-entete reveal"><div><span class="pastille">Promotion</span><h2>${securiser(pr.titre)}</h2><p>${securiser(pr.texte || "")}</p></div>
      ${r ? '<span class="compte">' + r + "</span>" : ""}</div>
      <div class="grille">${produitsDePromo(pr).slice(0, 4).map(carteProduit).join("")}</div>
      <p style="margin-top:24px"><a class="bouton" href="#/promotions">Toutes les promotions</a></p>
    </div></section>`;
  }

  pageAccueil = function () {
    if (location.hash.startsWith("#/promotions")) return pagePromotions();
    const message = "Bonjour Valencia, je souhaite des renseignements sur vos meubles.";

    const collections = SITE.pieces.map((piece) => {
      const lot = CATALOGUE.filter((p) => p.piece === piece);
      const ex = lot.find(avecImage) || lot[0];
      if (!ex) return "";
      return `<a class="carte reveal" href="#/catalogue/${encodeURIComponent(piece)}">${cadreImage(ex)}
        <div class="texte"><h3>${securiser(piece)}</h3><p>${lot.length} ${lot.length > 1 ? "modèles" : "modèle"}</p></div></a>`;
    }).join("");

    const faq = (SITE.faq && SITE.faq.length ? SITE.faq : FAQ_DEFAUT)
      .map((f) => `<details class="reveal"><summary>${securiser(f.q)}</summary><p>${securiser(f.r)}</p></details>`).join("");

    const avis = (SITE.avis || []).length ? `<section><div class="conteneur"><h2 class="reveal">Ils nous font confiance</h2>
      <div class="grille">${SITE.avis.map((a) => `<blockquote class="avis reveal"><p>« ${securiser(a.texte)} »</p><footer>${securiser(a.nom)}</footer></blockquote>`).join("")}</div></div></section>` : "";

    const reseaux = Object.entries(SITE.reseaux || {}).filter(([, u]) => u)
      .map(([n, u]) => `<a class="bouton bouton-clair" href="${securiser(u)}" target="_blank" rel="noopener">${securiser(n)}</a>`).join("");

    const carte = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Valencia meubles, Maison sans frontière, Pointe-Noire");

    return `
    ${htmlDiaporama()}

    <section class="fond-doux">
      <div class="conteneur atouts">
        <div class="reveal"><b>Meubles de premier choix</b>Sélectionnés pour leur qualité et leur confort.</div>
        <div class="reveal" style="--delai:.1s"><b>Expédition gratuite à Brazzaville</b>Pour les autres destinations, contactez-nous.</div>
        <div class="reveal" style="--delai:.2s"><b>Installation offerte</b>Nos équipes installent vos meubles chez vous.</div>
      </div>
    </section>

    ${sectionPromos()}

    <section><div class="conteneur">
      <h2 class="reveal">Nouveautés chez Valencia</h2>
      <div class="grille">${nouveautes().map(carteProduit).join("")}</div>
      <p style="margin-top:24px"><a class="bouton bouton-clair" href="#/catalogue">Voir tout le catalogue</a></p>
    </div></section>

    <section class="fond-doux"><div class="conteneur">
      <h2 class="reveal">Nos collections</h2>
      <div class="grille">${collections}</div>
    </div></section>

    <section><div class="conteneur">
      <h2 class="reveal">Pourquoi choisir Valencia</h2>
      <div class="piliers">
        <div class="reveal"><b>Durabilité</b>Des meubles solides, faits pour durer.</div>
        <div class="reveal" style="--delai:.07s"><b>Confort</b>Assises profondes et matières agréables.</div>
        <div class="reveal" style="--delai:.14s"><b>Design moderne</b>Des lignes actuelles, principalement d'origine turque.</div>
        <div class="reveal" style="--delai:.21s"><b>Élégance</b>Des finitions soignées pour un intérieur raffiné.</div>
      </div>
    </div></section>

    <section class="fond-doux"><div class="conteneur">
      <h2 class="reveal">Comment commander</h2>
      <ol class="etapes">
        <li class="reveal"><b>Choisissez</b>Parcourez le catalogue et ajoutez vos coups de cœur aux favoris.</li>
        <li class="reveal" style="--delai:.1s"><b>Contactez-nous</b>Prix, disponibilité, devis : tout se fait par WhatsApp.</li>
        <li class="reveal" style="--delai:.2s"><b>Recevez chez vous</b>Expédition gratuite à Brazzaville et installation offerte.</li>
      </ol>
    </div></section>

    ${avis}

    <section class="${avis ? "fond-doux" : ""}"><div class="conteneur" style="max-width:820px">
      <h2 class="reveal">Questions fréquentes</h2>
      <div class="faq">${faq}</div>
    </div></section>

    <section class="fond-doux"><div class="conteneur deux-colonnes">
      <div class="reveal">
        <h2>Venez nous voir</h2>
        <p>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p>
        <p><a href="tel:${SITE.telephone}">+242 06 758 5858</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p class="ligne"><a class="bouton" target="_blank" rel="noopener" href="${carte}">Voir sur la carte</a>
        <a class="bouton bouton-clair" href="#/contact">Nous écrire</a></p>
      </div>
      <div class="reveal">
        <h2>Suivez-nous</h2>
        <p>Nouveautés, arrivages et promotions sur nos réseaux.</p>
        <p class="ligne">${reseaux}</p>
      </div>
    </div></section>

    <section class="bande-cta"><div class="conteneur">
      <h2>Un projet d'aménagement ?</h2>
      <p>Parlez-nous de votre intérieur, nous vous conseillons.</p>
      <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${lienWhatsApp(message)}">Écrire sur WhatsApp</a>
    </div></section>`;
  };

  // ---------- Fiche produit : change avec la photo affichée ----------
  // Dans produits.js, un produit peut avoir :
  //   variantes: [{ photo: "nom-du-fichier.png", couleurs: ["Rouge"], description: "...", matiere, dimensions, entretien, disponibilite, prix }]

  CATALOGUE.forEach((p) => {
    p.variantes = (p.variantes || []).map((v) => ({ ...v, cle: typeof v.photo === "number" ? p.photos[v.photo] : v.photo }));
  });

  function varianteDe(p, i) {
    const src = p.photos[i];
    return (p.variantes || []).find((v) => v.cle && src && src.includes(v.cle)) || {};
  }

  function fiche(p, i) {
    const v = varianteDe(p, i);
    return {
      description: v.description || p.description,
      couleurs: (v.couleurs ? [].concat(v.couleurs) : p.couleurs).join(", "),
      matiere: v.matiere || p.matiere,
      dimensions: v.dimensions || p.dimensions,
      entretien: v.entretien || p.entretien,
      disponibilite: v.disponibilite || p.disponibilite,
      prix: v.prix ? { ...p, prix: v.prix } : p
    };
  }

  pageProduit = function (id) {
    const p = trouverProduit(id);
    if (!p) return '<section><div class="conteneur"><h1>Produit introuvable</h1><p><a href="#/catalogue">← Retour au catalogue</a></p></div></section>';
    const fav = favoris.includes(p.id);
    const f = fiche(p, 0);
    const c = promoDe(p);
    const msg = (phrase) => lienWhatsApp("Bonjour Valencia, " + phrase + " : " + p.nom + ".");
    const miniatures = p.photos.length > 1
      ? p.photos.map((ph, i) => `<button type="button" data-photo="${i}" aria-current="${i === 0}" aria-label="Photo ${i + 1}"><img src="${chemin(ph)}" alt="" loading="lazy" onerror="this.closest('button').remove()"></button>`).join("")
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
          ${c ? `<p class="alerte-promo"><b>Promotion${c.pourcent ? " -" + c.pourcent + "%" : ""}</b> · ${securiser(reste(c.pr) || c.pr.titre)}</p>` : ""}
          <p id="d-description">${securiser(f.description)}</p>
          <dl>
            <dt>Dimensions</dt><dd id="d-dimensions">${securiser(f.dimensions)}</dd>
            <dt>Matières</dt><dd id="d-matiere">${securiser(f.matiere)}</dd>
            <dt>Couleurs</dt><dd id="d-couleurs">${securiser(f.couleurs)}</dd>
            <dt>Entretien</dt><dd id="d-entretien">${securiser(f.entretien)}</dd>
            <dt>Disponibilité</dt><dd id="d-disponibilite">${securiser(f.disponibilite)}</dd>
            <dt>Prix</dt><dd><b id="d-prix">${prixHtml(f.prix)}</b></dd>
          </dl>
          <div class="ligne">
            <a class="bouton bouton-wa" target="_blank" rel="noopener" href="${msg("je souhaite connaître le prix de")}">Demander le prix sur WhatsApp</a>
            <a class="bouton bouton-clair" target="_blank" rel="noopener" href="${msg("pouvez-vous vérifier la disponibilité de")}">Vérifier la disponibilité</a>
            <button class="bouton-favori" aria-pressed="${fav}" data-favori="${securiser(p.id)}">${fav ? "♥ Retirer" : "♡ Favori"}</button>
          </div>
        </div>
      </div>
    </div></section>`;
  };

  function majFiche(p, i) {
    const f = fiche(p, i);
    const mettre = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
    mettre("d-description", f.description); mettre("d-dimensions", f.dimensions); mettre("d-matiere", f.matiere);
    mettre("d-couleurs", f.couleurs); mettre("d-entretien", f.entretien); mettre("d-disponibilite", f.disponibilite);
    const px = document.getElementById("d-prix"); if (px) px.innerHTML = prixHtml(f.prix);
  }

  document.addEventListener("click", (e) => {
    const ph = e.target.closest("[data-photo]");
    if (!ph) return;
    const p = trouverProduit(decodeURIComponent(location.hash.split("/")[2] || ""));
    if (p) majFiche(p, Number(ph.dataset.photo));
  });

  // ---------- Catalogue : photos valides d'abord ----------

  const _produitsFiltres = produitsFiltres;
  produitsFiltres = function () { return imagesDabord(_produitsFiltres()); };

  const CLE_IMG = "valencia-images-ok";
  let cacheImg = {};
  try { const c = JSON.parse(localStorage.getItem(CLE_IMG) || "{}"); if (Date.now() - (c.t || 0) < 864e5) cacheImg = c.d || {}; } catch (e) {}

  async function imageOk(src) {
    const url = chemin(src);
    if (cacheImg[url]) return true;
    let ok = false;
    try { // test léger (sans télécharger l'image)
      const r = await fetch(url, { method: "HEAD" });
      ok = r.ok && (r.headers.get("content-type") || "").startsWith("image");
    } catch (e) {}
    if (!ok) ok = await new Promise((res) => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = url; });
    if (ok) cacheImg[url] = true;
    return ok;
  }

  async function verifierProduit(p) {
    for (const src of [...p.photos]) {
      if (await imageOk(src)) { p.photos = [src, ...p.photos.filter((s) => s !== src)]; return; }
    }
    p.photos = []; // aucune photo ne s'affiche
  }

  async function verifierTout() {
    const file = [...CATALOGUE];
    await Promise.all(Array.from({ length: 6 }, async () => { while (file.length) await verifierProduit(file.shift()); }));
    try { localStorage.setItem(CLE_IMG, JSON.stringify({ t: Date.now(), d: cacheImg })); } catch (e) {}
    const page = location.hash.split("/")[1] || "";
    if (page === "catalogue" && document.getElementById("liste-produits") && scrollY < 200) appliquerFiltres(false);
    else if ((page === "" || page === "promotions") && scrollY < 50) afficherPage();
  }

  // ---------- Catalogue : retrouver sa place au retour d'une fiche ----------

  const CLE_CAT = "valencia-catalogue";
  const FILTRES = ["f-recherche", "f-piece", "f-categorie", "f-couleur", "f-matiere", "f-tri"];
  let restauration = null, pagePrecedente = "", attente = false;

  function sauverCatalogue() {
    if (!document.getElementById("liste-produits")) return;
    const f = {};
    FILTRES.forEach((id) => { const el = document.getElementById(id); if (el) f[id] = el.value; });
    try { sessionStorage.setItem(CLE_CAT, JSON.stringify({ f, page: etat.page, y: scrollY })); } catch (e) {}
  }
  function lireCatalogue() {
    try { return JSON.parse(sessionStorage.getItem(CLE_CAT) || "null"); } catch (e) { return null; }
  }

  addEventListener("scroll", () => {
    if (attente) return;
    attente = true;
    requestAnimationFrame(() => { attente = false; sauverCatalogue(); });
  }, { passive: true });
  document.addEventListener("input", (e) => { if (e.target.id && e.target.id.startsWith("f-")) sauverCatalogue(); });
  document.addEventListener("click", (e) => { if (e.target.closest("#liste-produits a")) sauverCatalogue(); }, true);

  const _pageCatalogue = pageCatalogue;
  pageCatalogue = function (piece) {
    const html = _pageCatalogue(piece);
    if (restauration) etat.page = restauration.page;
    return html;
  };

  const _appliquerFiltres = appliquerFiltres;
  appliquerFiltres = function (remonter) {
    if (restauration) {
      const r = restauration; restauration = null;
      Object.entries(r.f).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.value = val; });
      _appliquerFiltres(false);
      requestAnimationFrame(() => scrollTo({ top: r.y, behavior: "instant" }));
      return;
    }
    _appliquerFiltres(remonter);
    sauverCatalogue();
  };

  // ---------- Navigation ----------

  const afficherOriginale = afficherPage;
  afficherPage = function () {
    const page = location.hash.split("/")[1] || "";
    restauration = page === "catalogue" && pagePrecedente === "produit" ? lireCatalogue() : null;
    afficherOriginale();
    if (page === "promotions") document.title = "Promotions — Valencia";
    pagePrecedente = page;
  };
  removeEventListener("hashchange", afficherOriginale);
  addEventListener("hashchange", afficherPage);

  // ---------- Bandeau d'annonce + lien Promotions ----------

  function installerBandeau() {
    const pr = promosActives()[0];
    const texte = pr ? pr.titre + (pr.texte ? " — " + pr.texte : "") : SITE.annonce || "";
    if (!texte) return;
    try { if (sessionStorage.getItem("valencia-annonce") === "off") return; } catch (e) {}
    const div = document.createElement("div");
    div.className = "annonce"; div.id = "bandeau-annonce";
    div.innerHTML = `<a href="${pr ? "#/promotions" : "#/catalogue"}">${securiser(texte)}</a><button type="button" aria-label="Fermer l'annonce">×</button>`;
    div.querySelector("button").onclick = () => { div.remove(); try { sessionStorage.setItem("valencia-annonce", "off"); } catch (e) {} };
    document.body.insertBefore(div, document.querySelector(".entete"));
  }

  if (promosActives().length) {
    const lien = menu.querySelector('a[href="#/catalogue"]');
    if (lien) lien.insertAdjacentHTML("afterend", '<a href="#/promotions" class="nav-promo">Promotions</a>');
  }
  installerBandeau();

  // ---------- Démarrage ----------
  afficherPage();
  verifierTout();
})();
