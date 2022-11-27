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
                        newcard.querySelector('.delete').onclick = () => deleteExpense(expenseID);

                        newcard.querySelector('.add').onclick = () => addExistingExpense(expenseID);
                        // newcard.querySelector('.edit').onclick = () => setExpenseData(expenseID);
                        // newcard.querySelector('.delete').onclick = () => deleteFavourite(expenseID);
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
            var addID = 'add-' + expenseID;
            currentUser.collection("expenses").doc(expenseID).get()
                .then(function (doc) {
                    var Amount = doc.data().amount;
                    var Name = doc.data().source;
                    var Category = doc.data().category;
                    db.collection("users").doc(user.uid).get().then(function (doc) {
                        var currentExpenseCount = doc.data().expenseCount;
                        db.collection("users").doc(user.uid).set({
                            expenseCount: currentExpenseCount + Amount,
                        }, { merge: true })
                        .then(()=>{
                            currentUser.collection("expenses").add({
                                amount: Amount,
                                source: Name,
                                category: Category
                            })
                        });
                    });

                }).then(function () {
                    document.getElementById(addID).innerText = 'Added!';
                    setTimeout(function () { document.getElementById(addID).innerText = 'Add' }, 2000);
                });
        }
    });
}

function deleteExpense(expenseID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").doc(expenseID).delete();
        }
    })
}

