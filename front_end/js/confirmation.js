/* Récupération de l'id de la commance et du montant total dans localStorage */
let orderId = localStorage.getItem("orderId");
let totalPrice = localStorage.getItem("totalPrice");

/* creation d'une constante relié à la div ayant l'id panier */
const confirmation = document.querySelector("#bloc-confirmation");

/* création du message de confirmation */
const message = `
  <h1 class="title">Récapitulatif de votre commande :</h1>
  <p>La commande <span>${orderId}</span> d'un montant de <span>${totalPrice} €</span> a bien été effectuée.</p>
  <p>Merci de votre achat.</p>
  `

/* Ajout des informations récupérées plus haut et ajouté au html */
  confirmation.innerHTML = message;

/* Suppression de toutes les clés du localStorage */
localStorage.clear();

/* Création bouton de retour et son évènement */
const returnBtn = document.querySelector('#returnBtn');

returnBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
});