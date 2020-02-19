// requires
const express = require ("express")
const nunjucks = require ("nunjucks")
const Pool = require ("pg").Pool

// configs
const server = express ()
nunjucks.configure ("./", { express: server, noCache: true })
server.use (express.static ("public"))
server.use (express.urlencoded ({ extended: true }))
const db = new Pool ({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "doe"
})

// run
server.get ("/", (req, res) => {
    let donors = db.query ("SELECT * FROM donors ORDER BY id DESC LIMIT(4)", (error, response) => {
        if (error)
        {
            return res.send ("Erro ao selecionar os dados")
        }
        else
        {
            let donors = response.rows
            return res.render ("index.html", {donors})
        }
    })
})

server.post ("/", (req, res) => {
    let { name, email, blood } = req.body

    if (name == "")
    {
        return res.send ("Preencha o campo #nome")
    }
    else if (email == "")
    {
        return res.send ("Preencha o campo #email")
    }
    else if (blood == "")
    {
        return res.send ("Preencha o campo #tipo-sanguineo")
    }
    else
    {
        let query = `INSERT INTO "donors" ("name", "email", "blood") VALUES ($1, $2, $3)`
        let values = [name, email , blood]

        db.query (query, values, (error) => {
            if (error)
            {
                return res.send ("Erro ao cadastrar doador!")
            }
            else
            {
                return res.redirect ("/")
            }
        })
    }
})

server.listen (3000, () => console.log ("\nhttp://127.0.0.1:3000\n"))