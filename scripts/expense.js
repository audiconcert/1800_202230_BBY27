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
                        var category = doc.data().category;
                        var date = doc.data().date;
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-title').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-length').innerHTML = source;
                        testFavouriteCard.querySelector('.card-length2').innerHTML = category;
                        testFavouriteCard.querySelector('.card-text').innerHTML = date;
                        testFavouriteCard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                        testFavouriteCard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                        testFavouriteCard.querySelector('.card-length').setAttribute("id", "clength" + i);
                        testFavouriteCard.querySelector('.card-length2').setAttribute("id", "clength" + i);
                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
        }
    })
}
showFavourite();

function addExistingFavourite() {
    const Amount = document.querySelector('.card-title');
    const Source = document.querySelector('.card-length');
    const Date = document.querySelector('.card-text');
    let title = Amount.getAttribute("ctitle" + i);
    let length = Source.getAttribute("clength" + i);
    let text = Date.getAttribute("ctext" + i);

    console.log(Source);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses").add({
                source: length,
                userID: userID,
                amount: parseFloat(title),
                date: text
            })
        }
    })
}
function deleteFavourite() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("favourites")
                .get()
                .delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                })
        }
    })
}