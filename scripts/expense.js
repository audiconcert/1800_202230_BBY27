
function showFavourite() {
    let favouritestemplate = document.getElementById("favouritestemplate");
    let favouriteCardGroup = document.getElementById("favouriteCardGroup");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("favourites")
                .limit(10)
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        var amount = doc.data().amount;
                        var source = doc.data().source;
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-title').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-length').innerHTML = source;
                        favouriteCardGroup.appendChild(testFavouriteCard);
                    })
                })
        }
    })
}
showFavourite();

function addExistingFavourite() {
    console.log("in");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("favourites")
                .limit(10)
                .get()
            var amount = doc.data().amount;
            var source = doc.data().source;
            currentUser.collection("expenses").add({
                source: source,
                userID: user.uid,
                amount: amount,
            })
        };
    });
}