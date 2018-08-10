/* 
    snoot.js
    Form validation for snoot.html 
    Author: Christopher Merriman
    Date: 8.6.18
*/

//alert('Hi, I am linked');
'use strict';
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

//Function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName('select');
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

//Function to set up document fragments for days of the month
function setUpDays() {
    var dates = document.getElementById('delivDy').getElementsByTagName('option');
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

//Function to set up the list of  based on the selected month
function updateDays() {
    var deliveryDay = document.getElementById('delivDy');
    var dates = deliveryDay.getElementsByTagName('option');
    var deliveryMonth = document.getElementById('delivMo');
    var deliveryYear = document.getElementById('delivYr');
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0;
    }
    //If Feb and 2020, 29
    if (selectedMonth === '2' && deliveryYear.options[deliveryYear.selectedIndex].value === '2020') {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    //Else if 30 day month, 30
    else if (selectedMonth === '4' || selectedMonth === '6' || selectedMonth === '9' || selectedMonth === '11') {
        deliveryDay.appendChild(thirty.cloneNode(true));        
    }
    //Else if 31 day month, 31
    else if (selectedMonth === '1' || selectedMonth === '3' || selectedMonth === '5' || selectedMonth === '7' || selectedMonth === '8' || selectedMonth === '10' || selectedMonth === '12') {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

//Function to inspect custom check box on message change
function autoCheckCustom() {
    var messageBox = document.getElementById('customText');
    //Textarea has a message, check the box
    if (messageBox.value !== '' && messageBox.value !== messageBox.placeholder) {
        document.getElementById('custom').checked = 'checked';
    }
    //Textarea has no message, uncheck the box
    else {
        document.getElementById('custom').checked = '';
    }
}

//Function to copy billing to delivery address
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll('#billingAddress input');
    var deliveryInputElements = document.querySelectorAll('#deliveryAddress input');
    //Duplicate address - checkbox is checked - copy
    if (document.getElementById('sameAddr').checked) {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector('#deliveryAddress select').value = document.querySelector('#billingAddress select').value;
    }
    //Duplicate address - checkbox not checked - erase
    else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = '';
        }
        document.querySelector('#deliveryAddress select').selectedIndex = -1;
    }
}

//Function to validate address - billing/delivery
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll('#' + fieldsetId + ' input');
    var errorDiv = document.querySelectorAll('#' + fieldsetId + ' .errorMessage')[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try {
        alert('I am executing OwO. Dont look baka');
    }
    catch(msg) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

//Function to validate entire form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formValidity = false;

    validateAddress('billingAddress');
    validateAddress('deliveryAddress');
    
    if (formValidity === true) { //Form is valid
        document.getElementById('errorText').innerHTML = '';
        document.getElementById('errorText').style.display = 'none';
        document.getElementsByTagName('form')[0].submit();
    } else {
        document.getElementById('errorText').innerHTML = 'Please fix the indicated problems and then resubmit your order.';
        document.getElementById('errorText').style.display = 'block';
        scroll(0,0);
    }
}

//Function that sets up page on a load event
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

//Function to create our event listeners
function createEventListeners() {
    var deliveryMonth = document.getElementById('delivMo');
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener('change', updateDays, false);
    } else if  (deliveryMonth.attachEvent){ 
        deliveryMonth.attachEvent('onchange', updateDays);
    }
    var deliveryYear = document.getElementById('delivYr');
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener('change', updateDays, false);
    } else if  (deliveryYear.attachEvent){ 
        deliveryYear.attachEvent('onchange', updateDays);
    }
    var messageBox = document.getElementById('customText');
    if (messageBox.addEventListener) {
        messageBox.addEventListener('change', autoCheckCustom, false);
    } else if  (messageBox.attachEvent){ 
        messageBox.attachEvent('onchange', autoCheckCustom);
    }
    var same = document.getElementById('sameAddr');
    if (same.addEventListener) {
        same.addEventListener('change', copyBillingAddress, false);
    } else if  (same.attachEvent){ 
        same.attachEvent('onchange', copyBillingAddress);
    }
    var form = document.getElementsByTagName('form')[0];
    if (form.addEventListener) {
        form.addEventListener('submit', validateForm, false);
    } else if  (form.attachEvent){ 
        form.attachEvent('onsubmit', validateForm);
    }
}

//Page load event handlers
if (window.addEventListener) {
    window.addEventListener('load', setUpPage, false);
} else if  (window.attachEvent){ 
    window.attachEvent('onload', setUpPage);
}