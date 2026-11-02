// ==========================================================
// Valencia — boutique : compte, panier, commande, paiement, suivi
// À charger APRÈS app.js (voir index.html). Parle au serveur /api.
// ==========================================================
(() => {
  const STATUTS = ["en_attente", "confirmee", "preparation", "expediee", "livree"];
  const LIB = { en_attente: "Commande reçue", confirmee: "Confirmée", preparation: "En préparation", expediee: "En cours de livraison", livree: "Livrée", annulee: "Annulée" };
  const PAIE = { non_paye: "À payer", paye: "Payée", a_la_livraison: "Paiement à la livraison" };
  const VILLES = ["Pointe-Noire", "Brazzaville", "Autre"];

  let moi = ls.get("valencia-moi");
  let panier = ls.get("valencia-panier") || [];
  const date = (d) => new Date(d.replace(" ", "T") + "Z").toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

  async function api(chemin, m = "GET", b) {
    const j = ls.get("valencia-jeton");
    const r = await fetch("/api" + chemin, { method: m, headers: { "Content-Type": "application/json", ...(j ? { Authorization: "Bearer " + j } : {}) }, body: b ? JSON.stringify(b) : undefined });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { if (r.status === 401 && j) deconnecter(); throw new Error(d.erreur || "Erreur " + r.status); }
    return d;
  }
  function connecter(d) { ls.set("valencia-jeton", d.jeton); ls.set("valencia-moi", (moi = d.user)); construire(); }
  function deconnecter() { ls.set("valencia-jeton", null); ls.set("valencia-moi", (moi = null)); construire(); }

  // ---------- Panier ----------
  // Prix vendable : prix remisé si promo, sinon prix normal. Les prix multiples ou « sur demande » ne se commandent pas en ligne.
  const prixVente = (p) => {
    if ((String(p.prix).match(/\d[\d.]*\d/g) || []).length > 1) return null;
    const c = promoDe(p);
    return c && c.n ? c.n : nombre(p);
  };
  const lignes = () => panier.map((l) => ({ l, p: trouver(l.id) })).filter((x) => x.p && prixVente(x.p));
  const total = () => lignes().reduce((s, { l, p }) => s + prixVente(p) * l.qte, 0);
  const nb = () => panier.reduce((s, l) => s + l.qte, 0);
  const sauverPanier = () => { ls.set("valencia-panier", panier); majMenu(); };
  function ajouter(id) {
    const l = panier.find((x) => x.id === id);
    l ? (l.qte = Math.min(50, l.qte + 1)) : panier.push({ id, qte: 1 });
    sauverPanier(); toast("Ajouté au panier");
  }
  function toast(t) {
    let e = $("#toast");
    if (!e) { e = document.createElement("div"); e.id = "toast"; e.setAttribute("role", "status"); document.body.appendChild(e); }
    e.textContent = t; e.className = "on"; clearTimeout(toast.t); toast.t = setTimeout(() => (e.className = ""), 1800);
  }
  const bouton = (p, cls) => (prixVente(p) ? `<button class="btn ${cls}" type="button" data-add="${esc(p.id)}">${cls === "petit" ? "🛒" : "Ajouter au panier"}</button>` : "");

  // Boutons « panier » sur les cartes et les fiches produit (sans toucher à app.js)
  const carteOrig = carte;
  carte = (p) => carteOrig(p).replace('<button class="fav"', bouton(p, "petit") + '<button class="fav"');
  const produitOrig = VUES.produit;
  VUES.produit = (id) => {
    const [h, t] = produitOrig(id), p = trouver(id);
    return [p ? h.replace('<div class="ligne"><a class="btn wa"', '<div class="ligne">' + bouton(p, "") + '<a class="btn wa"') : h, t];
  };

  // Menu : Panier + Compte
  const majMenu = () => { const a = $("#lien-panier"); if (a) a.textContent = nb() ? "Panier (" + nb() + ")" : "Panier"; };
  const construireOrig = construire;
  construire = () => {
    construireOrig();
    $("#menu").insertAdjacentHTML("beforeend", `<a href="#/panier" id="lien-panier">Panier</a>` + (moi ? `<a href="#/compte">Mon compte</a>` : `<a href="#/connexion">Connexion</a>`));
    majMenu();
  };

  // ---------- Pages ----------
  const champ = (id, lib, type = "text", extra = "") => `<p><label for="${id}">${lib}</label><input id="${id}" type="${type}" ${extra}></p>`;
  const msg = (id = "retour") => `<p class="alerte" id="${id}" role="alert" hidden></p>`;
  const page = (h, t) => [`<section><div class="w" style="max-width:${t || 760}px">${h}</div></section>`];

  VUES.connexion = () => page(`<h1>Connexion</h1><form id="form-connexion" novalidate>${champ("c-email", "E-mail", "email", 'autocomplete="email" required')}${champ("c-mdp", "Mot de passe", "password", 'autocomplete="current-password" required')}${msg()}<p><button class="btn" type="submit">Se connecter</button></p></form><p>Pas de compte ? <a href="#/inscription">Créer un compte</a></p>`, 460).concat("Connexion — Valencia");
  VUES.inscription = () => page(`<h1>Créer un compte</h1><form id="form-inscription" novalidate>${champ("i-nom", "Nom complet", "text", 'autocomplete="name" required')}${champ("i-email", "E-mail", "email", 'autocomplete="email" required')}${champ("i-tel", "Téléphone", "tel", 'autocomplete="tel"')}${champ("i-mdp", "Mot de passe (8 caractères minimum)", "password", 'autocomplete="new-password" minlength="8" required')}${msg()}<p><button class="btn" type="submit">Créer mon compte</button></p></form><p>Déjà inscrit ? <a href="#/connexion">Se connecter</a></p>`, 460).concat("Inscription — Valencia");

  const champsPaiement = () => `<fieldset><legend>Paiement</legend><div class="ch">
    <label><input type="radio" name="methode" value="mtn" checked> MTN Mobile Money</label>
    <label><input type="radio" name="methode" value="airtel"> Airtel Money</label>
    <label><input type="radio" name="methode" value="livraison"> À la livraison</label></div>
    <p id="p-mm" style="margin-top:10px"><label for="p-tel">Numéro Mobile Money</label><input id="p-tel" type="tel" placeholder="06 000 0000" autocomplete="tel"></p></fieldset>`;

  VUES.panier = () => {
    const L = lignes();
    if (!L.length) return page(`<h1>Panier</h1><p>Votre panier est vide. Parcourez le <a href="#/catalogue">catalogue</a>.</p>`).concat("Panier — Valencia");
    const rows = L.map(({ l, p }) => `<div class="lp"><div><b>${esc(p.nom)}</b><br><span class="note">${fmt(prixVente(p))} l'unité</span></div>
      <div class="qte"><button type="button" data-qte="${esc(p.id)}" data-d="-1" aria-label="Moins">−</button><b>${l.qte}</b><button type="button" data-qte="${esc(p.id)}" data-d="1" aria-label="Plus">+</button></div>
      <div><b>${fmt(prixVente(p) * l.qte)}</b></div><button type="button" class="fav" data-del="${esc(p.id)}" aria-label="Retirer">✕</button></div>`).join("");
    const form = moi ? `<form id="form-commande" novalidate><h2>Livraison</h2>
      <p><label for="o-ville">Ville</label><select id="o-ville">${VILLES.map((v) => `<option>${v}</option>`).join("")}</select></p>
      <p class="note" id="o-info">Expédition gratuite à Brazzaville, installation offerte.</p>
      ${champ("o-adresse", "Adresse de livraison (quartier, repère)", "text", 'autocomplete="street-address" required')}
      ${champ("o-tel", "Téléphone joignable", "tel", 'autocomplete="tel" required value="' + esc(moi.tel || "") + '"')}
      ${champsPaiement()}${msg()}<p><button class="btn wa" type="submit">Commander · ${fmt(total())}</button></p></form>`
      : `<p class="alerte">Connectez-vous pour finaliser la commande. <a href="#/connexion">Connexion</a> · <a href="#/inscription">Créer un compte</a></p>`;
    return page(`<h1>Panier</h1>${rows}<p style="text-align:right;font-size:1.2rem">Total : <b>${fmt(total())}</b></p>${form}`).concat("Panier — Valencia");
  };

  VUES.compte = () => !moi
    ? VUES.connexion()
    : page(`<div class="ent"><div><h1>Mon compte</h1><p>${esc(moi.nom)} · ${esc(moi.email)}</p></div><button class="btn clair petit" type="button" data-deco>Se déconnecter</button></div>
      <h2>Mes commandes</h2><div id="cmds" aria-live="polite">Chargement…</div>${moi.role === "admin" ? `<h2 style="margin-top:30px">Ventes (administration)</h2><div id="ventes">Chargement…</div>` : ""}`).concat("Mon compte — Valencia");

  VUES.commande = (id) => !moi ? VUES.connexion() : page(`<p><a href="#/compte">← Mes commandes</a></p><div id="suivi" aria-live="polite">Chargement…</div>`).concat("Suivi — Valencia");

  // ---------- Données de pages (chargées après l'affichage) ----------
  let minuteurSuivi = null;
  const badge = (s) => `<span class="tag">${LIB[s] || PAIE[s] || s}</span>`;
  async function suivi(id) {
    const zone = $("#suivi"); if (!zone) return;
    try {
      const o = await api("/commandes/" + id), a = o.statut === "annulee", pos = STATUTS.indexOf(o.statut);
      const evt = Object.fromEntries(o.evenements.map((e) => [e.statut, e]));
      const flash = mem.get("valencia-msg"); mem.set("valencia-msg", "");
      zone.innerHTML = `<h1>Commande n° ${o.id}</h1>${flash ? `<p class="alerte">${esc(flash)}</p>` : ""}
        <p>${badge(o.statut)} ${badge(o.paiement)} · ${esc(o.ville)} · ${date(o.cree)}</p>
        ${a ? `<p class="alerte">Cette commande a été annulée.</p>` : `<ol class="suivi">${STATUTS.map((s, i) => `<li class="${i <= pos ? "fait" : ""}${i === pos ? " en-cours" : ""}"><b>${LIB[s]}</b>${evt[s] ? `<br><small>${date(evt[s].cree)}${evt[s].note ? " · " + esc(evt[s].note) : ""}</small>` : ""}</li>`).join("")}</ol>`}
        <h2>Articles</h2>${o.articles.map((x) => `<p>${x.qte} × ${esc(x.nom)} — ${fmt(x.prix * x.qte)}</p>`).join("")}
        <p>Livraison : ${esc(o.adresse)} · ${esc(o.tel)}</p><p><b>Total : ${fmt(o.total)}</b></p>
        ${o.paiement === "non_paye" && !a ? `<form id="form-paiement" data-id="${o.id}" novalidate>${champsPaiement()}${msg()}<p><button class="btn wa" type="submit">Payer ${fmt(o.total)}</button></p></form>` : o.paiements.map((p) => `<p class="note">Paiement ${esc(p.methode.toUpperCase())} : ${PAIE[p.statut] || p.statut}${p.reference ? " · réf. " + esc(p.reference) : ""}</p>`).join("")}
        <p><a class="btn clair petit" target="_blank" rel="noopener" href="${wa("Bonjour Valencia, question sur ma commande n° " + o.id)}">Question sur WhatsApp</a></p>`;
    } catch (e) { zone.innerHTML = `<p class="alerte">${esc(e.message)}</p>`; }
  }
  async function listes() {
    try {
      const c = await api("/commandes");
      $("#cmds").innerHTML = c.length ? c.map((o) => `<p><a href="#/commande/${o.id}">Commande n° ${o.id}</a> · ${date(o.cree)} · ${fmt(o.total)} ${badge(o.statut)}</p>`).join("") : "<p>Aucune commande pour l'instant.</p>";
      if (moi.role === "admin") {
        const v = await api("/admin/commandes");
        $("#ventes").innerHTML = v.length ? v.map((o) => `<div class="lp"><div><a href="#/commande/${o.id}">n° ${o.id}</a> · ${esc(o.client)}<br><span class="note">${esc(o.ville)} · ${fmt(o.total)} · ${PAIE[o.paiement]}</span></div>
          <select data-statut="${o.id}" aria-label="Statut">${[...STATUTS, "annulee"].map((s) => `<option value="${s}"${s === o.statut ? " selected" : ""}>${LIB[s]}</option>`).join("")}</select></div>`).join("") : "<p>Aucune vente.</p>";
      }
    } catch (e) { $("#cmds").innerHTML = `<p class="alerte">${esc(e.message)}</p>`; }
  }
  function apres() {
    clearInterval(minuteurSuivi);
    const [, p = "", id = ""] = location.hash.split("/");
    if (p === "commande" && moi) { suivi(id); minuteurSuivi = setInterval(() => suivi(id), 30000); }
    if (p === "compte" && moi) listes();
  }

  // ---------- Actions (délégation : fonctionne même si la page est redessinée) ----------
  const montrer = (f, t) => { const e = $(".alerte[role=alert]", f); e.textContent = t; e.hidden = !t; };
  const valeurPaiement = (f) => ({ methode: $("[name=methode]:checked", f).value, tel: $("#p-tel", f).value.trim() });
  const retour = () => { const r = mem.get("valencia-retour"); mem.set("valencia-retour", ""); location.hash = r || "#/compte"; };

  document.addEventListener("click", (e) => {
    const t = e.target; let b;
    if ((b = t.closest("[data-add]"))) { e.preventDefault(); ajouter(b.dataset.add); }
    else if ((b = t.closest("[data-qte]"))) { const l = panier.find((x) => x.id === b.dataset.qte); l.qte += Number(b.dataset.d); if (l.qte < 1) panier = panier.filter((x) => x !== l); l.qte = Math.min(l.qte, 50); sauverPanier(); afficher(); }
    else if ((b = t.closest("[data-del]"))) { panier = panier.filter((x) => x.id !== b.dataset.del); sauverPanier(); afficher(); }
    else if (t.closest("[data-deco]")) { deconnecter(); location.hash = "#/"; }
  });
  document.addEventListener("change", async (e) => {
    const t = e.target;
    if (t.name === "methode") $("#p-mm").hidden = t.value === "livraison";
    if (t.id === "o-ville") $("#o-info").textContent = t.value === "Autre" ? "Autre destination : les modalités vous seront confirmées par WhatsApp." : "Expédition gratuite à Brazzaville, installation offerte.";
    if (t.dataset.statut) { try { await api("/admin/commandes/" + t.dataset.statut, "PATCH", { statut: t.value }); toast("Statut mis à jour"); } catch (x) { toast(x.message); } }
  });
  document.addEventListener("submit", async (e) => {
    const f = e.target; if (!f.id || !/^form-(connexion|inscription|commande|paiement)$/.test(f.id)) return;
    e.preventDefault(); const btn = $("[type=submit]", f); btn.disabled = true; montrer(f, "");
    try {
      if (f.id === "form-connexion") { connecter(await api("/connexion", "POST", { email: $("#c-email").value, mdp: $("#c-mdp").value })); retour(); }
      else if (f.id === "form-inscription") { connecter(await api("/inscription", "POST", { nom: $("#i-nom").value, email: $("#i-email").value, tel: $("#i-tel").value, mdp: $("#i-mdp").value })); retour(); }
      else if (f.id === "form-paiement") { await api(`/commandes/${f.dataset.id}/paiement`, "POST", valeurPaiement(f)); suivi(f.dataset.id); }
      else {
        const o = await api("/commandes", "POST", { articles: lignes().map(({ l, p }) => ({ id: p.id, nom: p.nom, prix: prixVente(p), qte: l.qte })), ville: $("#o-ville").value, adresse: $("#o-adresse").value, tel: $("#o-tel").value });
        panier = []; sauverPanier();
        try { await api(`/commandes/${o.id}/paiement`, "POST", valeurPaiement(f)); }
        catch (x) { mem.set("valencia-msg", "Commande enregistrée, mais le paiement a échoué : " + x.message); }
        location.hash = "#/commande/" + o.id;
      }
    } catch (x) { montrer(f, x.message); btn.disabled = false; }
  });
  addEventListener("hashchange", apres); // enregistré après celui d'app.js : la page est déjà affichée

  // Accès protégés : on retient où revenir après la connexion
  let avant = location.hash;
  addEventListener("hashchange", () => {
    if (!moi && /^#\/(commande|compte)/.test(location.hash)) mem.set("valencia-retour", location.hash);
    if (/^#\/(connexion|inscription)/.test(location.hash) && avant === "#/panier") mem.set("valencia-retour", "#/panier");
    avant = location.hash;
  });

  // Styles
  document.head.insertAdjacentHTML("beforeend", `<style>
.lp{display:grid;grid-template-columns:1fr auto auto auto;gap:10px 14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--trait)}
@media(max-width:600px){.lp{grid-template-columns:1fr auto}}
.qte{display:flex;align-items:center;gap:8px}.qte button{width:32px;height:32px;border:1px solid var(--trait);border-radius:50%;background:var(--carte);color:var(--texte);cursor:pointer}
.suivi{list-style:none;margin:16px 0;padding:0 0 0 22px;border-left:3px solid var(--trait)}
.suivi li{position:relative;padding:0 0 18px 16px;color:var(--gris)}
.suivi li::before{content:"";position:absolute;left:-31px;top:2px;width:16px;height:16px;border-radius:50%;background:var(--fond);border:3px solid var(--trait)}
.suivi li.fait{color:var(--texte)}.suivi li.fait::before{background:var(--vert);border-color:var(--vert)}.suivi li.en-cours b{color:var(--vert)}
#toast{position:fixed;left:50%;bottom:80px;translate:-50% 20px;z-index:60;padding:10px 18px;border-radius:99px;background:var(--acc);color:var(--surAcc);opacity:0;pointer-events:none;transition:.25s}
#toast.on{opacity:1;translate:-50% 0}
</style>`);

  construire(); // ajoute Panier/Connexion au menu
  if (/^#\/(panier|connexion|inscription|compte|commande)/.test(location.hash)) { afficher(); apres(); }
})();
