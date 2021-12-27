const validateDate=(issuedDate,returnedDate)=>{
    if(returnedDate=="")
        return false;
    issuedDate=issuedDate.split("/");

    let date1=new Date(issuedDate[2]+"-"+issuedDate[0]+"-"+issuedDate[1]);
    let date2=new Date(returnedDate);

    return date1<=date2;

}
$(document).ready(function() {
$(document).on('click','.btn_return',function(event){
    let tbl_row = $(this).closest('tr');
    let row_id = tbl_row.attr('row_id');
    
    let obj={
        name:tbl_row.find("#user").text().trim(),
        email: tbl_row.find("#user").data("email"),
        class:tbl_row.find("#userClass").text().trim(),
        book:tbl_row.find("#userBook").text().trim(),
        issuedDate:tbl_row.find("#userIssuedDate").text().trim(),
        returnedDate:tbl_row.find("#userInputDate").val()
    }
    if(validateDate(obj.issuedDate,obj.returnedDate))
        $.ajax({
            type:"delete",
            url:"http://localhost:5000/books/return",
            contentType:"application/json",
            data:JSON.stringify(obj),
            success:function(result){
                    alert("Izbrisao si usera");
                    //clearing table and,input
                    $(`[row_id=${row_id}]`).remove();
            },
            error:function(data){ 
                alert(data);
            }
        })
    else
        alert("Invalid return date")
    })

})