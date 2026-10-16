const M = window.MARIAGE;
const $ = (s, el = document) => el.querySelector(s);
const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const dateMariage = new Date(M.date + "T12:00:00");
const dateLimite = new Date(M.dateLimiteReponse + "T23:59:59");
const fmtLong = d => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fmtCourt = d => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const deux = n => String(n).padStart(2, "0");
const fmtPoints = d => `${deux(d.getDate())} . ${deux(d.getMonth() + 1)} . ${d.getFullYear()}`;
const majuscule = s => s.charAt(0).toUpperCase() + s.slice(1);
const noms = `${M.maries.a} & ${M.maries.b}`;

/* ---------- Textes ---------- */
document.title = `${noms} · ${fmtPoints(dateMariage).replace(/ /g, "")}`;
$("#nom-a").textContent = M.maries.a;
$("#nom-b").textContent = M.maries.b;
$("#hero-date").textContent = majuscule(fmtCourt(dateMariage).replace(/ (\w)/, (m, c) => " " + c.toUpperCase()));
$("#programme-date").textContent = majuscule(fmtLong(dateMariage));
$("#date-limite").textContent = fmtCourt(dateLimite).replace(/^1 /, "1er ");
$("#pied-date").textContent = fmtPoints(dateMariage);

/* ---------- Compte à rebours (avec secondes) ---------- */
function compteur() {
  const diff = dateMariage - new Date();
  if (diff <= 0) { $("#compteur").innerHTML = `<div><b>C'est le grand jour !</b></div>`; return; }
  $("#cd-j").textContent = Math.floor(diff / 864e5);
  $("#cd-h").textContent = deux(Math.floor(diff / 36e5) % 24);
  $("#cd-m").textContent = deux(Math.floor(diff / 6e4) % 60);
  $("#cd-s").textContent = deux(Math.floor(diff / 1e3) % 60);
}
compteur();
setInterval(compteur, 1000);

/* ---------- Prénoms l'un sous l'autre, le plus grand possible ---------- */
const titre = $("#hero-titre");
function ajusterTitre() {
  const haut = $(".hero-haut"), pol = $("#polaroids");
  const cote = getComputedStyle(haut).flexDirection === "row";
  const dispo = cote ? haut.clientWidth - pol.offsetWidth - 60 : haut.clientWidth;
  titre.style.fontSize = "100px";
  const large = Math.max(...[...titre.querySelectorAll(".ligne")].map(l => l.getBoundingClientRect().width));
  const taille = Math.min(100 * dispo * (cote ? 1 : 0.82) / large, window.innerHeight * (cote ? 0.2 : 0.155));
  titre.style.fontSize = taille + "px";
}
ajusterTitre();
addEventListener("resize", ajusterTitre);
document.fonts?.ready.then(ajusterTitre);

/* ---------- Carrousel polaroid ---------- */
const pile = $("#polaroids");
const photos = M.polaroids || [];
pile.innerHTML = photos.map((p, i) => `
  <figure class="polaroid" data-pos="${Math.min(i, 3)}">
    <img src="${esc(p.src)}" alt="Narjes et Isiah" ${i > 1 ? 'loading="lazy"' : ""}>
    <figcaption>${esc(p.legende || "")}</figcaption>
  </figure>`).join("");
