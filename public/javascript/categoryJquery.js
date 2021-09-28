$(document).ready(function() {

    $('#my_form').submit( function() {
        let category={
            name:$('#category_nameInput').val()
        }
        console.log("SALJEM");
        $.ajax({
            url: 'http://localhost:5000/category/',
            type: 'post',
            data:category,
            success: function(data) {
                $('#category_nameInput').text("");
                alert("dodano");
            },
            dataType: 'json'
        });
    });
})

