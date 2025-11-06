GLB Ingenieros - Sistema de Gestión con n8n y Siigo API
*** DESCRIPCIÓN ***

Este proyecto implementa un sistema de gestión de clientes, facturación y productos utilizando n8n como plataforma de automatización y la API de Siigo para la administración contable.

Los endpoints principales permiten:

Autenticación de usuarios (login)

Registro de clientes nuevos

Gestión de facturas (crear, listar, obtener)

Consulta de productos


*** DIAGRAMA DE FLUJO DEL WORKFLOW EN n8n ***Diagrama de flujo del workflow en n8n
flowchart TD
    A[Webhook /login] --> B[HTTP Request a Siigo Auth API]
    B --> C[Respond to Webhook: Devuelve token de acceso]

    D[Webhook /clientes] --> E[HTTP Request a Siigo Customers API]
    E --> F[Respond to Webhook: Devuelve info cliente]

    G[Webhook /facturas] --> H[HTTP Request a Siigo Invoices API]
    H --> I[Respond to Webhook: Devuelve info factura]

    J[Webhook /productos] --> K[HTTP Request a Siigo Products API]
    K --> L[Respond to Webhook: Devuelve lista de productos]

    %% Relaciones entre los flujos
    C --> M[Frontend o cliente usa token]
    F --> M
    I --> M
    L --> M


*** EXPLICACIÓN DEL FLUJO ***

Login: /login recibe credenciales, consulta Siigo, devuelve access_token.

Registro de clientes: /clientes recibe datos, usa token de admin, crea cliente en Siigo, devuelve info.

Gestión de facturas: /facturas recibe acción y token, consulta API de facturas, devuelve datos.

Consulta de productos: /productos recibe token, consulta API de productos, devuelve lista.

*** ENDPOINTS DISPONIBLES ***
Endpoint	Método	Función	Datos de entrada
/login	POST	Autenticación de usuario	{ "username": "", "password": "" }
/clientes	POST	Crear nuevo cliente	{ "token": "", "customer": {...} }
/facturas	POST	Crear, listar o consultar facturas	`{ "action": "create
/productos	POST	Listar productos	{ "token": "" }
*** REQUISITOS ***

Cuenta activa en Siigo

Token de acceso de usuario

Token de administrador para crear clientes

n8n configurado con los workflows descritos

*** USO***
Login

POST /login con username y password. Recibirás access_token.

Registro de clientes

POST /clientes con token de administrador y datos del cliente.

Facturación

POST /facturas con action (create, list, get) y access_token.

Productos

POST /productos con access_token.
## Despliegue

Puedes ver la aplicación en vivo aquí: [GLB Ingenieros Login](https://fabiimagenweb.github.io/siigo-login/)

*** NOTAS ***

Los tokens expiran según la política de Siigo.

La creación de clientes requiere token de administrador.
