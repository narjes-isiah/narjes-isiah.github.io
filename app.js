const M = window.MARIAGE;
const $ = (s, el = document) => el.querySelector(s);
const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const dateMariage = new Date(M.date + "T12:00:00");
const dateLimite = new Date(M.dateLimiteReponse + "T23:59:59");
const fmtLong = d => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fmtCourt = d => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const deux = n => String(n).padStart(2, "0");
const fmtPoints = d => `${deux(d.getDate())} . ${deux(d.getMonth() + 1)} . ${d.getFullYear()}`;
const noms = `${M.maries.a} & ${M.maries.b}`;

/* ---------- Textes ---------- */
document.title = `${noms} · ${fmtPoints(dateMariage).replace(/ /g, "")}`;
$("#nom-a").textContent = M.maries.a;
$("#nom-b").textContent = M.maries.b;
$("#hero-date").textContent = fmtPoints(dateMariage);
$("#programme-date").textContent = fmtLong(dateMariage);
$("#date-limite").textContent = fmtCourt(dateLimite).replace(/^1 /, "1er ");
$("#pied-noms").textContent = noms;
$("#pied-date").textContent = fmtPoints(dateMariage);

/* ---------- Compte à rebours (avec secondes) ---------- */
function compteur() {
  const diff = dateMariage - new Date();
  if (diff <= 0) { $("#compteur").innerHTML = `<div><b>C'est aujourd'hui !</b></div>`; return; }
  $("#cd-j").textContent = Math.floor(diff / 864e5);
  $("#cd-h").textContent = deux(Math.floor(diff / 36e5) % 24);
  $("#cd-m").textContent = deux(Math.floor(diff / 6e4) % 60);
  $("#cd-s").textContent = deux(Math.floor(diff / 1e3) % 60);
}
compteur();
setInterval(compteur, 1000);

/* ---------- Navigation ---------- */
const nav = $("#nav"), toggle = $("#nav-toggle"), menu = $("#menu-mobile");
const majNav = () => nav.classList.toggle("solide", window.scrollY > window.innerHeight * 0.75);
addEventListener("scroll", majNav, { passive: true });
majNav();
toggle.addEventListener("click", () => {
  const ouvert = menu.classList.toggle("ouvert");
  toggle.setAttribute("aria-expanded", ouvert);
  document.body.classList.toggle("menu-ouvert", ouvert);
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("ouvert"); toggle.setAttribute("aria-expanded", false); document.body.classList.remove("menu-ouvert"); }
});

/* ---------- Titre d'accueil : « Narjes & Isiah » sur une ligne, pleine largeur ---------- */
const titre = $("#hero-titre"), cadre = $(".hero-cadre");
function ajusterTitre() {
  const cs = getComputedStyle(titre.parentElement);
  const dispo = titre.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  titre.style.fontSize = "100px";
  const taille = Math.min(100 * dispo / titre.getBoundingClientRect().width, window.innerHeight * 0.3);
  titre.style.fontSize = taille + "px";
  cadre.style.fontSize = taille + "px";
}
ajusterTitre();
addEventListener("resize", ajusterTitre);
document.fonts?.ready.then(ajusterTitre);

/* ---------- Léger zoom de la photo au défilement ---------- */
const heroImg = $("#hero-img");
const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!calme) addEventListener("scroll", () => {
  const y = Math.min(window.scrollY, window.innerHeight);
  heroImg.style.transform = `scale(${1 + y / 2500}) translateY(${y * 0.06}px)`;
}, { passive: true });

/* ---------- Un mot de notre part ---------- */
const [accroche, ...suite] = M.motDesMaries || [];
$("#mot-accroche").textContent = accroche || "";
$("#mot-texte").innerHTML = suite.map(p => `<p>${esc(p)}</p>`).join("");
$("#mot-signature").textContent = M.signature || noms;

