let savingsID = localStorage.getItem('savingsID');
// local storage savings name 
// local storage savings amount 
// local storage savings current contributions 
// local storage savings date


const button = document.getElementById('add');
const amount = document.getElementById('contribution');

function save() {
    alert("Saved!")
}

button.addEventListener('click', (e) => {
    console.log(amount)
    if (amount.value > '') {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var userID = user.uid;
                console.log(userID);
                var savingsAmount = db.collection("users").doc(userID).collection("savings").where("savingsID", "==", savingsID);
                savingsAmount.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      doc.ref.set({
                        contributions: parseFloat(amount)
                        // continue setting fields with local storage variables
                      })
                    })
                  })
            };
        })
    }
    setTimeout(save, 400);
})
