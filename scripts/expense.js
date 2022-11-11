
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
                    var i = 1;
                    snap.forEach(function (doc) {
                        var amount = doc.data().amount;
                        var source = doc.data().source;
                        var date = doc.data().date;
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-title').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-length').innerHTML = source;
                        testFavouriteCard.querySelector('.card-text').innerHTML = date;
                        testFavouriteCard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                        testFavouriteCard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                        testFavouriteCard.querySelector('.card-length').setAttribute("id", "clength" + i);
                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
        }
    })
}
showFavourite();

function addExistingFavourite() {
    console.log("in");
    var i = 1;
    let Source = document.getElementById("ctitle")
    let Amount = document.getElementById("ctext")
    let Date = document.getElementById("clength")

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses").add({
                source: Source,
                userID: userID,
                amount: Amount,
                date: Date
            })
        };
    });
}