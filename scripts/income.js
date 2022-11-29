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
            currentUser.get().then((doc) => {
                var incomeCount = doc.data().incomeCount;
                document.getElementById('totalIncome').innerHTML = "Total Income: $ " + incomeCount;

            })
            currentUser.collection("income").get().then(function (snap) {
                snap.forEach(function (doc) {
                    
                    var incomeID = doc.id;
                    var amount = doc.data().amount;
                    var Name = doc.data().name;
                    var category = doc.data().category;
                    var testFavouriteCard = favouritestemplate.content.cloneNode(true);
                    testFavouriteCard.querySelector('.card-amount').innerHTML =  formatter.format(parseFloat(amount));
                    testFavouriteCard.querySelector('.card-title').innerHTML = Name;
                    testFavouriteCard.querySelector('.card-category').innerHTML = category;
                    testFavouriteCard.querySelector('.delete').onclick = () => deleteFavourite(incomeID);

                    favouriteCardGroup.appendChild(testFavouriteCard);

                });
            });
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    });
}
showFavourite();

function deleteFavourite(ID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((doc) => {
                var currentIncome = doc.data().incomeCount;

                currentUser.collection("income").doc(ID).get().then((incomeDoc) => {
                    var deletingIncome = incomeDoc.data().amount;
                    currentUser.set({
                        incomeCount: currentIncome - deletingIncome
                    }, {merge:true});
                }).then(() => {
                    currentUser.collection("income").doc(ID).delete().then(() => {
                        alert("Deleted Income!");
                        window.location.href = "income.html";
                    })
                });
            });
        }
    });
}