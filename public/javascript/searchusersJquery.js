$(document).ready(function() {
    
    $(document).on('click', '.btn_edit', function(event) 
    {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        var row_id = tbl_row.attr('row_id');

        //show save and cancel buttons
        tbl_row.find('.btn_save').show();
        tbl_row.find('.btn_cancel').show();
        
        //hide edit and delete buttons button
        tbl_row.find('.btn_edit').hide(); 
        tbl_row.find('.btn_delete').hide();

        //make the whole row editable
        tbl_row.find('.row_data')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        .addClass('bg-light')
        .css('padding','3px')
  
      tbl_row.find('.row_data').each(function(index, val) 
      {  
        //this will help in case user decided to click on cancel button
        $(this).attr('original_entry', $(this).text());
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

    //show edit,delete buttons
    tbl_row.find('.btn_edit').show();
    tbl_row.find('.btn_delete').show();

    tbl_row.find('.row_data')
    .attr('edit_type', 'click')  //
    .removeClass('bg-light')
    .css('padding','') 
    .attr('contenteditable', 'false') 
    tbl_row.find('.row_data').each(function(index, val) 
    {   
      $(this).text( $(this).attr('original_entry') ); 
    });  
  });
  
  $(document).on('click', '.btn_save', function(event) 
  {
    event.preventDefault();
    let tbl_row = $(this).closest('tr');

    //hide save and cacel buttons
    tbl_row.find('.btn_save').hide();
    tbl_row.find('.btn_cancel').hide();

    //show edit,delete buttons
    tbl_row.find('.btn_edit').show();
    tbl_row.find('.btn_delete').show();

    tbl_row.find('.row_data')
    .attr('edit_type', 'click')
    .removeClass('bg-light')
    .css('padding','')
    .attr('contenteditable', 'false') 
  });
    // //since I have only one row_data i can just get text with find insted doing forEach like in other examples
    // let updated_name=tbl_row.find('.row_data').text();
    // let original_entry=tbl_row.find('.row_data').attr('original_entry');
    // //if name is atlest 3 characters
    // if(updated_name.length<2)
    // {
    //   alert("Ne mozes poslati praznu kategoriju...")
    //   tbl_row.find('.row_data').text(original_entry);
    //   return;
    // }
    //   updated_name=updated_name.trim();
    // let object={
    //   name:original_entry,
    //   update:updated_name
    // };

$("#search_users_btn").on('click',(function(event){
    event.preventDefault();
    $('#users_table').find('tbody').detach();
    $('#users_table').append($('<tbody><tr></tr></tbody>'));
    console.log("obrisao");
    let obj={
        name:"",
        class:"",
        books:{
        book:"",
        category:""
        },
    };
    $("input").each(function(index, elem){
        switch (index) {
            case 0:
                obj.name=$(elem).val()
            break;
            case 1:
                obj.class=$(elem).val()
            break;
            case 2:
                obj.books.book=$(elem).val()
            break;
            case 3:
                obj.books.category=$(elem).val()
            break;
        }
    })

    $.ajax({
        type:"post",
        url:"http://localhost:5000/users/getusers",
        contentType:"application/json",
        data:JSON.stringify(obj),
        success:function(data){
                let bookOutput="";
                if(data.result.length==0)
                    {
                        alert("Nothing found");
                        return;
                    }
                data.result.forEach((user,counter) => {
                     bookOutput=`<select id="selectCategory">`
                
                    if(user.books.length>1)
                        {
                            user.books.forEach(book=>{
                            bookOutput+=`<option >${book.name}</option>`;
                        })
                        bookOutput+="</select>";
                        }
                    else
                        bookOutput=`<div class="row_data"id="">${user.books[0].name}</div></div>`

                    $("#users_table tr:last").after(`<tr row_id=${counter}>
                    <td><div class="row_data"id="">${user.name}</div></div></td>
                    <td><div class="row_data"id="">${user.class}</div></div></td>
                    <td><div class="row_data"id="">${user.email}</div></div></td>
                    <td>${bookOutput}
                    <td>
                        <span class="btn_edit">
                        <button class="btn btn-primary btn-sm" row_id=${counter}> 
                            <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        </span>
                        <span class="btn_delete">
                        <button class="btn btn-danger btn-sm">
                            <i class='bx bxs-trash bx-sx'></i>
                        </button>
                        </span>
                        <span class="btn_cancel" style="display:none">
                        <button class="btn btn-danger btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                        </span> 
                        <span class="btn_save" style="display:none">
                            <button class="btn btn-success btn-sm" row_id=${counter}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                            </svg>
                        </button>
                        </span>     
                    </td>
                    </tr>`)
                });   
        }
      });
}));
})


