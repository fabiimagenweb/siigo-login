// js/registro-cliente.js
const WEBHOOK_CLIENTES = 'https://fabicolorado.app.n8n.cloud/webhook/clientes';


const formRegister = document.getElementById('form-register');
formRegister && formRegister.addEventListener('submit', async (e)=>{
e.preventDefault();
const nombre = document.getElementById('reg-nombre').value.trim();
const apellido = document.getElementById('reg-apellido').value.trim();
const cedula = document.getElementById('reg-cedula').value.trim();
const email = document.getElementById('reg-email').value.trim();
const telefono = document.getElementById('reg-telefono').value.trim();
const direccion = document.getElementById('reg-direccion').value.trim();


// Admin token (puedes obtenerlo con /login usando credenciales admin)
const adminToken = localStorage.getItem('access_token');
if(!adminToken) return alert('Necesitas autenticarte como admin para registrar clientes');


const nuevoCliente = {
type: 'Customer',
person_type: 'Person',
id_type: '13',
identification: cedula,
name: [nombre, apellido],
commercial_name: `${nombre} ${apellido}`,
address: {
address: direccion,
city: { country_code: 'Co', state_code: '19', city_code: '001' }
},
phones: [{ number: telefono }],
contacts: [{ first_name: nombre, last_name: apellido, email }]
};


try{
const resp = await fetch(WEBHOOK_CLIENTES, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ token: adminToken, customer: nuevoCliente })
});
if(!resp.ok){ const t = await resp.text(); throw new Error(t||'HTTP '+resp.status); }
const data = await resp.json();
alert('Cliente registrado');
toggleForms();
}catch(err){ console.error(err); alert('Error al registrar: '+err.message); }
});