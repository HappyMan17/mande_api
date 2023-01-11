import { Router } from "express";
import authByEmailPwd from "../helpers/authByEmailPwd.js";
import { getUserByEmailAndPhoneNumber } from '../service/userService.js'
import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

const authRouter = Router();

//Endpoint público (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => res.send("Endpoint público"));

function generateJWT(user, secret) {
  const payload = {
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
    algorithm: "HS256",
  };

  return jwt.sign(payload, secret, options);
}

//Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", (req, res) => {
  const { email, phone_number } = req.body;
  getUserByEmailAndPhoneNumber(req, res)
    .then((user) => {
      const token = generateJWT({ email }, "contraseña_equis"); 
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Usuario no encontrado") {
        return res.sendStatus(401);
      }
      return res.sendStatus(500);
    });
});

/** 
authRouter.post("/autenticado", async (req, res) => {
  const { email, phone_number } = req.body;

  try {
    const { guid } = getUserByEmailAndPhoneNumber(req, res);

    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwtConstructor = new SignJWT({ guid });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (err) {
   // return res.sendStatus(401);
   console.log('nonas');
  }
});*/

//Endpoint autorizado a administradores
authRouter.post("/autorizado", (req, res) => {
  const { email, phone_number } = req.body;

  if (!email || !phone_number) return res.send(400);

  try {
    const user = authByEmailPwd(email, phone_number);

    if (user.role !== "admin") return res.send(403);

    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default authRouter;