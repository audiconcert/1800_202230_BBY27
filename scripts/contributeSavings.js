document.getElementById('name').value = localStorage.getItem('savingsName');
document.getElementById('amt').value = localStorage.getItem('savingsAmount');
document.getElementById('contributions').value = localStorage.getItem('savingsContributions');
var savingsID = localStorage.getItem('savingsID');

const button = document.getElementById('add');
const contributions = document.getElementById('contributions');
const savingsName = document.getElementById('name');
const savingsAmount = document.getElementById('amt');

function save() {
  alert("Saved!")
  window.location.href = "savingsGoal.html";
}

button.addEventListener('click', (e) => {
  if (contributions.value > ''
    && savingsName > ''
    && savingsAmount > '') {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userID = user.uid;
        console.log(userID);
        var savingsGoal = db.collection("users").doc(userID).collection("savings").where("savingsID", "==", savingsID);
        savingsGoal.set({
              contributions: parseFloat(contributions),
              name: savingsName,
              amount: parseFloat(savingsAmount),
              date: firebase.firestore.Timestamp.fromDate((date.valueAsDate = new Date()))
              // continue setting fields with local storage variables
        })
      };
    })
  }
  setTimeout(save, 400);
})
