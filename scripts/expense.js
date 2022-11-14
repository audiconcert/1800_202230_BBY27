


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
                        var category = doc.data().category;
                        var date = doc.data().date;
                        var testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-amount').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-title').innerHTML = source;
                        testFavouriteCard.querySelector('.card-category').innerHTML = category;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;
              
                        testFavouriteCard.querySelector('.card-amount').setAttribute("id", "camount" + i);
                        testFavouriteCard.querySelector('.card-title').setAttribute("id", "csource" + i);
                        testFavouriteCard.querySelector('.card-category').setAttribute("id", "ccategory" + i);
                        // testFavouriteCard.querySelector('.card-date').setAttribute("id", "cdate" + i);

                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
        }
    })
}
showFavourite();


function addExistingFavourite() {

    const Amount = testFavouriteCard.querySelector('.card-amount').getAttribute("id");
    const Source = document.querySelector('.card-title').getAttribute();
    const Category = document.querySelector('.card-category').getAttribute();
    const Date = firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())

    console.log(Source);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses").add({
                source: Source,
                category: Category,
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
            currentUser.collection("favourites").doc(/*the document*/).delete().then(() => {
                alert("Expense successfully deleted.")
            })
        }
    })
}

function deleteExpense() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").doc(/*the document*/).delete().then(() => {
                alert("Expense successfully deleted.")
            })
        }
    })
}
