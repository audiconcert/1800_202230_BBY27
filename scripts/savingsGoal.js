var i = 1;

function showGoals() {
    let favouritestemplate = document.getElementById("goalstemplate");
    let favouriteCardGroup = document.getElementById("goalsCardGroup");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("savings")
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        var goalAmount = doc.data().amount;
                        var contributions = doc.data().contributions;
                        var name = doc.data().name;
                        var date = doc.data().date;
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-contributions').innerHTML = "$" + contributions;
                        testFavouriteCard.querySelector('.card-goalAmount').innerHTML = "/  $" + goalAmount;
                        testFavouriteCard.querySelector('.card-name').innerHTML = name;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;

                        testFavouriteCard.querySelector('.card-contributions').setAttribute("id", "ctitle1" + i);
                        testFavouriteCard.querySelector('.card-goalAmount').setAttribute("id", "ctitle2" + i);
                        testFavouriteCard.querySelector('.card-name').setAttribute("id", "clength" + i);
                        testFavouriteCard.querySelector('.card-date').setAttribute("id", "ctext" + i);
                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
       }
        
    })
}
showGoals();
               
