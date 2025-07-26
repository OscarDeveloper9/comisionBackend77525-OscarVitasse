# 🛒 API REST - Productos y Carritos de Compra

Este proyecto consiste en una API RESTful desarrollada con **Node.js** y **Express**, que permite gestionar productos y carritos de compra, con persistencia de datos mediante archivos JSON (`products.json` y `carts.json`).

## 🚀 Instalación

```bash
git clone https://github.com/tu_usuario/backend-api-ecommerce.git
cd backend-api-ecommerce
npm install
npm start
```

## 📬 Endpoints Disponibles

### Productos `/api/products`
- GET `/`
- GET `/:id`
- POST `/`
- PUT `/:id`
- DELETE `/:id`

### Carritos `/api/carts`
- POST `/`
- GET `/:cid`
- POST `/:cid/product/:pid`
