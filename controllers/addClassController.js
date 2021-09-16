const User=require('../models/user')

const addClass=async (req, res) => {
    let arr=req.body;
    let addData=true;
    let rejectedUsers=[],allUsers=[];

  // array of arrays, thats why I'm using double for
   
  for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
          const user = arr[i][k];
          user.name=user.name.trim();
         let email=false       //bool variable to check if email is correct
            
        //removing additional spaces before and after first name and last name;
         let array=user.name.split(" "); //spliting first and last name
           
       //removing all unnecessary spaces
          let firstname=array.shift();
          let lastname=array.pop();
         firstname=firstname.trim();

         if(typeof lastname!=='undefined') //checking if it has lastname
         {         
            lastname=lastname.trim();        
        }
         else                               //if it doesnt have last name then just setting addData to false
        {
            lastname="NOLASTNAME"
            addData=false;
        }
        if(user.email.includes("@"))  //checking only if format of email is valid..if it includes@
        {
            email=true;        
        }
        else
        {
        email=false;
        }    //if client forgot email then variable email is false        
            //if the user didn't input first and last name and if he messed up email then its error
        if(firstname==="undefined"||lastname==="undefined"|| email==false)
        {
            addData=false
        } 
         else 
         {
             firstname=firstname.toLowerCase();
             lastname=lastname.toLowerCase();
             user.name=firstname+ ' '+ lastname;
        }

        switch (i) {        //I could add that these values can be added in settings by user
            case 0:
                user.class="1-a";
              break;
            case 1:
                user.class="1-b";
                break;
            case 2:
                user.class="1-c";
                break;
      }

      //first checking email if it exists

      let data;
      if(email) //chekcing in database only if email is valid
      {
          data=await User.findOne({email:user.email})
      }
      
      if(data!=null||email==false) //if either user is found in database or user wasnt searched in database beacuse his email is false we will add him to rejected users..
      {
          rejectedUsers.push(user); //adding user which has its email already in database rejectedUsers or has bad email
      }
      else allUsers.push(user);  //else user is not found in database and just adding him to allUsers..
    }}

    if(addData)
//should update classes first 
//TESTIRAM KAKO DA UPDATEAM SVE RAZREDE NAKON STO NAPRAVIS NOVI RAZRED (MORAT CU I IZBRISAT SVE cetvrte razrede sa obzirom da se ovo radi na kraju godine.)
//ali imaj na umu da prvo sacuvas koliko je knjiga rentano za history stats class

    {try {
         if(rejectedUsers.length==0)
          {
            await User.insertMany(allUsers)
            res.status(200)
           }
    else
        {
                res.status(400).json({
                msg:"users that are rejcted..",
                arrayUsers:rejectedUsers});
        }
        } 
    catch (error) {
        console.log(error)
    }}
    //else  //addData is False
        // res.status(401).json({
        // msg:"users that are rejcted..",
        // arrayUsers:"rejectedUsers"});   
}

module.exports={
    addClass
}