// js/login.js
const WEBHOOK_LOGIN = 'https://fabicolorado.app.n8n.cloud/webhook/login';
const msgEl = document.getElementById('msg');


function showMsg(t, isError = false){
msgEl.textContent = t;
msgEl.className = isError ? 'msg error' : 'msg';
}


// Toggle forms
const btnToggle = document.getElementById('btn-toggle');
const btnToggleBack = document.getElementById('btn-toggle-back');
btnToggle && btnToggle.addEventListener('click', (e)=>{ e.preventDefault(); toggleForms();});
btnToggleBack && btnToggleBack.addEventListener('click', (e)=>{ e.preventDefault(); toggleForms();});
function toggleForms(){
document.getElementById('login-form').classList.toggle('hidden');
document.getElementById('register-form').classList.toggle('hidden');
}


// Login handler
const formLogin = document.getElementById('form-login');
formLogin && formLogin.addEventListener('submit', async (e)=>{
e.preventDefault();
showMsg('Enviando credenciales...');
const username = document.getElementById('username').value.trim();
const password = document.getElementById('password').value.trim();
try{
const resp = await fetch(WEBHOOK_LOGIN, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password })
});
if(!resp.ok){
const text = await resp.text();
showMsg('Error HTTP '+resp.status+' '+text, true);
return;
}
const data = await resp.json();
if(data && data.access_token){
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('token_expiry', Date.now() + ((data.expires_in||3600)*1000));
showMsg('Login correcto. Redirigiendo...');
setTimeout(()=> window.location.href='dashboard.html',800);
} else {
showMsg('Respuesta inválida: ' + JSON.stringify(data), true);
}
}catch(err){
console.error(err);
showMsg('Error de conexión. Revisa consola (F12).', true);
}
});