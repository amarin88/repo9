// Imports de los módulos necesarios
import express from "express";
import router from "./routes/index.js"; // Importa el router principal
import { connectMongoDB } from "./config/mongoDb.config.js"; //Importamos la configuración de MongoDB
import session from "express-session";//Importamos para iniciar sessions en el servidor
import MongoStore from "connect-mongo";// Importamos para conectar las sessions con mongo atlas
import passport from "passport";//Importación de passport para autenticación de usuarios
import initializePassport from "./config/passport.config.js"; //Import config de passport
import cookieParser from "cookie-parser";//Import de cookie parser
import envs from "./config/env.config.js";//Importación de la configuración de las variables de entorno

connectMongoDB(); //Conectamos con mongoDB

// Instancia de express
const app = express();

// Configuración del puerto

const ready = () =>
  console.log(
    `Server ready on http://localhost:${envs.PORT}. Press Ctrl + C to stop.`
  );

app.use(express.json()); // Middleware para analizar las solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar las solicitudes con datos codificados en URL
app.use(cookieParser(envs.SECRET_CODE));
app.use(session({
  store: MongoStore.create({
    mongoUrl: envs.MONGO_URL,//URL de la base de datos de mongo con la que se va a conectar
    ttl: 15//Tiempo de vida de la sesión en minutos
  }),
  secret: envs.SECRET_CODE,//Contraseña
  resave: true,//Ponemos true en el caso de la sesión quede inactiva y querramos que se mantenga
  saveUninitialized: true// Ponemos true en el caso de que la sesión no contenga datos y querramos almacenarla igual 
}));

app.use(passport.initialize());//Middleware de inicialización de passport
app.use(passport.session());//Middleware de sesión de passport
initializePassport();//Inicializador del passport local


app.use("/api", router); // Utiliza el router principal bajo el prefijo "/api"

app.listen(envs.PORT, ready); // Inicia el servidor en el puerto especificado y muestra un mensaje de confirmación cuando está listo