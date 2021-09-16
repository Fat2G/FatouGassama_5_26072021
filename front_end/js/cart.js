/* récupération des données du localStorage */
let addCart = JSON.parse(localStorage.getItem("camera"));
console.log("cart");
console.log(addCart);

/* creation d'une constante relié à la div ayant l'id panier */
const productCart = document.querySelector("#cart");

/* si panier vide message qui s'affiche */
if(addCart === null || addCart == 0){
  const cartEmpty = `
  <div class="cartEmpty">
    <h3> Le panier est vide </h3>
  </div>
  `;
  productCart.innerHTML = cartEmpty;

} else {
  /* sinon lesproduits s'affichent depuis le localStorage */
  let cartStructure = [];

  for (let i = 0; i < addCart.length; i++) {
    cartStructure = cartStructure + `
    <div id="cartStructure">
      <div>
        <img src="${addCart[i].img}">    
      </div>
      <div>
        <h2> ${addCart[i].name} </h2>
      </div>
      <div>
        <h2> ${addCart[i].lenses} </h2>
      </div>
      <div>
        <h2> ${addCart[i].quantity} </h2>
      </div>
      <div>
        <span> ${addCart[i].price + " €"} </span>
      </div>
      <button type="button" class="btnDelete"> Supprimer </button>
    </div> 
    `;
  }
  productCart.innerHTML = cartStructure;
}
/* ------------------ BOUTON SUPPRIMER --------------------- */
/* declaration de la variable btnDelete */
let btnDelete = document.querySelectorAll(".btnDelete");

/* creation d'une boucle for pour supprimer la ligne choisie */
for (let i = 0; i < btnDelete.length; i++) {
  btnDelete[i].addEventListener("click", (event) => {
    event.preventDefault();

    /* selection de l'id que l'on veut supprimer */
    let idDel = addCart[i].id;
    console.log(idDel);

    /* creation d'un nouveau tableau en utilisant la fonction filter */
    addCart = addCart.filter( elementId => elementId.id !== idDel );

    /* renvoie des données dans le localStorage */
    localStorage.setItem("camera", JSON.stringify(addCart));

    /* creation d'une alerte indiquant la suppression + rafraichissement de la page */
    alert("Le produit a bien été supprimé");
    window.location.reload();

  })
}
/* --------- MONTANT TOTAL DU PANIER --------- */
/* declaration de la variable qui additionne les prix des produits du panier */
let priceTotal = [];

/* creation d'une boucle for afin de regrouper les montants */
for (let i = 0; i < addCart.length; i++){
  let priceProduct = addCart[i].price * addCart[i].quantity;

  /* Ajout des prix dans le tableau "priceTotal" */
  priceTotal.push(priceProduct);
}
/* Addition des montants du tableau "priceTotal" */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = priceTotal.reduce(reducer, 0);

/* Affichage du prix total */
/* creation de la constante "displayTotal" comprenant le code HTML pour la ligne total */
const displayTotal = `
<div class="displayTotal">
  <p> Total de la commande: ${total} € </p>
</div> `

/* insertion de l'HTML de la constante "displayTotal" dans "productCart" */
productCart.insertAdjacentHTML("beforeend", displayTotal);


/*--------------- VALIDATION DU FORMULAIRE --------------*/
/* constante correspondant au bouton de confirmation de paiement */
const btnPayCart = document.querySelector('#payBtn');

btnPayCart.addEventListener('click', (e) =>{
  /* on empeche le rechargement de la page et l'envoie du formulaire */
  e.preventDefault();

  /* données du formulaire et du panier envoyées dans le local storage */
  const formValues = {    
    lastName: document.querySelector('#lastName').value,
    firstName: document.querySelector('#firstName').value,
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    email: document.querySelector('#email').value
  }

  /* données du formulaire dans le localStorage et stringify de l'objet formValues */
  localStorage.setItem('formulaire', JSON.stringify(localStorage.getItem('formValues')));
 
  /* données du formulaire et des produits placées dans un objet à envoyer vers le serveur */
  // const cartFormToServer = {
  //   addCart,
  //   formValues 
  // }

  const cartFormToServer = {
    contact: {
      lastName: document.querySelector('#lastName').value,
      firstName: document.querySelector('#firstName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value
    },
    products: addCart
  }
  console.log(cartFormToServer);

  /* envoie de l'objet réunissant le formulaire et les produits du panier vers le serveur */
  const dataToServer = fetch('http://localhost:3000/api/cameras/order',{
    method: 'POST',
    /* conversion de l'objet 'cartFormToServer' en chaine de caracteres */
    body: JSON.stringify('cartFormToServer'),
    headers: {
      'Content-type': 'application/json',
    },
  })
  
  




})

