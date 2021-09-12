

    $(document).ready(function() {
      
        $(document).find('.btn_save').hide();
        $(document).find('.btn_cancel').hide();
        $(document).find('.btn_saveBook').show();
    

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
            .css(['padding','3px','background-color','yellow'])
            
      
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
        .removeClass('bg-light text-dark')
        .css('padding','')
        .attr('contenteditable', 'false') 
    
        var arr = {}; 
        tbl_row.find('.row_data').each(function(index, val) 
        {   
          var col_name = $(this).attr('col_name');  
          var col_val  =  $(this).html();
          arr[col_name] = col_val;
        });
    console.log(arr);
        // var arr = {}; 
        // tbl_row.find('.row_data').each(function(index, val) 
        // {   
        //   var col_name = $(this).attr('col_name');  
        //   var col_val  =  $(this).html();
        //   arr[col_name] = col_val;
        // });
    
    
        //use the "arr"	object for your ajax call
        // $.extend(arr, {row_id:row_id});
    
        // $.ajax({
        //   type:"post",
        //   url:"http://localhost:8080/upload",
        //   contentType:"application/json",
        //   data:JSON.stringify(arr),
        //   success:function(data,status){alert(status)}
        // });
    
        //this could be a cool feature
    //		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
         
    
      });
      $(document).on('click', '.btn_saveBook', function(event) 
      {
          event.preventDefault();
          var tbl_row = $('#-1') //unique table row

          var row_id = tbl_row.attr('row_id');

    //       var arr = {}; 
    //       tbl_row.find('.row_data').each(function(index, val) 
    //       {   
    //         var col_name = $(this).attr('col_name');  
    //         var col_val  =  $(this).html();
    //         arr[col_name] = col_val;
    //       });
    //   console.log(arr);
      
          //use the "arr"	object for your ajax call
          // $.extend(arr, {row_id:row_id});
          

    
      });
      
    })
    