
async function getData(info){
    var response = await fetch(`http://${window.location.host}/api/${info}/?format=json`);
    var finalresponse = await response.json();
    return finalresponse;
}
async function getDatabyID(info ,id){
    var response = await fetch(`http://${window.location.host}/api/${info}/${id}/?format=json`);
    var finalresponse = await response.json();
    return finalresponse;
}


async function getPrimaryCurrency() {
    var response = await fetch(`http://${window.location.host}/api/balance/?format=json`);
    var finalResponse = await response.json();
    return finalResponse.primary_currency.toString();
}


async function getExch(currency) {
    var response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`);
    var finalResponse = await response.json();
    return finalResponse;
}


async function deleteDatabyId(type , id){
    const csrfToken = getCookie('csrftoken');
    let response = await fetch(`http://${window.location.host}/api/${type}/${id}/?format=json`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        
    })
    return  response;
}



async function getAndDisplayInfo(){
    let data = await getData('account');
    let records = await getData('expense');
    let primary_currency = await getPrimaryCurrency();
    let exchange = await getExch(primary_currency);
    exchange=exchange[primary_currency.toLowerCase()];
    console.log(exchange);
    records.sort((a,b)=>new Date(a.time)- new Date(b.time));
    console.log(records);
    displayAccount(data);
    calcTotalBalance(data,primary_currency,exchange);
    displayRecords(records);
    deleteRecordButton(records);
    calcCashFlow(records,primary_currency,exchange);
    let dropDown = document.getElementById('periodDropDown');
    let filteredRecords;
    dropDown.addEventListener('change',function(){
        let filterMethod = dropDown.value;
            filteredRecords=filterRecords(records,filterMethod);
            calcCashFlow(filteredRecords,primary_currency,exchange);
    })

}



function displayAccount(data) {
   let accHolder = ``;
   for ( let i=0;i<data.length;i++){
    accHolder+=`<div id="${data[i].id}"  class="card p-2" style="border: none">
    <a name="" id="accounName-${data[i].id}" class="btn btn-secondary" href="#" role="button" style=" background-color:${data[i].color};border-color:${data[i].color}; color:${getTextColor(data[i].color)}">
        ${data[i].name}<br>
        <span id="accountBalance-${data[i].id}" class="badge bg-primary">${data[i].balance + data[i].currency}</span>
    </a>
</div>`
   }
   document.getElementById('accountHolder').innerHTML=accHolder+`<div class="card p-2" style="border: none">
   <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAccountModal">
       + New Account
   </button>
</div>
`;
}



async function displayRecords(records){
    let recordHolder = ``;
    for(let i = 0 ;i<records.length;i++){
        let date = formatDate(records[i].time);
        let amount = Number(records[i].amount);
        let color;
        if(amount>0){
            color='9f9';
        }
        else{
            color='f99';
        }
        
        recordHolder+=` <tr>
        <th scope="row">${i+1}</th>
        <td><span class="badge" style="color:${getTextColor(records[i].category_color)};background-color:${records[i].category_color}; font-size:18px">${records[i].category_name}</span></td>
        <td><span class="badge" style="color:${getTextColor(records[i].account_color)};background-color:${records[i].account_color}; font-size:18px">${records[i].account_name}</span></td>
        <td>${date}</td>
        <td><span style="color:#${color}">${records[i].amount} ${records[i].account_currency}</span></td>
        <td><a
            name=""
            id=""
            class="btn btn-warning btn-sm disabled"
            href="#"
            role="button"
            >Edit</a>
            <button id="delete-${records[i].id}" type="button" class="btn btn-danger btn-sm">Delete</button>
            
        </td>
        
`;
    }
    document.getElementById('records').innerHTML=recordHolder;
}




function getTextColor(backgroundColor) {
    var r = parseInt(backgroundColor.substring(1, 3), 16);
    var g = parseInt(backgroundColor.substring(3, 5), 16);
    var b = parseInt(backgroundColor.substring(5, 7), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}




async function calcTotalBalance(data , primary_currency, exchange ){
    console.log(primary_currency.toLowerCase());
    primary_currency=primary_currency.toLowerCase();
    let totalBalance=0;
    console.log(exchange);
    for(let i=0 ;i<data.length;i++){
    totalBalance+= Number(data[i].balance) / exchange[data[i].currency.toLowerCase()];

    }
    console.log(totalBalance);
    document.getElementById('totalBalance').innerHTML=totalBalance.toFixed(2) + ' ' + primary_currency.toUpperCase();
}



function formatDate(isoDate) {
    let dateObj = new Date(isoDate);
    let year = dateObj.getFullYear().toString(); // Get last two digits of the year
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Adding 1 to month as it starts from 0
    let day = ('0' + dateObj.getDate()).slice(-2);
    let hours = ('0' + dateObj.getHours()).slice(-2);
    let minutes = ('0' + dateObj.getMinutes()).slice(-2);
    let seconds = ('0' + dateObj.getSeconds()).slice(-2);
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}



function deleteRecordButton(data){
    for(let i = 0 ; i<data.length ; i++){
        document.getElementById(`delete-${data[i].id}`).addEventListener('click',async function(){
           let response = await deleteDatabyId('expense',data[i].id);
           console.log(response);
         window.location.reload();
        })
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  document.addEventListener('DOMContentLoaded', function() {
    getAndDisplayInfo();

});
async function calcCashFlow(data , primary_currency ,exchange){
   
    // data = filterRecords(data,method); //get current month records only;
    console.log(data);
    let Income=0;
    let expense = 0;
    let cashflow=0;
    for(let i=0 ;i<data.length;i++){
        let amount = Number(data[i].amount);
        if(amount>0){
            Income += amount /exchange[data[i].account_currency.toLowerCase()] ;
        }
        else{
            expense += (0-amount) /exchange[data[i].account_currency.toLowerCase()];
        }
    }
    cashflow=Income-expense;
    console.log(Income);
    document.getElementById('home-income').innerHTML = Income.toFixed(2) +' '+ primary_currency;
    document.getElementById('home-expenses').innerHTML = expense.toFixed(2) +' '+ primary_currency;
    document.getElementById('home-cashFlow').innerHTML = cashflow.toFixed(2) +' '+ primary_currency;
    
}

function filterRecords(records,method){
    // Get the current date
    let currentDate = new Date();
    let filteredRecords;
    
    if(method=='week'){
        let sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        // Filter objects within the last 7 days
         filteredRecords = records.filter(record => {
        let recordDate = new Date(record.time);
        return recordDate >= sevenDaysAgo && recordDate <= currentDate;
        });
    }
    else if(method=='month'){
        // Get the first day of the current month
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the first day of the next month
    let firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

         filteredRecords = records.filter(record => {
            let recordDate = new Date(record.time);
             return recordDate >= firstDayOfMonth && recordDate < firstDayOfNextMonth;
            });
    }
    else{
        return records;
    }
    return filteredRecords;
}
function cashflowDisplay(data){
    
}