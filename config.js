// =====================================================
//  TOUTES LES INFOS DU SITE SE MODIFIENT ICI
//  (les codes Firebase sont dans firebase-config.js)
// =====================================================
window.MARIAGE = {
  maries: { a: "Narjes", b: "Isiah" },

  // Format AAAA-MM-JJ
  date: "2027-06-26",
  dateLimiteReponse: "2027-03-01",
  ville: "Toulouse",

  // Section « Un mot de notre part » (chaque ligne = un paragraphe)
  motDesMaries: [
    "Si tu lis ces lignes, c'est que tu comptes énormément pour nous.",
    "Le 26 juin 2027, on se dit oui, et on a hâte de vivre ce moment entouré·e·s de celles et ceux qu'on aime. Tu trouveras ici tout ce qu'il faut savoir pour profiter pleinement de la journée.",
    "On a hâte de te retrouver, de trinquer et de danser avec toi !"
  ],
  signature: "Narjes & Isiah",

  programme: [
    { heure: "12h00", titre: "Mariage civil",    lieu: "Mairie de Toulouse",  icone: "rings" },
    { heure: "17h00", titre: "Cérémonie laïque", lieu: "La Bélonie, Marzens", icone: "heart" },
    { heure: "18h45", titre: "Vin d'honneur",    lieu: "La Bélonie, Marzens", icone: "glass" },
    { heure: "20h00", titre: "Dîner",            lieu: "La Bélonie, Marzens", icone: "diner" },
    { heure: "23h00", fin: "3h00", titre: "Let's party", lieu: "La Bélonie, Marzens", icone: "party" }
  ],

  lieux: [
    {
      badge: "Mariage civil",
      titre: "Mairie de Toulouse",
      sousTitre: "Le Capitole",
      adresse: "Place du Capitole, 31000 Toulouse",
      acces: [
        "Métro ligne A, station Capitole (2 min à pied)",
        "Parking souterrain Capitole ou Victor Hugo",
        "Le centre-ville est piéton : prévoyez un peu d'avance"
      ]
    },
    {
      badge: "Cérémonie & réception",
      titre: "La Bélonie",
      sousTitre: "Cérémonie laïque, vin d'honneur, dîner & soirée",
      adresse: "La Bélonie, 81500 Marzens",
      acces: [
        "Environ 45 min de route depuis Toulouse",
        "Parking sur place",
        "Pensez au covoiturage entre invités"
      ]
    }
  ],

  faq: [
    {
      q: "Y a-t-il un dress code ?",
      r: "Oui ! Les couleurs du jour sont le bleu et le rose. À vous de les porter comme vous le sentez.",
      couleurs: ["#7FA6DD", "#F2A9C6"]
    },
    {
      q: "Les enfants sont-ils acceptés ?",
      r: "Merci de nous prévenir en amont afin que nous puissions valider ensemble."
    },
    {
      q: "Des idées de lieux d'hébergement et d'activités à proximité ?",
      r: "" // à compléter plus tard
    },
    {
      q: "Y aura-t-il une urne à disposition le jour du mariage ?",
      r: "Votre présence est déjà un cadeau, mais si vous le souhaitez, une urne physique et en ligne sera disponible le jour J."
    },
    {
      q: "Jusqu'à quand puis-je répondre ?",
      r: "Merci de répondre au formulaire avant le 1er mars 2027."
    }
  ],

  // Section « Informations »
  infos: [
    {
      titre: "À partir de J-7",
      icone: "repos",
      texte: [
        "Après plus d'un an à préparer notre mariage, on a vraiment envie de se reposer et de profiter sereinement des derniers instants et du jour J.",
        "On aimerait qu'à J-7, toutes les questions de logistique soient envoyées aux témoins ou à la wedding planner.",
        "Bien sûr, tous les petits mots d'encouragement et d'amour sont les bienvenus 😉"
      ]
    },
    {
      titre: "Pendant les temps forts",
      icone: "photo",
      texte: [
        "On vous demande, s'il vous plaît, de ne pas utiliser vos téléphones (photos, vidéos) pendant les temps forts du mariage.",
        "On a envie de vraiment profiter tous ensemble de ce jour, et cela gâcherait également les prises de vue de la photographe.",
        "On va faire en sorte que vous puissiez récupérer directement, tout au long de la journée, les photos et vidéos des temps forts."
      ]
    }
  ],

  contacts: [
    { groupe: "Wedding planner",  nom: "Manon",           tel: "06 17 31 48 73" },
    { groupe: "Témoins d'Isiah",  nom: "Axel Dao",        tel: "06 87 42 96 06" },
    { groupe: "Témoins d'Isiah",  nom: "Yoan Touré",      tel: "06 09 42 40 22" },
    { groupe: "Témoins de Narjes", nom: "Edouard Degeilh", tel: "06 44 27 43 19" },
    { groupe: "Témoins de Narjes", nom: "Aliyah Schmidt",  tel: "06 42 15 24 39" }
  ]
};
