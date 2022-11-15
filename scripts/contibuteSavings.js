function showTargetGoal() {
    let Amount = document.getElementsByClass(".goalAmount");
    let Name = document.getElementByClass("goalName");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("savings")
                .document().getId()
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        var goalAmount = doc.data().amount;
                        var name = doc.data().name;
                        let 
                    })
                })
            }
        }
    }
