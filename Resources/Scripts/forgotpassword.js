let btn = document.getElementById("pwdbtn");
let allData = [];
let cont = document.getElementsByClassName("userpwd")[0];
let email = document.getElementById("email");
let pwd = document.getElementById("password");
// console.log(localdata);
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

btn.onclick = () => {
  if(email.value==""){
    Swal.fire({
      icon: "info",
      title: "Oh no..",
      text: "Please fill email first!"
    });
    return;
  }
  if(email.value=="admin"){
    Swal.fire({
      icon: "info",
      title: "Sorry",
      text: "You do not have any rights!"
    });
    return;
  }
  let x = data.find((element) => {
    return element.username == email.value;
  });
  // console.log(x);
  if (x != undefined) {
        cont.classList.remove("d-none");
        password.value = x.password;
  } else {
    Swal.fire({
      icon: "info",
      title: "Oh no..",
      text: "No such user exists! Please create a new account.!"
    });
  }
};
