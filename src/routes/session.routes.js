import { Router } from "express"; //Import router de express
import passport from "passport"; //Import de passport
import { passportCall, authorization } from "../middlewares/passport.middleware.js"; //Import de validacion de rol de usuario
import { userLoginValidator } from "../validators/userLogin.validator.js"; //Import de valiacion de express-validator
import sessionController from "../controllers/session.controllers.js"; //Import controller de sessions

const router = Router(); //Inicializador del router de express

router.post(
  "/register",
  passport.authenticate("register"),
  sessionController.createRegister
); //Ruta para crear una nuevo registro

router.post(
  "/login",
  passport.authenticate("login"),
  sessionController.passport
); //Ruta para login con passport-local

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email", //Consultar la dirección principal de correo electronico de google
      "https://www.googleapis.com/auth/userinfo.profile", //Permite ver su información personal, incluidos datos personales que haya hecho publicos
    ],
    session: false,
  }),
  sessionController.passport
); //Ruta para login con google

router.post("/jwt", userLoginValidator, sessionController.jwtPassport); //Ruta para login con jwt

router.get(
  "/current",
  passportCall("jwt"),
  authorization("admin"),
  sessionController.passport
); //Ruta para validación de token

router.get("/logout", sessionController.sessionDestroy); //Ruta para deslogueo

export default router;
