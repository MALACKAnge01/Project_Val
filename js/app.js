// ==========================================================
// Valencia — logique du site (pages selon l'adresse après "#")
// ==========================================================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wa = (m) => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(m);
const url = (s) => encodeURI(s).replace(/#/g, "%23");
const mem = { get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} } };
const ls = { get: (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

// ---------- Données (nettoyage automatique de produits.js) ----------
const CATALOGUE = (() => {
  const vus = new Set();
  const tout = PRODUITS.map((p, i) => {
    let id = p.id || "produit-" + i;
    if (vus.has(id)) id += "-" + i;
    vus.add(id);
    const photos = [...new Set((p.photos || []).filter(Boolean))];
    return { ...p, id, photos,
      couleurs: [].concat(p.couleurs || []).filter(Boolean),
      matiere: [].concat(p.matiere || []).filter(Boolean).join(" et "),
      prix: p.prix ? String(p.prix).trim() : "",
      variantes: (p.variantes || []).map((v) => ({ ...v, cle: typeof v.photo === "number" ? photos[v.photo] : v.photo })) };
  });
  return tout.filter((p, i, t) => t.findIndex((q) => q.nom === p.nom && q.photos[0] === p.photos[0]) === i);
})();
const trouver = (id) => CATALOGUE.find((p) => p.id === id);

// ---------- Prix et promotions ----------
const nombre = (p) => { const m = String(p.prix || "").match(/\d[\d.\s]*/); const n = m ? parseInt(m[0].replace(/\D/g, ""), 10) : NaN; return isNaN(n) ? null : n; };
const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";
const prixTexte = (p) => (String(p.prix).match(/\d[\d.]*\d/g) || []).length > 1 ? String(p.prix).replace(/\s*xaf/gi, " FCFA") : nombre(p) === null ? "Prix sur demande" : fmt(nombre(p));

// Dates de promo : "2026-11-30" (début = 00:00, fin = 23:59:59) ou "2026-11-30 18:00", à l'heure de Pointe-Noire
const instant = (s, finDeJour) => {
  if (!s) return null;
  let t = String(s).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) t += finDeJour ? "T23:59:59" : "T00:00:00";
  else t = t.replace(" ", "T").replace(/T(\d{2}:\d{2})$/, "T$1:00");
  if (!/(Z|[+-]\d{2}:\d{2})$/.test(t)) t += SITE.fuseau || "+01:00";
  const d = new Date(t);
  return isNaN(d) ? null : d;
};
const avertis = new Set();
const actives = () => {
  const n = Date.now();
  return (SITE.promos || []).filter((r) => {
    const d = instant(r.debut), f = instant(r.fin, true);
    if ((r.debut && !d) || (r.fin && !f)) { if (!avertis.has(r)) { avertis.add(r); console.warn("Promotion ignorée : date invalide", r); } return false; }
    return (!d || n >= d) && (!f || n <= f);
  });
};

const norm = (t) => String(t == null ? "" : t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const arrondir = (x) => { const a = SITE.arrondi || 1; return Math.round(x / a) * a; };
// % de réduction de la promo r pour le produit p, d'après r.reductions : id du produit > catégorie > pièce
function pourcentage(r, p) {
  const R = r.reductions || {}, cles = Object.keys(R);
  for (const v of [p.id, p.categorie, p.piece]) {
    const k = v && cles.find((c) => norm(c) === norm(v));
    if (k) { const x = Number(R[k]); return x > 0 && x < 100 ? x : 0; }
  }
  return 0;
}
// Texte contenant plusieurs prix (ex. "salon electrique: 4.444.000 xaf , salon manuel: 3.865.000 xaf") : chaque prix est remisé
const reduire = (txt, pc) => txt.replace(/\d[\d.]*\d/g, (m) => arrondir(parseInt(m.replace(/\./g, ""), 10) * (1 - pc / 100)).toLocaleString("fr-FR").replace(/\s/g, "."));
function calcul(r, p) {
  const pc = pourcentage(r, p);
  if (!(pc || (r.produits || []).includes(p.id) || (r.pieces || []).includes(p.piece))) return null;
  const a = nombre(p), pct = pc || r.remise || 0;
  const exact = r.prix && r.prix[p.id] != null ? parseInt(String(r.prix[p.id]).replace(/\D/g, ""), 10) : NaN;
  if (isNaN(exact) && pct && (String(p.prix).match(/\d[\d.]*\d/g) || []).length > 1) return { r, a: null, n: null, pc: pct, texte: reduire(prixTexte(p), pct) };
  const n = !isNaN(exact) ? exact : pct && a ? arrondir(a * (1 - pct / 100)) : NaN;
  if (!n || isNaN(n) || (a && n >= a)) return null;
  return { r, a, n, pc: isNaN(exact) && pct ? pct : a ? Math.round((1 - n / a) * 100) : null };
}
const promoDe = (p) => { for (const r of actives()) { const c = calcul(r, p); if (c) return c; } return null; };

// Titres : "Promotion du Black Friday" (type: "Black Friday"), "Promotion de Noël" (type: "de Noël")
const libelle = (r) => { const t = String(r.type || "").trim(); return t ? "Promotion " + (/^(du |de |des |d')/i.test(t) ? "" : "du ") + t : ""; };
const titrePromo = (r) => r.titre || libelle(r) || "Promotion";
const resume = (r) => { const l = Object.entries(r.reductions || {}).filter(([k, v]) => Number(v) > 0 && !trouver(k)).map(([k, v]) => `${esc(k)} -${Number(v)} %`); return l.length ? `<p class="reduc">${l.join(" · ")}</p>` : ""; };

const reste = (r) => { const f = instant(r.fin, true); if (!f) return ""; const j = Math.ceil((f - Date.now()) / 864e5); return j <= 1 ? "Dernier jour !" : "Encore " + j + " jours"; };
// Chrono en direct (mis à jour chaque seconde, voir plus bas)
const compte = (r) => { const f = instant(r.fin, true); return f ? `<div class="chrono" role="timer" data-fin="${f.getTime()}"><span class="chrono-t">Se termine dans</span><span class="chrono-c">${[["j", "jours"], ["h", "heures"], ["m", "min"], ["s", "sec"]].map(([u, l]) => `<span class="case"><b data-u="${u}">--</b><small>${l}</small></span>`).join("")}</span></div>` : ""; };
const prixHtml = (p) => {
  const c = promoDe(p); if (!c) return esc(prixTexte(p));
  return c.texte ? `<span class="promo-prix">${esc(c.texte)}</span><br><s>${esc(prixTexte(p))}</s>` : `<span class="promo-prix">${fmt(c.n)}</span>${c.a ? ` <s>${fmt(c.a)}</s>` : ""}`;
};

// ---------- Images : celles qui s'affichent passent en premier ----------
const avec = (p) => p.photos.length > 0;
const dabord = (l) => [...l.filter(avec), ...l.filter((p) => !avec(p))];
const promoProduits = (r) => dabord(CATALOGUE.filter((p) => calcul(r, p)));
// Sur l'accueil : quelques produits de chaque pièce en promo (et pas seulement les premiers du catalogue)
const varie = (l, n) => { const g = {}; l.forEach((p) => (g[p.piece] = g[p.piece] || []).push(p)); const f = Object.values(g), o = []; for (let i = 0; o.length < n && f.some((x) => x[i]); i++) f.forEach((x) => x[i] && o.length < n && o.push(x[i])); return o; };
const nouveautes = () => { const ids = SITE.nouveautes || []; return dabord(ids.length ? ids.map(trouver).filter(Boolean) : [...CATALOGUE].reverse()).slice(0, SITE.nombreNouveautes || 8); };

function cadre(p, n = 0, lazy = "lazy") {
  const s = p.photos[n], f = p.fond || [];
  return `<span class="cadre" style="--c1:${f[0] || "#c9d3d6"};--c2:${f[1] || "#5b6b70"}"><span class="ph">Photo à venir</span>${s ? `<img src="${url(s)}" alt="${esc(p.nom)}" loading="${lazy}" decoding="async" onerror="this.remove()">` : ""}</span>`;
}

let okImg = {};
{ const c = ls.get("valencia-img"); if (c && Date.now() - (c.t || 0) < 864e5) okImg = c.d || {}; }
async function testImg(s) {
  const u = url(s);
  if (okImg[u]) return true;
  let r = false;
  try { const x = await fetch(u, { method: "HEAD" }); r = x.ok && (x.headers.get("content-type") || "").startsWith("image"); } catch (e) {}
  if (!r) r = await new Promise((res) => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = u; });
  if (r) okImg[u] = 1;
  return r;
}
async function verifier() {
  const file = [...CATALOGUE];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (file.length) {
      const p = file.shift(); let bon = null;
      for (const s of p.photos) if (await testImg(s)) { bon = s; break; }
      p.photos = bon ? [bon, ...p.photos.filter((s) => s !== bon)] : [];
    }
  }));
  ls.set("valencia-img", { t: Date.now(), d: okImg });
  const pg = location.hash.split("/")[1] || "";
  if (pg === "catalogue" && $("#liste") && scrollY < 200) liste();
  else if ((pg === "" || pg === "promotions") && scrollY < 50) afficher();
}

// ---------- Réglages et favoris ----------
const reg = { theme: "auto", taille: "normal", parPage: SITE.parPage || 12, ...(ls.get("valencia-reglages") || {}) };
const sombre = matchMedia("(prefers-color-scheme: dark)");
const theme = () => (reg.theme === "auto" ? (sombre.matches ? "sombre" : "clair") : reg.theme);
function appliquer() {
  document.documentElement.dataset.theme = theme();
  document.documentElement.dataset.taille = reg.taille;
  $("#b-theme").textContent = theme() === "sombre" ? "☀" : "☾";
  ls.set("valencia-reglages", reg);
}
sombre.addEventListener("change", appliquer);

let favoris = (ls.get("valencia-favoris") || []).filter(trouver);
function majFav() {
  ls.set("valencia-favoris", favoris);
  const l = $("#lien-favoris"); if (l) l.textContent = favoris.length ? "Favoris (" + favoris.length + ")" : "Favoris";
}

// ---------- Cartes ----------
function carte(p) {
  const c = promoDe(p), fav = favoris.includes(p.id), lien = "#/produit/" + encodeURIComponent(p.id);
  const b = (c ? `<span class="badge">${c.pc ? "-" + c.pc + "%" : "Promo"}</span>` : "") + ((SITE.nouveautes || []).includes(p.id) ? '<span class="badge n">Nouveau</span>' : "");
  return `<article class="carte">
    <div class="media"><a href="${lien}" aria-label="${esc(p.nom)}">${cadre(p)}</a>${b ? `<span class="badges">${b}</span>` : ""}</div>
    <div class="texte">
      <span class="tag">${esc(p.piece)} · ${esc(p.categorie)}</span>
      <h3><a href="${lien}">${esc(p.nom)}</a></h3>
      <p class="desc">${esc(p.description)}</p>
      <p class="prix">${prixHtml(p)}</p>
      <div class="ac"><a class="btn petit" href="${lien}">Voir</a><button class="fav" aria-pressed="${fav}" data-fav="${esc(p.id)}">${fav ? "♥" : "♡"}<span> Favori</span></button></div>
    </div></article>`;
}

// ---------- Diaporama ----------
let minuteur = null;
const diapos = () => { const v = (SITE.videos || []).filter((x) => x && x.src); return v.length ? v.map((x) => ({ ...x, type: "video" })) : (SITE.imagesSecours || []).map((x) => ({ ...x, type: "image" })); };
function htmlDiapo() {
  const d = diapos(); if (!d.length) return "";
  return `<div class="diapo" role="region" aria-label="Présentation Valencia">
    ${d.map((s, i) => `<div class="slide">${s.type === "video" ? `<video src="${url(s.src)}" muted playsinline preload="${i ? "metadata" : "auto"}"></video>` : `<img src="${url(s.src)}" alt="${esc(s.titre || "Valencia")}">`}</div>`).join("")}
    <div class="dtxt"><div class="w" id="diapo-txt" aria-live="polite"></div></div>
    ${d.length > 1 ? `<button class="fl p" data-rel="-1" aria-label="Précédent">‹</button><button class="fl n" data-rel="1" aria-label="Suivant">›</button>
    <div class="pts"><div class="w">${d.map((s, i) => `<button class="pt" data-abs="${i}" aria-label="Diapositive ${i + 1}"></button>`).join("")}</div></div>` : ""}</div>`;
}
function demarrerDiapo() {
  const dp = $(".diapo"); if (!dp) return;
  const d = diapos(), els = $$(".slide", dp), pts = $$(".pt", dp); let cur = 0;
  const go = (n) => {
    if (!document.body.contains(dp)) return;
    clearTimeout(minuteur); n = (n + d.length) % d.length; cur = n;
    els.forEach((e, k) => { e.classList.toggle("on", k === n); const v = $("video", e); if (v && k !== n) { v.pause(); v.currentTime = 0; } });
    pts.forEach((p, k) => p.classList.toggle("on", k === n));
    $("#diapo-txt").innerHTML = `<h1>${esc(d[n].titre || "L'élégance durable, le confort au quotidien")}</h1><p>${esc(d[n].texte || "")}</p>
      <div class="ligne"><a class="btn blanc" href="#/catalogue">Découvrir nos collections</a><a class="btn wa" target="_blank" rel="noopener" href="${wa("Bonjour Valencia, je souhaite des renseignements sur vos meubles.")}">Nous contacter</a></div>`;
    const v = $("video", els[n]);
    if (v) { v.currentTime = 0; v.play().catch(() => {}); v.onended = v.onerror = () => go(n + 1); minuteur = setTimeout(() => go(n + 1), 60000); }
    else minuteur = setTimeout(() => go(n + 1), SITE.dureeDiapo || 7000);
  };
  dp.onclick = (e) => { const b = e.target.closest("[data-rel],[data-abs]"); if (b) go(b.dataset.abs != null ? Number(b.dataset.abs) : cur + Number(b.dataset.rel)); };
  go(0);
}

// ---------- Pages ----------
const FAQ = [
  { q: "La livraison est-elle gratuite ?", r: "L'expédition est gratuite à Brazzaville. Pour les autres destinations, contactez-nous pour connaître les modalités." },
  { q: "L'installation est-elle comprise ?", r: "Oui, l'installation est offerte : nos équipes installent vos meubles chez vous." },
  { q: "Comment connaître le prix et la disponibilité d'un meuble ?", r: "Ouvrez la fiche du produit puis cliquez sur « Demander le prix sur WhatsApp » ou « Vérifier la disponibilité »." },
  { q: "D'où viennent vos meubles ?", r: "Principalement de Turquie, sélectionnés pour leur durabilité, leur confort et leur design moderne." },
  { q: "Comment obtenir un devis pour plusieurs articles ?", r: "Ajoutez-les à vos favoris, puis envoyez votre sélection sur WhatsApp ou par e-mail depuis la page Favoris." }
];

function accueil() {
  const msg = "Bonjour Valencia, je souhaite des renseignements sur vos meubles.";
  const col = SITE.pieces.map((pc) => { const l = CATALOGUE.filter((p) => p.piece === pc), e = l.find(avec) || l[0];
    return e ? `<a class="carte" href="#/catalogue/${encodeURIComponent(pc)}">${cadre(e)}<div class="texte"><h3>${esc(pc)}</h3><p>${l.length} modèle${l.length > 1 ? "s" : ""}</p></div></a>` : ""; }).join("");
  const r = actives().find((x) => promoProduits(x).length);
  const nouv = r ? `<section class="sp"><div class="w"><div class="ent"><div><span class="pastille">Promotion</span><h2>${esc(libelle(r) || titrePromo(r))}</h2>${r.texte ? `<p>${esc(r.texte)}</p>` : ""}${resume(r)}</div>${compte(r)}</div>
    <div class="grille">${varie(promoProduits(r), SITE.nombreNouveautes || 8).map(carte).join("")}</div><p class="ligne" style="margin-top:18px"><a class="btn" href="#/promotions">Toutes les promotions</a><a class="btn clair" href="#/catalogue">Voir tout le catalogue</a></p></div></section>`
    : `<section><div class="w"><h2>Nouveautés chez Valencia</h2><div class="grille">${nouveautes().map(carte).join("")}</div><p style="margin-top:18px"><a class="btn clair" href="#/catalogue">Voir tout le catalogue</a></p></div></section>`;
  const faq = (SITE.faq && SITE.faq.length ? SITE.faq : FAQ).map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.r)}</p></details>`).join("");
  const avis = (SITE.avis || []).length ? `<section><div class="w"><h2>Ils nous font confiance</h2><div class="grille">${SITE.avis.map((a) => `<blockquote class="boite avis"><p>« ${esc(a.texte)} »</p><footer>${esc(a.nom)}</footer></blockquote>`).join("")}</div></div></section>` : "";
  const res = Object.entries(SITE.reseaux || {}).filter(([, u]) => u).map(([n, u]) => `<a class="btn clair petit" href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
  const carteMaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Valencia meubles, Maison sans frontière, Pointe-Noire");
  return [`${htmlDiapo()}
    <section class="doux"><div class="w atouts"><div><b class="t">Meubles de premier choix</b>Sélectionnés pour leur qualité et leur confort.</div><div><b class="t">Expédition gratuite à Brazzaville</b>Pour les autres destinations, contactez-nous.</div><div><b class="t">Installation offerte</b>Nos équipes installent vos meubles chez vous.</div></div></section>
    ${nouv}
    <section class="doux"><div class="w"><h2>Nos collections</h2><div class="grille">${col}</div></div></section>
    <section><div class="w"><h2>Pourquoi choisir Valencia</h2><div class="piliers"><div class="boite"><b class="t">Durabilité</b>Des meubles solides, faits pour durer.</div><div class="boite"><b class="t">Confort</b>Assises profondes et matières agréables.</div><div class="boite"><b class="t">Design moderne</b>Des lignes actuelles, principalement d'origine turque.</div><div class="boite"><b class="t">Élégance</b>Des finitions soignées pour un intérieur raffiné.</div></div></div></section>
    <section class="doux"><div class="w"><h2>Comment commander</h2><div class="etapes"><div class="boite"><b class="t">Choisissez</b>Parcourez le catalogue et ajoutez vos coups de cœur aux favoris.</div><div class="boite"><b class="t">Contactez-nous</b>Prix, disponibilité, devis : tout se fait par WhatsApp.</div><div class="boite"><b class="t">Recevez chez vous</b>Expédition gratuite à Brazzaville et installation offerte.</div></div></div></section>
    ${avis}
    <section><div class="w" style="max-width:820px"><h2>Questions fréquentes</h2>${faq}</div></section>
    <section class="doux"><div class="w duo"><div><h2>Venez nous voir</h2><p>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p><p><a href="tel:${SITE.telephone}">+242 06 758 5858</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p><p class="ligne"><a class="btn petit" target="_blank" rel="noopener" href="${carteMaps}">Voir sur la carte</a><a class="btn clair petit" href="#/contact">Nous écrire</a></p></div>
      <div><h2>Suivez-nous</h2><p>Nouveautés, arrivages et promotions sur nos réseaux.</p><p class="ligne">${res}</p></div></div></section>
    <section class="cta"><div class="w"><h2>Un projet d'aménagement ?</h2><p>Parlez-nous de votre intérieur, nous vous conseillons.</p><a class="btn wa" target="_blank" rel="noopener" href="${wa(msg)}">Écrire sur WhatsApp</a></div></section>`,
    "Valencia — Meubles haut de gamme à Pointe-Noire"];
}

