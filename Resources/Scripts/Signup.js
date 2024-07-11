let email = document.getElementById("email");
let pwd = document.getElementById("password");
let btn = document.getElementById("signupbtn")
let validemail = false;
let validpwd=false;
let url = "https://65e95cf84bb72f0a9c513fd7.mockapi.io/users/1";

let data =[];
const getData =async()=>{
    try {
        const response = await fetch(url);

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                  });
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            data = await response.json();
            // console.log(data);
            data= data.credentials;
            // console.log(data);

    } catch (error) {
        console.log(error);
    }
}
getData();

async function postData() {
    const newdata = {
        credentials:data
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newdata)
    }
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }
        Swal.fire({
            icon: "success",
            title: "User registered successfully",

          }).then(() => {
            sessionStorage.setItem("user",JSON.stringify(data[data.length-1]))
            window.location.href="form.html";
          });
    }
    catch (error) {
        console.log("Error: ", error);
    }

}


email.onblur = ()=>{
    Array.from(document.getElementsByClassName("validemail")).forEach((e)=>{
        e.remove();
    })
    let regex = /^[\w\.]+@([\w]+\.)+[\w]{2,3}$/
    let useremail = email.value;
    if(!regex.test(useremail)){
        let div = document.createElement('div'); 
        div.setAttribute("class","validemail text-danger fw-bolder") 
        div.innerHTML="Please enter valid email!";  
        email.after(div); 
        document.getElementById("email").style.border = "2px solid red";

        validemail = false;
    }
    else{
        validemail = true;
        Array.from(document.getElementsByClassName("validemail")).forEach((e)=>{
            e.remove();
        })
        document.getElementById("email").style.border = "2px solid #08e977a6";
    }
}
pwd.onblur = ()=>{
    Array.from(document.getElementsByClassName("validpwd")).forEach((e)=>{
        e.remove();
    })
    let len =  pwd.value.length;
    if (len <8 || len >16){
        let div = document.createElement('div');    
        div.setAttribute("class","validpwd text-danger fw-bolder") 
        div.innerHTML='Password should be between 8 and 16 characters';            
        pwd.after(div);
        document.getElementById("password").style.border = "2px solid red";

        validpwd =false;
    }else{
        validpwd=true;
        Array.from(document.getElementsByClassName("validpwd")).forEach((e)=>{
            e.remove();
        })
        document.getElementById("password").style.border = "2px solid #08e977a6";

    }
}
btn.onclick =()=>{
    // console.log("hi");
    if(email.value=="" || pwd.value==""){
        // alert("please fill all fields!");
        Swal.fire({
            icon: "info",
            title: "Oh no...",
            text: "please fill all fields!"
          });
        return;
    }
    // console.log("hi");
    if(validemail && validpwd){
        // console.log("inside condition");
        let bool = true;
        Array.from(data).forEach((e)=>{
            if(email.value == e.username) {
                // alert("User already exists!")
                Swal.fire({
                    icon: "info",
                    title: "Sorry",
                    text: "User already exists!"
                  });
                  bool=false;
                // return;
            }
        })
        if(bool==false){
            return;
        }
        data.push({
            username:email.value,
            password:pwd.value
        })
        postData();
        email.value="";
        pwd.value=""
    }
    else{
        // alert("Please check your inputs again!");
        Swal.fire({
            icon: "info",
            title: "Oh no...",
            text: "Please check your inputs again!"
          });
    }
}