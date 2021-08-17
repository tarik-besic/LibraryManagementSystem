const express=require('express')
const app=express()

const data=require("./data")

const tare=data.osobe.filter(person=>person.class=="IV-a")
console.log(tare)
app.get('/',(req,res)=>{
    
res.send(tare)
}
)

app.listen(5000,()=>{console.log("Server is listening on port 5000...")})