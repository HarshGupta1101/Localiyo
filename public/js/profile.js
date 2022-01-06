let edit_profile = document.getElementById('edit-profile');
let save_profile = document.getElementById('save-profile');

edit_profile.onclick = function (){
    $("#Fname1").css("display","none");
    $("#Lname1").css("display","none");
    $("#address1").css("display","none");
    $("#pincode1").css("display","none");
    $("#dob1").css("display","none");
    $("#phone1").css("display","none");
    $("#Email1").css("display","none");
}

save_profile.onclick = function (){
    $("#Fname1").css("display","block");
    $("#Lname1").css("display","block");
    $("#address1").css("display","block");
    $("#pincode1").css("display","block");
    $("#dob").css("display","block");
    $("#phone").css("display","block");
    $("#username").css("display","block");
    $("#Email").css("display","block");
}