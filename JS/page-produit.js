//On va prendre l'id de chaque appareil pour en faire une variable
const params = new URLSearchParams(window.location.search)
let itemId = params.get("id")

// On cible la balise div dans le DOM
const descriptionProduit = document.getElementById('produit')

//récupération de l'url des produits
let listeProduits = 'http://localhost:3000/api/cameras' 

// On insère les éléments du produits dans le DOM

fetch(listeProduits + '/' + itemId).then(response => 
    response.json()).then(data => {
           
            //--variable prix pour le diviser par 100
        let prixProduit = data.price / 100;
        
        //--variable vide + boucle pour créer le select qui accueil lenses
        let lens

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });

        //--Ecriture du HTML dans le DOM en dynamique
        descriptionProduit.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                        <label for="QuantiteProduit">Quantité:</label>
                        <input id ="inputQuantite" type="number" min="1" value="1"/>
                            <div class="col-auto my-1 pb-5 mt-4">
                                <label class="mr-sm-2" for="inlineFormCustomSelect">Objectifs</label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    ${lens}   
                                </select>        
                            </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${prixProduit.toFixed(2)}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn btn-success">Ajouter au panier</button>
                    </form>   
                </div>
                `;
            })
