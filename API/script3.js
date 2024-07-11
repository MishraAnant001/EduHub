let itemtbody = document.getElementById("education-list");
let addrowbtn = document.getElementById("addrowbtn");
let submitbtn = document.getElementById("submitbtn");
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
let dob = document.getElementById("dob")
let email = document.getElementById("email")
let pwd = document.getElementById("password")
let address = document.getElementById("add")
let form = document.getElementsByTagName("form")[0];
let allData = [];
let credentialsdata = [];
let table = new DataTable("#mytable")
let tbody = document.getElementById("student-list");
let selectedRow = null;
let adddatabtn = document.getElementById("adddatabtn");
let note = document.getElementsByClassName("note")[0];
let logout = document.getElementById("logout");

let url2 = "https://65e95cf84bb72f0a9c513fd7.mockapi.io/users/1";
let url = "https://65e95cf84bb72f0a9c513fd7.mockapi.io/StudentData/1";


let data1 = null;
let data2 = null;
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
        data1 = await response.json();
        // console.log(data);
        allData = data1.alldata;
        loaddata();
        // console.log(allData);
        // console.log(data);

    } catch (error) {
        console.log(error);
    }
}
getData();

async function postData() {
    const newdata = {
        credentials: credentialsdata
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newdata)
    }
    try {
        const response = await fetch(url2, requestOptions);

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

const getData2 = async () => {
    try {
        const response = await fetch(url2);

        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }
        data2 = await response.json();
        // console.log(data);
        credentialsdata = data2.credentials;
        // console.log(data);

    } catch (error) {
        console.log(error);
    }
}
getData2();

logout.onclick = () => {

    window.location.href = "/index.html"


}



