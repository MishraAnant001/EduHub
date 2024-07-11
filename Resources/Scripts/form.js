let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let dob = document.getElementById("dob")
let address = document.getElementById("add")
let itemtbody = document.getElementById("education-list");
let addrowbtn = document.getElementById("addrowbtn");
let submitbtn = document.getElementById("submitbtn");
let allData = [];
let user = JSON.parse(sessionStorage.getItem("user"));
let curruser = null;
let currindex = -1;
let enablebox = document.getElementById("enablebox");


console.log(user);


enablebox.onclick = () => {
    enableinputs();
    submitbtn.disabled = false;
    addrowbtn.disabled = false;
    address.disabled = false;
}

let url = "https://65e95cf84bb72f0a9c513fd7.mockapi.io/StudentData/1";

const disableinputs = () => {
    // console.log("inside disable");
    Array.from(document.getElementsByTagName("input")).forEach((item) => {
        // console.log(item);
        if ((item.getAttribute("id")) != "email" || (item.type) != "checkbox") {
            item.disabled = true;
        }
    })
}
const enableinputs = () => {
    Array.from(document.getElementsByTagName("input")).forEach((item) => {
        if (item.id !== "email") {
            item.disabled = false;
        }
    })
}

const getData = async () => {
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
        let data = await response.json();
        allData = data.alldata;
        // console.log(allData);
        authenticate();

    } catch (error) {
        console.log(error);
    }
}
getData();

const authenticate = () => {
    console.log(allData);
    if (user == null) {
        Swal.fire({
            icon: "error",
            title: "Sorry",
            text: "You need to login first!"
        }).then(() => {
            window.location.href = "login.html"
        });
    } else {
        allData.forEach((ele, index) => {
            console.log(ele)
            if (ele.semail == user.username) {
                curruser = ele;
                currindex = index;
            }
        })
        console.log(curruser)
        loaduserdetails();
        // console.log(data);
    }
}

const loaduserdetails = () => {
    if (curruser != null) {
        submitbtn.disabled = true;
        addrowbtn.disabled = true;
        address.disabled = true;
        enablebox.classList.remove("d-none")
        fname.value = curruser.sfname;
        lname.value = curruser.slname;
        dob.value = curruser.sdob;
        email.value = curruser.semail;
        add.value = curruser.saddress;

        Array.from(document.getElementsByClassName("rowdata")).forEach((e) => {
            e.remove();
        })
        let education = curruser.education;
        education.forEach((ele, index) => {
            if (index == 0) {
                itemtbody.innerHTML += `
                <tr class="rowdata">
                <td>
                    <input type="text" class="form-control" value="${ele.degree}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="text" class="form-control" value="${ele.school}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="month" class="form-control" value="${ele.startdate}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="month" class="form-control" value="${ele.enddate}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="number" class="form-control" value="${ele.percentage}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="number" class="form-control" value="${ele.backlogs}">
                    <div class="text-danger"></div>
                </td>
                <td><button class="btn btn-danger delrow" disabled>-</button></td>
                </tr>`
            }
            else {
                itemtbody.innerHTML += `
                <tr class="rowdata">
                <td>
                    <input type="text" class="form-control" value="${ele.degree}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="text" class="form-control" value="${ele.school}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="month" class="form-control" value="${ele.startdate}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="month" class="form-control" value="${ele.enddate}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="number" class="form-control" value="${ele.percentage}">
                    <div class="text-danger"></div>
                </td>
                <td>
                    <input type="number" class="form-control" value="${ele.backlogs}">
                    <div class="text-danger"></div>
                </td>
                <td><button class="btn btn-danger delrow">-</button></td>
                </tr>`
            }
        })
        disableinputs();
    }else{
        email.value = user.username;
    }
}


const setError = (item, message) => {
    let element = item.nextElementSibling;
    element.innerHTML = `*${message}!`
    item.setAttribute("style", "border: 1px solid red !important");
}

const setSuccess = (item) => {
    let element = item.nextElementSibling;
    element.innerHTML = ``
    item.removeAttribute("style");
}

const validatedegree = (item) => {
    if (item.value == "") {
        setError(item, "Required")
        return false;
    } else {
        setSuccess(item)
        return true
    }

}
const validateschool = (item) => {
    if (item.value == "") {
        setError(item, "Required")
        return false;
    } else {
        setSuccess(item)
        return true
    }

}
const validatedate = (item1, item2) => {
    if (item1.value == "" || item2.value == "") {
        if (item1.value == "") {
            setError(item1, "Required")
        }
        if (item2.value == "") {
            setError(item2, "Required")
        }
        return false;
    } else {
        let start = new Date(item1.value).getFullYear()
        let end = new Date(item2.value).getFullYear()
        if ((end - start) < 1) {
            setError(item1, "Please fill valid dates")
            setError(item2, "There should be min. 1 year difference")
            return false;
        } else {
            setSuccess(item1)
            setSuccess(item2)
            return true
        }
    }
}
const valiadatepercent = (item) => {
    if (item.value == "") {
        setError(item, "Required")
        return false;
    } else {
        if (item.value <= 33 || item.value > 100) {
            setError(item, "Please fill valid percentage")
            return false;
        } else {
            setSuccess(item)
            return true
        }
    }
}
const validateback = (item) => {
    if (item.value == "") {
        setError(item, "Required")
        return false;
    } else {
        if (item.value < 0 || item.value > 10) {
            setError(item, "Please fill valid Backlogs")
            return false;
        } else {
            setSuccess(item)
            return true
        }
    }
}

