
document.addEventListener("DOMContentLoaded", function() {
    getApi();

    function getApi() {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(products => {
                const output = document.querySelector(".output");
                output.innerHTML = '';

                products.forEach(product => {
                    const productCard = `
                        <div class="card">
                            <div class="img">
                                <img src="${product.image}" alt="${product.title}" width="150">
                            </div>
                            <div class="explanation">
                                <p>${product.description}</p>
                            </div>
                            <div class="liking">
                                <p>Beğeni: ${product.rating.rate} (${product.rating.count} yorum)</p>
                            </div>
                            <div class="price">
                                <p>Fiyat: $${product.price}</p>
                            </div>
                        </div>
                    `;

                    output.innerHTML += productCard;
                });
            });
    }
});
