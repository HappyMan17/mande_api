import { Router } from "express";
import authByEmailPwd from "../helpers/authByEmailPwd.js";
import {getUserByEmailAndPhoneNumber} from '../service/userService.js'

const authRouter = Router();

//Endpoint público (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => res.send("Endpoint público"));

//Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", (req, res) => {
  const { email, phone_number } = req.body;

 // if (!email || !phone_number) return res.sendStatus(400);

  try {
    getUserByEmailAndPhoneNumber(req, res);
  } catch (err) {
    return console.log("no entro")
    //return res.sendStatus(401);
  }
});

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