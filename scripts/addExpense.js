

function addExpense() {
    console.log("in");
    let Source = document.getElementById("locale").value;
    let Amount = document.getElementById("amt").value;
    let Date = document.getElementById("date").value;
    

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                source: Source,
                userID: userID,
                amount: parseFloat(Amount),
                date: firebase.firestore.Timestamp.fromDate(new Date(Date))
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
    let date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("favourites").add({
                source: source,
                userID: user.uid,
                amount: amount,
                date: date
            })
        };
    });
}

