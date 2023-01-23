import { Router } from "express";
import { getUserByEmailAndPhoneNumber } from '../service/userService.js'
import jwt from "jsonwebtoken";
import {getWorkerByEmailAndPhoneNumber} from '../service/workerService.js'


const authRouter = Router();

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
authRouter.post("/user", (req, res) => {
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

//Endpoint autenticado para todo trabajador registrado

authRouter.post("/worker", (req, res) => {
  const { email, phone_number } = req.body;
  getWorkerByEmailAndPhoneNumber(req, res)
    .then((worker) => {

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

export default authRouter;