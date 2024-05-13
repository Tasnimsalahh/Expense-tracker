var accountName = document.getElementById('accountName');
var accountBalance = document.getElementById('accountBalance');

async function getAccount() {
    var response = await fetch(`http://${window.location.host}/api/account/?format=json`);
    var finalResponse = await response.json();
    console.log(finalResponse.account.name);
    user = finalResponse;
    displayAccount();
}
getAccount();

// function displayAccount() {
//     document.getElementById('accountName').innerText = account.length;
//     for (let i = 0; i < orders.length; i++) {
//         var account_div = document.createElement('div');
//         account_div.className = 'card p-2';
//         let account_a = document.createElement('a');
//         account_div.appendChild(account_a);
//         
//     }
// }

function displayAccount() {
    const accountsContainer = document.getElementById('accountsContainer');

    accounts.forEach(account => {
        const accountDiv = document.createElement('div');
        accountDiv.className = 'card p-2';
        accountDiv.style.border = 'none';
        accountDiv.innerHTML = `
            <a name="" id="" class="btn btn-secondary" href="#" role="button">
                ${account.name}<br>
                <span class="badge bg-primary">${account.balance} EGP</span>
            </a>
        `;
        accountsContainer.appendChild(accountDiv);
    });
}