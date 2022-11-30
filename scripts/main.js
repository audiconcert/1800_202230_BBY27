var currentUser;

function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var userName = userDoc.data().name;
                document.getElementById("name-goes-here").innerText = "Good to see you, " + userName;
            });
        }
    });
}
insertName(); 

function updateExpenseCount() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((doc) => {
                var endDate = doc.data().expenseCountEndDate.toDate();
                var now = new Date();

                if(endDate.getTime() < now.getTime()) {
                    var today = new Date();
                    var newEndDate = new Date();
                    newEndDate.setTime(newEndDate.getTime() + 604800000);
                    currentUser.update({
                        expenseCount: 0, 
                        expenseCountStartDate: today,
                        expenseCountEndDate: newEndDate,
                    })
                } else {
                    console.log('It has not been a week yet');
                }

            })
            
        }
    })
}