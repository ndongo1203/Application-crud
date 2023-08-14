function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Le nom est requis");
        return false;
    }

    if(age == ""){
        alert("L'âge est requis");
        return false;
    }
    else if(age < 1){
        alert("L'âge ne doit pas être nul ou inférieur à zéro");
        return false;
    }

    if(address ==""){
        alert("L'adresse est obligatoire");
        return false;
    }

    if(email ==""){
        alert("L'e-mail est requis");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Adresse e-mail invalide");
        return false;
    }

    return true;
}

// founction pour afficher les données 
function showData() {
    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' +index+ ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Chargement des données lors de l'actualisation de la page ou le document
document.onload = showData();

// founction pour ajouter des données

function AddData(){
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
        name : name,
        age : age,
        address : address,
        email : email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    }
}

// fonction pour supprimer le formulaire de données du local storage
function deleteData(index){
    var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify (peopleList));
    showData();
}

// fonction de mise à jour/modification des données du local storage
function updateData(index){
    // Le bouton Soumettre se cachera et le bouton Mettre à jour s'affichera pour la mise à jour des données dans le  local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index]. address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // Le bouton Mettre à jour se cachera et le bouton Soumettre s'affichera
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";
        }
    }
}

/*---------firebase IMPORTS + CONFIGURATION---------*/







