import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { expressjwt as jwt } from "express-jwt";
import v1 from "./v1/";
import middleware from "./v1/middleware";


// TODO: Store a better secret in a hidden config file
const secret = process.env.JWT_SECRET || "my-secret";

const app = express();
const appPort = process.env.PORT || 3000;

const jwtMiddleware = jwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({ path: ["/v1/user", "/v1/user/login"], method: ["POST", "GET"] });

app.use(
  cors(),
  json({ limit: "5mb" }),
  jwtMiddleware,
  urlencoded({ extended: true }),
  v1
);

console.log(
  "\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT 3000!\n\n"
);
const server = app.listen(appPort);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

//TODO: use this function when we have auth flow enabled
/* io.use((socket, next) => {
  //const token = socket.handshake.auth.token;
  if (middleware.authenticateJWTForWebsocket) {
    middleware.authenticateJWTForWebsocket(socket, (err) => {
      if (err) {
        console.log('No user auth')
        return next(err);
      }
      next();
    });
  }

}); */

//Dummy auth as we dont have it yet
io.use((socket: any, next) => {
  socket.user = 'dummy-user-id';
  next();
});

io.on("connect", (socket: any) => {
  console.log(`User connected: ${socket.user}`);
  // You can access user data as socket.user
});

export default io


