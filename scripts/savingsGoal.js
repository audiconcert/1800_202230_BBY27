
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
                        // var date = doc.data().date;
                        let testGoals = goalsTemplate.content.cloneNode(true);
                        testGoals.querySelector('.card-contributions').innerHTML = formatter.format(parseFloat(contributions));; // removed the string parts because it breaks the edit function
                        testGoals.querySelector('.card-goalAmount').innerHTML = formatter.format(parseFloat(goalAmount));; // ^^^
                        testGoals.querySelector('.card-name').innerHTML = name;
                        // testGoals.querySelector('.card-date').innerHTML = date;


                        testGoals.querySelector('.edit').onclick = () => editSavingsGoal(savingsID);
                        testGoals.querySelector('.delete').onclick = () => deleteSavingsGoal(savingsID);

                        // testGoals.querySelector('.card-contributions').id = "contributions-" + savingsID;
                        // testGoals.querySelector('.card-goalAmount').id = "amount-" + savingsID;
                        // testGoals.querySelector('.card-name').id = "name-" + savingsID;
                        // testGoals.querySelector('.card-date').id = 'date-' + savingsID;
                        // testGoals.querySelector('.edit').id = 'edit-' + savingsID;

                        goalsCardGroup.appendChild(testGoals);

                    })
                });
        }

    });
}
showGoals();

function editSavingsGoal(savingsID) {
    localStorage.setItem('id', savingsID);
}

// function setSavingsData(id) {

//     var amountID = 'amount-' + id;
//     var amount = document.getElementById(amountID).innerHTML;
//     var nameID = 'name-' + id;
//     var name = document.getElementById(nameID).innerHTML;
//     var contID = 'contributions-' + id;
//     var contributions = document.getElementById(contID).innerHTML;
//     // var dateID = 'date-' + id;
//     // var date = document.getElementById(dateID).innerHTML;
//     localStorage.setItem('savingsID', id);
//     localStorage.setItem('savingsName', name);
//     localStorage.setItem('savingsAmount', amount);
//     localStorage.setItem('savingsContributions', contributions);
// }


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