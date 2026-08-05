document.getElementById("registerForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let phone=document.getElementById("phone").value.trim();
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmPassword").value;
    let dob=document.getElementById("dob").value;
    let terms=document.getElementById("terms").checked;

    let gender=document.querySelector('input[name="gender"]:checked');

    let message=document.getElementById("message");

    if(name=="" || email=="" || phone=="" || password=="" || confirmPassword=="" || dob=="")
    {
        message.style.color="red";
        message.innerHTML="Please fill all fields.";
        return;
    }

    if(!gender)
    {
        message.style.color="red";
        message.innerHTML="Please select gender.";
        return;
    }

    if(phone.length!=10 || isNaN(phone))
    {
        message.style.color="red";
        message.innerHTML="Enter a valid 10-digit phone number.";
        return;
    }

    if(password.length<6)
    {
        message.style.color="red";
        message.innerHTML="Password must contain at least 6 characters.";
        return;
    }

    if(password!==confirmPassword)
    {
        message.style.color="red";
        message.innerHTML="Passwords do not match.";
        return;
    }

    if(!terms)
    {
        message.style.color="red";
        message.innerHTML="Accept Terms & Conditions.";
        return;
    }

    message.style.color="green";
    message.innerHTML="Registration Successful!";

    document.getElementById("registerForm").reset();

});
