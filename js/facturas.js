// js/facturas.js
const WEBHOOK_FACTURAS = 'https://fabicolorado.app.n8n.cloud/webhook/facturas';


async function crearFactura(token, datosFactura){
const resp = await fetch(WEBHOOK_FACTURAS, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ action: 'create', token, invoice: datosFactura })
});
if(!resp.ok) throw new Error('HTTP '+resp.status);
return resp.json();
}


async function listarFacturas(token){
const resp = await fetch(WEBHOOK_FACTURAS, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ action: 'list', token })
});
if(!resp.ok) throw new Error('HTTP '+resp.status);
return resp.json();
}


async function obtenerFactura(token, id){
const resp = await fetch(WEBHOOK_FACTURAS, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ action: 'get', token, invoice_id: id })
});
if(!resp.ok) throw new Error('HTTP '+resp.status);
return resp.json();
}