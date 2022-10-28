
const serverless=require('serverless-http')
const express=require('express')
const  morgan=require('morgan')
const cors=require('cors')
const router=require('../routes/router')

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


morgan.token('body',function(req,res){
    return JSON.stringify(req.body)
})

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(['/api/persons/','/info'], router)




module.exports.handler=serverless(app)