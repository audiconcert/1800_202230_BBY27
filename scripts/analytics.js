var currentUser;
var treeImg = document.getElementById('ernieImg');
var imgTemplate = document.getElementById('imgTemplate');
var imgCard = document.getElementById('imgCard');
var progressBar = document.getElementsByClassName('progress-bar');
var now = new Date();


function insertTreeName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var treeName = userDoc.data().treeName;
                document.getElementById("treeName").innerText = treeName + "'s Health";
            })
        } else {
            console.log('No user is signed in');
        }
    });
}
insertTreeName();

function insertTree() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var expenses = userDoc.data().expenseCount;
                document.getElementById('total-expenses').innerText = "Total Expenses: " + expenses;
                var income = userDoc.data().incomeCount;
                document.getElementById('total-income').innerText = "Total Income: " + income;
                var net = document.getElementById('net');
                var worth = parseFloat(income) - parseFloat(expenses);
                if (expenses > income) {
                    net.style.color = 'red';
                    net.innerHTML = "Net Loss: $" + worth;
                }
                if (expenses < income) {
                    net.style.color = '#73a589';
                    net.innerHTML = "Net Gain: $" + worth;
                }
                
                var tree = document.getElementById('tree');
                var health = document.getElementById('treeHealth');
                
                if (expenses > income) {
                    if ((expenses - 100) < income) {     // 100 is a baseline net value. change if you have a better idea
                        tree.src = '/images/tree2.png';
                        health.innerText = "66%"        // percentages are dumb. change if you have a better idea
                    } else {
                        tree.src = '/images/tree3.png';
                        health.innerText = "<33%"
                    }
                }
                if (expenses < income) {
                    if ((income - 100) < expenses) {     // 100 is a baseline net value. change if you have a better idea
                        tree.src = '/images/tree2.png';
                        health.innerText = "66%"        // percentages are dumb. change if you have a better idea
                    } else {
                        tree.src = '/images/tree1.png';
                        health.innerText = "100%"
                    }
                }
            })
        }
    })
}
insertTree();