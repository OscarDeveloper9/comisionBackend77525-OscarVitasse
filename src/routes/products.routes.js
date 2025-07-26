import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await manager.getAll();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const product = await manager.getById(req.params.pid);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

router.post("/", async (req, res) => {
  console.log("POST /api/products recibido con body:", req.body);
  const product = await manager.addProduct(req.body);
  res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
  const updated = await manager.updateProduct(req.params.pid, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updated);
});

router.delete("/:pid", async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  res.json({ message: "Producto eliminado" });
});

export default router;
