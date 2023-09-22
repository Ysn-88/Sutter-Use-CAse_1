var einkaufliste = []
var updateList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var listInput = document.getElementById("list-input")
var deleteAllButton = document.getElementById("delete-all")
var totalList = document.getElementById("einkaufliste-array");
var deleteSButton = document.getElementById("delete-selected")


//event listners for add and delete
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)


//event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeList(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteList(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }

})
//event listner for enter key
listInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//updates the all the remaining, completed and main list
function update() {
    updateList = einkaufliste.filter((ele) => {
        return ele.complete

    })
    remList = einkaufliste.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = einkaufliste.length.toString();
    document.getElementById("c-count").innerText = updateList.length.toString();

}

//haupt methoden

function add() {
    var value = listInput.value;
    if (value === '') {
        alert("😮 Die Aufgabe darf nicht leer sein")
        return;
    }
    einkaufliste.push({
        item: value,
        id: Date.now().toString(),
        complete: false,
    });

    listInput.value = "";
    update();
    addinmain(einkaufliste);
}



function addinmain(einkaufliste) {
    totalList.innerHTML = ""
    einkaufliste.forEach(element => {
        var x = `<li id=${element.id} class="list-item">
    <p id="item"> ${element.complete ? `<strike>${element.item}</strike>` : element.item} </p>
    <div class="list-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        totalList.innerHTML += x
    });
}


function deleteList(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    einkaufliste = einkaufliste.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(einkaufliste);

}


function completeList(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    einkaufliste.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#item").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#item").classList.remove("line");
            }
        }
    })

    update();
    addinmain(einkaufliste);
}



function deleteAll(item) {

    einkaufliste = []

    update();
    addinmain(einkaufliste);

}


function deleteS(item) {

    einkaufliste = einkaufliste.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(einkaufliste);

}

// functions für sortieren
function viewCompleted() {
    addinmain(updateList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(einkaufliste);
}

//localstorage ... ? 
