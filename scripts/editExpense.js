document.getElementById('locale').value = localStorage.getItem('expenseSource');
document.getElementById('amt').value = localStorage.getItem('expenseAmount');
document.getElementById('category').value = localStorage.getItem('expenseCategory');
var expenseID = localStorage.getItem('expenseID');

const button = document.getElementById('save');
const expenseCategory = document.getElementById('category');
const expenseSource = document.getElementById('locale');
const expenseAmount = document.getElementById('amt');

function save() {
  alert("Saved!")
  window.location.href = "expense.html";
}

button.addEventListener('click', (e) => {
  if (expenseCategory.value > ''
    && expenseSource.value > ''
    && expenseAmount.value > '') {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userID = user.uid;
        console.log(userID);
        var expenses = db.collection("users").doc(userID).collection("expenses").where("expenseID", "==", expenseID);
        expenses.set({
              category: expenseCategory,
              source: expenseSource,
              amount: parseFloat(expenseAmount),
              date: firebase.firestore.Timestamp.fromDate((date.valueAsDate = new Date()))
        })
      };
    })
  }
  setTimeout(save, 400);
})
