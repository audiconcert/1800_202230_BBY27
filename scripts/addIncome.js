function addIncome() {
    console.log("in");
    let Name = document.getElementById("incomeSource").value;
    let Amount = document.getElementById("incomeAmount").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("income").add({
                name: Name,
                userID: userID,
                amount: parseFloat(Amount),
            }).then(() => {
                window.location.href = "income.html"; //new line added
            })
        };
    });
}
