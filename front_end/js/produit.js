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

        let title = document.createElement("h1");
        title.id = "title";
        title.innerHTML = _name;
        choiceProductDescription.appendChild(title);

        let description = document.createElement("h2");
        description.innerHTML = _description;
        choiceProductDescription.appendChild(description);

        let price = document.createElement("h3");
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

        let choiceQtt = document.createElement("form")
        choiceQtt.id = "choiceQtt";
        choiceProductDescription.appendChild(choiceQtt);

          let divQtt = document.createElement("div");
          divQtt.id = "quantite";
          choiceQtt.appendChild(divQtt); 
          
            let formLabelQtt = document.createElement("label")
            formLabelQtt.for = "camQttChoice";
            formLabelQtt.innerHTML = "Quantité";
            divQtt.appendChild(formLabelQtt);

            let formSelectQtt = document.createElement("select");
            formSelectQtt.name = "cameraQtt";
            formSelectQtt.id = "camQtt";
            divQtt.appendChild(formSelectQtt);

              for(i=1; i<=10; i++)
              {
                let optionQtt = document.createElement("option");
                    optionQtt.value = i;
                    optionQtt.innerHTML = i;
                    formSelectQtt.appendChild(optionQtt);
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
          let id = _id;          
          let name = _name;
          let img = _image;          
          let price = _price*.01+"€";
          /* variable selectionnant l'objectif */
          let el = document.getElementById('camLenses');
          let lenses = el.options[el.selectedIndex].text;
          /* variable selectionnant la quantité */
          let qtt = document.getElementById('camQtt');
          let quantity = qtt.options[qtt.selectedIndex].value
          /* variable regroupant toutes les données des variables ci-dessus */
          let addPrd = {id, img, name, lenses, quantity, price};

          /* window.localStorage stocké dans une variable */
          const localStorage = window.localStorage;
          /* conversion des données json en objet javascript */
          let addCart = JSON.parse(localStorage.getItem("camera"));
          /* création d'un tableau vide si addCart est null */
          if (!addCart){
            addCart = [];
          }
          /* Ajout des données du produit au tableau */
          addCart.push(addPrd);
          /* conversion des données en json */
          localStorage.setItem("camera", JSON.stringify(addCart));

          /* message de confirmation */
          alert('Votre produit a bien été envoyé au panier');
         
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

