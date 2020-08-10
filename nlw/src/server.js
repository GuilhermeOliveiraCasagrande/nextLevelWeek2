const { pageLanding, pageStudy, pageGiveClasses, pageSaveClasses } = require("./pages")
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")
const { urlencoded } = require("express")

//config nunjucks
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

server
//Arquivos estáticos
    .use(express.static("public"))
    .use(urlencoded({ exteded: true }))
    //Rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", pageSaveClasses)
    .listen(5500)