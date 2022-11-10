function addExpense() {
    console.log("in");
    let source = document.getElementById("locale").value;
    let amount = document.getElementById("amt").value;
    // let food = document.getElementById("food").value;
    // let trans = document.getElementById("trans").value;
    // let clothes = document.getElementById("clothes").value;
    // let tech = document.getElementById("tech").value;
    // let hotel = document.getElementById("hotel").value;
    // let other = document.getElementById("other").value;
    // let date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                source: source,
                userID: userID,
                amount: amount,
            }).then(() => {
                window.location.href = "expense.html"; //new line added
            })
        };
    });
}


function addFavourite() {
    console.log("in");
    let source = document.getElementById("locale").value;
    let amount = document.getElementById("amt").value;
    // let food = document.getElementById("food").value;
    // let trans = document.getElementById("trans").value;
    // let clothes = document.getElementById("clothes").value;
    // let tech = document.getElementById("tech").value;
    // let hotel = document.getElementById("hotel").value;
    // let other = document.getElementById("other").value;
    // let date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("favourites").add({
                source: source,
                userID: user.uid,
                amount: amount,
            }).then(() => {
                window.location.href = "expense.html"; //new line added
            })
        };
    });
}
