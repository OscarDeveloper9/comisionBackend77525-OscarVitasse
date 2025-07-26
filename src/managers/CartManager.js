import fs from "fs/promises"; // Para trabajar con el sistema de archivos de manera asíncrona (readFile, writeFile, etc.)
import path from "path"; // Para trabajar con el sistema de archivos de manera asíncrona (readFile, writeFile, etc.)
import crypto from "crypto"; // Para generar identificadores únicos con crypto.randomUUID()

const filePath = path.resolve("src/data/carts.json");

export default class CartManager {
  async #readFile() {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, "\t"));
  }

  async createCart() {
    const carts = await this.#readFile();
    const newCart = {
      id: crypto.randomUUID(),
      products: [],
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getById(id) {
    const carts = await this.#readFile();
    return carts.find((c) => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#readFile();
    const cart = carts.find((c) => c.id === cid);
    if (!cart) return null;

    const productInCart = cart.products.find((p) => p.product === pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.#writeFile(carts);
    return cart;
  }
}
