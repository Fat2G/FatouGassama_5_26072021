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

        let name = document.createElement("h3");
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


/*
  -T'ancrer sur un élément HTML
  -faire de l'append de nouveaux elements HTML (article, image, etc)
  -Toutes les informations se trouvent dans les données reçues
  -Faire une boucle sur les données
*/

