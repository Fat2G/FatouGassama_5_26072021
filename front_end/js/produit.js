/*
Trouver comment récupérer les paramètres passés en URL (GET)
Grâce à la récupération du paramètre "id"
Tu vas pouvoir faire un fetch sur l'API pour récupérer uniquement les informations de ce produit
Afficher les infos du produit

Faire en sorte que le bouton ajouter au panier fonctionne
Pour cela, tu dois enregistrer les données grâce à localstorage
Pour stocker tes données, tu vas devoir utiliser la sérialization

Les données à stocker : id du produit dans le panier + quantité 

Si l'utilisateur modifie la quantité, il faut mettre à jour la variable dans ton localstorage et non ajouter une nouvelle ligne
*/

/*
 Fonction qui rempli la page HTML d'après les informations récupérée de l'API grâce à l'ID
*/ 
function product_gen(parent, _image="", _name="", _price="", _description="", _id="", _lenses="")
{
  let choiceProduct = document.createElement("div");
  choiceProduct.id = "choiceProduct";

    let image = document.createElement("img");
    image.id = "imageProduct";
    image.src = _image;
    choiceProduct.appendChild(image);

    let divChoice = document.createElement("div");
    choiceProduct.appendChild(divChoice);

      let choiceProductDescription = document.createElement("div");
      choiceProductDescription.id = "choiceProductDescription";
      divChoice.appendChild(choiceProductDescription);

        let title = document.createElement("h2");
        title.id = "title";
        title.innerHTML = _name;
        choiceProductDescription.appendChild(title);

        let description = document.createElement("h3");
        description.innerHTML = _description;
        choiceProductDescription.appendChild(description);

        let price = document.createElement("h4");
        price.id = "price";
        price.innerHTML = _price*.01+"€";
        choiceProductDescription.appendChild(price);

        let choice = document.createElement("form")
        choice.id = "choiceLenses";
        choiceProductDescription.appendChild(choice);

          let divLense = document.createElement("div");
          divLense.id = "lense";
          choice.appendChild(divLense);

            let formLabel = document.createElement("label")
            formLabel.for = "camLensesChoice";
            formLabel.innerHTML = "Objectif";
            divLense.appendChild(formLabel);

            let formSelect = document.createElement("select");
            formSelect.name = "cameraLenses";
            formSelect.id = "camLenses";
            divLense.appendChild(formSelect);

            for(i=0; i<_lenses.length; i++)
            {
              let option = document.createElement("option");
                  option.value = "choice"+i;
                  option.innerHTML = _lenses[i];
                  formSelect.appendChild(option);
            }

      let choiceBtn = document.createElement("div");
      choiceBtn.id = "btnCart";
      divChoice.appendChild(choiceBtn);

        let button = document.createElement("button");
        button.type = "button";
        button.id = "addCartBtn";
        button.innerHTML = "Ajouter au panier";
        /* creation de la fonction permettant de serializer les données et les stocker dans le localStorage*/
        button.onclick = function addCart(){          
          let name = _name;
          let img = _image;          
          let price = _price*.01+"€";
          let lenses = _lenses[i];
          
          let addPrd = {img, name, price, lenses, quantite:1};

          /* window.localStorage stocké dans une variable */
          const localStorage = window.localStorage;
          /* conversion des données json en objet javascript */
          let addCart = JSON.parse(localStorage.getItem("caméra"));
          /* création d'un tableau vide si addCart est null */
          if (!addCart){
            addCart = [];
          }
          /* Ajout des données du produit au tableau */
          addCart.push(addPrd);
          /* conversion des données en json */
          localStorage.setItem("caméra", JSON.stringify(addCart));
         
        };        

        choiceBtn.appendChild(button);

  parent.appendChild(choiceProduct);
}
/* Récupération des paramètres passés en URL (GET)
Grâce à la récupération du paramètre "id"
*/
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');
console.log(id + " id ok");

// création d'un fetch sur l'API pour récupérer les informations
function product_art(){
  let choiceProduct = document.getElementById('productContainer');

  fetch('http://localhost:3000/api/cameras/'+id)
  .then(res => res.json())
  .then(function(res){
    product_gen(choiceProduct, res.imageUrl, res.name, res.price, res.description, res._id, res.lenses);
  });
}
/* Appel de la fonction product_art */
product_art();

