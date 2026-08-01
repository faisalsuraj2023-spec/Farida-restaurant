
const API = 'https://farida-api.onrender.com';
const menuItems = [
    { name: 'Jollof Rice & Chicken', price: '₦2,500' },
    { name: 'Egusi Soup & Pounded Yam', price: '₦3,500' },
    { name: 'Fried Rice Special', price: '₦2,800' },
    { name: 'Suya Platter', price: '₦1,500' },
    { name: 'Efo Riro & Semovita', price: '₦3,200' },
    { name: 'Moi Moi', price: '₦800' },
    { name: 'Ofada Rice & Ayamase', price: '₦3,000' },
    { name: 'Pepper Soup', price: '₦2,000' },
    { name: 'Zobo Drink', price: '₦500' },
    { name: 'Chapman', price: '₦800' },
    { name: 'Puff Puff (6pcs)', price: '₦600' },
    { name: 'Okro Soup & Eba', price: '₦2,800' }
];

const menuGrid = document.getElementById('menuGrid');
if (menuGrid) {
    menuItems.forEach(item => {
        menuGrid.innerHTML += `<div class="menu-item"><h4>${item.name}</h4><p class="price">${item.price}</p><button class="btn btn-primary" onclick="order('${item.name}','${item.price}')">Add to Order</button></div>`;
    });
}

let cart = [];
function order(name, price) {
    cart.push({ name, price });
    showNotification(name + ' added! (' + cart.length + ' items in cart)');
}

function showNotification(msg) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function submitReservation(e) {
    e.preventDefault();
    fetch(API + '/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('rName').value,
            email: document.getElementById('rEmail').value,
            phone: document.getElementById('rPhone').value,
            guests: document.getElementById('rGuests').value,
            date: document.getElementById('rDate').value,
            time: document.getElementById('rTime').value,
            special: document.getElementById('rSpecial').value
        })
    }).then(r => r.json()).then(d => {
        alert(d.message);
        if(d.success) e.target.reset();
    }).catch(() => alert('Backend connection pending...'));
}

function submitContact(e) {
    e.preventDefault();
    fetch(API + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('cName').value,
            email: document.getElementById('cEmail').value,
            subject: document.getElementById('cSubject').value,
            message: document.getElementById('cMessage').value
        })
    }).then(r => r.json()).then(d => {
        alert(d.message);
        if(d.success) e.target.reset();
    }).catch(() => alert('Backend connection pending...'));
}

function login(e) {
    e.preventDefault();
    fetch(API + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        })
    }).then(r => r.json()).then(d => {
        if(d.success) {
            localStorage.setItem('user', JSON.stringify(d.user));
            closeModal('loginModal');
            alert('Welcome, ' + d.user.name + '!');
        } else {
            alert('Invalid credentials');
        }
    }).catch(() => alert('Backend connection pending...'));
}
