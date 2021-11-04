$(document).ready(function() {

    $(document).on('change', 'input', function(){
        console.log("handler bad")
        let options = $("#search_users_options")[0].options;
        console.log("op:"+options);
        for (let i=0;i<options.length;i++)
        {
           if (options[i].value == $(this).val()) 
            {   console.log("Idemo red");
                let name=$(`[value="${$(this).val()}"]`).data('name');
                let email=$(`[value="${$(this).val()}"]`).data('email');
                let _class=$(`[value="${$(this).val()}"]`).data('schoolclass');
                let book=$(`[value="${$(this).val()}"]`).data('books');
                $("#myTableBody tr:last").after(`<tr><td id="name">${name}</td><td id="_class">${_class}</td><td id="email">${email}</td><td id="book">${book}</td><td>
                <span class="btn_return" >
                <button class="btn btn-warning btn-sm" style="horizontal-align: middle; display: block; margin:auto;">
                Return Book
                </button>
                </span>
                </td></tr>`);
            }
        }
    })
    //setup before functions
    let typingTimer;               //timer identifier
    let doneTypingInterval = 100;  //time in ms (5 seconds)

    //on keyup, start the countdown
    $('#search_users_data_list').keyup(function(){

    clearTimeout(typingTimer);
    let val=$('#search_users_data_list').val();
    let options=$("#search_users_options").find('option').length;
    console.log("o:"+options);
    if (val.length>2) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
    else
        if(options>0)
        {   
            //deleting all from datalist and from html table
            $('#search_users_options')
                .find('option')
                .remove()
            $("#users_table").find("tr:gt(2)").remove(); 
        }
    });

    //user is "finished typing," do something
    function doneTyping () {
    let options=$("#search_users_options").find('option').length;
    if(options==0)
        {
            makeAjaxCall();
        }
    };
    
    function makeAjaxCall(){
       
        search_val=$("#search_users_data_list").val().trim();
            let obj={
                name:search_val.toLowerCase()
            }
            let options=0;
            console.log(search_val);
            if(search_val.length<3)
                    {
                    console.log("brisem ovdje2");
                    $('#search_users_options')
                    .find('option')
                    .remove()
                    } 
            else 
                if(search_val.length>2)
                {   console.log("pravim ajax call");
                    $.ajax({
                    type:"post",
                    url:"http://localhost:5000/books/return",
                    contentType:"application/json",
                    data:JSON.stringify(obj),
                    success:function(result){
                        console.log("Dosao result");
                        for (let i = 0; i < result.result.length; i++)
                        {
                            const user = result.result[i];
                            console.log(user);
                            $("#search_users_options").append(`<option value="${i+1}. ${user.name}" data-name="${user.name}" data-schoolClass="${user.class}" data-books="${user.book}" data-email=${user.email}>${user.email}</option>`); 
                        }
                    },
                    error:function(data){ 
                        alert(data);
                    }});
            }
    };
       

        $(document).on('click','.btn_return',function(event){
            let tbl_row = $(this).closest('tr');
            
            let obj=
            {
                name:tbl_row.find("#name").text().trim(),
                email:tbl_row.find("#email").text().trim(),
                class:tbl_row.find("#_class").text().trim(),
                book:tbl_row.find("#book").text().trim()
            }
            console.log("saljem ajax");
            $.ajax({
                type:"delete",
                url:"http://localhost:5000/books/return",
                contentType:"application/json",
                data:JSON.stringify(obj),
                success:function(result){
                    
                    alert("Izbrisao si usera");
                      //clearing table and,input
                      $("#search_users_data_list").val("");
                      $('#search_users_options')
                      .find('option')
                      .remove()
                      
                      $("#users_table").find("tr:gt(2)").remove();
                        
                },
                error:function(data){ 
                    alert(data);
                }
            })
    
        })
})