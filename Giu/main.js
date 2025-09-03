const products = [
  {
    id: 1,
    name: "Pizza Frango com Catupiry",
    price: 23.00,
    image: "https://th.bing.com/th/id/R.86c02e6387098f2386e7bea08b890fe3?rik=ueY6IpMDMImyhQ&riu=http%3a%2f%2fwww.bonissima.com.br%2fweb%2fimage%2fproduct.template%2f34332%2fimage_1024%3funique%3db35c554&ehk=Du1OBXsK8hC2CnO6l9a1VwJh%2biDljptPPZLTdyiNhCc%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 2,
    name: "Pizza Calabresa",
    price: 25.00,
    image: "https://cdn6.campograndenews.com.br/uploads/noticias/2022/03/04/3cb5530b66938475b217183a18974de301f5b0fd.jpg"
  },
  {
    id: 3,
    name: "Pizza Marguerita",
    price: 23.00,
    image: "https://laticiniosbomdestino.com.br/2016/wp-content/uploads/2023/03/pizza-marguerita-com-mozzarella-de-bufala-bom-destino-scaled.jpg"
  },
  {
    id: 4,
    name: "Pizza Carne seca",
    price: 25.00,
    image: "https://tse2.mm.bing.net/th/id/OIP.cbRJiejhfRGaXnl5DhxgGAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 5,
    name: "Pizza Brócolis",
    price: 25.00,
    image: "https://claudia.abril.com.br/wp-content/uploads/2020/02/pizza-brocolis-caboclo.jpg?quality=70&strip=all&resize=420"
  },
  {
    id: 6,
    name: "Quatro queijos",
    price: 25.00,
    image: "https://tse1.mm.bing.net/th/id/OIP.mG78z8jvcABuGhPg57i1RgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3S"
  },
  {
    id: 7,
    name: "Pizza Portuguesa",
    price: 25.00,
    image: "https://static.wixstatic.com/media/623b75_68468e2ff4ac442da48dae6053d37fec~mv2.jpg/v1/fill/w_363,h_324,q_90/623b75_68468e2ff4ac442da48dae6053d37fec~mv2.jpg"
  },
  {
    id: 8,
    name: "Pizza Mussarela",
    price: 25.00,
    image: "https://pizzafacil.ind.br/website2018/wp-content/uploads/2018/04/pizza-mussarela.jpg"
  },

  // Bebidas adicionadas
  {
    id: 101,
    name: "Coca-Cola 2L",
    price: 12.00,
    image: "https://tse1.mm.bing.net/th/id/OIP.GSD3wbJ9nV61ssgH-A8bZwHaHa?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 102,
    name: "Coca-Cola Lata 350ml",
    price: 5.00,
    image: "https://tse4.mm.bing.net/th/id/OIP.z5Cg0UX2TlPL00-fcllg_wHaHa?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 103,
    name: "Guaraná Antarctica 2L",
    price: 11.00,
    image: "https://www.varanda.com.br/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/r/e/ref-guar-antarctica-2l-7891991001342.jpg"
  },
  {
    id: 104,
    name: "Guaraná Antarctica Lata 350ml",
    price: 4.50,
    image: "https://tse1.mm.bing.net/th/id/OIP.NLCb-69UJkpQelxfAXv7zwHaHa?r=0&cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
];

let cart = [];

function updateCart() {
  const itemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  itemsContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';

    itemEl.innerHTML = `
      <span class="cart-item-name">${item.name} x${item.quantity}</span>
      <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})" title="Remover item" style="background:none;border:none;color:#f76c2f;cursor:pointer;font-weight:bold;">✕</button>
    `;
    itemsContainer.appendChild(itemEl);
    total += item.price * item.quantity;
    count += item.quantity;
  });

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
  cartCount.innerText = count;
}

