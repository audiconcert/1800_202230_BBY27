var form = document.getElementById("form");
var sourceInput = document.getElementById("locale");
var amountInput = document.getElementById("amt");
var categoryInput = document.getElementById("category");
const expenseID = localStorage.getItem("id");

function populateExpenseInfo() {
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      currentUser
        .collection("expenses")
        .doc(expenseID)
        .get()
        .then((doc) => {
          var newSource = doc.data().source;
          var newAmount = doc.data().amount;
          var newCategory = doc.data().category;

          if (newAmount != null) {
            amountInput.value = newAmount;
          }
          if (newSource != null) {
            sourceInput.value = newSource;
          }
          if (newCategory != null) {
            categoryInput.value = newCategory;
          }
        });
    } else {
      console.log("No user is signed in.");
    }
  });
}
populateExpenseInfo();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        var currentUser = db.collection('users').doc(user.uid);
  
        currentUser.collection('expenses').doc(expenseID).get().then((doc) => {
          currentUser.collection('expenses').doc(expenseID).update({
            amount: amountInput.value,
            category: categoryInput.value,
            source: sourceInput.value
          });
        });
      }
    });
    setTimeout(save, 2000);
  });
  
  function save() {
    alert("Saved!")
    window.location.href = "expense.html";
  }
