// Añado evento para ocultar menú hamburguesa en versión móvil
function showMenu() {
    let burgerMenu = document.querySelector('.desplegable .fa-solid');
    let navegador = document.querySelector('nav');
    burgerMenu.addEventListener('click', function(){
        navegador.classList.toggle('hidden')
    })

    //Para solucionar que si lo oculto y amplio la pantalla se vea siempre el menú
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                navegador.classList.remove('hidden');
            }
        });
}


let productCount = [0]//Para utilizar un contador para cada ID incluidos en carrito


//Se inicia así la página con los productos que hay en data.js
function showPills(){
    let container = document.querySelector('.fondo');
    for (let producto of productos){
        let $pill = document.createElement('div');
        $pill.innerHTML = `
            <img src = 'Images/${producto.imagen}' >
            <h1> ${producto.nombre} </h1>
            <p> ${producto.descripcion} </p>
            <p> Precio: ${producto.precio} €</p>
            <button id = 'addCarrito'> Agregar al Carrito </button>
        `
        $pill.id = producto.id
        $pill.classList.add('pill');
        container.appendChild($pill);
        //Agrego funcionalidad al botón #addCarrito aprovechando el bucle
        let addToCartBtn = $pill.querySelector('#addCarrito')
        addToCartBtn.addEventListener('click', addToCart);
    }
}

//Para que aparezca y desaparezca el div del carrito
function showCart() {
    let cart = document.querySelector('.cart');
    cart.classList.toggle('hidden')
}


function addToCart(addToCartBtn){
    let cart = document.querySelector('.cart')
    let pill = this.parentElement
    let productContainer = document.querySelector('.productContainer')
    // Abrir ventana de carrito
    if (cart.classList.contains('hidden')){
        showCart();
    }

    
        //Si el producto ya está en el carrito, aumentar la cantidad
        //Compruebo ya que si no está vacía esa posición del array, da true
        if(productCount[pill.id] > 0){
            addOneMore(pill) 
        } else {
            //Si no está en el carrito, lo agrego.
            productCount[pill.id] = 1
            //Añado el id a que ya existe el array
            let $product = document.createElement('div');
            $product.innerHTML = `
                    <p> ${productos[pill.id-1].nombre} </p>
                    <p class='multiply'>${productos[pill.id-1].precio} € X ${productCount[pill.id]} </p>
                    <div class= 'buttonContainer'>
                    <button id = 'delete'> Eliminar </button>
                    <button id = 'add'> + </button>
                    <button id = 'subtract'> - </button>
                    </div>
                `
            $product.classList.add('producto')
            //Añado el ID de data.js por eso es pill.id-1, ya que la posición del array no coincide con el ID
            $product.id = productos[pill.id-1].id
            productContainer.appendChild($product);
            //Añado un addEventListener a cada botón que hay 
            let deleteBtns = document.querySelectorAll('#delete');
            for (let deleteBtn of deleteBtns){
                deleteBtn.addEventListener('click', deleteProduct);
            }

            let addBtns = document.querySelectorAll('#add');
            for (let addBtn of addBtns){
                addBtn.addEventListener('click', addOne);
            }

            let subtractBtns = document.querySelectorAll('#subtract');
            for (let subtractBtn of subtractBtns){
                subtractBtn.addEventListener('click', subtractOne);
            }

        }  
        showTotal()  
}

function addOne(){
    //Función para añadir desde el botón de +
    let div = this.parentElement.parentElement
    if(productCount[div.id] >= productos[div.id-1].stock){
        alert('no hay stock')
    } else {
        productCount[div.id]++
        let p = div.querySelector('.multiply')
        p.textContent = `${productos[div.id-1].precio} € X ${productCount[div.id]}`
    }
    showTotal()
}

function addOneMore(pill){
    //Si no hay stock, mando un alert
    if (productCount[pill.id] >= productos[pill.id-1].stock){
        alert('no hay stock')
    } else {
        //Hago un array para tener un contador con la posición de cada ID
        productCount[pill.id]++
        //el precio lo cojo de data.js y el contador del array que he creado
        let price = (productos[pill.id-1].precio)*productCount[pill.id]
        let div = document.getElementById(pill.id)
        let p = div.querySelector('.multiply')
        //Edito el texto de dentro del ID del carrito
        p.textContent = `${productos[pill.id-1].precio} € X ${productCount[pill.id]}`
    }
    showTotal()
}

function subtractOne() {
    let div = this.parentElement.parentElement
    if (productCount[div.id] > 1){
        productCount[div.id]--
        let p = div.querySelector('.multiply')
        p.textContent = `${productos[div.id-1].precio} € X ${productCount[div.id]}`
    }
    showTotal()
}

function deleteProduct(){
    console.log()
    let div = this.parentElement.parentElement;
    productCount.splice(div.id, 1, 0);
    div.remove();
    showTotal();
}

function showTotal(){
    let sumaTotal = 0
    let total = document.querySelector('#total')
    let $productos = document.querySelectorAll('.producto')
    for (let $producto of $productos) {
        sumaTotal += (productos[$producto.id-1].precio) * productCount[$producto.id] 
    }
    total.textContent = `Total: ${sumaTotal} €`
}

function emptyCart(){
    let $productos = document.querySelectorAll('.producto')
    for (let $producto of $productos) {
        $producto.remove();
    }
    productCount = [0]
    showTotal();
}

function buy(){
    let $productos = document.querySelectorAll('.producto')
    if ($productos.length > 0){
        alert('Compra realizada con éxito. ¡Gracias por su compra!')
    } else {
        alert ('El carrito está vacío')
    }
}

let cart = document.querySelector('#cart-shopping');
cart.addEventListener('click', showCart);

let emptyCartBtn = document.querySelector('#emptyCart');
emptyCartBtn.addEventListener('click', emptyCart);

let buyBtn = document.querySelector('#buy');
buyBtn.addEventListener('click', buy);

showMenu()
showPills()
