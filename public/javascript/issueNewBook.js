$(document).ready(function() {

    let date = new Date();
    let day = date.getDate()<10 ? "0"+ date.getDate() : date.getDate() ;
    let month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    let year = date.getFullYear();
    let search_val="";
    date=`${month}/${day}/${year}`;
    $("#issue_date").val(date);
    date=`${year}-${month}-${day}`;
   
    //setup before functions
    var typingTimer;               //timer identifier
    var doneTypingInterval = 100;  //time in ms (5 seconds)

    //on keyup, start the countdown
    $('#user_data_list').keyup(function(){
        
        clearTimeout(typingTimer);
        let val=$('#user_data_list').val();
        let options=$("#user_list_options").find('option').length;
        if (val.length>2) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
        else
            if(options>0)
            {   
                $('#user_list_options')
                    .find('option')
                    .remove()
            }
    });

    //user is "finished typing," do something
    function doneTyping () {
        let options=$("#user_list_options").find('option').length;
        if(options==0)
            {
                makeAjaxCall();
            }
    }
    
  $(document).on('change', 'input', function(){
        console.log("handler bad")
        let options = $("#user_list_options")[0].options;
        for (let i=0;i<options.length;i++)
        {
           if (options[i].value == $(this).val()) 
            {   
                let name=$(`[value="${$(this).val()}"]`).data('name');
                let email=$(`[value="${$(this).val()}"]`).data('email');
                let _class=$(`[value="${$(this).val()}"]`).data('schoolclass');
                let books=$(`[value="${$(this).val()}"]`).data('books');
                //setting these values just so I can make obj for api when submitting.
                bookQntyAll=$(`[value="${$(this).val()}"]`).data('bookqntyall');
                bookQntyFree=$(`[value="${$(this).val()}"]`).data('bookqntyfree');
                originalName=name;
                //settings values to inputs
                $("#displayName").val(name);
                $("#displayEmail").val(email);
                $("#displayClass").val(_class);
                $("#displayBooks").val(books);
                $(this).val(name);
                break;
            }
        }

        let bookoptions = $("#book_list_options")[0].options;;
        
        for (let i=0;i<bookoptions.length;i++)
        {
           if (bookoptions[i].value == $(this).val()) 
            {   
                let name=$(this).val();
                let author=$(`[value="${$(this).val()}"]`).data('author');
                let category=$(`[value="${$(this).val()}"]`).data('category');
                let isbn=$(`[value="${$(this).val()}"]`).data('isbn');
                
                //settings values to inputs
                $("#displayBookName").val(name);
                $("#displayAuthor").val(author);
                $("#displayCategory").val(category);
                $("#displayIsbn").val(isbn);
                break;
            }
        }
        if($("#displayName").val()!=""&&$("#displayBookName").val()!="") //only if user inputs and book inputs are avalible we can send data.
        {
            $("#submitButton").removeAttr("disabled");
        }
    });
   
   function makeAjaxCall(){
       
    search_val=$("#user_data_list").val().trim();
        let obj={
            name:search_val.toLowerCase()
        }
        let options=0;
        if(search_val.length<3)
                {
                $('#user_list_options')
                .find('option')
                .remove()
                } 
        else 
            if(search_val.length>2)
            {   
                $.ajax({
                type:"post",
                url:"http://localhost:5000/users/getusers",
                contentType:"application/json",
                data:JSON.stringify(obj),
                success:function(result){
                    for (let i = 0; i < result.result.length; i++)
                    {
                        const user = result.result[i];
                        let _books="";
                        if(user.books.length>1)//looping through each book to add it to _books and then display it to user
                            for (let i = 0; i < user.books.length; i++) {
                                const obj = user.books[i];
                                if(i==0) //just so that last book doesnt have additional , (comma) 
                                    _books+=obj.name;
                                else
                                    _books+=","+obj.name;
                            }
                        else
                        {
                            if(result.result[0].books.length>0)
                                _books=result.result[0].books[0].name;
                            else
                                _books="";
                        }
                        $("#user_list_options").append(`<option value="${i+1}. ${user.name}" data-name="${user.name}" data-schoolClass="${user.class}" data-books="${_books}" data-email=${user.email}>${user.email}</option>`); //adding option to datalist
                    }
                },
                error:function(data){ 
                    alert(data);
                }});
        }
    };

    $("#book_data_list").keyup(function(){
        search_val=$("#book_data_list").val();
        let obj={
            name:search_val
        }
        let options=0;
        if(search_val.length==3)
        {
            $.ajax({
                type:"post",
                url:"http://localhost:5000/books/one",
                contentType:"application/json",
                data:JSON.stringify(obj),
                success:function(data){
                    options=$("#book_list_options").find('option').length;
                    if(options!=data.result.length) //only making ajax call if returned users are > options (meaning i dont want to make ajax call for users that are already <options>)
                    for (let i = 0; i < data.result.length; i++){
                        const bookObj = data.result[i]; //getting object from array

                        $("#book_list_options").append(`<option value="${bookObj.name}" data-author="${bookObj.author}" data-category="${bookObj.category}" data-bookqntyall="${bookObj.quantityAll}" data-bookqntyFree="${bookObj.quantityFree}" data-isbn=${bookObj.isbn}></option>`); //adding option to datalist
                    }
                },
                error:function(data){ 
                    alert(data);
                }});
        }
        else 
            if(search_val.length<3)
                {
                $('#book_list_options')
                .find('option')
                .remove()
                }        
    });


    $("#myForm").on('submit',function(event){
        event.preventDefault();
            let name=$("#displayName").val()||"-";
            let email=$("#displayEmail").val()||"-";
            let  _class=$("#displayClass").val()||"-";
            let bookName=$("#displayBookName").val()||"-";
            let category=$("#displayCategory").val() || "-";
            let obj={
                name,
                email,
                class:_class,
                books:{
                    name:bookName,
                    category
                },
                date
            }
            console.log("izdan datum je:"+date)
            $.ajax({
                type:"patch",
                url:"http://localhost:5000/users",
                contentType:"application/json",
                data:JSON.stringify(obj),
                success:function(){
                  alert("Izdali ste novu knjigu");
                  $("#displayBookName").val("");
                  $("#displayAuthor").val("");
                  $("#displayCategory").val("");
                  $("#displayIsbn").val("");
                  $("#displayName").val("");
                  $("#displayEmail").val("");
                  $("#displayClass").val("");
                  $("#displayBooks").val("");
                  $("#user_data_list").val("");
                  $("#book_data_list").val("");
                  $("#submitButton").prop( "disabled", true );//making button submit disabled
                  $('#user_list_options')
                    .find('option')
                    .remove()
                  },
                error:function(data){ 
                    alert(data.responseJSON.msg);                      
                }});

    });
})