async function updateData() {
    const newdata = {
        alldata: allData
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

const removeproperties = () => {
    setSuccess(fname)
    setSuccess(lname)
    setSuccess(dob)
    setSuccess(email)
    setSuccess(address)
    setSuccess(pwd)
    Array.from(document.getElementsByClassName("rowdata")).forEach((item) => {
        setSuccess(item.children[0].children[0])
        setSuccess(item.children[1].children[0])
        setSuccess(item.children[2].children[0])
        setSuccess(item.children[3].children[0])
        setSuccess(item.children[4].children[0])
        setSuccess(item.children[5].children[0])
    })
}

adddatabtn.onclick = () => {
    form.reset("");
    email.disabled = false;
    selectedRow = null;
    note.classList.remove("d-none")
    Array.from(document.getElementsByClassName("rowdata")).forEach((item, index) => {
        // console.log(item);
        if (index == 0) {
            item.children[0].children[0].value = ""
            item.children[1].children[0].value = ""
            item.children[2].children[0].value = ""
            item.children[3].children[0].value = ""
            item.children[4].children[0].value = ""
            item.children[5].children[0].value = ""
        }
        else {
            item.remove();
        }
    })
    removeproperties()

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
            let x = allData.find((ele) => {
                return ele.semail == email.value;
            })
            if (x != undefined) {
                setError(email, "Email already exists!")
                return false;
            } else {
                setSuccess(email);
                return true;
            }
        }
    }
}
const validatepwd = () => {
    if (pwd.value == "") {
        setError(pwd, "Required")
        return false;
    }
    else {
        let len = pwd.value.length;
        if (len < 8 || len > 16) {
            setError(pwd, "Password length must lie between 8 to 16")
            return false;
        } else {
            setSuccess(pwd);
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
    let validemail = null;
    if (selectedRow != null) {
        validemail = true;
    }
    else {
        validemail = validateemail();
    }
    let validpwd = validatepwd();
    let validadd = valiadateadd();
    if (validfname == false || validlname == false || validdob == false || validemail == false || validpwd == false || validadd == false) {
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

const loaddata = () => {
    allData.forEach((data) => {
        table.row.add([`<i class="bi bi-table showedu"></i>`, data.sfname, data.slname, data.sdob, data.semail, data.saddress, `<button class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class="btn ms-2 btn-danger delete">delete</button>`]).draw();
    })
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
    if (selectedRow == null) {
        loaditems();
        allData.push({
            sfname: fname.value,
            slname: lname.value,
            sdob: dob.value,
            semail: email.value,
            spwd: pwd.value,
            saddress: address.value,
            education: itemdata
        })
        credentialsdata.push({
            username: email.value,
            password: pwd.value
        })
        itemdata = [];
        let data = allData[allData.length - 1]
        table.row.add([`<i class="bi bi-table showedu"></i>`, data.sfname, data.slname, data.sdob, data.semail, data.saddress, `<button class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class="btn ms-2 btn-danger delete">delete</button>`]).draw();
        $("#examplemodal").modal("hide");
        form.reset("")
        Swal.fire({
            icon: "success",
            title: "Data inserted successfully"
        });

        try {
            // console.log("calling api while after adding data");
            await updateData().then(()=>{
                // console.log("allData successfully updated");
            });
            await postData().then(()=>{
                // console.log("credentials successfully updated");
            });

    
        } catch (error) {
            console.log(error);
        }


    }
    else {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update the record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                loaditems();
                let index = table.row(selectedRow).index();
                allData[index] = {
                    sfname: fname.value,
                    slname: lname.value,
                    sdob: dob.value,
                    semail: email.value,
                    spwd: pwd.value,
                    saddress: address.value,
                    education: itemdata
                }
                credentialsdata[index + 1] = {
                    username: email.value,
                    password: pwd.value
                }
                itemdata = [];
                let data = allData[index];
                let newdata = [`<i class="bi bi-table showedu"></i>`, data.sfname, data.slname, data.sdob, data.semail, data.saddress, `<button class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class="btn ms-2 btn-danger delete">delete</button>`]

                table.row(index).data(newdata).draw();
                $("#examplemodal").modal("hide");
                form.reset("")
                selectedRow = null;
                Swal.fire({
                    title: "Updated!",
                    text: "record updated successfully.",
                    icon: "success"
                });
                try {
                    console.log("calling api while after updating data");
                    await updateData().then(()=>{
                        // console.log("allData successfully updated");
                    });
                    await postData().then(()=>{
                        // console.log("credentials successfully updated");
                    });
        
            
                } catch (error) {
                    console.log(error);
                }
            }
        });

    }
}

const format = (index) => {
    let data = allData[index].education;
    let table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");
    let thead = document.createElement("thead");
    thead.innerHTML = `<th>Degree</th>
    <th>School/College</th>
    <th>Start date</th>
    <th>Passout year</th>
    <th>Percentage</th>
    <th>Backlogs</th>`
    table.append(thead);
    let tbody = document.createElement('tbody');
    data.forEach((item) => {
        tbody.innerHTML += `
        <td>${item.degree}</td>
        <td>${item.school}</td>
        <td>${item.startdate}</td>
        <td>${item.enddate}</td>
        <td>${item.percentage}</td>
        <td>${item.backlogs}</td>`
    })
    table.append(tbody)
    return table;
}

tbody.onclick = (e) => {
    let target = e.target;
    let tr = target.parentElement.parentElement;
    if (target.classList.contains("edit")) {
        removeproperties()
        note.classList.add("d-none")
        selectedRow = tr;
        let index = table.row(selectedRow).index();
        let data = allData[index];
        fname.value = data.sfname;
        lname.value = data.slname;
        dob.value = data.sdob;
        email.value = data.semail;
        email.disabled = true;
        pwd.value = data.spwd;
        address.value = data.saddress;
        Array.from(document.getElementsByClassName("rowdata")).forEach((e) => {
            e.remove();
        })
        let education = data.education;
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

    }
    if (target.classList.contains("delete")) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let index = table.row(tr).index();
                allData.splice(index, 1);
                credentialsdata.splice(index + 1, 1)
                if (allData.length == 0) {
                    await updateData();
                    window.location.reload();
                }
                table.clear();
                loaddata();
                Swal.fire({
                    title: "Deleted!",
                    text: "record deleted successfully.",
                    icon: "success"
                });
                try {
                    await updateData();
                    await postData();

                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    if (target.classList.contains("showedu")) {
        let row = table.row(tr);
        let index = row.index();
        if (row.child.isShown()) {
            row.child.hide()
        } else {
            row.child(format(index)).show();
        }
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
