var currentUser;

function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then ((userDoc) => {
                var userName = userDoc.data().name;
                document.getElementById("name-goes-here").innerText = userName;  
            })
        } else {
            console.log('No user is signed in');
        }
    });
}
insertName(); 