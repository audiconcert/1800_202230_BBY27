

// let amount = document.getElementById("goalAmount");
// let gname = document.getElementById("goalName");

let savingsID = localStorage.getItem("savingsID");

function contributeSavings() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
    
            currentUser.collection("savings")
            .where("savingsID", "==", savingsID)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var goalamount = doc.data().amount;
                    var goalname = doc.data().name;

                    document.getElementById("goalAmount").innerHTML = goalamount;
                    document.getElementById("goalName").innerHTML = goalname;
                })
            
            })
    
        }
    
    })

}

    
// function(doc) {
//     var goalamount = doc.data().amount;
//     var goalname = doc.data().name;

//     document.getElementById("goalAmount").innerHTML = goalamount;
//     document.getElementById("goalName").innerHTML = goalname;

// })