let cartes = [...pile.children];
function suivante() {
  const devant = cartes[0];
  devant.classList.add("sortie");
  setTimeout(() => {
    cartes = [...cartes.slice(1), devant];
    cartes.forEach((c, i) => { c.dataset.pos = Math.min(i, 3); });
    devant.classList.remove("sortie");
  }, 900);
}
if (cartes.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(suivante, 2500);

/* ---------- Navigation ---------- */
const nav = $("#nav"), toggle = $("#nav-toggle"), liens = $("#nav-links");
const majNav = () => nav.classList.toggle("solide", window.scrollY > window.innerHeight * 0.6);
addEventListener("scroll", majNav, { passive: true });
majNav();
toggle.addEventListener("click", () => {
  const ouvert = liens.classList.toggle("ouvert");
  toggle.setAttribute("aria-expanded", ouvert);
});
liens.addEventListener("click", e => { if (e.target.tagName === "A") { liens.classList.remove("ouvert"); toggle.setAttribute("aria-expanded", false); } });

/* ---------- Icônes ---------- */
const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONES = {
  home:  svg('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  rings: svg('<circle cx="9" cy="14" r="5.5"/><circle cx="15" cy="14" r="5.5"/><path d="M10 4.5l2-2 2 2-2 2z"/>'),
  heart: svg('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>'),
  glass: svg('<path d="M6 3h5l-.5 6a2 2 0 0 1-4 0zM13 3h5l.5 6a2 2 0 0 1-4 0zM8.5 11v8M15.5 11v8M6 21h5M13 21h5"/>'),
  diner: svg('<path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11M17 21V3c-2 1.5-3 4-3 7h3"/>'),
  party: svg('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  sms:   svg('<path d="M4 5h16v11H9l-5 4z"/>'),
  zen:   svg('<path d="M3 18V8"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11.5" r="1.8"/><path d="M14 3.5h3l-3 3h3"/><path d="M18.5 1.5h2l-2 2h2"/>'),
  repos: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
  photo: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/><path d="M3 3l18 18"/>')
};

/* ---------- Un mot de notre part ---------- */
const [accroche, ...suite] = M.motDesMaries || [];
$("#mot-accroche").textContent = accroche || "";
$("#mot-texte").innerHTML = suite.map(p => `<p>${esc(p)}</p>`).join("");
$("#mot-signature").textContent = M.signature || noms;

/* ---------- Déroulé (vertical) ---------- */
$("#timeline").innerHTML = M.programme.map((p, i) => `
  <li class="etape apparait ${p.icone === "party" ? "t4" : "t" + (i % 4)}">
    <span class="etape-heure">${esc(p.heure)}</span>
    <div class="etape-corps">
      <p class="etape-titre">${esc(p.titre)}</p>
      ${p.description ? `<p class="etape-desc">${esc(p.description)}</p>` : ""}
      <p class="etape-lieu">${p.itineraire
        ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.lieu)}" target="_blank" rel="noopener">📍 ${esc(p.lieu)}</a>`
        : esc(p.lieu)}</p>
    </div>
    <span class="etape-icone">${ICONES[p.icone] || ICONES.heart}</span>
  </li>`).join("");

/* ---------- Lieux ---------- */
$("#lieux-liste").innerHTML = M.lieux.map((l, i) => {
  const q = encodeURIComponent(l.adresse);
  return `
  <article class="carte lieu apparait">
    <iframe loading="lazy" title="Plan : ${esc(l.titre)}" referrerpolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=${q}&z=${/Bélonie/.test(l.titre) ? 13 : 15}&output=embed"></iframe>
    <div class="lieu-corps">
      <span class="lieu-badge">${esc(l.badge || "")}</span>
      <h3>${esc(l.titre)}</h3>
      <p class="lieu-sous">${esc(l.sousTitre)}</p>
      <p class="lieu-adresse">${esc(l.adresse)}</p>
      <ul>${l.acces.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
      <div class="lieu-actions">
        <a class="btn btn-secondaire" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${q}">Google Maps</a>
        <a class="btn btn-secondaire" target="_blank" rel="noopener" href="https://waze.com/ul?q=${q}&navigate=yes">Waze</a>
        <a class="btn btn-secondaire" target="_blank" rel="noopener" href="https://maps.apple.com/?q=${q}">Plans (Apple)</a>
      </div>
    </div>
  </article>`;
}).join("");

/* ---------- Nos petites demandes ---------- */
$("#infos-liste").innerHTML = (M.infos || []).map(b => `
  <article class="carte info apparait">
    <div class="info-icone">${ICONES[b.icone] || ICONES.heart}</div>
    <h3>${esc(b.titre)}</h3>
    ${b.texte.map(t => `<p>${esc(t)}</p>`).join("")}
  </article>`).join("");

/* ---------- Contacts ---------- */
const groupes = {};
M.contacts.forEach(t => (groupes[t.groupe] ||= []).push(t));
$("#contacts-liste").innerHTML = `<div class="temoins-groupes">${Object.entries(groupes).map(([groupe, liste]) => `
  <div class="temoins-groupe apparait">
    <h4>${esc(groupe)}</h4>
    <div class="temoins-grille">${liste.map(t => {
      const intl = "+33" + t.tel.replace(/\s/g, "").slice(1);
      return `
      <div class="temoin">
        <div class="avatar">${esc(t.nom[0])}</div>
        <div class="temoin-infos">
          <p class="temoin-nom">${esc(t.nom)}</p>
          <p class="temoin-tel">${esc(t.tel)}</p>
        </div>
        <div class="temoin-actions">
          <a class="rond" href="tel:${intl}" aria-label="Appeler ${esc(t.nom)}">${ICONES.phone}</a>
          <a class="rond" href="sms:${intl}" aria-label="Envoyer un SMS à ${esc(t.nom)}">${ICONES.sms}</a>
        </div>
      </div>`;
    }).join("")}</div>
  </div>`).join("")}</div>`;

/* ---------- FAQ ---------- */
$("#faq-liste").innerHTML = M.faq.map((f, i) => `
  <details class="apparait">
    <summary>${esc(f.q)}</summary>
    <p>${f.r ? esc(f.r) : `<em class="a-venir">Bientôt complété ✨</em>`}${f.couleurs ? `<span class="couleurs">${f.couleurs.map(c => `<i style="background:${esc(c)}"></i>`).join("")}</span>` : ""}</p>
  </details>`).join("");

/* ---------- Apparitions au défilement ---------- */
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".apparait").forEach(el => {
  const freres = [...el.parentElement.children].filter(x => x.classList.contains("apparait"));
  el.style.transitionDelay = `${(freres.indexOf(el) % 6) * 90}ms`;
  obs.observe(el);
});

/* ---------- Formulaire RSVP ---------- */
const form = $("#form-rsvp"), statut = $("#form-statut"), blocPresent = $("#si-present");
const majPresence = () => { blocPresent.hidden = form.presence.value === "non"; };
form.addEventListener("change", majPresence);
majPresence();

function erreur(msg, champ) {
  statut.textContent = msg;
  statut.className = "form-statut erreur";
  if (champ) { champ.closest(".champ")?.classList.add("invalide"); champ.focus?.(); }
}
form.addEventListener("input", e => e.target.closest(".champ")?.classList.remove("invalide"));
form.addEventListener("change", e => e.target.closest(".champ")?.classList.remove("invalide"));

let db = null, fs = null;
async function initFirebase() {
  if (db) return;
  if (!M.firebase || String(M.firebase.apiKey).startsWith("A_REMPLACER")) throw new Error("config");
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  fs = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  db = fs.getFirestore(initializeApp(M.firebase));
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  statut.textContent = ""; statut.className = "form-statut";
  if (form.site.value) return;

  const nom = form.nom.value.trim();
  const presence = form.presence.value;
  if (nom.length < 2) return erreur("Merci d'indiquer ton prénom.", form.nom);
  if (!presence) return erreur("Merci d'indiquer si tu seras présent.", form.querySelector("[name=presence]"));

  const coupe = (v, max) => v.trim().slice(0, max);
  const reponse = {
    nom: coupe(nom, 120),
    presence,
    allergies: presence === "oui" ? coupe(form.allergies.value, 300) : "",
    chanson: presence === "oui" ? coupe(form.chanson.value, 200) : "",
    message: ""
  };

  const btn = $("#btn-envoyer");
  btn.disabled = true;
  try {
    await initFirebase();
    await fs.addDoc(fs.collection(db, "rsvp"), { ...reponse, creeLe: fs.serverTimestamp() });
    form.hidden = true;
    const merci = $("#merci");
    merci.hidden = false;
    const prenom = reponse.nom.split(" ")[0];
    $("#merci-titre").textContent = presence === "oui" ? `Merci ${prenom} !` : `Merci ${prenom}`;
    $("#merci-texte").textContent = presence === "oui"
      ? `On a hâte de te retrouver le ${fmtCourt(dateMariage)} !`
      : "Tu vas nous manquer. Merci d'avoir pris le temps de répondre.";
    merci.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (err) {
    console.error(err);
    erreur(err.message === "config"
      ? "Le formulaire n'est pas encore activé. Contacte un témoin en attendant."
      : "Oups, l'envoi a échoué. Vérifie ta connexion et réessaie.");
  } finally {
    btn.disabled = false;
  }
});

$("#btn-autre").addEventListener("click", () => {
  form.reset(); majPresence();
  $("#merci").hidden = true; form.hidden = false;
  form.nom.focus();
});
