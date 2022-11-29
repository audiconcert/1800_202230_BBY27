
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

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
                        var savingsID = doc.id;
                        let testGoals = goalsTemplate.content.cloneNode(true);
                        testGoals.querySelector('.card-contributions').innerHTML = formatter.format(parseFloat(contributions));; // removed the string parts because it breaks the edit function
                        testGoals.querySelector('.card-goalAmount').innerHTML = formatter.format(parseFloat(goalAmount));; // ^^^
                        testGoals.querySelector('.card-name').innerHTML = name;
                        testGoals.querySelector('.edit').onclick = () => editSavingsGoal(savingsID);
                        testGoals.querySelector('.delete').onclick = () => deleteSavingsGoal(savingsID);
                        goalsCardGroup.appendChild(testGoals);
                    })
                });
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    });
}
showGoals();

function editSavingsGoal(savingsID) {
    localStorage.setItem('id', savingsID);
}

function deleteSavingsGoal(id) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("savings").doc(id).delete().then(() => {
                alert("Deleted from Savings Goals!");
                window.location.href = "savingsGoal.html";
            });
        }
    });
}