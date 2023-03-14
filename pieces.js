// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function genererPieces(pieces){
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
    }
    genererPieces(pieces);

     //gestion des boutons 
    const boutonTrier = document.querySelector(".btn-trier");
    boutonTrier.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a, b) {
            return a.prix - b.prix;
        });
        console.log(piecesOrdonnees);
        document.querySelector(".fiches").innerHTML= "";genererPieces(piecesOrdonnees);
    });

    const boutonFiltrer = document.querySelector(".btn-filtrer");
    boutonFiltrer.addEventListener("click", function () {
        const piecesFiltrees = pieces.filter(function(piece) {
            return piece.prix <= 35;
        });
        console.log(piecesFiltrees);
        document.querySelector(".fiches").innerHTML= "";genererPieces(piecesFiltrees);
    });

    //ajout des boutons de l'exo
    const boutonTrier2 = document.querySelector(".btn-trier-2");
    boutonTrier2.addEventListener("click", function () {
        const piecesDesordonnees = Array.from(pieces);
        piecesDesordonnees.sort(function (a, b) {
            return b.prix - a.prix;
        });
        console.log(piecesDesordonnees);
        document.querySelector(".fiches").innerHTML= "";genererPieces(piecesDesordonnees);
    });

    const boutonFiltrer2 = document.querySelector(".btn-filtrer-2");
    boutonFiltrer2.addEventListener("click", function () {
        const piecesDescription = pieces.filter(function(piece) {
            return piece.description
        });
        console.log(piecesDescription);
        document.querySelector(".fiches").innerHTML= "";genererPieces(piecesDescription);
    });



    const noms = pieces.map(piece => piece.nom);
    for(let i = pieces.length -1 ; i >= 0; i--){
        if(pieces[i].prix > 35){
            noms.splice(i,1);
        }
    }

    console.log(noms)

    //Creation en-tête
    const pElement=document.createElement('p')
    pElement.innerText="Pièces abordables:";
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
        .appendChild(pElement)
        .appendChild(abordablesElements)

    
// exo
const nomsDispo=pieces.map(piece=>piece.nom);
const prixDispo=pieces.map(piece=>piece.prix);

for(let i = pieces.length -1 ; i>= 0; i--){
    if(pieces[i].disponibilité === false){
        nomsDispo.splice(i,1);
        prixDispo.splice(i,1);
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDispo.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDispo[i]} - ${prixDispo[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

const pElementDisponible=document.createElement('p')
pElementDisponible.innerText="Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)

// // Efface le contenu de la balise body et donc l’écran
// document.querySelector(".fiches").innerHTML = '';
const inputPrixMax = document.querySelector('#prix_max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})