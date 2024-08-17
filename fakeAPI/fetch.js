document.addEventListener("DOMContentLoaded", function() {
    getApi(); // Sayfa yüklendiğinde veri çekme işlevini çağır

    function getApi() {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(products => {
                const output = document.querySelector(".output");
                output.innerHTML = ''; // Önceki içeriği temizle

                products.forEach(product => {
                    const productCard = `
                        <div class="card" data-id="${product.id}">
                            <div class="img">
                                <img src="${product.image}" alt="${product.title}" width="150">
                            </div>
                            <div class="explanation">
                                <p>${product.title}</p>
                            </div>
                            <div class="price">
                                <p>Price: $${product.price}</p>
                            </div>
                            <button class="add-to-cart">Sepete Ekle</button>
                        </div>
                    `;

                    output.innerHTML += productCard; // Kartı ekle
                });

                // Her karta tıklama olayını ekle
                document.querySelectorAll(".card").forEach(card => {
                    card.addEventListener("click", function() {
                        const productId = this.getAttribute("data-id");
                        const product = products.find(p => p.id == productId);
                        openModal(product); // Modalı aç ve ürün detaylarını göster
                    });
                });
            })
            .catch(error => console.error('Veri çekme hatası:', error)); // Hata kontrolü ekleyin
    }

    // Modalı açan işlev
    function openModal(product) {
        const modal = document.querySelector(".modal");
        const modalContent = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="img">
                    <img src="${product.image}" alt="${product.title}" width="150">
                </div>
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
            </div>
        `;
        modal.innerHTML = modalContent;
        modal.style.display = "block";

        // Modalı kapatmak için tıklama olayı
        document.querySelector(".modal .close").addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Modala tıklayınca kapatmayı sağlamak
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});
