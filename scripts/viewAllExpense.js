function showExpenses() {
    let cardTemplate = document.getElementById("expenseCardTemplate");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("expenses")
                .orderBy("date")
                .get()
                .then(snap => {

                    snap.forEach(doc => {
                        var source = doc.data().source;
                        var amount = doc.data().amount;
                        var expenseID = doc.data().expenseID;
                        var category = doc.data().category;
                        var date = doc.data().date
                        let newcard = cardTemplate.content.cloneNode(true);
                        newcard.querySelector('.card-amount').innerHTML = amount;
                        newcard.querySelector('.card-title').innerHTML = source;
                        newcard.querySelector('.card-category').innerHTML = category;
                        newcard.querySelector('.card-date').innerHTML = date;

                        newcard.querySelector('.edit').onclick = () => setExpenseData(expenseID);
                        newcard.querySelector('.delete').onclick = () => deleteFavourite(expenseID);

                        newcard.querySelector('.card-title').id = 'source-' + expenseID;
                        newcard.querySelector('.card-amount').id = 'amount-' + expenseID;
                        newcard.querySelector('.card-category').id = 'category-' + expenseID;
                        newcard.querySelector('.card-date').id = 'date-' + expenseID;
                        newcard.querySelector('.add').id = 'add-' + expenseID;
                        newcard.querySelector('.add').onclick = () => addExistingFavourite(expenseID);
                        document.getElementById("expenses-go-here").appendChild(newcard);

                    })
                });
        }
    });
}

showExpenses();

function addExistingExpense(expenseID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").where("expenseID", "==", expenseID)
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
            var favourite = db.collection("users").doc(user.uid).collection("expenses").where("expenseID", "==", id);
            favourite.delete().then(() => {
                alert('Favourite successfully deleted.');
                reload();
            })
        }
    })
}