function promotions() {
  const l = actives();
  if (!l.length) return [`<section><div class="w"><h1>Promotions</h1><p>Aucune promotion en ce moment. Découvrez nos <a href="#/catalogue">nouveautés</a> ou écrivez-nous sur <a target="_blank" rel="noopener" href="${wa("Bonjour Valencia, je souhaite être informé de vos prochaines promotions.")}">WhatsApp</a>.</p></div></section>`, "Promotions — Valencia"];
  return [`<section><div class="w"><h1>Promotions</h1>${l.map((r) => `<div class="bloc"><div class="ent"><div><h2>${esc(titrePromo(r))}</h2><p>${r.fin ? "Jusqu'au " + instant(r.fin, true).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "Africa/Brazzaville" }) + ". " : ""}${esc(r.texte || "")}</p>${resume(r)}</div>${compte(r)}</div><div class="grille">${promoProduits(r).map(carte).join("")}</div></div>`).join("")}</div></section>`, "Promotions — Valencia"];
}

// Catalogue
const cat = { page: 1 };
const FILTRES = ["f-q", "f-piece", "f-cat", "f-coul", "f-mat", "f-tri"];
const opts = (v) => v.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join("");
function catalogue() {
  const u = (f) => [...new Set(CATALOGUE.flatMap(f))].filter(Boolean).sort();
  return [`<section><div class="w"><h1>Catalogue</h1><div class="filtres">
    <div><label for="f-q">Recherche</label><input id="f-q" type="search" placeholder="Canapé, table…"></div>
    <div><label for="f-piece">Pièce</label><select id="f-piece"><option value="">Toutes</option>${opts(SITE.pieces)}</select></div>
    <div><label for="f-cat">Catégorie</label><select id="f-cat"><option value="">Toutes</option>${opts(u((p) => [p.categorie]))}</select></div>
    <div><label for="f-coul">Couleur</label><select id="f-coul"><option value="">Toutes</option>${opts(u((p) => p.couleurs))}</select></div>
    <div><label for="f-mat">Matière</label><select id="f-mat"><option value="">Toutes</option>${opts(u((p) => p.matiere.split(" et ")))}</select></div>
    <div><label for="f-tri">Trier par</label><select id="f-tri"><option value="new">Nouveautés</option><option value="prix-asc">Prix croissant</option><option value="prix-desc">Prix décroissant</option><option value="nom">Nom (A à Z)</option></select></div>
    </div><p id="compteur" aria-live="polite"></p><div class="grille" id="liste"></div><div class="pagination" id="pagination" role="navigation" aria-label="Pages du catalogue"></div></div></section>`, "Catalogue — Valencia"];
}
function filtrer() {
  const v = (id) => $("#" + id).value, q = v("f-q").toLowerCase().trim();
  const l = CATALOGUE.filter((p) => (!q || (p.nom + " " + p.description + " " + p.categorie + " " + p.piece).toLowerCase().includes(q))
    && (!v("f-piece") || p.piece === v("f-piece")) && (!v("f-cat") || p.categorie === v("f-cat"))
    && (!v("f-coul") || p.couleurs.includes(v("f-coul"))) && (!v("f-mat") || p.matiere.includes(v("f-mat"))));
  const t = v("f-tri");
  if (t === "nom") l.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  else if (t.startsWith("prix")) { const s = t === "prix-asc" ? 1 : -1; l.sort((a, b) => { const x = nombre(a), y = nombre(b); return x === null ? (y === null ? 0 : 1) : y === null ? -1 : (x - y) * s; }); }
  else l.reverse();
  return dabord(l);
}
function numeros(tot, cur) {
  if (tot <= 7) return Array.from({ length: tot }, (_, i) => i + 1);
  const n = [...new Set([1, tot, cur - 1, cur, cur + 1])].filter((x) => x >= 1 && x <= tot).sort((a, b) => a - b), o = [];
  n.forEach((x, i) => { if (i && x - n[i - 1] > 1) o.push("…"); o.push(x); });
  return o;
}
function liste(remonter) {
  const l = filtrer(), pp = Number(reg.parPage) || 12, tot = Math.max(1, Math.ceil(l.length / pp));
  cat.page = Math.min(Math.max(1, cat.page), tot);
  $("#liste").innerHTML = l.slice((cat.page - 1) * pp, cat.page * pp).map(carte).join("") || "<p>Aucun résultat. Essayez d'autres filtres.</p>";
  $("#compteur").textContent = l.length ? `${l.length} produit${l.length > 1 ? "s" : ""} · page ${cat.page}/${tot}` : "0 produit";
  $("#pagination").innerHTML = tot < 2 ? "" : `<button data-page="${cat.page - 1}" aria-label="Page précédente" ${cat.page === 1 ? "disabled" : ""}>‹</button>`
    + numeros(tot, cat.page).map((n) => (n === "…" ? "<span>…</span>" : `<button data-page="${n}" ${n === cat.page ? 'aria-current="page"' : ""}>${n}</button>`)).join("")
    + `<button data-page="${cat.page + 1}" aria-label="Page suivante" ${cat.page === tot ? "disabled" : ""}>›</button>`;
  if (remonter) $("#liste").scrollIntoView({ behavior: "smooth", block: "start" });
  sauver();
}
// Le catalogue se souvient de sa place (filtres, page, défilement)
function sauver() {
  if (!$("#liste")) return;
  const f = {}; FILTRES.forEach((id) => (f[id] = $("#" + id).value));
  mem.set("valencia-cat", JSON.stringify({ f, page: cat.page, y: scrollY }));
}
function initCatalogue(piece, r) {
  if (r) { Object.entries(r.f).forEach(([id, v]) => { const e = $("#" + id); if (e) e.value = v; }); cat.page = r.page; }
  else { if (piece) $("#f-piece").value = piece; cat.page = 1; }
  FILTRES.forEach((id) => $("#" + id).addEventListener("input", () => { cat.page = 1; liste(); }));
  liste();
  if (r) requestAnimationFrame(() => scrollTo({ top: r.y, behavior: "instant" }));
}

