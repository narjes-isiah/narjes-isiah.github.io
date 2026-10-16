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

  // Photos du carrousel polaroid (page d'accueil) — légende facultative
  polaroids: [
    { src: "polaroid-1.jpg", legende: "" },
    { src: "polaroid-2.jpg", legende: "" },
    { src: "polaroid-3.jpg", legende: "New York" },
    { src: "polaroid-4.jpg", legende: "Abou Simbel" },
    { src: "polaroid-5.jpg", legende: "Paris" }
  ],

  // Section « Un mot de notre part » (chaque ligne = un paragraphe)
  motDesMaries: [
    "Rendez-vous sous le soleil du Sud-Ouest pour célébrer, bien manger, profiter et partager beaucoup d'amour.",
    "Le 26 juin 2027, on se dit oui, et on a hâte de vivre ce moment entourés de celles et ceux qu'on aime. Tu trouveras ici tout ce qu'il faut savoir pour profiter pleinement de la journée.",
    "On a hâte de te retrouver, de trinquer et de danser avec toi !"
  ],
  signature: "Narjes & Isiah",

  programme: [
    { heure: "11h00", titre: "Rendez-vous chez les parents de la mariée",
      description: "On commence les festivités comme le veut la tradition, avant de partir tous ensemble vers la mairie.",
      lieu: "Colomiers", icone: "home" },
    { heure: "12h00", titre: "Mariage civil",    lieu: "Mairie de Toulouse",  icone: "rings" },
    { heure: "17h00", titre: "Cérémonie laïque", lieu: "La Bélonie, Marzens", icone: "heart" },
    { heure: "18h45", titre: "Vin d'honneur",    lieu: "La Bélonie, Marzens", icone: "glass" },
    { heure: "20h00", titre: "Dîner",            lieu: "La Bélonie, Marzens", icone: "diner" },
    { heure: "23h00", titre: "Let's party", lieu: "La Bélonie, Marzens", icone: "party" }
  ],

  lieux: [
    {
      badge: "Rendez-vous",
      titre: "Domicile de Narjes",
      sousTitre: "Chez les parents de la mariée",
      adresse: "4 chemin du Parget, 31770 Colomiers",
      acces: [
        "Rendez-vous à 11h00",
        "Départ tous ensemble vers la mairie"
      ]
    },
    {
      badge: "Mariage civil",
      titre: "Mairie de Toulouse",
      sousTitre: "Le Capitole",
      adresse: "Place du Capitole, 31000 Toulouse",
      acces: [
        "Métro ligne A, station Capitole (2 min à pied)",
        "Parking souterrain Indigo Capitole ou Victor Hugo",
        "Le centre-ville est piéton : on vous conseille de privilégier directement l'un des parkings indiqués et de prévoir quelques minutes d'avance pour rejoindre la mairie"
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
        "Accès en voiture uniquement",
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
      r: "Le mariage de Narjes sans enfants ? Tu t'es vraiment posé la question ? Bien sûr qu'ils sont les bienvenus. Pensez simplement à nous prévenir en amont pour l'organisation."
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

  // Section « Nos petites demandes »
  infos: [
    {
      titre: "À l'approche du jour J",
      icone: "zen",
      texte: [
        "Après plus d'un an à préparer notre mariage, on a vraiment envie de se reposer et de profiter sereinement des derniers instants et du jour J.",
        "On aimerait qu'à J-7, toutes les questions de logistique soient envoyées aux témoins ou à la wedding planner.",
        "Bien sûr, tous les petits mots d'encouragement et d'amour sont les bienvenus 😉"
      ]
    },
    {
      titre: "Profitons du moment",
      icone: "photo",
      texte: [
        "Pendant les temps forts de la journée, on compte sur vous pour laisser les téléphones de côté. No worries, notre (superbe) photographe sera là pour immortaliser ces moments, alors laissez-la faire et profitons pleinement tous ensemble !"
      ]
    }
  ],

  contacts: [
    { groupe: "Wedding planner",  nom: "Manon",           tel: "06 17 31 48 73" },
    { groupe: "Témoins d'Isiah",  nom: "Axel",        tel: "06 87 42 96 06" },
    { groupe: "Témoins d'Isiah",  nom: "Yoan",      tel: "06 09 42 40 22" },
    { groupe: "Témoins de Narjes", nom: "Edouard", tel: "06 44 27 43 19" },
    { groupe: "Témoins de Narjes", nom: "Aliyah",  tel: "06 42 15 24 39" }
  ]
};
