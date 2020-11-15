
const item = document.getElementById('produits'); //récupération id=main
let listeProduits = 'http://localhost:3000/api/cameras' // création de la variable pour relier à l'API

// appel de l'API
fetch(listeProduits).then(response => 
     response.json())
    .then(data => {
        data.forEach(objet => {
            let prixProduit = objet.price / 100; // On divise le prix dans le tableau par 100 pour obtenir le bon prix

            // on ajoute les informations des appareils dans le HTML
            item.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                    <h2 class="text-center">${objet.name}</h2>
                    <p class="text-center">${prixProduit.toFixed(2)} €</p>
                    <a href="page-produit.html?id=${objet._id}" class="btn-outline-info text-center">Afficher l'appareil</a>
                </div>
                `;

        });
    // On attrape l'erreur et on affiche le message dans la console
    }).catch(function(error) {
  console.log('Il y a eu un problème avec l\'appel de l\'API : ' + error.message);
  });
