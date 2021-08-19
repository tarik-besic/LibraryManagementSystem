const express=require('express')
const app=express()
const path=require("path")
const data=require("./data")
const XLSX=require("xlsx")
const tare=data.osobe.filter(person=>person.class=="IV-a")
const multer=require('multer')


const storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,"public")
},
filename:function(req,file,cb){
    const parts=file.mimetype.split("/");
    cb(null,`${file.fieldname}-Tarik.xlsx`)
}
})

const upload=multer({storage});



app.get('/',(req,res)=>{
res.sendFile(path.resolve(__dirname,"./index.html"))

console.log("situacija")
}
)
app.post("/upload",upload.single("upload"),(req,res)=>{
    const workbook=XLSX.readFile("./public/upload-Tarik.xlsx")
    let worksheet=workbook.Sheets[workbook.SheetNames[0]];
    
    let posts=[]
    let post={}
    for(cell in worksheet)
    {
    const cellAsString=cell.toString();
    if(cellAsString[0]==='A')
    {
        post.ime=worksheet[cell].v
    }
    if(cellAsString[0]==='B')
    {
        post.email=worksheet[cell].v
        posts.push(post)
        post={}
    }
    }
    console.log("Nakon uploada ide situacija")
    console.log(posts)
})



app.listen(5000,()=>{console.log("Server is listening on port 5000...")})