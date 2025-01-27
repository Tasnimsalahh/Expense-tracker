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
    return  response;
}
//function to display data in dropdown menu
function displayInfo(info,data){
    let dropdown = document.getElementById(`${info}dropdown`);
   let dropDownData = ``;
    for(let i=0 ;i<data.length;i++){
        let infoName;
        let infoId=data[i].id;
        let currency = '';
        if(info == 'category'){
            infoName=data[i].title;
        }
        else if(info == 'account'){
            infoName=data[i].name;
            currency=data[i].currency;
        }
        dropDownData += ` <option value="${infoId}-${currency}">${infoName}</option>`;
    }
    dropdown.innerHTML=dropDownData;
    document.getElementById('accountdropdown').value='';
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
    let response = await addData(category,'category');
    await displayAndFetchData('category');
    if(!response.ok){
        displayMsg('fail',`Couldn't add category , Please try again`);
    }
    else{
        displayMsg('success',`Category added successfully`);

    }
})

//To add new record 
document.getElementById('saveBtn').addEventListener('click',async function(){
    let catId = document.getElementById('categorydropdown').value;
    catId=Number(catId.split('-')[0]);
    console.log(catId);
    let accountId =document.getElementById('accountdropdown').value;
    accountId=Number(accountId.split('-')[0]);
    let date = document.getElementById('date').value 
    let time =  document.getElementById('time').value;
    let time_date = `${date}T${time}:00Z`;
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
    let response = await addData(expense,'expense');
    if(!response.ok){
        displayMsg('fail' ,`Couldn't add record , Please try again`);
    }
    else{
        displayMsg('success','Record added successfully');
    }
    clearform();
    console.log(response);
    
    
})
//to change currency depending on account selected 
let account =document.getElementById('accountdropdown');
account.addEventListener('change',function(){
    let value = account.value.split('-')[1]
    document.getElementById('currency').innerHTML = value;
})

//refresh page on closing the addrecord form to load new records
document.getElementById('closeXbutton').addEventListener('click',function(){
    refreshOnClosing();
});
document.getElementById('closebtn').addEventListener('click',function(){
    refreshOnClosing();
});


//Displaying msg
function displayMsg(status , msg){
    var successMessage = document.querySelector('.alert-success');
    if(status == 'success'){
    successMessage.innerHTML=msg;
    successMessage.classList.add('show');
    }
    else{
        successMessage.innerHTML=msg;
        successMessage.classList.remove('alert-success');
        successMessage.classList.add('alert-danger');
        successMessage.classList.add('show');
    }
    // Fade out the success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        if(status != 'sucess'){
            successMessage.classList.remove('alert-danger');
            successMessage.classList.add('alert-success');
        } // Start fade out by removing 'show'
    }, 1500); // Change '3000' to however long you want the alert visible
}
function clearform(){
    let catId = document.getElementById('categorydropdown');
    let accountId = document.getElementById('accountdropdown');
    let date = document.getElementById('date'); 
    let time =  document.getElementById('time');
    let amount = document.getElementById('amount');
    catId.value='';
    accountId.value='';
    date.value='';
    time.value='';
    amount.value='';
}

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
  
 function refreshOnClosing(){
    window.location.reload();
 } 

  //to display categories and accounts upon opening
 displayAndFetchData('category');
 displayAndFetchData('account');
