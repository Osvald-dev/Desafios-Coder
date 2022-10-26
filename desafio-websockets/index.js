const express = require('express') ;
const { Server: HttpServer } = require("http")
const { Server: SocketIOServer } = require("socket.io")


const ContainerFilesystem = require ('./src/Container/ContainerFilesystem.js');
const Memory = require ('./src/Container/ContainerMemory.js');



const PORT = 3000;

const Productos = new ContainerFilesystem('Products')

const app = express();
const httpServer = new HttpServer(app); 
const io = new SocketIOServer(httpServer); 
app.use(express.static('./views'))
app.use(express.urlencoded({ extended: true }));



httpServer.listen(PORT, ()=>{console.log( `Runing on port:${PORT}`)})

// conection io
io.on('connection', socket => {
  enviarProductos(socket)
  console.log('algo se conecta?')

  socket.on("new product", newProduct =>{
    guardarProducto(newProduct)
  })


})
const enviarProductos = async (socket) =>{
  const allProducts = await Productos.getAll();
  socket.emit('all products', allProducts)
}


const guardarProducto = async (newProduct) =>{
  await Productos.save(newProduct)
  const allProduct = await Productos.getAll()
  io.sockets.emit("all products", allProduct)
}


// const products = async () =>{
//   const allProducts = await 
// }


// const app = express();
// const httpServer = new httpServer(app)
// const io = new SocketIOServer(httpServer);

// const PORT = 8080;

// httpServer.listen(PORT, ()=> console.log(`Runing on port : ${PORT}`))

// io.on('connection', socket =>)




// import express from "express";
// import { productRouter } from "./routers/ProductRouter.js";
// import { ViewsRouter } from "./routers/ViewsRouter.js";
// import handlebars from "express-handlebars";

// const PORT = 8080;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//     defaultLayout: "main.hbs",
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", "./views");

// app.use("/", ViewsRouter);
// app.use("/api/productos", productRouter);

// const server = app.listen(PORT, () =>
//   console.log("Running on port " + server.address().port)
// );