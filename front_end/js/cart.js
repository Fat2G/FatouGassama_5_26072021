/* récupération des données du localStorage */
let addCart = JSON.parse(localStorage.getItem("camera"));

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
/* declaration des variables correspondant aux inputs du formulaire */
let inputFirstName = document.querySelector('#firstName');
let inputLastName = document.querySelector('#lastName');
let inputAddress = document.querySelector('#address');
let inputCity = document.querySelector('#city');
let inputEmail = document.querySelector('#email');
/* declaration de la cariable error */
let error = document.querySelector('#error');

/* declaration de la constante correspondant au bouton de confirmation de paiement */
const btnPayCart = document.querySelector('#payBtn');

btnPayCart.addEventListener('click', (e) =>{
  /* on empeche le rechargement de la page et l'envoie du formulaire */
  e.preventDefault();

  /* si les champs ne sont pas remplis, le message d'erreur s'affichera */
  if (
    !inputFirstName.value ||
    !inputLastName.value ||
    !inputAddress.value ||
    !inputEmail.value ||
    !inputEmail.value
    ) {
    error.innerHTML = "Veuillez renseigner tous les champs !";
  } else {
    /* declaration du tableau productsConfirmed*/
    let productsConfirmed = [];    

    /* Recuperation des id des produits acheté qui sont dans le localStorage grace a la méthode foreach*/
    addCart.forEach(camera => {
      productsConfirmed.push(camera.id)});

      console.log("addCart");
      console.log(addCart);

    /* données du formulaire et du panier envoyées dans le local storage */
    let formContacts = {    
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value
    }

    /* données du formulaire dans le localStorage et stringify de l'objet formContacts */
    localStorage.setItem('formulaire', JSON.stringify(formContacts));
  
    /* données du formulaire et des produits placées dans un objet à envoyer vers le serveur */
    let cartOrder = {
      contact: formContacts,
      products: productsConfirmed
    }
    console.log('cartOrder');
    console.log(cartOrder);
    /* creation d'une constante regroupant les valeurs de la requete */
    const optToLs = {
      method: "POST",
      body: JSON.stringify(cartOrder),
      headers: { "Content-Type": "application/json"},
    };
    console.log(optToLs);

    /* Préparation du prix pour l'afficher sur la prochaine page */
    let confPrice = document.querySelector(".displayTotal").innerHTML;

    /* envoie de l'objet réunissant le formulaire et les produits du panier vers le serveur */  
    fetch("http://localhost:3000/api/cameras/order", optToLs)
    .then((response) => { return response.json(); })
    .then((r) => {
      /* suppression de la clé cameras du localStorage */
      // localStorage.clear();
      /* creation de la clé orderId */
      localStorage.setItem("orderId", r.orderId);
      /* creation de la clé total */
      localStorage.setItem("total", confPrice);
      // document.location.href = "confirmation.html"; 
    })
      .catch((err) => {
        alert("Il y a eu une erreur : " + err);
      }); 
  }
  
});