var currentUser;

function populateInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var userName = userDoc.data().name;
                var userEmail = userDoc.data().email;

                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").value = userEmail;
                }
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

populateInfo();