const validateEducation = () => {
    boolarray = [];
    Array.from(document.getElementsByClassName("rowdata")).forEach((item) => {
        let validdegree = validatedegree(item.children[0].children[0]);
        let validschool = validateschool(item.children[1].children[0]);
        let validdate = validatedate(item.children[2].children[0], item.children[3].children[0]);
        let validpercent = valiadatepercent(item.children[4].children[0])
        let validback = validateback(item.children[5].children[0])
        if (validdegree == false || validschool == false || validdate == false || validpercent == false || validback == false) {
            boolarray.push(false);
        }

    })
    if (boolarray.includes(false)) {
        return false
    }
    else {
        return true;
    }

}

const validatefname = () => {
    if (fname.value == "") {
        setError(fname, "Required")
        return false;
    } else {
        let regex = /^[A-Za-z]+[]?$/
        if (!regex.test(fname.value)) {
            setError(fname, "Alphabets allowed only")
            return false;
        } else {
            setSuccess(fname);
            return true;
        }
    }
}
const validatelname = () => {
    if (lname.value == "") {
        setError(lname, "Required")
        return false;
    } else {
        let regex = /^[A-Za-z]+[]?$/
        if (!regex.test(lname.value)) {
            setError(lname, "Alphabets allowed only")
            return false;
        } else {
            setSuccess(lname);
            return true;
        }
    }
}
const validatedob = () => {
    if (dob.value == "") {
        setError(dob, "Required")
        return false;
    } else {
        let useryear = new Date(dob.value).getFullYear()
        let curryear = new Date().getFullYear();
        if ((curryear - useryear) < 18) {
            setError(dob, "Your age must be geater than 18")
            return false;
        } else {
            setSuccess(dob);
            return true;
        }
    }
}
const validateemail = () => {
    if (email.value == "") {
        setError(email, "Required")
        return false;
    } else {
        let regex = /^[\w\.]+@([\w]+\.)+[\w]{2,3}$/
        if (!regex.test(email.value)) {
            setError(email, "Please fill valid email")
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    }
}

const valiadateadd = () => {
    if (add.value == "") {
        setError(add, "Required")
        return false;
    } else {
        setSuccess(add);
        return true;
    }
}

const validateUpperfields = () => {
    let validfname = validatefname()
    let validlname = validatelname();
    let validdob = validatedob();
    let validemail = validateemail();
    let validadd = valiadateadd();
    if (validfname == false || validlname == false || validdob == false || validemail == false || validadd == false) {
        return false;
    }
    else {
        return true
    }
}

itemdata = [];
const loaditems = () => {
    Array.from(document.getElementsByClassName("rowdata")).forEach((item) => {
        itemdata.push({
            degree: item.children[0].children[0].value,
            school: item.children[1].children[0].value,
            startdate: item.children[2].children[0].value,
            enddate: item.children[3].children[0].value,
            percentage: item.children[4].children[0].value,
            backlogs: item.children[5].children[0].value
        })
    })
}

async function updateData() {
    const newdata = {
        alldata:allData
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

    }
    catch (error) {
        console.log("Error: ", error);
    }

}

submitbtn.onclick = async () => {
    if (!validateUpperfields()) {
        Swal.fire({
            icon: "info",
            title: "Oh no...",
            text: "please check all fields!"
        });
        return;
    }
    if (!validateEducation()) {
        Swal.fire({
            icon: "info",
            title: "Oh no...",
            text: "please check all education fields!"
        });
        return;
    }
    if (currindex == -1) {
        loaditems()
        allData.push({
            sfname: fname.value,
            slname: lname.value,
            sdob: dob.value,
            semail: email.value,
            spwd: user.password,
            saddress: address.value,
            education: itemdata
        })
        await updateData().then(()=>{
            Swal.fire({
                title: "Success!",
                text: "Data inserted successfully.",
                icon: "success"
            }).then(()=>{
                sessionStorage.removeItem("user");
                window.location.href="login.html"
            });
        })
    } else {
        loaditems()
        allData[currindex] = {
            sfname: fname.value,
            slname: lname.value,
            sdob: dob.value,
            semail: email.value,
            spwd: user.password,
            saddress: address.value,
            education: itemdata
        }
        await updateData().then(()=>{
            Swal.fire({
                title: "Success!",
                text: "Data updated successfully.",
                icon: "success"
            }).then(()=>{
                sessionStorage.removeItem("user");
                window.location.href="login.html"
            });
        })
    }


}


addrowbtn.onclick = () => {
    let tr = document.createElement("tr");
    tr.classList.add("rowdata");
    tr.innerHTML = ` <td>
    <input type="text" class="form-control">
    <div class="text-danger"></div>
    </td>
    <td>
        <input type="text" class="form-control">
        <div class="text-danger"></div>
    </td>
    <td>
        <input type="month" class="form-control">
        <div class="text-danger"></div>
    </td>
    <td>
        <input type="month" class="form-control">
        <div class="text-danger"></div>
    </td>
    <td>
        <input type="number" class="form-control">
        <div class="text-danger"></div>
    </td>
    <td>
        <input type="number" class="form-control">
        <div class="text-danger"></div>
    </td>
    <td><button class="btn btn-danger delrow" >-</button></td>`
    itemtbody.append(tr);
}
itemtbody.onclick = (e) => {
    let target = e.target;
    let tr = target.parentElement.parentElement;
    if (target.classList.contains("delrow")) {
        tr.remove();
    }
}
