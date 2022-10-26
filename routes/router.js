
const express=require('express')

const router=express.Router()

let persons=[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

router.get('/', (req,res)=>{
    res.send('<h1>Welcome home</h1>')
})

router.get('/api/persons', (req,res)=>{
    res.json(persons)
})

router.get('/info', (req,res)=>{
  res.send(`<!DOCTYPE html> <html> <head> <title>Phonebook</title>`+
  `</head><body><p>phonebook has info for ${persons.length} people</p>`+
  `<p>${ new Date()}</p></body> </html>`)
})

router.get('/api/persons/:id', (req,res)=>{
  const id=Number(req.params.id)
  const person=persons.find((person)=>person.id===id)
  if(!person){
    return res.status(404).json({ error: 'content not found' })
  }
  res.json(person)
})

const generateId=()=>{
  return Math.floor(Math.random()*10000)
}

router.post('/api/persons',(req,res)=>{
  const body=req.body
  if(!(body.name && body.number)){
    return res.status(404).json({error:'name or number is missing'})
  }

  if(body.name){
   const isOccupied=persons.find((person)=>body.name.trim().toUpperCase()===person.name.toUpperCase())
   if (isOccupied){
      return res.status(404).json({error:'name must be unique'})
    }
  }

  const id=generateId()
  const person={...body, id}
  persons=persons.concat(person)
  res.json(person)

})

router.delete('/api/persons/:id', (req,res)=>{
    const id=Number(req.params.id)
    persons=persons.filter((person)=>person.id!==id)
    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

router.use(unknownEndpoint)


module.exports=router
