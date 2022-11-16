
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
            .then((queryGoal) => {
                size = queryGoal.size;
                goal = queryGoal.docs;

                if ((size = 1)) {
                    var thisGoal = goal[0].data();
                    var name = thisGoal.name;
                    var amount = thisGoal.amount;
                    document.getElementById("goalName").innerHTML = name;
                    document.getElementById("goalAmount").innerHTML = amount;
                } else {
                    console.log("Query has more than one data");
                }

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });  
    
        }
    
    })

}

    