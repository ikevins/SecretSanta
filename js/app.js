function generateInputs() {
    var container = document.getElementById("inputContainer");
    var count = document.getElementById("participantCount").value;
    container.innerHTML = "";

    for (var i = 0; i < count; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Please enter participant #" + (i + 1) + "'s name here...";
        input.className = "participantInput";
        container.appendChild(input);
    }
}

function generateSecretSanta() {
    var inputs = document.getElementsByClassName("participantInput");
    var names = [];

    for (var input of inputs) {
        if (input.value.trim() !== '') {
            names.push(input.value.trim());
        }
        else {
            alert("You must have a name for each participant");
            break;
        }
    }

    var pairs = secretSanta(names);

    displayPairs(pairs);

}

function secretSanta(names) {
    let pairs = {};
    let participants = [...names];

    for (let giver of names) {
        let index = Math.floor(Math.random() * participants.length);
        let receiver = participants[index];

        // Ensure that the giver does not receive their own name
        while (giver === receiver) {
            index = Math.floor(Math.random() * participants.length);
            receiver = participants[index];
        }

        pairs[giver] = receiver;
        participants.splice(index, 1); // Remove the chosen receiver
    }

    return pairs;
}

function displayPairs(pairs) {
    var container = document.getElementById("pairsContainer");
    container.innerHTML = "<h3>Secret Santa Pairs</h3>";

    for (var giver in pairs) {
        var pairText = document.createTextNode(giver + " -> " + pairs[giver]);
        var p = document.createElement("p");
        p.appendChild(pairText);
        container.appendChild(p);
    }
}


// Functionality for participants input
function increment() {
    var value = parseInt(document.getElementById('participantCount').value);
    if(isNaN(value)) {
        value = 3
    }
    else {
        value++;
    }
    document.getElementById('participantCount').value = value;
    generateInputs()
}
function decrement() {
    var value = parseInt(document.getElementById('participantCount').value);
    if(isNaN(value)) {
        value = 3;
    }
    else if(value > 3) {
        value--;
    }
    else {
        value = 3;
    }
    document.getElementById('participantCount').value = value;
    generateInputs()
}