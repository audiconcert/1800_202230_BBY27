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
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-title1').innerHTML = "$" + contributions;
                        testFavouriteCard.querySelector('.card-title2').innerHTML = "/  $" + goalAmount;
                        testFavouriteCard.querySelector('.card-length').innerHTML = name;
                    
                        favouriteCardGroup.appendChild(testFavouriteCard);
                    });
                });
            };
        
    });
};
showGoals();

// function setGoalData(id) {
//     localStorage.setItem('name', id);
// }

