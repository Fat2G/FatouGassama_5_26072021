/* création de la fonction générateur d'articles */
function article_gen(parent, _image="", _name="", _price="", _description="", _id=""){  
  let article = document.createElement("a");
  article.id =  "articleProduct";
  article.href = "produit.html?id="+_id;

    let image = document.createElement("img");
    image.id =  "image";
    image.src = _image;
    article.appendChild(image);

    let descriptionProduct = document.createElement("descriptionProduct");
    descriptionProduct.id = "descriptionProduct";
    article.appendChild(descriptionProduct);

      let productNamePrice = document.createElement("div");
      productNamePrice.id = "productNamePrice";
      descriptionProduct.appendChild(productNamePrice); 

        let name = document.createElement("h4");
        name.id =  "name";
        name.innerHTML = _name;
        productNamePrice.appendChild(name);

        let price = document.createElement("span");
        price.id =  "price";
        price.innerHTML = _price*.01 + "€"
        productNamePrice.appendChild(price);
      
      let description = document.createElement("p");
      description.id =  "description";
      description.innerHTML = _description;
      descriptionProduct.appendChild(description); 

  parent.appendChild(article);
}  

/* création de la fonction produit cherchant les informations depuis le serveur */
function product(){
  let articleProduct = document.getElementById('articlesContainer');
  console.log(articleProduct + "ok");
  
  fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())
  .then(data => {
    for (let article of data) {
      article_gen(articleProduct, article.imageUrl, article.name, article.price, article.description, article._id);
    }
  });	 
}
product();

