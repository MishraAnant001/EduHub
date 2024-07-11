let input = document.getElementById("userinput");
let submit = document.getElementById("submit");
let img = document.getElementById("qrimg")
submit.addEventListener("click", ()=>{
    // console.log("button clicked");
    // console.log(input.value);
    // console.log("hi");
    if(input.value ==""){
        alert(" Please enter a valid URL or text.");
    }
    else{
        img.classList.remove("d-none");
        // console.log(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`);
        // console.log(img);
        img.setAttribute("src",`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`);
        input.value="";
        
    }
        

    
    // ("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.google.com")
    // img.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.google.com";
    // ("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.google.com")
    // console.log(x);
    


})