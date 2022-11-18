var currentUser;
var treeImg = document.getElementById('ernieImg');
var imgTemplate = document.getElementById('imgTemplate');
var imgCard = document.getElementById('imgCard');

// var startDate = document.getElementById('startDate').value;
// var endDate = document.getElementById('endDate').value;

var ctx = document.getElementById('expenseChart').getContext('2d');
var expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Food & Beverage', 'Hotels, Clubs etc', 'Transportation', 'Clothes', 'Technology', 'Other', 'Subscriptions'],
        datasets: [{
            label: 'Category:',
            data: [12, 19, 3, 5, 2, 3, 5],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

