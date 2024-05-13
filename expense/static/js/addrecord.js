//function to get category or account info
async function getInfo(info){
    var response = await fetch(`http://${window.location.host}/api/${info}/?format=json`);
    var finalresponse = await response.json();
    return finalresponse;
}
//function to post category
async function addData(data , type){
    const csrfToken = getCookie('csrftoken');
    let response = await fetch(`http://${window.location.host}/api/${type}/?format=json`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data)
    })
    console.log(response.json());
}
//function to display data in dropdown menu
function displayInfo(info,data){
    let dropdown = document.getElementById(`${info}dropdown`);
   let dropDownData = ``;
    for(let i=0 ;i<data.length;i++){
        let infoName;
        let infoId=data[i].id;
        if(info == 'category'){
            infoName=data[i].title;
        }
        else if(info == 'account'){
            infoName=data[i].name;
        }
        dropDownData += ` <option value="${infoId}">${infoName}</option>`;
    }
    dropdown.innerHTML=dropDownData
}
//
document.querySelectorAll('input[name="btnradio"]').forEach(radio => {
    radio.addEventListener('change', async function() {
        // This function is triggered whenever a radio button is selected
        let sign = document.getElementById('sign');
       console.log(sign.innerHTML);
       if(this.id == 'expense'){
            sign.innerHTML='-';
       }
       else if(this.id == 'income'){
        sign.innerHTML='+';
       }
      await displayAndFetchData('category');
      await displayAndFetchData('account');
       
    });
});
//adding new category 
document.getElementById("category-btn").addEventListener('click',async function(){
    let catName=document.getElementById('categoryName').value;
    let catColor = document.getElementById('categoryColor').value;
    let category = {
        title : catName,
        color : catColor
    }
    addData(category,'category');
    await displayAndFetchData('category');
})

//To add new record 
document.getElementById('saveBtn').addEventListener('click',function(){
    let catId = Number(document.getElementById('categorydropdown').value);
    let accountId = Number(document.getElementById('accountdropdown').value);
    console.log(catId,accountId);
    let date = document.getElementById('date').value 
    let time =  document.getElementById('time').value;
    let time_date = `${date}T${time}:00Z`;
    console.log(time_date);
    let amount = Number(document.getElementById('amount').value);
    let type = document.querySelector('input[name="btnradio"]:checked').id;
    if(type == 'expense'){
        amount=0-amount;
    }
    let expense = {
        amount : amount.toString(),
        time : time_date,
        category : catId,
        account : accountId
    }
    console.log(expense);
    addData(expense,'expense');
})

//function to display and fetch the required data
async function displayAndFetchData(info){
    let data = await getInfo(info);
    displayInfo(info,data);
}
//function to get token 
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  //to display categories and accounts upon opening
 displayAndFetchData('category');
 displayAndFetchData('account');

