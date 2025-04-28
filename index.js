const express = require("express");
const app = express();
const port = 3000
const veiculoRoutes = require("./routes/veiculoRoutes")

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/", (req, res)=> {
    res.render("home");
});

app.use("/veiculos", veiculoRoutes)

app.listen(port, (err)=> {
    console.log(`Servidor rodando em http://localhost:${port}`)
});