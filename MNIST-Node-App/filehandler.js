"use strict"
// const imageprocess = require('./readImagedata')
module.exports = (file) => {
    return new Promise((resolve, reject) =>{
        if(!file){
            reject({message : "File(s) not mentioned", statuscode : 400})
        }
        
            
        resolve(file.mv('./uploads/'+file.name))
        
    })
}