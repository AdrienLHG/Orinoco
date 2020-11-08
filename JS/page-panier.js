// Création des actions sur le panier : mise à jour du panier (ajout des lignes), mise à jourdu prix total, action sur les produits : ajout quantité, suppresion quantité, suppression article
// Envoi des information du panier via le formulaire
// création du prix total panier

const affichagePanier = document.getElementById('panierachat') //récupération id=panierachat
let panier = JSON.parse(localStorage.getItem("monPanier"));
if (panier.length > 0) {
for (let produit of panier) { 

            // on ajoute les informations des appareils dans le HTML
            affichagePanier.innerHTML += `
            <div class="row m-2 ligne-produit">
                <div class="col-lg-3">
                    <img alt="${produit.name}" class="img-fluid" src="${produit.image}">
                </div>

                <div class="col-lg-5">
                    <a href="produit.html?id=${produit.id}"><h2 class="mb-2">${produit.name}</h2></a>
                    <p><strong>Quantité</strong> : 
                    <input class=" col-lg-2 quantite" id="${produit.quantity}quantite" type="number" value="${produit.quantity}">
                </div>

                <div class="col-lg-2"
                    <p class="prixProduitPanier" id='${produit.name}total'><strong>Prix : <span class='chiffre-prix'>${produit.total.toFixed(2)} €</span></strong></p>   
                 </div>

                <div class="col-lg-2">
                    <i class="fa fa-trash"></i>  
                 </div>
            </div>
        `; 
        miseAJourTotal()


    }
} else {
    affichagePanier.innerHTML = `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">Orinoco</h1>
              <p class="lead">Votre panier est vide ! Pensez à y ajouter des articles pour les commander.</p>
            </div>
        </div>
    `;
};


let boutonSuppressionArticle = document.getElementsByClassName ('fa-trash')
for (let i = 0; i < boutonSuppressionArticle.length; i++) {
    let supprimer = boutonSuppressionArticle[i]
    supprimer.addEventListener ('click', function(event) {
        let supprimerArticle = event.target
        supprimerArticle.parentElement.parentElement.remove()
        miseAJourTotal()
        suppressionArticle(event.target.id)
    });
}

let modificationQuantite = document.getElementsByClassName('quantite')
for (let i = 0; i < modificationQuantite.length; i++) {
    let quantite = modificationQuantite[i]
    quantite.addEventListener ('change', changementQuantite)

}

function changementQuantite(event) {
    let chiffreQuantite = event.target
    if (isNaN(chiffreQuantite.value) || chiffreQuantite <= 0)
    chiffreQuantite.value = 1
    let panier = JSON.parse(localStorage.getItem("monPanier"));
       panier.forEach(produit => {
        function modificationQuantitePanier(produit) {
        produit.quantity = chiffreQuantite.value
        localStorage.clear(); //on vide le storage avant de le mettre à jour;
        localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    }
        modificationQuantitePanier(produit)
    });
    console.log (panier)
    miseAJourTotal()

};

function suppressionArticle(i) {
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}

function miseAJourTotal() {
    let lignesPanier = affichagePanier.getElementsByClassName('ligne-produit')
    let total = 0;
    for (let i = 0; i < lignesPanier.length; i++) {
        let ligneProduit = lignesPanier[i]
        let prixProduit = ligneProduit.getElementsByClassName('chiffre-prix')[0]
        let quantiteProduit = ligneProduit.getElementsByClassName('quantite')[0]
        let prix = parseFloat(prixProduit.innerText.replace('€', ''))
        let quantite = quantiteProduit.value
        total = total + (prix * quantite)
    }
let prixTotal = document.getElementsByClassName('prix-total')[0];
 prixTotal.innerText = "Prix total: " + total  + ".00 €"; 
}


 

/*/ //Modifiation quantités panier 
function ModifierQuantite(produit){
// Ajout d'une quantité
     let ajoutQuantiteProduit = document.getElementById(`${produit.name}plus`);
     ajoutQuantiteProduit.addEventListener ('click', function() {
     let quantitePanier = document.getElementById(`${produit.name}quantite`);
     let totalPrixProduit = document.getElementById(`${produit.name}total`); 

     produit.quantity ++;
     quantitePanier.innerHTML = ' ' + produit.quantity  +  ' '
     totalPrixProduit.innerHTML = `<strong>${produit.quantity * produit.price.toFixed(2)}</strong> €`
 });
 // Suppression d'une quantité
    let suppressionQuantitéProduit = document.getElementById(`${produit.name}moins`);
    suppressionQuantitéProduit.addEventListener ('click', function() {
    let quantitePanier = document.getElementById(`${produit.name}quantite`);
    let totalPrixProduit = document.getElementById(`${produit.name}total`); 

    produit.quantity --;
    quantitePanier.innerHTML = ' ' + produit.quantity  +  ' '
    totalPrixProduit.innerHTML = `<strong>${produit.quantity * produit.price.toFixed(2)}</strong> €`
});
};
/*/

