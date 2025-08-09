import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // твой файл базы
const middlewares = jsonServer.defaults();

// Разрешаем CORS
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(middlewares);
server.use(router);

server.listen(7777, () => {
  console.log("JSON Server is running on port 7777");
});
