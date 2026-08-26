var menProducts = [
    {
        id: 1,
        name: "The Cosmo (Đen) Quần short khaki",
        code: "TC1025011BA",
        price: "250.000",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Quần baggy đen sang trọng QQ",
        code: "TC1025011BA",
        price: "398.000",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "The Cosmo (Đen) Quần short khaki",
        code: "TC1025011BA",
        price: "300.000",
        image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "The Cosmo (Đen) Quần short khaki",
        code: "TC1025011BA",
        price: "300.000",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"
    }
];

var womenProducts = [
    {
        id: 1,
        name: "Váy Fashion",
        code: "TC1025011BA",
        price: "250.000",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Áo thun váy ngắn",
        code: "TC1025011BA",
        price: "398.000",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Áo khoác",
        code: "TC1025011BA",
        price: "300.000",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Áo thun",
        code: "TC1025011BA",
        price: "300.000",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80"
    }
];

function listProducts() {
    for (var i = 0; i < menProducts.length; i++) {
        
        var productHTML = `
            <div class="col-3">
            <div class="card" style="width: 18rem;">
                <img src="${menProducts[i].image}" class="card-img-top" style="height:400px;">
                
                <div class="card-body">
                    <h5 class="card-title">${menProducts[i].name}</h5>
                    <p class="card-text">${menProducts[i].price}</p>
                    <a href="#" class="btn btn-primary" onclick="order()">Đặt mua</a>
                </div>
            </div>
            </div>
        `;
        document.getElementById('men').innerHTML += productHTML;    
    }
    for (var i = 0; i < womenProducts.length; i++) {
    
        var productHTML = `
            <div class="col-3">
                <div class="card" style="width: 18rem;">
                    <img src="${womenProducts[i].image}" class="card-img-top" style="height:400px;">
                    
                    <div class="card-body">
                        <h5 class="card-title">${womenProducts[i].name}</h5>
                        <p class="card-text">${womenProducts[i].price}</p>
                        <a style="background-color:red" href="#" class="btn btn-primary" onclick="order()">Đặt mua</a>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('women').innerHTML += productHTML;
    }
    
}

function order() {
    alert("Cảm ơn bạn đã đặt mua sản phẩm. Chúng tôi sẽ liên hệ với bạn sớm nhất!");
}