// Création des actions sur le panier : mise à jour du panier (ajout des lignes), mise à jourdu prix total, action sur les produits : ajout quantité, suppresion quantité, suppression article
// Envoi des information du panier via le formulaire
// création du prix total panier

const affichagePanier = document.getElementById('panierachat') //récupération id=panierachat
let panier = JSON.parse(localStorage.getItem("monPanier"));
if (localStorage.length > 0) {
for (let produit of panier) { 
            // on ajoute les informations des appareils dans le HTML
            affichagePanier.innerHTML += `
            <div class="row m-2 panierLine">
            <div class="col-lg-3">
                <img alt="${produit.name}" class="img-fluid" src="${produit.image}">
            </div>

            <div class="col-lg-5">
                <a href="produit.html?id=${produit.id}"><h2 class="mb-2">${produit.name}</h2></a>
                <p><strong>Quantité</strong> : ${produit.quantite}</p>
            </div>

            <div class="col-lg-2"
                <p class="prixProduitPanier"><strong>Prix : <span>${produit.price.toFixed(2)} €</span></strong></p>   
            </div>

            <div class="col-lg-2">
                <i onclick="deleteItem('${produit.id}')" class="fa fa-trash"></i>  
            </div>
        </div>
        `;

};

} else {
inHtml.innerHTML = `
    <div class="container-fluid">
        <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
        <p class="text-center lead">Votre panier est vide :'(</p>
    </div>
    `;
};