/* ---------- Déroulé ---------- */
$("#timeline").innerHTML = M.programme.map(p => `
  <li class="etape apparait${p.icone === "party" ? " fete" : ""}">
    <span class="etape-heure">${esc(p.heure)}</span>
    <div class="etape-corps">
      <h3 class="etape-titre">${esc(p.titre)}</h3>
      ${p.description ? `<p class="etape-desc">${esc(p.description)}</p>` : ""}
      <p class="etape-lieu">${p.itineraire
        ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.lieu)}" target="_blank" rel="noopener">${esc(p.lieu)} ↗</a>`
        : esc(p.lieu)}</p>
    </div>
  </li>`).join("");

/* ---------- Lieux ---------- */
$("#lieux-liste").innerHTML = M.lieux.map((l, i) => {
  const q = encodeURIComponent(l.adresse);
  return `
  <article class="lieu apparait">
    <div class="lieu-carte">
      <iframe loading="lazy" title="Plan : ${esc(l.titre)}" referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${q}&z=${i === 0 ? 16 : 13}&output=embed"></iframe>
      <span class="lieu-badge">${esc(l.badge || "")}</span>
    </div>
    <h3>${esc(l.titre)}</h3>
    <p class="lieu-sous">${esc(l.sousTitre)}</p>
    <p class="lieu-adresse">${esc(l.adresse)}</p>
    <ul>${l.acces.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
    <div class="lieu-liens">
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${q}">Google Maps</a>
      <a target="_blank" rel="noopener" href="https://waze.com/ul?q=${q}&navigate=yes">Waze</a>
      <a target="_blank" rel="noopener" href="https://maps.apple.com/?q=${q}">Plans</a>
    </div>
  </article>`;
}).join("");

/* ---------- Nos petites demandes ---------- */
$("#infos-liste").innerHTML = (M.infos || []).map(b => `
  <article class="info apparait">
    <h3>${esc(b.titre)}</h3>
    ${b.texte.map(t => `<p>${esc(t)}</p>`).join("")}
  </article>`).join("");

/* ---------- Contacts ---------- */
const groupes = {};
M.contacts.forEach(t => (groupes[t.groupe] ||= []).push(t));
$("#contacts-liste").innerHTML = `<div class="contacts">${Object.entries(groupes).map(([groupe, liste]) => `
  <div class="contact-groupe apparait">
    <p class="petit-titre">${esc(groupe)}</p>
    ${liste.map(t => {
      const intl = "+33" + t.tel.replace(/\s/g, "").slice(1);
      return `
      <div class="contact">
        <p class="contact-nom">${esc(t.nom)}</p>
        <p class="contact-tel">${esc(t.tel)}</p>
        <p class="contact-liens"><a href="tel:${intl}">Appeler</a><a href="sms:${intl}">SMS</a></p>
      </div>`;
    }).join("")}
  </div>`).join("")}</div>`;

/* ---------- FAQ ---------- */
$("#faq-liste").innerHTML = M.faq.map((f, i) => `
  <details class="apparait"${i === 0 ? " open" : ""}>
    <summary>${esc(f.q)}</summary>
    <p>${f.r ? esc(f.r) : `<em>Bientôt complété…</em>`}${f.couleurs ? `<span class="couleurs">${f.couleurs.map(c => `<i style="background:${esc(c)}"></i>`).join("")}</span>` : ""}</p>
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
  btn.disabled = true; btn.firstChild.textContent = "Envoi… ";
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
  } catch (err) {
    console.error(err);
    erreur(err.message === "config"
      ? "Le formulaire n'est pas encore activé. Contacte un témoin en attendant."
      : "Oups, l'envoi a échoué. Vérifie ta connexion et réessaie.");
  } finally {
    btn.disabled = false; btn.firstChild.textContent = "Envoyer ma réponse ";
  }
});

$("#btn-autre").addEventListener("click", () => {
  form.reset(); majPresence();
  $("#merci").hidden = true; form.hidden = false;
  form.nom.focus();
});
