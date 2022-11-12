var i = 1;
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
    let Amount = document.getElementById("ctitle");
    let Date = document.getElementById("ctext");
    let Source = document.getElementById("clength");
    console.log(Source);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses").add({
                source: Source,
                userID: userID,
                amount: parseFloat(Amount),
                date: Date
            })
        }
    })
}