// Fiche produit : description, couleurs, prix... changent avec la photo (variantes dans produits.js)
const varDe = (p, i) => p.variantes.find((v) => v.cle && p.photos[i] && p.photos[i].includes(v.cle)) || {};
function fiche(p, i) {
  const v = varDe(p, i), q = v.prix ? { ...p, prix: v.prix } : p;
  const l = (k, x) => (x && x !== "À confirmer" ? `<dt>${k}</dt><dd>${esc(x)}</dd>` : "");
  return `<p>${esc(v.description || p.description)}</p><dl>${l("Dimensions", v.dimensions || p.dimensions)}${l("Matières", v.matiere || p.matiere)}${l("Couleurs", (v.couleurs ? [].concat(v.couleurs) : p.couleurs).join(", "))}${l("Entretien", v.entretien || p.entretien)}${l("Disponibilité", v.disponibilite || p.disponibilite)}<dt>Prix</dt><dd><b>${prixHtml(q)}</b></dd></dl>`;
}
function produit(id) {
  const p = trouver(id);
  if (!p) return ['<section><div class="w"><h1>Produit introuvable</h1><p><a href="#/catalogue">← Retour au catalogue</a></p></div></section>', "Produit — Valencia"];
  const c = promoDe(p), fav = favoris.includes(p.id), m = (t) => wa("Bonjour Valencia, " + t + " : " + p.nom + ".");
  return [`<section><div class="w"><p><a href="#/catalogue">← Retour au catalogue</a></p><div class="duo">
    <div><div id="photo-principale">${cadre(p, 0, "eager")}</div>${p.photos.length > 1 ? `<div class="mini">${p.photos.map((ph, i) => `<button type="button" data-photo="${i}" aria-current="${i === 0}" aria-label="Photo ${i + 1}"><img src="${url(ph)}" alt="" loading="lazy" onerror="this.closest('button').remove()"></button>`).join("")}</div>` : ""}</div>
    <div><span class="tag">${esc(p.piece)} · ${esc(p.categorie)}</span><h1 style="margin-top:10px">${esc(p.nom)}</h1>
      ${c ? `<p class="alerte"><b>Promotion${c.pc ? " -" + c.pc + "%" : ""}</b> · ${esc(reste(c.r) || titrePromo(c.r))}</p>` : ""}
      <div id="fiche">${fiche(p, 0)}</div>
      <div class="ligne"><a class="btn wa" target="_blank" rel="noopener" href="${m("je souhaite connaître le prix de")}">Demander le prix sur WhatsApp</a><a class="btn clair" target="_blank" rel="noopener" href="${m("pouvez-vous vérifier la disponibilité de")}">Vérifier la disponibilité</a><button class="fav" aria-pressed="${fav}" data-fav="${esc(p.id)}">${fav ? "♥" : "♡"}<span> Favori</span></button></div>
    </div></div></div></section>`, p.nom + " — Valencia"];
}

