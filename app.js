const express = require('express')
const app = express()
const path = require("path")
const data = require("./data")
const XLSX = require("xlsx")
const tare = data.osobe.filter(person => person.class == "IV-a")
const multer = require('multer')
const mongoose = require('mongoose');
const User = require("./models/user")

//connect to mongoDB
const dbURI = "mongodb+srv://tarik-besic:Parkourislife2424@cluster0.pk5um.mongodb.net/user-data?retryWrites=true&w=majority"
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => console.log("Database connected")).catch((err) => console.log(err)) //ovo je async task pa mogu nastavit sa .then()

app.use(express.json())

const storage = multer.diskStorage({ //telling multer where to store the file
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-Tarik.xlsx`) //file name will always be static!
    }
})

const upload = multer({
    storage
});



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"))

    console.log("situacija")
})

app.get('/add-user', (req, res) => {
    const user = new User({
        name: "TARIK",
        email: "nemamEmail@gmail.com"
    })

    user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })

})


app.post("/upload", upload.single("upload"), (req, res) => {
    const workbook = XLSX.readFile("./public/upload-Tarik.xlsx")
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    let users = []
    let user = {}
    for (cell in worksheet) {
        const cellAsString = cell.toString();
        //if(cellAsString[1]=='1') continue
        if (cellAsString[0] === 'A') {
            user.name = worksheet[cell].v
        }
        if (cellAsString[0] === 'B') {
            user.email = worksheet[cell].v
            users.push(user)
            user = {}
        }
    }

    users.shift() //droping "name" and "email" from array 

    console.log(users);


})



app.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})