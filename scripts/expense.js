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
                        testFavouriteCard.querySelector('.card-amount').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-title').innerHTML = source;
                        testFavouriteCard.querySelector('.card-category').innerHTML = category;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;

                        // testFavouriteCard.querySelector('.card-amount').setAttribute("id", "camount" + i);
                        // testFavouriteCard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                        // testFavouriteCard.querySelector('.card-category').setAttribute("id", "ccategory" + i);
                        // testFavouriteCard.querySelector('.card-date').setAttribute("id", "cdate" + i);

                        testFavouriteCard.querySelector('.card-amount').setAttribute("id", amount);
                        testFavouriteCard.querySelector('.card-title').setAttribute("id", source);
                        testFavouriteCard.querySelector('.card-category').setAttribute("id", category);
                        testFavouriteCard.querySelector('.card-date').setAttribute("id", date);

                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
        }
    })
}
showFavourite();

function addExistingFavourite() {


    const Amount = document.querySelector('.card-amount').getAttribute("id");
    const Source = document.querySelector('.card-title').getAttribute("id");
    const Date = document.querySelector('.card-date').getAttribute("id");
    // let title = Amount.getAttribute("camount" + i);
    // let length = Source.getAttribute("ctitle" + i);
    // let text = Date.getAttribute("cdate" + i);

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