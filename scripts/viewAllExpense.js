const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
function showExpenses() {
    let cardTemplate = document.getElementById("expenseCardTemplate");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses")
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        var expenseID = doc.id;
                        var amount = doc.data().amount;
                        var source = doc.data().source;
                        var category = doc.data().category;
                        let newcard = cardTemplate.content.cloneNode(true);
                        newcard.querySelector('.card-amount').innerHTML = formatter.format(parseFloat(amount));
                        newcard.querySelector('.card-title').innerHTML = source;
                        newcard.querySelector('.card-category').innerHTML = category;

                        newcard.querySelector('.card-amount').id = 'amount-' + expenseID;
                        newcard.querySelector('.card-title').id = 'title-' + expenseID;
                        newcard.querySelector('.card-category').id = 'category-' + expenseID;
                        newcard.querySelector('.add').id = 'add-' + expenseID;

                        newcard.querySelector('.add').onclick = () => addExistingExpense(expenseID);
                        // newcard.querySelector('.edit').onclick = () => setExpenseData(expenseID);
                        newcard.querySelector('.delete').onclick = () => deleteFavourite(expenseID);
                        document.getElementById("expenses-go-here").appendChild(newcard);

                    })
                });
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    })
}


showExpenses();

function addExistingExpense(expenseID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").doc(expenseID).get()
                .then(function (doc) {
                    var Amount = doc.data().amount;
                    db.collection("users").doc(user.uid).get().then(function (doc) {
                        var currentExpenseCount = doc.data().expenseCount;
                        db.collection("users").doc(user.uid).set({
                            expenseCount: currentExpenseCount + Amount,
                        }, { merge: true });
                    });

                }).then(function () {
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