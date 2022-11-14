var i = 1;

function showGoals() {
    let goalsTemplate = document.getElementById("goalsTemplate");
    let goalsCardGroup = document.getElementById("goalsCardGroup");

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
                        let testGoals = goalsTemplate.content.cloneNode(true);
                        testGoals.querySelector('.card-contributions').innerHTML = "$" + contributions;
                        testGoals.querySelector('.card-goalAmount').innerHTML = "/  $" + goalAmount;
                        testGoals.querySelector('.card-name').innerHTML = name;
                        testGoals.querySelector('.card-date').innerHTML = date;

                        testGoals.querySelector('.card-contributions').setAttribute("id", "ctitle1" + i);
                        testGoals.querySelector('.card-goalAmount').setAttribute("id", "ctitle2" + i);
                        testGoals.querySelector('.card-name').setAttribute("id", "clength" + i);
                        testGoals.querySelector('.card-date').setAttribute("id", "ctext" + i);
                        goalsCardGroup.appendChild(testGoals);
                        i++;
                    })
                })
       }
        
    })
}
showGoals();
               
