import productDao from "../dao/mongoDao/product.dao.js";

const getAllProducts = async (req, res) => {
    try {
      const { limit, page, sort, category, status } = req.query; // Obtiene los filtros por query
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
        lean: true,
      }; //Creamos un objeto donde vamos a configurar los parámetros que vamos a utilizar en la query
  
      if (status) {
        const products = await productDao.getAll({ status: status }, options);
        return res.status(200).json({ products });
      } // Con este condicional filtramos por status
  
      if (category) {
        const products = await productDao.getAll({ category: category }, options);
        return res.status(200).json({ products });
      } //Con este condicional filtramos por categoria
  
      const products = await productDao.getAll({}, options); //En caso de no haber filtros mandamos todos los productos en un objeto
  
      res.status(200).json({ status: "success", payload: products }); // Responde con los productos obtenidos
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const getProductsById = async (req, res) => {
    try {
      const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
      const product = await productDao.getById(pid); //Obtiene el producto por su ID de la base de datos
  
      if (product) {
        return res.status(200).json({ status: "success", payload: product }); // Responde con el producto encontrado si existe
      } else {
        const error = new Error(`Product with id: ${pid} is not found`); // Crea un nuevo error si el producto no se encuentra
        error.status = 404; // Establece el código de estado del error en 404
        throw error; // Lanza el error
      }
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const createProduct = async (req, res) => {
    try {
      const product = req.body; // Obtiene el body de la request que contiene los datos del producto
      const newProduct = await productDao.create(product); //Agrega el nuevo producto a la base de datos
  
      res.status(201).json({ status: "success", payload: product }); // Responde con el nuevo producto creado
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const updateProduct = async (req, res) => {
    try {
      const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
      const productData = req.body; // Obtiene el body de la request que contiene los nuevos datos del producto
      const updateProduct = await productDao.update(pid, productData); //Obtiene el id y actualiza el producto en la base de datos
      if (!updateProduct) {
        return res.status(404).json({
          status: "error",
          response: `Product with id: ${pid} is not found`,
        });
      } //Valida que el "pid" (product id) existe, sino retorna error
  
      res.status(200).json({ status: "success", payload: updateProduct }); // Responde con el producto actualizado
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
      const product = await productDao.deleteOne(pid); // Obtiene el producto por id y lo elimina de la base de datos
  
      if (!product) {
        return res.status(404).json({
          status: "error",
          response: `Product with id: ${pid} is not found`,
        });
      } //Valida que el "pid" (product id) existe, sino retorna error
  
      res.status(200).json({
        status: "success",
        payload: `The product with id number: ${pid} has been successfully deleted.`,
      }); // Responde con un mensaje de éxito
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };



export default { getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct};