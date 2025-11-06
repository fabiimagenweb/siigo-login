// js/productos.js
const WEBHOOK_PRODUCTOS = 'https://fabicolorado.app.n8n.cloud/webhook/productos';


async function obtenerProductos(token){
const resp = await fetch(WEBHOOK_PRODUCTOS, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ token })
});
if(!resp.ok) throw new Error('HTTP '+resp.status);
const data = await resp.json();
mostrarProductos(data.results || data);
return data;
}


function mostrarProductos(productos){
const container = document.getElementById('productos-list');
if(!container) return;
container.innerHTML = '';
(productos || []).forEach(p=>{
const div = document.createElement('div');
div.className = 'producto-item';
div.innerHTML = `<h3>${p.name||p.description||''}</h3><p>Codigo: ${p.code||''}</p><p>Precio: ${p.price||''}</p>`;
container.appendChild(div);
});
}