//function to get category or account info
async function getInfo(info){
    var response = await fetch(`http://${window.location.host}/api/${info}/?format=json`);
    var finalresponse = await response.json();
    return finalresponse;
}
//function to post category
async function addCategory(category){
    const csrfToken = getCookie('csrftoken');
    let response = await fetch(`http://${window.location.host}/api/category/?format=json`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(category)
    })
    console.log(response.json());
}
//function to add record 
async function addRecord(){
    const csrfToken = getCookie('csrftoken');
    
}
//function to display data in dropdown menu
function displayInfo(info,data){
    let dropdown = document.getElementById(`${info}dropdown`);
   let dropDownData = ``;
    for(let i=0 ;i<data.length;i++){
        var infoName;
        if(info == 'category'){
            infoName=data[i].title;
        }
        else if(info == 'account'){
            infoName=data[i].name;
        }
        dropDownData += ` <option value="">${infoName}</option>`;
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
    addCategory(category);
    await displayAndFetchData('category');
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
 displayAndFetchData('category');
 displayAndFetchData('account');

