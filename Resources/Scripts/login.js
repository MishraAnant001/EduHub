let email = document.getElementById("email");
let pwd = document.getElementById("password");
let btn = document.getElementById("loginbtn");
let validemail = false;
let validpwd = false;
let showpwd = document.getElementById("showpwd")

showpwd.onclick=()=>{
  if(pwd.type=="password"){
    pwd.type="text"
  }else{
    pwd.type="password"
  }
}

let url = "https://65e95cf84bb72f0a9c513fd7.mockapi.io/users/1";

let data = [];
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
let user = null;
email.onblur = () => {
  Array.from(document.getElementsByClassName("validemail")).forEach((e) => {
    e.remove();
  })
  let regex = /^[\w\.]+@([\w]+\.)+[\w]{2,3}$/
    let useremail = email.value;
    if(!regex.test(useremail)){
        let div = document.createElement('div'); 
        div.setAttribute("class","validemail text-danger fw-bolder") 
        div.innerHTML="Please enter valid email!";  
        email.after(div); 
        validemail = false;
        return;
    }
  let x = data.find((element) => {
    return element.username == useremail;
  });
  // console.log(x);
  if (x == undefined) {
    let div = document.createElement('div');
    div.setAttribute("class", "validemail text-danger fw-bolder")
    div.innerHTML = "No such user exists!";
    email.after(div);

    validemail = false;
  } else {
    user = x;
    validemail = true;
    Array.from(document.getElementsByClassName("validemail")).forEach((e) => {
      e.remove();
    });
  }
}
pwd.onblur = () => {
  Array.from(document.getElementsByClassName("validpwd")).forEach((e) => {
    e.remove();
  });
  let userpwd = pwd.value;
  let usercorrectpwd = user.password;
  if (userpwd != usercorrectpwd) {
    let div = document.createElement('div');
    div.setAttribute("class", "validpwd text-danger fw-bolder")
    div.innerHTML = 'invalid password!';
    pwd.after(div);
    document.getElementById("password").style.border = "2px solid red";
    validpwd = false;
  } else {
    validpwd=true;
    Array.from(document.getElementsByClassName("validpwd")).forEach((e)=>{
        e.remove();
    })
    document.getElementById("password").style.border = "2px solid #08e977a6";

  }
}


btn.onclick = () => {
  if (email.value == "" || pwd.value == "") {
    Swal.fire({
      icon: "info",
      title: "Oh no...",
      text: "please fill all fields!"
    });
    return;
  }
  if (validemail && validpwd) {
    // console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "form.html";
  } else {
    Swal.fire({
      icon: "info",
      title: "Oh no..",
      text: "Invalid username or password!"
    });
  }
  // console.log(email.value,pwd.value);
}
