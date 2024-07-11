let totalData = []
let selectedRow = null;
let note = document.getElementById("note");
let desc = document.getElementById("description");
let btn = document.getElementById("submitbtn")
let tablebody = document.getElementById("tablebody");
const validation = () => {
    if (note.value == "") {
        return false;
    }
    else {
        return true;
    }
}

btn.addEventListener('click', function () {
    let note = document.getElementById("note").value;
    let desc = document.getElementById("description").value;
    // console.log(note," ",desc);
    if (!validation()) {
        alert("please fill note field !");
        return;
    }
    if (selectedRow == null) {

        let n = new Note(desc);
        totalData.push(n);
        console.log(totalData);
        // console.log(index);
        tablebody.innerHTML += `<tr class="text-center rowdata">
                                    <td><i class="bi detail bi-info-circle-fill"></i></td>
                                    <td>${note}</td>
                                    <td><button class="btn btn-warning edit" href="#" role="button"><i class="bi  bi-pencil-square mx-1"></i></button>
                                    <a name="" id="" class="btn btn-danger delete" href="#" role="button"><i class="bi bi-trash   mx-1"></i></a>
                                    </td>
                                </tr>`
        // index++;
        // alert("Data added successfully");
        // let child = document.getElementsByClassName('child');
        // // console.log(child);
        // // console.log(child.length);
        // if (child.length > 0) {
        //     for (let i = 0; i < child.length; i++) {
        //         child[i].remove();
        //     }
        // }
    } else {
        let index = Array.from(document.getElementsByClassName("rowdata")).indexOf(selectedRow);
        console.log("🚀 ~ index:", index)
        selectedRow.children[1].textContent = note;
        totalData[index].description = desc;
        let sibling = selectedRow.nextElementSibling;
        if (sibling && sibling.classList.contains("child")) {
            // console.log("sibling presents");
            sibling.remove();
        }
        selectedRow = null;
        // let child = document.getElementsByClassName('child');
        // console.log(child);
        // console.log(child.length);
        // if (child.length > 0) {
        //     for (let i = 0; i <= child.length; i++) {
        //         // child[i].parentNode.removeChild(child[i]);
        //     }
        // }
        // child.remove();
    }
    clearform();
    let editbtn = document.querySelectorAll(".edit");
    let deletebtn = document.querySelectorAll(".delete");
    let detailbtn = document.querySelectorAll(".detail");

    for (i = 0; i < deletebtn.length; i++) {
        deletebtn[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let sibling = tr.nextElementSibling;
            console.log(sibling);
            // console.log(tr);
            let index = Array.from(document.getElementsByClassName("rowdata")).indexOf(tr);
            if (confirm("do you want to delete this data")) {
                totalData.splice(index, 1);
                tr.remove();
                if (sibling && sibling.classList.contains("child")) {
                    // console.log("sibling presents");
                    sibling.remove();
                }
                clearform();
            }
            console.log(totalData);
        }
    }




    for (i = 0; i < editbtn.length; i++) {
        editbtn[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            // console.log(tr);
            selectedRow = tr;
            // console.log("hi");
            let index = Array.from(document.getElementsByClassName("rowdata")).indexOf(tr);
            // console.log(index);
            let note = document.getElementById("note");
            let desc = document.getElementById("description");
            // console.log(selectedRow.children[1].textContent);
            // console.log(totalData[index].description);
            // console.log("hello");
            note.value = selectedRow.children[1].textContent;
            desc.value = totalData[index].description;
        }
    }

    for (i = 0; i < detailbtn.length; i++) {
        detailbtn[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            // console.log(tr);
            // console.log("hi");
            let index = Array.from(document.getElementsByClassName("rowdata")).indexOf(tr);
            let descript = totalData[index].description;
            let sibling = tr.nextElementSibling;
            // console.log(sibling);
            if (sibling && sibling.classList.contains("child")) {
                // console.log("sibling presents");
                sibling.remove();
            } else {
                let div = document.createElement("tr");
                div.classList.add("child");
                div.classList.add("text-wrap");
                div.classList.add("text-center");
                div.classList.add("bg-white");
                if (descript == '') {
                    div.innerHTML = `<td>Detail:</td>
                                 <td colspan=2> <textarea cols="20" rows="1" readonly class="text">N/A</textarea></td>
                                 `;
                }
                else {
                    div.innerHTML = `<td>Detail:</td>
                    <td colspan=2> <textarea cols="20" rows="1" readonly class="text">${descript}</textarea></td>
                    `;
                }

                tr.after(div);
            }


        }
    }

});






const clearform = () => {
    let note = document.getElementById("note");
    let desc = document.getElementById("description");
    note.value = "";
    desc.value = "";

}
class Note {
    constructor(description) {
        this.description = description;
    }
}