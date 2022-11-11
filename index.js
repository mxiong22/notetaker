const express = require ('express')
const fs = require ('fs')
const path = require ('path')
let db = require ('./db/db.json')
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const app = express ()
const PORT = 3001

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(path.join(__dirname, './public/index.html'))
}) 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes',(req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    //console.log(req.body)
    const newNote=req.body
    newNote.id=uuidv4()
    //console.log(newNote)
    db.push(newNote)
    console.log(db)
fs.writeFileSync('./db/db.json', JSON.stringify(db))
res.json(db)
})


app.listen(PORT, () => {
    console.log('app is listening')
})

