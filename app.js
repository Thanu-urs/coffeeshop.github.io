let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'JAVA CHIP FRAPPUCCINO',
        image: "images/f.jpeg",
        price: 400
    },
    {
        id: 2,
        name: 'Caffe Americano',
        image: 'images/a.jpeg',
        price: 450
    },
    {
        id: 3,
        name: 'Cold coffee',
        image:'images/c.jpeg',
        price: 500
    },
    {
        id: 4,
        name: 'Cappuccino',
        image: 'images/ca.jpeg',
        price: 300
    },
    {
        id: 5,
        name: 'Double Chocolate Chip Cookie',
        image: 'images/cc.jpeg',
        price: 350
    },
    {
        id: 6,
        name: ' Creamy Spinach and Corn Pocket',
        image: 'images/cr.jpeg',
        price: 400
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src="${value.image}">
        <h3>"${value.name}"</h3>
        <div class="box-content">
            <span>${value.price.toLocaleString()}</span>
            <a href="javascript:void(0)" onclick="addToCard(${key})">Add To Cart</a>
       
     </div>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviews-list');

    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsList.innerHTML = '';
        reviews.forEach((review, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${review.name}</strong>: ${review.review} <br> Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteReview(index);
            });

            li.appendChild(deleteButton);
            reviewsList.appendChild(li);
        });
    };

    const deleteReview = (index) => {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.splice(index, 1);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        loadReviews();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const review = document.getElementById('review').value;
        const name = document.getElementById('name').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;

        if (!rating) {
            alert("Please select a rating.");
            return;
        }

        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ review, name, rating: parseInt(rating) });
        localStorage.setItem('reviews', JSON.stringify(reviews));

        loadReviews();

        form.reset();
    });

    loadReviews();
});

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".navlist li");

    // Map section IDs to navlist item IDs
    const sectionMap = {
        "home": "nav1",
        "about-us": "nav2",
        "Cart": "nav3",
        "customers": "nav4",
        "contacts": "nav5"
    };

    // Function to update the active class based on the current section in view
    const updateActiveClass = () => {
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        if (currentSection) {
            navItems.forEach(item => {
                item.classList.remove("active");
            });

            const activeNavId = sectionMap[currentSection];
            if (activeNavId) {
                document.getElementById(activeNavId).classList.add("active");
            }
        }
    };

    // Update active class on page load
    updateActiveClass();

    // Update active class on scroll
    window.addEventListener("scroll", updateActiveClass);

    // Handle hover and click on nav items
    navItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            navItems.forEach(nav => nav.classList.remove("hover"));
            item.classList.add("hover");
        });

        item.addEventListener("mouseleave", () => {
            item.classList.remove("hover");
        });

        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
        });
    });
});




