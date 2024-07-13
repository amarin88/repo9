import cartDao from "../dao/mongoDao/cart.dao.js";

const createCart = async (req, res) => {
    try {
      const cart = await cartDao.create(); //Crea el carrito en la base de datos
  
      res.status(201).json({ status: "success", payload: cart }); // Responde con el carrito creado y el código de estado 201 (creado)
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params; // Obtiene los parámetros de la ruta "cid"(cart id) y "pid" (product id)
  
      const cart = await cartDao.addProductToCart(cid, pid); //Recibe el id del carrito y del producto, y agrega el producto al carrito de la base de datos
  
      if (cart.product == false)
        return res.status(404).json({
          status: "Error",
          response: `Product with ID ${pid} doesn't found.`,
        }); //Si no encuentra el producto por id en la base de datos arroja error
      if (cart.cart == false)
        return res.status(404).json({
          status: "Error",
          response: `Cart with ID ${cid} not found.`,
        }); //Si no encuentra el carrito por id en la base de datos arroja error
  
      res.status(201).json({ status: "success", payload: cart }); // Responde con el carrito actualizado en la base de datos
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  }

export default { createCart, addProductToCart };