// Récupération des pièces depuis le fichier JSON
const response = await fetch("pieces-autos.json");
const pieces = await response.json();

for (let i = 0; i < pieces.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = pieces[i].image;
    // Nom
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;
    // Prix
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    // Categorie
    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
    // Description
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment";
    // Disponibilité
    const dispoElement = document.createElement("p");
    dispoElement.innerText = pieces[i].dispo ? "En stock" : "Rupture de stock";
    
    /*
     * Ajout des éléments dans le DOM
     */
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(dispoElement);
}

// Tri par prix croissant sur le bouton dédié
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

// Tri par prix décroissant sur le bouton dédié
const boutonTrierDecroi = document.querySelector(".btn-trier-decroi");
boutonTrierDecroi.addEventListener("click", function () {
    const piecesOrdonneesDecroi = Array.from(pieces);
    piecesOrdonneesDecroi.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonneesDecroi);
});

// Filtre sur le prix abordables des pièces après appui sur le bouton dédié
const boutonFiltrerAbor = document.querySelector(".btn-filtrer");
boutonFiltrerAbor.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   console.log(piecesFiltrees);
});

// Filtre sur le prix non abordables des pièces après appui sur le bouton dédié
const boutonFiltrerNoAbor = document.querySelector(".btn-filtrer-abord");
boutonFiltrerNoAbor.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix > 35;
   });
   console.log(piecesFiltrees);
});

// Filtrer les pièces sans description
const boutonFiltrerNoDescr = document.querySelector(".nodescr");
boutonFiltrerNoDescr.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description;
   });
   console.log(piecesFiltrees);
});

// Exemple autre
const prix_doubles = pieces.map(piece => piece.prix * 2);

// Récupération des noms des pièces uniquement
const noms = pieces.map(piece => piece.nom);
// Et suppression des pièces non abordables
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1);
   }
}
// console.log(noms);

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)



// Afficher les pièces disponibles
const noms_dispo = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(!pieces[i].dispo){
        noms_dispo.splice(i,1);
    }
    else {
        noms_dispo[i] += ` - ${pieces[i].prix} €`;
    }
}
console.log(noms_dispo);

const dispoElements = document.createElement('ul');
for(let i=0; i < noms_dispo.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms_dispo[i];
   dispoElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles')
   .appendChild(dispoElements)
