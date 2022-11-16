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
                        var savingsID = doc.data().savingsID;
                        let testGoals = goalsTemplate.content.cloneNode(true);
                        testGoals.querySelector('.card-contributions').innerHTML = "$" + contributions;
                        testGoals.querySelector('.card-goalAmount').innerHTML = "/  $" + goalAmount;
                        testGoals.querySelector('.card-name').innerHTML = name;
                        testGoals.querySelector('.card-date').innerHTML = date;

                        testGoals.querySelector('.card-contributions').id = "f-contributions";
                        testGoals.querySelector('.card-goalAmount').id = "f-amount";
                        testGoals.querySelector('.card-name').id = "f-name";

                        testGoals.querySelector('.contribute').id = 'contribute-' + savingsID;
                        testGoals.querySelector('.contribute').onclick = () => setSavingsData(savingsID);


                        goalsCardGroup.appendChild(testGoals);
                        i++;
                    })
                })
       }
        
    })
}
showGoals();

function setSavingsData(id){
    localStorage.setItem ('savingsID', id);
}
               