function inspirations() {
  return [`<section><div class="w"><h1>Inspirations</h1><p class="intro">Des ambiances pour imaginer votre intérieur, avec les meubles correspondants.</p><div class="grille">${SITE.ambiances.map((a) => {
    const l = a.produits.map(trouver).filter(Boolean), v = trouver(a.image) || l[0];
    return `<article class="carte">${v ? cadre(v) : '<span class="cadre"><span class="ph">Photo à venir</span></span>'}<div class="texte"><h3>${esc(a.nom)}</h3><p>${esc(a.texte)}</p><p>${l.map((p) => `<a href="#/produit/${encodeURIComponent(p.id)}">${esc(p.nom)}</a>`).join(" · ")}</p></div></article>`; }).join("")}</div></div></section>`, "Inspirations — Valencia"];
}
function pageFavoris() {
  const l = favoris.map(trouver).filter(Boolean);
  if (!l.length) return ['<section><div class="w"><h1>Favoris</h1><p>Aucun favori pour l\'instant. Parcourez le <a href="#/catalogue">catalogue</a> et enregistrez les meubles qui vous plaisent.</p></div></section>', "Favoris — Valencia"];
  const m = "Bonjour Valencia, je souhaite un devis pour : " + l.map((p) => p.nom).join(", ") + ".";
  return [`<section><div class="w"><h1>Favoris</h1><p class="ligne"><a class="btn wa" target="_blank" rel="noopener" href="${wa(m)}">Envoyer ma sélection sur WhatsApp</a><a class="btn clair" href="mailto:${SITE.email}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(m)}">Envoyer par e-mail</a></p><div class="grille">${l.map(carte).join("")}</div><p class="note" style="margin-top:14px">Vos favoris sont gardés sur cet appareil.</p></div></section>`, "Favoris — Valencia"];
}
const aPropos = () => [`<section><div class="w" style="max-width:760px"><h1>À propos de Valencia</h1><p class="intro">Valencia est un magasin de meubles du centre-ville de Pointe-Noire.</p><p>Nous proposons des meubles de premier choix, principalement d'origine turque, sélectionnés pour quatre qualités : la durabilité, le confort, le design moderne et l'élégance.</p><p>Notre objectif est simple : vous aider à aménager un intérieur qui vous ressemble, du choix des pièces jusqu'à l'installation chez vous.</p><p class="ligne"><a class="btn" href="#/catalogue">Voir le catalogue</a><a class="btn clair" href="#/contact">Nous rendre visite</a></p></div></section>`, "À propos — Valencia"];
const livraison = () => [`<section><div class="w" style="max-width:760px"><h1>Livraison et installation</h1><div class="atouts" style="margin:20px 0"><div><b class="t">Expédition gratuite à Brazzaville</b></div><div><b class="t">Installation offerte</b></div></div><p>Pour les autres destinations, contactez le magasin afin de connaître les modalités.</p><p class="ligne"><a class="btn wa" target="_blank" rel="noopener" href="${wa("Bonjour Valencia, je souhaite connaître les modalités de livraison vers : ")}">Poser la question sur WhatsApp</a><a class="btn clair" href="tel:${SITE.telephone}">Appeler le magasin</a></p></div></section>`, "Livraison — Valencia"];
const contact = () => [`<section><div class="w"><h1>Contact</h1><div class="duo"><div><p><b>Adresse</b><br>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p><p><b>Téléphone</b><br><a href="tel:${SITE.telephone}">+242 06 758 5858</a></p><p><b>E-mail</b><br><a href="mailto:${SITE.email}">${SITE.email}</a></p><p><b>Horaires</b><br>À communiquer prochainement.</p></div>
  <form id="formulaire" novalidate><p><label for="nom">Nom</label><input id="nom" autocomplete="name" required></p><p><label for="tel">Téléphone</label><input id="tel" type="tel" autocomplete="tel"></p><p><label for="msg">Votre projet ou votre question</label><textarea id="msg" rows="5" required></textarea></p><p><button class="btn wa" type="submit">Envoyer sur WhatsApp</button></p><p class="note" id="retour" aria-live="polite">Le formulaire ouvre WhatsApp avec votre message prérempli.</p></form></div></div></section>`, "Contact — Valencia"];
