import React from 'react';

const texts = {
  details: "Detaily",
  close: "Zavrieť",
  products: "Produkty",
  contact: "Kontakt",
  howToOrder: "Ako Objednať",
  downloads: "Na Stiahnutie",
  jobs: "Ponuka práce",
  search: "Hľadať",
  companyName: "Bflex, s.r.o.",
  companySlogan: "Predaj a technické poradenstvo",
  companyContactInfo:
    <div>
        <p>Ľ. Fullu 7, 841 05 Bratislava</p>
        <p>tel. +421 2 20721062</p>
        <p>fax.: +421 2 20730795</p>
        <p>mob.: +421 917 701028</p>
        <p>e-mail: info@bflex.sk</p>
    </div>,
  create: "Vytvoriť",
  cancel: "Zrušiť",
  delete: "✖",
  productNamePlaceholder: "Názov produktu",
  productDescriptionPlaceholder: "Popis produktu",
  productTagsPlaceholder: "Tagy (oddelovať s ,)",
  chooseCategoryPlaceholder: "Vybrať kategóriu",
  tableColumnsPlaceholder: "Stĺpce tabulky (oddelovať s ,)",
  tableRowsPlaceholder: "Riadky tabulky (oddelovať s ,)",
  login: "Prihlásiť sa",
  namePlaceholder: "Meno",
  passwordPlaceholder: "Heslo",
  emailPlaceholder: "Email",
  categoryNamePlaceholder: "Názov kategórie",
  categoryDescriptionPlaceholder: "Popis kategórie",
  newestProducts: "Najnovšie produkty",
  howToOrderDescription: "Na karte produktu sa nachádza tlačidlo Pridať. " +
    "Po jeho stlačení sa otvorí zoznam vybratého tovaru, do ktorého môžte dalej pridávať. " +
    "Keď budete mať všetko vybraté, stlačte tlačidlo Odoslať záujem. " +
    "Následne vyplnte vaše meno, email a prípadnú poznámku. " +
    "Bude vám zaslaná potvrdenka a s ďalším postupom Vás budeme následne kontaktovať.",
  searchResultFor: "Výsledok hladania: ",
  send: "Odoslať",
  orderInterest: "Odoslať záujem",
  addToCart: "Pridať",
  yourContact: "Kontakt na Vás",
  yourName: "Vaše meno:",
  yourEmail: "Váš Email:",
  note: "Poznámka:",
  noJobsOpenATM: "Momentálne nemáme otvorené žiadne pracovné pozície",
  jobNamePlaceholder: "Názov Pozície",
  jobDescriptionPlaceholder: "Popis pozície",
  downloadLink: "Stiahnuť",
  fileNamePlaceholder: "Názov súboru",
  fileDescriptionPlaceholder: "Popis súboru",
  orderUP: "▲",
  orderDown: "▼",
};

const constants = {
  endpoint: 'https://bflex-api.herokuapp.com',
};

export{texts, constants}