function addSavings() {
    console.log("in");
    let Name = document.getElementById("name").value;
    let Amount = document.getElementById("savingsAmount").value;
    let Date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("savings").add({
                name: Name,
                userID: userID,
                amount: Amount,
                date: Date
            }).then(() => {
                window.location.href = "savingsGoal.html"; //new line added
            })
        };
    });
}

