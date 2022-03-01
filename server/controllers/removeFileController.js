const fs=require('fs');

const rmFileController=(req, res) => {
    
    const path = './public/uploadedFile.xlsx'//../public/uploadedFile.xlsx   

    if(fs.existsSync("./public/uploadedFile.xlsx"))  //gotta check if the file exists first...or server error occures 
    fs.unlinkSync(path);      //deleteing file       
    res.render('index');
    
}
module.exports={
    rmFileController
}