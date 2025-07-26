import fs from "fs/promises"; // Para trabajar con el sistema de archivos de manera asíncrona (readFile, writeFile, etc.)
import path from "path"; // Para manejar rutas de archivos de manera multiplataforma
import crypto from "crypto"; // Para generar identificadores únicos con crypto.randomUUID()

const filePath = path.resolve("src/data/products.json");

export default class ProductManager {
  async #readFile() {
    // Método privado para leer el archivo de productos GET
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #writeFile(data) {
    // Método privado para escribir en el archivo de productos POST, PUT, DELETE
    await fs.writeFile(filePath, JSON.stringify(data, null, "\t")); // indenta con tabulaciones
  }

  async getAll() {
    return await this.#readFile();
  }

  async getById(id) {
    // Método para obtener un producto por su ID GET
    // Método para obtener un producto por su ID
    const products = await this.#readFile();
    return products.find((p) => p.id === id.toString());
  }

  async addProduct(productData) {
    // Método para agregar un nuevo producto POST

    // Validaciones básicas
    const products = await this.#readFile();
    const newProduct = {
      id: crypto.randomUUID(), // ID único generado automáticamente
      status: true, // Por defecto, el producto está activo
      ...productData, // Resto de los campos provistos
    };
    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    // Método para actualizar un producto PUT
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id.toString());
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      ...updatedFields,
    };
    delete updatedProduct.id; // Evita cambiar el id

    products[index] = { ...products[index], ...updatedProduct };
    await this.#writeFile(products);
    return products[index];
  }

  async deleteProduct(id) {
    // Método para eliminar un producto DELETE
    const products = await this.#readFile();
    const newList = products.filter((p) => p.id !== id.toString());
    await this.#writeFile(newList);
  }
}
