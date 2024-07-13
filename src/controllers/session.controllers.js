import userDao from "../dao/mongoDao/user.dao.js"; //Import dao para usuario
import { isValidPassword } from "../utils/hashPassword.js"; //Import para hash de seguridad de contraseña
import { createToken, verifyToken } from "../utils/jwt.js"; //Import para JWT

const createRegister = async (req, res) => {
    try {
      return res
        .status(201)
        .json({ status: "success", response: "User successfuly created" }); // Responde con el usuario creado y el código de estado 201 (creado)
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const passport = async (req, res) => {
    try {
      return res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
      //Verificamos que los datos ingresados coincidan con los del admin, en caso que si retornamos afirmativamente
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const jwtPassport = async (req, res) => {
    try {
      const { email, password } = req.body; //Desestructuramos y recibimos email y password por body
      const user = await userDao.getByEmail(email); //A traves del dao buscamos el usuario por email
      if (!user || !isValidPassword(user, password))
        return res
          .status(401)
          .json({ status: "error", response: "Invalid email or password" }); //Verificamos que el email y el password coincidan con el usuario
  
      const token = createToken(user); //En caso que exista el email con la contraseña valida, creamos el token con jwt
      res.cookie("token", token, { httpOnly: true }); // Guardamos el token en una cookie
  
      return res.status(200).json({ status: "success", payload: user, token });
    } catch (error) {
      //Verificamos que los datos ingresados coincidan con los del admin, en caso que si retornamos afirmativamente
      console.log(error); // Registra cualquier error en la consola
      return res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

const sessionDestroy =  async (req, res) => {
    try {
      req.session.destroy();
  
      res
        .status(200)
        .json({ status: "success", response: "Session completed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  };

export default { createRegister, passport, jwtPassport, sessionDestroy };