function addToCart(product) {
  if (product.isHalfHalf) {
    const existing = cart.find(item => item.isHalfHalf && item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  } else {
    const existing = cart.find(item => item.id === product.id && !item.isHalfHalf);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }
  updateCart();
  showNotification(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById('cart-panel');
  cartPanel.classList.toggle('open');
}

function displayProducts() {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products.forEach(product => {
    const el = document.createElement('div');
    el.className = 'product-item';

    let meioMeioButton = '';
    if (product.id < 100) {  // só pizzas tem botão meio a meio
      meioMeioButton = `<button class="add-to-cart-btn" style="margin-top:5px; background:#555;" onclick='openHalfHalfModal(${product.id})'>Meio a Meio</button>`;
    }

    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h5>${product.name}</h5>
      <span>R$ ${product.price.toFixed(2)}</span>
      <button class="add-to-cart-btn" onclick='addToCartById(${product.id})'>Adicionar ao Carrinho</button>
      ${meioMeioButton}
    `;
    container.appendChild(el);
  });
}

function addToCartById(id) {
  const product = products.find(p => p.id === id);
  if (product) addToCart(product);
}

function openHalfHalfModal(firstHalfId) {
  if(document.getElementById('halfHalfModal')) {
    document.getElementById('halfHalfModal').remove();
  }
  
  const modal = document.createElement('div');
  modal.id = 'halfHalfModal';
  modal.style = `
    position: fixed; top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.5);
    display:flex; justify-content:center; align-items:center;
    z-index: 2000;
  `;

  const modalContent = document.createElement('div');
  modalContent.style = `
    background: white; padding: 1.5rem; border-radius: 10px;
    max-width: 400px; width: 90%;
  `;

  modalContent.innerHTML = `
    <h3>Selecione a 2ª metade para a pizza meio a meio</h3>
    <div id="halfHalfOptions" style="max-height: 300px; overflow-y: auto; margin-top: 1rem;"></div>
    <button id="cancelHalfHalf" style="margin-top: 1rem; background:#e53935; color:#fff; border:none; padding:0.5rem 1rem; border-radius:5px; cursor:pointer;">Cancelar</button>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const firstHalf = products.find(p => p.id === firstHalfId);
  const optionsContainer = modalContent.querySelector('#halfHalfOptions');

  products.forEach(p => {
    if (p.id !== firstHalfId && p.id < 100) {  // só mostra outras pizzas pra meio a meio
      const option = document.createElement('div');
      option.style = 'cursor:pointer; border-bottom: 1px solid #ddd; padding: 0.5rem 0; display:flex; align-items:center; gap:10px;';
      option.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;" />
        <div>
          <strong>${p.name}</strong><br />
          R$ ${p.price.toFixed(2)}
        </div>
      `;
      option.onclick = () => {
        addHalfHalfToCart(firstHalf, p);
        closeHalfHalfModal();
      };
      optionsContainer.appendChild(option);
    }
  });

  document.getElementById('cancelHalfHalf').onclick = closeHalfHalfModal;
}

function closeHalfHalfModal() {
  const modal = document.getElementById('halfHalfModal');
  if (modal) modal.remove();
}

function addHalfHalfToCart(half1, half2) {
  const price = ((half1.price + half2.price) / 2);
  const name = `Meio a Meio: ${half1.name} + ${half2.name}`;
  const image = half1.image;  // pode usar a imagem da primeira metade
  const product = {
    id: `half_${half1.id}_${half2.id}`,
    name,
    price,
    image,
    quantity: 1,
    isHalfHalf: true,
  };
  addToCart(product);
}

function showNotification(msg) {
  let notif = document.getElementById('notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notification';
    notif.style = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
      background: #333; color: #fff; padding: 10px 20px; border-radius: 10px;
      opacity: 0.9; z-index: 3000; font-weight: 600;
    `;
    document.body.appendChild(notif);
  }
  notif.innerText = msg;
  notif.style.opacity = '0.9';
  setTimeout(() => {
    notif.style.opacity = '0';
  }, 2000);
}

// Executa a inicialização
displayProducts();
updateCart();
