function generateInputs() {
    var container = document.getElementById("inputContainer");
    container.innerHTML = "";

    var count = document.getElementById("participantCount").value;

    for (var i = 0; i < count; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Participant " + (i + 1);
        input.className = "participant-input";
        container.appendChild(input);
    }
}

function generateSecretSanta() {
    var inputs = document.getElementsByClassName("participant-input");
    var names = [];

    for (var input of inputs) {
        if (input.value.trim() !== '') {
            names.push(input.value.trim());
        }
    }

    var pairs = secretSanta(names);
    displayPairs(pairs);
}

function secretSanta(names) {
    let pairs = {};
    let availableRecipients = [...names];

    for (let giver of names) {
        let index = Math.floor(Math.random() * availableRecipients.length);
        let receiver = availableRecipients[index];

        // Ensure that the giver does not receive their own name
        while (giver === receiver) {
            index = Math.floor(Math.random() * availableRecipients.length);
            receiver = availableRecipients[index];
        }

        pairs[giver] = receiver;
        availableRecipients.splice(index, 1); // Remove the chosen receiver
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