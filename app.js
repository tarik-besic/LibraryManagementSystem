const express=require('express')
const app=express()
const path=require("path")
const data=require("./data")
const XLSX=require("xlsx")
const tare=data.osobe.filter(person=>person.class=="IV-a")





app.get('/',(req,res)=>{
res.sendFile(path.resolve(__dirname,"./index.html"))
}
)
app.get('/upload',(req,res)=>{



})


app.listen(5000,()=>{console.log("Server is listening on port 5000...")})