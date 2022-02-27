    $(document).ready(function() {
      
        $(document).find('.btn_save').hide();
        $(document).find('.btn_cancel').hide();
        $(document).find('.btn_saveBook').show();
        $(document).find('.btn_delete').show();
    
        $("#quantityAll").keyup(function(){
          
          let text=$("#quantityAll").text();
          $("#quantityFree").text(text);
        });
          $(document).on('click', '.btn_edit', function(event) 
        {
            event.preventDefault();
            let tbl_row = $(this).closest('tr');
  
            tbl_row.find('.btn_save').show();
            tbl_row.find('.btn_cancel').show();
            
            
            //hide edit button
            tbl_row.find('.btn_edit').hide(); 
            tbl_row.find('.btn_delete').hide(); 
            $(tbl_row).css("background-color","#D3D3D3");
            //getting original value when clicking btn edit
            tbl_row.find('.row_data').each(function() 
            {  
              //this will help in case user decided to click on cancel button
              $(this).attr('original_entry', $(this).html());
            }); 		

            //make the whole row editable
            tbl_row.find('.row_data').each(function() {
              let original_entry=$(this).attr('original_entry').trim();

              if($(this).attr("editable") == "true"){
                  $(this)
                  .attr('contenteditable', 'true')
                  .attr('edit_type', 'button')
                  .addClass('bg-light')
                  .css('padding','3px')
              }
              else
                {
                  let options="";
                  $("#selectCategory option").each(function(index,val){
                    if(val.value==original_entry)
                        options+=`<option selected>${val.value}</option>`
                    else
                        options+=`<option>${val.value}</option>`
                  });

                  $(this).html(`<select id="editSelect">
                  ${options}
                </select>`);

                  $(`#editSelect option[value='${original_entry}']`).attr("selected","selected");
                }
             
          });

            if(tbl_row.find('.row_data').hasClass('text-white'))
            {
              tbl_row.find('.row_data').removeClass('text-white')
            }
      
        });
      
      $(document).on('click', '.btn_cancel', function(event) 
      {
        event.preventDefault();
    
        var tbl_row = $(this).closest('tr');
    
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
        //show edit button
        tbl_row.find('.btn_edit').show();
        tbl_row.find('.btn_delete').show();
        tbl_row.css("background-color","#FFFFFF");
   
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
        $(tbl_row).css("background-color","#FFFFFF");
        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();
    
        //show edit button
        tbl_row.find('.btn_edit').show();
        tbl_row.find('.btn_delete').show();
  
        tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-light text-dark') //changing letter and background from white to dark
        .css('padding','')
        .attr('contenteditable', 'false') 
  
        let obj = {  //creating objay object so I can send values as Json object and parse it on server to create a Model of a book.
          bookName:"",
          authorName:"",
          bookQntyFree:"",
          bookQntyAll:"",
          bookCategory:"",
          bookIsbn:"",
          originalName:""
        };
        
        tbl_row.find('.row_data').each(function(index, val)  // this gets all values from that table row.
        { 
          let col_val;
          let id=$(this).attr('id');
          if(id=="bookName") //setting original name and searching in database on server with original name...this is incase user changed the real name of the book.
          {
            obj.originalName=$(this).attr('original_entry');
          }
            
          var selectedCategory = $('#editSelect').find(":selected").text()
          if(id=="bookCategory")
            col_val = selectedCategory;
          else
            col_val = $(this).html();
          
          obj[id]=col_val;
        });

        
        //setting it back from select to regular text
         tbl_row.find('.row_data').each(function(index, val){
          
          if(val.id=="bookCategory")
          {
            $(this).html(obj.bookCategory);
          }
        })
        
        $.ajax({
          type:"patch",
          url:"http://localhost:5000/books",
          contentType:"application/json",
          data:JSON.stringify(obj),
          success:function(result){
            alert("Updateovali ste knjigu:"+result.name);
                tbl_row.css("background-color","#FFFFFF");
            },
          error:function(data){ 
            alert(`Niste uspjeli update knjigu: ${data.responseJSON.name}`);
            //settings the table_row to red
                tbl_row.css("background-color","#FF0000");
          }});
      });
      $(document).on('click', '.btn_saveBook', function(event) 
      {
          event.preventDefault();
          let tbl_row =$(this).closest('tr') 
          let row_id = tbl_row.attr('row_id'); //can be used for ajax call
          let obj = {  //creating object so I can send values as Json object and parse it on server to create a Model of a book.
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
                case 'book':obj.name=value; break;
                case 'author':obj.author=value; break;
                case 'quantityAll':obj.quantityAll=value; break;
                case 'quantityFree':obj.quantityFree=value; break;
                case 'category':obj.category=value; break;
                case 'isbn':obj.isbn=value; break;
              }
          });
          
          if(addBook) //sending book to server to add it to Database only if all values are entered
          {
            $.ajax({
              type:"post",
              url:"http://localhost:5000/books",
              contentType:"application/json",
              data:JSON.stringify(obj),
              success:function(data){
                //append td into tr with jqeury...adding style="display:none" on save and cancel to hide those buttons initially
                let row_id=$('#tableID1 tr:last').attr('row_id'); //getting last row_id value
                row_id=Number(row_id);
                row_id++; //after getting last row_id value just ++ to get new one.
               
                $('#tableID1 tr:last').after(`<tr row_id=${row_id}> 
                <td ><div class="cont"><div class="row_data"id="bookName" contenteditable="false">${data.book.name}</div></td>
                <td ><div class="cont"><div class="row_data"id="authorName" contenteditable="false">${data.book.author}</div></td>
                <td ><div class="cont"><div class="row_data"id="bookQntyAll" contenteditable="false">${data.book.quantityAll}</div></td>
                <td ><div class="cont"><div class="row_data"id="bookQntyFree" contenteditable="false">${data.book.quantityFree}</div></td>
                <td ><div class="cont"><div class="row_data"id="bookCategory" contenteditable="false">${data.book.category}</div></td>
                <td ><div class="cont"><div class="row_data"id="bookIsbn" contenteditable="false">${data.book.isbn}</div></td>
                <td>
                <span class="btn_edit">
                    <button class="btn btn-primary btn-sm" row_id=${row_id}><svg class="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></button>
                </span>
                <span class="btn_delete">
                    <button class="btn btn-danger btn-sm"row_id=${row_id}>
                    <i class='bx bxs-trash bx-sx'></i>
                    </button>
                </span>
                <span class="btn_save"style="display:none">
                    <button class="btn btn-success btn-sm" row_id=${row_id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                    </svg></button>
                </span>
                <span class="btn_cancel"style="display:none">
                    <button class="btn btn-danger btn-sm" row_id=${row_id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg></button>
                </span> 
                </td>
                </tr>`);

                //clearing values from input table row
                $("#book").text("");
                $("#author").text("");
                $("#quantityAll").text("");
                $("#isbn").text("");
                alert("Book is added..");
              },
              error:function(e){alert("Molim vas popunite sva polja kako treba!");}
            });
  
          }
          else {
            alert("Niste popunili sva polja prilikom kreiranja knjige");
          }
      });

      $(document).on('click','.btn_delete',function(event){
        event.preventDefault();
        
        let tbl_row = $(this).closest('tr');
        let obj = {  //creating objay object so I can send values as Json object and parse it on server to create a Model of a book.
          name:"",
        };
        
        obj.name=tbl_row.find('#bookName').text();
        if(obj.name=="")
        {
           alert("PRAZNO JE NE MOZE");
           return;
        }
        console.log(obj);
        
        $.ajax({
          type:"delete",
          url:"http://localhost:5000/books",
          contentType:"application/json",
          data:JSON.stringify(obj),
          success:function(){
            alert("Izbrisao si knjigu");
            location.reload();
      }, 
          error:function(data){ 
            alert(data);
            }});
        
      });
    })
    