


    $(document).ready(function() {
      
  
      
      $("#createClass").on('click',(function(){
        var hairUsers=[];
        var itUsers=[];
        var basicUsers=[];
        var name,email;
        
        $('#tableID0 tr').each(function() {
            var tbl_row = $(this).closest('tr');
           
             name = $(tbl_row).find("#userName").text();
             email = $(tbl_row).find("#userEmail").text();
            

             if(name!="")
             {
                arr=name.split(" ");
                name=arr.shift()+" "+arr.pop();
                 itUsers.push({
                name:name,
                email:email
            });}
            
         });
        $('#tableID1 tr').each(function() {
            var tbl_row = $(this).closest('tr');
           
            
             name = $(tbl_row).find("#userName").text();
             email = $(tbl_row).find("#userEmail").text();
            

             if(name!="")
            {
                
                 basicUsers.push({
                name:name,
                email:email
            });}
            
         });
         $('#tableID2 tr').each(function() {
            var tbl_row = $(this).closest('tr');
           
             name = $(tbl_row).find("#userName").text();
             email = $(tbl_row).find("#userEmail").text();
           
             
            
             if(name!="") //to dodge :name: from table
             {  
                 hairUsers.push({
                name:name,
                email:email
            });}
            
            
         });
         var output=[itUsers,basicUsers,hairUsers];
       
        $.ajax({
            type:"post",
            url:"http://localhost:5000/class/users",
            contentType:"application/json",
            data:JSON.stringify(output),
            success:function(status){alert("NAPRAVILI STE RAZRED");},
            error:function(status){
                //console.log(status.responseJSON.arrayUsers);
                
                $('#tableID0 tr').each(function(){
                    name = $(this).find("#userName").text();
                    email = $(this).find("#userEmail").text();

                    status.responseJSON.arrayUsers.forEach(user => {
                        if(name==user.name&&email==user.email)
                        {
                        $(this).css("background-color","#FF0000");
                    }
                    });
                });
                $('#tableID1 tr').each(function(){
                    name = $(this).find("#userName").text();
                    email = $(this).find("#userEmail").text();

                    status.responseJSON.arrayUsers.forEach(user => {
                        if(name==user.name&&email==user.email)
                        {
                        $(this).css("background-color","#FF0000");
                    }
                    });
                });
                $('#tableID2 tr').each(function(){
                    name = $(this).find("#userName").text();
                    email = $(this).find("#userEmail").text();

                    status.responseJSON.arrayUsers.forEach(user => {
                        if(name==user.name&&email==user.email)
                        {
                        $(this).css("background-color","#FF0000");
                    }
                    });
                });
                // alert("PROVJERITE SVA IMENA I EMAIL ADRESE IMATE GRESKU")
        }
          });


      }))
          

      });
  