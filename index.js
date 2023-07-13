require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())


    //create model
    const Note = require("./models/note")

app.get("/", (request,response)=>{
    response.send('<h1>Hello Dhivakar<h1>')
})

app.get("/api/notes", (request,response)=>{
    Note.find({},{})
    .then((note)=>{
        response.json(note)
    })
})

app.post("/api/notes", (request,response)=>{
    const note = new Note(request.body)

    note.save()
        .then(result=>{
            response.status(201).json({message:"Note Created Sucessfull"})
        })
    
})

app.get("/api/notes/:id",(request,response)=>{
    const id = request.params.id
    Note.findById(id)
    .then((note)=>{
        if(!note){
            return response.status(404).json({error:"Note not found"})
        }
        response.json(note)
    })
    .catch((error)=>{
        response.status(500).json({error:"internal server eroor"})
    })
})

app.delete("/api/notes/:id",(request,response)=>{
    const id = request.params.id
    Note.findByIdAndDelete(id)
    .then((deleteNote)=>{
        if(!deleteNote){
            return response.status(404).json({error:"Note not found"})
        }
        response.status(204).json({message:"Note deleted"})
    })
    .catch((error)=>{
        response.status(500).json({error:"internal server error"})
    })
})

app.get("/api/notes/:id",(request,response)=>{
    const id = request.params.id
    const noteToPut = request.body

    Note.findByIdAndUpdate(id, noteToPut)
        .then((updatedNote)=>{
        if(!updatedNote){
            return response.status(404).json({error:"Note not updated"})
        }
            response.json(updatedNote)
        })
        .catch((error)=>{
            response.status(500).json({error:"internal server error"})
        })
    
    
})


const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`Server Running in PORT ${PORT}`)