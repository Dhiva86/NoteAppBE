const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

//connect to url
mongoose.connect(url)
      .then(result =>{
        console.log('connected to mongoDB')
      })
      .catch(error=>{
        console.log('error to connect mongoDB')
      })

      //create a schema

    const noteSchema = new mongoose.Schema({
        content:String,
        important:Boolean,
        timestamp:{
            type:Date,
            default:Date.now
        }
    })

    noteSchema.set('toJSON',{
        transform:(document, returnedObject)=>{
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

    module.exports = mongoose.model("Note", noteSchema)