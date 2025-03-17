const express = require("express");
const app = express();
const port = 3000
const veiculoRoutes = require("./routes/veiculoRoutes")

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res)=> {
    res.send("<h1>Hello World! </h1>");
});

app.use("/veiculos", veiculoRoutes)

app.listen(port, (err)=> {
    console.log(`Servidor rodando em https://localhost:${port}`)
});