"use strict"
const model = require('./model')
const fs = require('fs')


module.exports = async (filename, res) => {
    console.log("readImagedata.js")
    try{
        // const imageBuffer = fs.createReadStream(filename).on('error', err => {
        //     console.error(err)
        // }).on('data', data=>{
        //     console.log(data)
        // })
        const imageBuffer = await fs.readFileSync(filename)
        // console.log(imageBuffer)
        var predictions = await model(imageBuffer)
        console.log(predictions)
        res.send(predictions)
        
    }catch(err){
        console.error(err)
    }
    // console.log(imageBuffer)
    // 
}