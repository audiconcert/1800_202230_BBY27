
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

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
                        testFavouriteCard.querySelector('.card-amount').innerHTML = formatter.format(parseFloat(amount));
                        testFavouriteCard.querySelector('.card-title').innerHTML = source;
                        testFavouriteCard.querySelector('.card-category').innerHTML = category;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;

                        testFavouriteCard.querySelector('.edit').onclick = () => setExpenseData(expenseID);
                        testFavouriteCard.querySelector('.delete').onclick = () => deleteFavourite(expenseID);
                        // from demo 11
                        testFavouriteCard.querySelector('.card-title').id = 'source-' + expenseID;
                        testFavouriteCard.querySelector('.card-amount').id = 'amount-' + expenseID;
                        testFavouriteCard.querySelector('.card-category').id = 'category-' + expenseID;
                        testFavouriteCard.querySelector('.card-date').id = 'date-' + expenseID;
                        testFavouriteCard.querySelector('.add').id = 'add-' + expenseID;
                        testFavouriteCard.querySelector('.add').onclick = () => addExistingFavourite(expenseID);
                        favouriteCardGroup.appendChild(testFavouriteCard);




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

function setExpenseData(id) {

    var amountID = 'amount-' + id;
    var amount = document.getElementById(amountID).innerHTML;
    var sourceID = 'source-' + id;
    var source = document.getElementById(sourceID).innerHTML;
    var catID = 'category-' + id;
    var category = document.getElementById(catID).innerHTML;
    // var dateID = 'date-' + id;
    // var date = document.getElementById(dateID).innerHTML;
    localStorage.setItem('expenseID', id);
    localStorage.setItem('expenseSource', source);
    localStorage.setItem('expenseCategory', category);
    localStorage.setItem('expenseAmount', amount);
}

// same issue as saving changes on an expense
function deleteFavourite(id) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var favourite = db.collection("users").doc(user.uid).collection("favourites")
                .where("expenseID", "==", id);
            favourite.get().then(() => {
                favourite.delete();
            })
        }
    })
}