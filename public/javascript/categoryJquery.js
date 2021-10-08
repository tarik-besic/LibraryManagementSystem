$(document).ready(function() {

    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();

    $('#my_form').submit( function(event) {
      let category={
            name:$('#category_nameInput').val()
        }
        category.name=category.name.trim();
        if(category.name=="")
          {
            alert("Cannot add empty category");
            return;
          }
        
        $.ajax({
            url: 'http://localhost:5000/category',
            type: 'post',
            data:category,
            success: function(data) {
                $('#category_nameInput').text("");
                alert("dodano");
                location.reload();
            },
            error:function(data){ 
              alert("Problem while updating book")
            },
            dataType: 'json'
        });
    });

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

    //since I have only one row_data i can just get text with find insted doing forEach like in other examples
    let updated_name=tbl_row.find('.row_data').text();
    let original_entry=tbl_row.find('.row_data').attr('original_entry');
    //if name is atlest 3 characters
    if(updated_name.length<2)
    {
      alert("Ne mozes poslati praznu kategoriju...")
      tbl_row.find('.row_data').text(original_entry);
      return;
    }
      updated_name=updated_name.trim();
    let object={
      name:original_entry,
      update:updated_name
    };
    //ajax call
    
    $.ajax({
      type:"patch",
      url:"http://localhost:5000/category",
      contentType:"application/json",
      data:JSON.stringify(object),
      success:function(result){
        alert("Update si kategoriju");
        
    tbl_row.css("background-color","#FFFFFF"); //setting color to white  
  }, 
      error:function(data){ 
        alert("Problem while updating book")
        }});
});

  $('.btn_delete').click(function(event){
    event.preventDefault();
    let tbl_row = $(this).closest('tr');
    let name=tbl_row.find('.row_data').text();
    name=name.trim();
    let obj={
      name:name
    };
    $.ajax({
      type:"delete",
      url:"http://localhost:5000/category",
      contentType:"application/json",
      data:JSON.stringify(obj),
      success:function(result){
        alert("Izbrisao si kategoriju");
        location.reload();
        
    tbl_row.css("background-color","#FFFFFF"); //setting color to white  
  }, 
      error:function(data){ 
        alert("Problem while updating book")
        }});
    
  });
});