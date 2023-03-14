// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = article.image;
    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`; //prixElement.innerText = "Prix: " + article.prix + " €";

    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    //Création des élements pour l'exercice
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

    const disponibilitéElement = document.createElement("p");
    disponibilitéElement.innerText = `Disponibilité:${article.disponibilité ? " En stock" : "Rupture de stock"}`;

    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibilitéElement);
    }

     //gestion des boutons 
    const boutonTrier = document.querySelector(".btn-trier");
    boutonTrier.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a, b) {
            return a.prix - b.prix;
        });
        console.log(piecesOrdonnees);
    });

    const boutonFiltrer = document.querySelector(".btn-filtrer");
    boutonFiltrer.addEventListener("click", function () {
        const piecesFiltrees = pieces.filter(function(piece) {
            return piece.prix <= 35;
        });
        console.log(piecesFiltrees)
    });

    //ajout des boutons de l'exo
    const boutonTrier2 = document.querySelector(".btn-trier-2");
    boutonTrier2.addEventListener("click", function () {
        const piecesDesordonnees = Array.from(pieces);
        piecesDesordonnees.sort(function (a, b) {
            return b.prix - a.prix;
        });
        console.log(piecesDesordonnees);
    });

    const boutonFiltrer2 = document.querySelector(".btn-filtrer-2");
    boutonFiltrer2.addEventListener("click", function () {
        const piecesDescription = pieces.filter(function(piece) {
            return piece.description
        });
        console.log(piecesDescription)
    });
