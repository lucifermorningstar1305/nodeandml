"use strict"

const express = require('express')
const bodyparser = require('body-parser')
const fileUploads = require('express-fileupload')
const filehandler = require('./filehandler')
const imageprocess = require('./readImagedata')
// const model = require('./model')
const port = 8008
var app = express()


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(fileUploads({
    createParentPath : true
}))

app.get('/', (req, res) => {
    res.send({message : "Home directory", statuscode : 200})
})

app.post('/upload/files', (req, res) => {
    try{
        if(!req.files){
            res.send({message : "No file uploaded", statuscode : 400})
        }
        else{
            let file = req.files.file
            filehandler(file).then(success => {
                imageprocess(__dirname+'/uploads/'+file.name, res)}).
                catch(err=>res.send(err))
        }
    }catch(err){
        console.error(err)
        res.send({message : "Internal Server Error", stattuscode:500})
    }
})


app.listen(port, () => {
    console.log(`Server running at http:\\localhost:${port}`)
})