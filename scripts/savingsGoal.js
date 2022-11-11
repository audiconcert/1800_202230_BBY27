function showGoals() {
    let favouritestemplate = document.getElementById("favouritestemplate");
    let favouriteCardGroup = document.getElementById("favouriteCardGroup");

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
                        var name = doc.data().name;
                        let testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-title').innerHTML = "$" + goalAmount;
                        testFavouriteCard.querySelector('.card-length').innerHTML = name;
                        favouriteCardGroup.appendChild(testFavouriteCard);
                    })
                })
        }
    })
}
showGoals();
































// function showGoals() {
//     console.log("inside function");
//     let savedGoalsTemplate = document.getElementById("savingsGoalsTemplate");
//     let savedGoalsGroup = document.getElementById("savingsGoalsGroup");

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;
//             console.log(userID);
//             currentUser.collection("savings")
//             .get()
//             .then (function(snap) {
//                 snap.forEach(function(doc) {
//                     console.log(doc.data().name);
//                     var name = doc.data().name;
//                     var amount = doc.data().amount;
//                     var date = doc.data().date;
//                     let testSavedGoals = savedGoalsTemplate.content.cloneNode(true);
//                     testSavedGoals.querySelector('.goalName').innerHTML = name;
//                     testSavedGoals.querySelector('.goalAmount').innerHTML = amount;
//                     testSavedGoals.querySelector('.byDate').innerHTML = date;
//                     savingsGoalsGroup.appendChild(testSavedGoals);
//                 })
//             })
//         }
//     })
// }
// showGoals();




// function populateCardsDynamically() {
//     let hikeCardTemplate = document.getElementById("hikeCardTemplate");
//     let hikeCardGroup = document.getElementById("hikeCardGroup");
    
//     db.collection("hikes").get()
//         .then(allHikes => {
//             allHikes.forEach(doc => {
//                 var hikeName = doc.data().name; //gets the name field
//                 var hikeID = doc.data().code; //gets the unique CODE field
//                 var hikeLength = doc.data().length; //gets the length field
//                 let testHikeCard = hikeCardTemplate.content.cloneNode(true);
//                 testHikeCard.querySelector('.card-title').innerHTML = hikeName;     //equiv getElementByClassName
//                 testHikeCard.querySelector('.card-length').innerHTML = hikeLength;  //equiv getElementByClassName
//                 testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName
//                 testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
//                 hikeCardGroup.appendChild(testHikeCard);
//             })

//         })
// }
// populateCardsDynamically();

// var hikeID = localStorage.getItem("hikeID");    //visible to all functions on this page
// function getHikeName(hikeCode){
//     db.collection("hikes").where("code", "==", hikeCode)
//            .get()
//            .then(queryHike => {
//                //see how many items are returned from the query with ".size"
//                size = queryHike.size;
//                // get the documents returned from query with ".docs"
//                hikes = queryHike.docs;   

//                // We want to have one document per hike, so if the the result of 
//                //the query is more than one, we can check it right now and clean the DB if needed.
//                if (size = 1) {
//                    var thisHike = hikes[0].data();
//                    name = thisHike.name;
//                    document.getElementById("hikeName").innerHTML = name;
//                } else {
//                    console.log("Query has more than one data")
//                }
//            })
//            .catch((error) => {
//                console.log("Error getting documents: ", error);
//            });
// }
// getHikeName(hikeID);