var currentUser;
var treeImg = document.getElementById('ernieImg');
var imgTemplate = document.getElementById('imgTemplate');
var imgCard = document.getElementById('imgCard');
var progressBar = document.getElementsByClassName('progress-bar');
var now = new Date();

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function insertTreeName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var treeName = userDoc.data().treeName;
                document.getElementById("treeName").innerText = treeName + "'s Health";
                var changeInfo = document.getElementById('change-info');
                changeInfo.innerText = "You can change " + treeName + "'s name in Account > Tree Name"
                var tip = document.getElementById('tip-text');
                let treeName2 = treeName.toUpperCase();
                // tip.innerText = treeName2 + "'S DAILY";
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
                document.getElementById('total-expenses').innerText = "Total Expenses: " + formatter.format(expenses);
                var budget = userDoc.data().budget;
                if (budget < expenses) {
                    let bud = document.getElementById('total-budget');
                    bud.style.color = 'red';
                    bud.innerText = "You have surpassed your weekly budget by " + formatter.format((expenses - budget));
                } else {
                    let bud = document.getElementById('total-budget');
                    bud.style.color = '#73a589';
                     bud.innerText = "You're currently under your weekly budget, with " + formatter.format((budget - expenses)) + " to spare.";

                }
                var income = userDoc.data().incomeCount;
                document.getElementById('total-income').innerText = "Total Income: " + formatter.format(income);
                var net = document.getElementById('net');
                var worth = parseFloat(income) - parseFloat(expenses);
                if (expenses > income) {
                    net.style.color = 'red';
                    net.innerHTML = "Net Loss: " + formatter.format(worth);
                }
                if (expenses < income) {
                    net.style.color = '#73a589';
                    net.innerHTML = "Net Gain: " + formatter.format(worth);
                }

                var tree = document.getElementById('tree');
                var health = document.getElementById('treeHealth');
                var health2 = document.getElementById('treeHealth2');
                var health3 = document.getElementById('treeHealth3');
                var health4 = document.getElementById('treeHealth4');


                if (expenses > budget) {
                    if (expenses < (income * 0.9)) {     // 100 is a baseline net value. change if you have a better idea
                        tree.src = '/images/tree2.png';
                        health.innerText = "favorite";
                        health2.innerText = "favorite";  
                        health3.innerText = "favorite_border";  
                    } else {
                        tree.src = '/images/tree3.png';
                        health.innerText = "favorite";
                        health2.innerText = "favorite_border";
                        health3.innerText = "favorite_border";
                    }
                }
                if (expenses < budget) {
                    if (expenses > (income * 0.9)) {     // 100 is a baseline net value. change if you have a better idea
                        tree.src = '/images/tree2.png';
                        health.innerText = "favorite";
                        health2.innerText = "favorite";  
                        health3.innerText = "favorite_border";  
                    } else {
                        tree.src = '/images/tree1.png';
                        health.innerText = "favorite";
                        health2.innerText = "favorite";  
                        health3.innerText = "favorite";  
                    }
                }
            })
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    })
}
insertTree();