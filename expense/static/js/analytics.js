const period = document.getElementById('period');
const analytics_tbody = document.getElementById('analytics_tbody');
var expenses;
const doughnutChart = document.getElementById('doughnut-chart');

async function getPrimaryCurrency() {
    var response = await fetch(`http://${window.location.host}/api/balance/?format=json`);
    var finalResponse = await response.json();
    // console.log("balance: " + finalResponse.primary_currency);
    return finalResponse.primary_currency.toString();
}

async function getExchange(currency) {
    var response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.min.json`);
    var finalResponse = await response.json();
    return finalResponse;
}

async function initialize(days) {
    var primary_currency = await getPrimaryCurrency();
    var exchange = await getExchange(primary_currency);

    await getExpenses();

    // Call the updateAnalytics function after the initialization is complete
    updateAnalytics(days, exchange, primary_currency);
}

initialize(7);

async function getExpenses() {
    var response = await fetch(`http://${window.location.host}/api/expense/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse);
    expenses = finalResponse;
}

function calcAnalytics(expenses, days, exchange, primary_currency) {
    var analytics = {};
    for (let i = 0; i < expenses.length; i++) {
        if (!analytics[expenses[i].category_name]) {
            analytics[expenses[i].category_name] = { expenses: 0, income: 0, color: expenses[i].category_color, category_name: expenses[i].category_name};
        }
        let currentDate = new Date();
        let expenseDate = new Date(expenses[i].time);
        let timeDiff = Math.abs(currentDate.getTime() - expenseDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // console.log(currentDate);
        if (diffDays <= days || days == undefined) {
            if (expenses[i].amount < 0) {
                analytics[expenses[i].category_name].expenses += expenses[i].amount / exchange[primary_currency.toLowerCase()][expenses[i].account_currency.toLowerCase()];
            } else {
                analytics[expenses[i].category_name].income += expenses[i].amount / exchange[primary_currency.toLowerCase()][expenses[i].account_currency.toLowerCase()];
            }
            analytics[expenses[i].category_name].expenses = Math.round(analytics[expenses[i].category_name].expenses * 100) / 100;
            analytics[expenses[i].category_name].income = Math.round(analytics[expenses[i].category_name].income * 100) / 100;
            analytics[expenses[i].category_name].category_color = expenses[i].color;
        }
    }
    return analytics;
}

function updateAnalytics(days, exchange, primary_currency) {
    analytics = calcAnalytics(expenses, days, exchange, primary_currency);
    // console.log("days = " + days);
    analytics_tbody.innerHTML = '';
    var labels = [];
    var data = [];
    var colors = [];
    for (let key in analytics) {
        labels.push(analytics[key].category_name);
        data.push(-analytics[key].expenses);
        colors.push(analytics[key].color);
        let row = document.createElement('tr');
        row.innerHTML += `<td><span class="badge" style="color:${getTextColor(analytics[key].color)};background-color:${analytics[key].color}; font-size:18px">${analytics[key].category_name}</span></td>`;
        row.innerHTML += encodeCash(analytics[key].expenses, primary_currency);
        row.innerHTML += encodeCash(analytics[key].income, primary_currency);
        row.innerHTML += encodeCash(analytics[key].income + analytics[key].expenses, primary_currency);
        analytics_tbody.appendChild(row);
    }
    
    for (let i = 0; i < 100; i++) {
        if (Chart.instances[i]) Chart.instances[i].destroy();
    }
    labels.sort((a, b) => data[labels.indexOf(b)] - data[labels.indexOf(a)]);
    colors.sort((a, b) => data[colors.indexOf(b)] - data[colors.indexOf(a)]);
    data.sort((a, b) => b - a);
    Chart.overrides['doughnut'].plugins.legend.labels.color = '#ccc';
    new Chart(doughnutChart, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                // y: {
                //     beginAtZero: true
                // }
            }
        }
    }).update();
}


function getTextColor(backgroundColor) {
    var r = parseInt(backgroundColor.substring(1, 3), 16);
    var g = parseInt(backgroundColor.substring(3, 5), 16);
    var b = parseInt(backgroundColor.substring(5, 7), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function encodeCash(amount, currency) {
    if (amount < 0) {
        return `<td><span style="color:#f99">${amount} ${currency}</span></td>`;
    }
    else if (amount > 0) {
        return `<td><span style="color:#9f9">+${amount} ${currency}</span></td>`;
    } else {
        return '<td><span style="color:#ddd">0</span></td>'
    }
}