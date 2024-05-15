var newAccountName = document.getElementById('newAccountName');
var newAccountBalance = document.getElementById('newAccountBalance');
var newAccountCurrency = document.getElementById('newAccountCurrency');
var newAccountType = document.getElementById('newAccountType');
var newAccountColor = document.getElementById('newAccountColor');
var newAccountSubmit = document.getElementById('newAccountSubmit');


function submitNewAccount() {
    if (newAccountName.value == '') {
        alert('Account Name is required');
        return;
    } else if (newAccountBalance.value == '') {
        alert('Balance is required');
        return;
    } else if (newAccountCurrency.value == '') {
        alert('Currency is required');
        return;
    } else if (newAccountColor.value == '') {
        alert('Color is required');
        return;
    }
    var newAccount = {
        currency: newAccountCurrency.value,
        balance: newAccountBalance.value,
        name: newAccountName.value,
        color: newAccountColor.value
    };

    // Get the CSRF token from the cookie
  const csrfToken = getCookie('csrftoken');

  fetch(`https://${window.location.host}/api/account/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken // Add the CSRF token to the headers
    },
    body: JSON.stringify(newAccount)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Account created:', data);
      // Handle the response data as needed
      window.location.pathname = '';
    })
    .catch(error => {
      console.error('Error creating account:', error);
      // Display a bootstrap alert to the user
      alert('Error creating account');
      window.location.pathname = '/';
    });

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
}