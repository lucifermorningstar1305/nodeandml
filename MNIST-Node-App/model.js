const tf = require('@tensorflow/tfjs-node') 

const preprocess = (img) => {
    var resized = tf.image.resizeBilinear(img, [28, 28]).toFloat()
    var offset = tf.scalar(255.0)
    var normalized = tf.scalar(1.0).sub(resized.div(offset))
    var batched = normalized.expandDims(0)
    return batched
}

module.exports = async (data) => {
    try{
        console.log("model.js")
        const model = await tf.loadLayersModel('file://./tfjsmodels/model.json')
        var example = await tf.node.decodeImage(data, 1)

        console.log("TF",example)
        var prediction = await tf.argMax(model.predict(preprocess(example)).dataSync()).toString()
        console.log(prediction.split('\n')[prediction.split('\n').length - 1].trim())
        // console.log(JSON.parse(prediction))
        // return {message : "The digit is "+prediction, statuscode : 200}
        return {message : 'The digit is : ' + prediction.split('\n')[prediction.split('\n').length - 1].trim(), statuscode : 200}
    }catch(err){
        console.error('Error',err)
        return {message : "Error faced while predicting", statuscode : 400}
    }
}