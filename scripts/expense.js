function addExpense() {
    console.log("in")
    let source = document.getElementById("locale").value;
    let amount = document.getElementById("amt").value;
    let food = document.getElementById("food").value;
    let trans = document.getElementById("trans").value;
    let clothes = document.getElementById("clothes").value;
    let tech = document.getElementById("tech").value;
    let hotel = document.getElementById("hotel").value;
    let other = document.getElementById("other").value;
    let date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Expenses").add({
                        source: source,
                        amount: amount,
                        food: food,
                        trans: trans,
                        clothes: clothes,
                        tech: tech,
                        hotel: hotel,
                        date: date,
                        other: other
                    }).then(() => {
                        window.location.href = "expenses.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}