function formulaire() {
  const f = $("#formulaire"); if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#nom").value.trim(), t = $("#tel").value.trim(), m = $("#msg").value.trim();
    if (!n || !m) { $("#retour").textContent = "Merci d'indiquer votre nom et votre message."; return; }
    window.open(wa("Bonjour Valencia, je suis " + n + (t ? " (" + t + ")" : "") + ". " + m), "_blank", "noopener");
    $("#retour").textContent = "WhatsApp s'ouvre avec votre message.";
  });
}

// ---------- Navigation ----------
const VUES = { "": accueil, catalogue, produit, promotions, inspirations, favoris: pageFavoris, "a-propos": aPropos, livraison, contact };
let prev = "";
function afficher() {
  clearTimeout(minuteur);
  const [, page = "", param = ""] = location.hash.split("/"), arg = decodeURIComponent(param);
  let r = null;
  if (page === "catalogue" && prev === "produit") { try { r = JSON.parse(mem.get("valencia-cat") || "null"); } catch (e) {} }
  const [html, titre] = (VUES[page] || accueil)(arg);
  $("#contenu").innerHTML = html; document.title = titre; scrollTo(0, 0); ecrireChronos();
  $("#menu").classList.remove("ouvert"); $("#b-menu").setAttribute("aria-expanded", "false");
  $$("#menu a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === "#/" + page));
  if (page === "catalogue") initCatalogue(arg, r);
  if (page === "") demarrerDiapo();
  if (page === "contact") formulaire();
  prev = page;
}

function construire() {
  const l = [["catalogue", "Catalogue"]];
  if (actives().length) l.push(["promotions", "Promotions"]);
  l.push(["inspirations", "Inspirations"], ["favoris", "Favoris"], ["livraison", "Livraison"], ["a-propos", "À propos"], ["contact", "Contact"]);
  $("#menu").innerHTML = l.map(([h, t]) => `<a href="#/${h}"${h === "favoris" ? ' id="lien-favoris"' : ""}${h === "promotions" ? ' class="promo"' : ""}>${t}</a>`).join("");
  const r = actives()[0], t = r ? titrePromo(r) + (r.texte ? " — " + r.texte : "") : SITE.annonce || "", b = $("#annonce");
  if (t && mem.get("valencia-annonce") !== "off") {
    b.hidden = false; b.innerHTML = `<a href="${r ? "#/promotions" : "#/catalogue"}">${esc(t)}</a><button type="button" aria-label="Fermer l'annonce">×</button>`;
    $("button", b).onclick = () => { b.hidden = true; mem.set("valencia-annonce", "off"); };
  } else b.hidden = true;
  $("#pied").innerHTML = `<div><h3>Valencia</h3><p>Meubles haut de gamme, principalement d'origine turque.</p></div>
    <div><h3>Nous trouver</h3><p>Centre-ville de Pointe-Noire, immeuble « Maison sans frontière », près de la mairie centrale.</p></div>
    <div><h3>Contact</h3><p><a href="tel:${SITE.telephone}">+242 06 758 5858</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p><p>${Object.entries(SITE.reseaux || {}).filter(([, u]) => u).map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(" · ")}</p></div>`;
  $("#wa").href = "https://wa.me/" + SITE.whatsapp;
}

// ---------- Clics ----------
document.addEventListener("click", (e) => {
  const t = e.target; let b;
  if (t.closest("#liste a")) sauver();
  if ((b = t.closest("[data-fav]"))) {
    const id = b.dataset.fav; favoris = favoris.includes(id) ? favoris.filter((x) => x !== id) : [...favoris, id]; majFav();
    if (location.hash === "#/favoris") return afficher();
    $$(`[data-fav="${id}"]`).forEach((x) => { x.setAttribute("aria-pressed", favoris.includes(id)); x.firstChild.textContent = favoris.includes(id) ? "♥" : "♡"; });
  } else if ((b = t.closest("[data-page]")) && !b.disabled) { cat.page = Number(b.dataset.page); liste(true); }
  else if ((b = t.closest("[data-photo]"))) {
    const p = trouver(decodeURIComponent(location.hash.split("/")[2] || "")), i = Number(b.dataset.photo);
    if (p) { $("#photo-principale").innerHTML = cadre(p, i, "eager"); $$("[data-photo]").forEach((x) => x.setAttribute("aria-current", x === b)); $("#fiche").innerHTML = fiche(p, i); }
  } else if (t.closest("#b-menu")) $("#b-menu").setAttribute("aria-expanded", $("#menu").classList.toggle("ouvert"));
  else if (t.closest("#b-theme")) { reg.theme = theme() === "sombre" ? "clair" : "sombre"; appliquer(); }
  else if (t.closest("#b-reglages")) {
    $(`[name=theme][value=${reg.theme}]`).checked = true; $(`[name=taille][value=${reg.taille}]`).checked = true; $("#r-pp").value = String(reg.parPage); $("#reglages").showModal();
  } else if (t === $("#reglages")) $("#reglages").close();
});
$("#reglages").addEventListener("change", (e) => {
  const c = e.target;
  if (c.name === "theme") reg.theme = c.value;
  if (c.name === "taille") reg.taille = c.value;
  if (c.id === "r-pp") { reg.parPage = Number(c.value); cat.page = 1; }
  appliquer(); if ($("#liste")) liste();
});
let tick = false;
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; sauver(); }); } }, { passive: true });
addEventListener("hashchange", afficher);

// ---------- Chrono des promotions ----------
function ecrireChronos() {
  const n = Date.now();
  $$(".chrono").forEach((el) => {
    const s = Math.max(0, Math.floor((Number(el.dataset.fin) - n) / 1000));
    const v = { j: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    $$("[data-u]", el).forEach((b) => { const t = String(v[b.dataset.u]).padStart(2, "0"); if (b.textContent !== t) b.textContent = t; });
  });
}
// Quand une promo commence ou se termine pendant que le visiteur est sur le site, tout se met à jour tout seul
const promoCle = () => actives().map((r) => SITE.promos.indexOf(r)).join();
let cleActuelle = promoCle();
function surveillerPromos() {
  const c = promoCle(); if (c === cleActuelle) return;
  cleActuelle = c; construire();
  if (location.hash.split("/")[1] === "catalogue" && $("#liste")) liste();
  else { const y = scrollY; afficher(); scrollTo({ top: y, behavior: "instant" }); }
}
setInterval(() => { ecrireChronos(); surveillerPromos(); }, 1000);

// ---------- Démarrage ----------
appliquer(); construire(); majFav(); afficher(); verifier();