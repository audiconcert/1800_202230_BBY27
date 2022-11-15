
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
                .limit(50)
                .orderBy("date") 
                .get()
                .then(function (snap) {

                    snap.forEach(function (doc) {
                        var amount = doc.data().amount;
                        var source = doc.data().source;
                        // line 23 is new, go to expense.js to see more
                        var expenseID = doc.data().expenseID;
                        var category = doc.data().category;
                        var date = doc.data().date;
                        var testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-amount').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-title').innerHTML = source;
                        testFavouriteCard.querySelector('.card-category').innerHTML = category;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;

                        // from demo 11
                        testFavouriteCard.querySelector('.card-title').id = 'f-source';
                        testFavouriteCard.querySelector('.card-amount').id = 'f-amount';
                        testFavouriteCard.querySelector('.card-category').id = 'f-category';
                        testFavouriteCard.querySelector('.card-date').id = 'f-date';
                        testFavouriteCard.querySelector('.add').id = 'add-' + expenseID;
                        testFavouriteCard.querySelector('.add').onclick = () => addExistingFavourite(expenseID);
                        favouriteCardGroup.appendChild(testFavouriteCard);

                        document.querySelector('#add').addEventListener("click", addExistingFavourite(i));

                        i++;

                    })
                })
        }
    })
}
showFavourite();

// LETS GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
function addExistingFavourite(expenseID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("favourites").where("expenseID", "==", expenseID)
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        currentUser.collection("expenses").add({
                            amount: doc.data().amount,
                            source: doc.data().source,
                            expenseID: doc.data().expenseID,
                            category: doc.data().category,
                            date: doc.data().date
                        })
                    })
                })
                .then(function () {
                    var addID = 'add-' + expenseID;
                    document.getElementById(addID).innerText = 'Added!';
                }) 
            }
    })
}
