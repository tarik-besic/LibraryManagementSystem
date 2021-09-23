    $(document).ready(function() {
      
        $(document).find('.btn_save').hide();
        $(document).find('.btn_cancel').hide();
        $(document).find('.btn_saveBook').show();
    
        $("#quantityAll").keyup(function(){
          
          let text=$("#quantityAll").text();
          console.log("ide");
          console.log(text);
          $("#quantityFree").text(text);
        });
          $(document).on('click', '.btn_edit', function(event) 
        {
            event.preventDefault();
            var tbl_row = $(this).closest('tr');

            var row_id = tbl_row.attr('row_id');
  
            tbl_row.find('.btn_save').show();
            tbl_row.find('.btn_cancel').show();
  
            //hide edit button
            tbl_row.find('.btn_edit').hide(); 
  
            //make the whole row editable
            tbl_row.find('.row_data')
            .attr('contenteditable', 'true')
            .attr('edit_type', 'button')
            .addClass('bg-light text-dark')
            .css('padding','3px')

            if(tbl_row.find('.row_data').hasClass('text-white'))
            {
              tbl_row.find('.row_data').removeClass('text-white')
            }
      
          tbl_row.find('.row_data').each(function(index, val) 
          {  
            //this will help in case user decided to click on cancel button
            $(this).attr('original_entry', $(this).html());
          }); 		
      
      
        });
      

      $(document).on('click', '.btn_cancel', function(event) 
      {
        event.preventDefault();
    
        var tbl_row = $(this).closest('tr');
    
        var row_id = tbl_row.attr('row_id');
    
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
    
        //show edit button
        tbl_row.find('.btn_edit').show();
    
   
        tbl_row.find('.row_data')
        .attr('edit_type', 'click')  //
        .removeClass('bg-light text-dark') 
        .css('padding','') 
        .attr('contenteditable', 'false') 
        tbl_row.find('.row_data').each(function(index, val) 
        {   
          $(this).html( $(this).attr('original_entry') ); 
        });  
      });
      
      $(document).on('click', '.btn_save', function(event) 
      {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');
    
        var row_id = tbl_row.attr('row_id'); //can be used for ajax call
    
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
    
        //show edit button
        tbl_row.find('.btn_edit').show();
  
        tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-light text-dark') //changing letter and background from white to dark
        .css('padding','')
        .attr('contenteditable', 'false') 
        
        let obj = {  //creating array object so I can send values as Json object and parse it on server to create a Model of a book.
          bookName:"",
          authorName:"",
          bookQntyFree:"",
          bookQntyAll:"",
          bookCategory:"",
          bookIsbn:"",
          originalName:""
        };
        
        tbl_row.find('.row_data').each(function(index, val)  // this gets all values from that tabkle row.
        { 
          let col_val;
          
          let id=$(this).attr('id');
          if(id=="bookName")
          {
            obj.originalName=$(this).attr('original_entry');
          }
          col_val = $(this).html();
          obj[id]=col_val;
        });
        console.log(obj);
        $.ajax({
          type:"patch",
          url:"http://localhost:5000/books",
          contentType:"application/json",
          data:JSON.stringify(obj),
          success:function(result){alert("Updateovali ste knjigu:"+result.name);},
          error:function(){ alert("NEKI PROBLEMCIC:");
          }});
        
      });
      $(document).on('click', '.btn_saveBook', function(event) 
      {
          event.preventDefault();
          var tbl_row =$(this).closest('tr') 

          let arr = {  //creating array object so I can send values as Json object and parse it on server to create a Model of a book.
            name:"",
            author:"",
            quantityAll:null,
            quantityFree:null,
            category:"",
            isbn:""
          };
          let addBook=true; //variable for checking if I should send book to server..
          tbl_row.find('.row_data').each(function() 
          { let value;
            let id=$(this).attr('id');  //getting id of each row so use it switch statement...
            console.log(id);
            if(id=="category") //because its drop down select I have to find it first and then get selected category
            {
              value = $('#selectCategory').find(":selected").text(); //getting selected value
            }
            else
            value  =  $(this).html();

            if(value=="")   //checking if any of the values is empty..if it Is I won't send data to server but I will send alert to user 
            {
              addBook=false;
              return false;   //returning false to break from .each if any value is empty.. 
            }
            else value=value.replace(/&nbsp;/g,''); //triming values..if user inserted spaces im just replacing them..this is because im using .html()
            
              switch(id){
                case 'book':arr.name=value; break;
                case 'author':arr.author=value; break;
                case 'quantityAll':arr.quantityAll=value; break;
                case 'quantityFree':arr.quantityFree=value; break;
                case 'category':arr.category=value; break;
                case 'isbn':arr.isbn=value; break;
              }
          });
          
          console.log(arr);
          if(addBook) //sending book to server to add it to Database only if all values are entered
          {
            $.ajax({
              type:"post",
              url:"http://localhost:5000/books",
              contentType:"application/json",
              data:JSON.stringify(arr),
              success:function(data){
                console.log(data);
                // console.log(data.book.name);
                //append td into tr with jqeury...adding style="display:none" on save and cancel to hide those buttons initially
                $('#tableID1 tr:last').after(`<tr>
                <td ><div class="cont"><div class="row_data text-white"id="bookName" contenteditable="false">${data.book.name}</div></td>
                <td ><div class="cont"><div class="row_data text-white"id="authorName" contenteditable="false">${data.book.author}</div></td>
                <td ><div class="cont"><div class="row_data text-white"id="bookQntyAll" contenteditable="false">${data.book.quantityAll}</div></td>
                <td ><div class="cont"><div class="row_data text-white"id="bookQntyFree" contenteditable="false">${data.book.quantityFree}</div></td>
                <td ><div class="cont"><div class="row_data text-white"id="bookCategory" contenteditable="false">${data.book.category}</div></td>
                <td ><div class="cont"><div class="row_data text-white"id="bookIsbn" contenteditable="false">${data.book.isbn}</div></td>
                <td>
                <span class="btn_edit" ><button class="btn btn-primary btn-sm"><svg class="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg></button></span>
                <span class="btn_save"style="display:none"><button class="btn btn-success btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                </svg></button></span>
                <span class="btn_cancel"style="display:none"><button class="btn btn-danger btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg></button></span> 
                </td>
                </tr>`);

                //clearing values from input table row
                $("#book").text("");
                $("#author").text("");
                $("#quantityAll").text("");
                $("#isbn").text("");
              },
              error:function(e){alert("PROVJERITE SVA IMENA I EMAIL ADRESE IMATE GRESKU");}
            });
  
          }
          else {
            alert("Niste popunili sva polja prilikom kreiranja knjige");
          }


      });
      
    })
    