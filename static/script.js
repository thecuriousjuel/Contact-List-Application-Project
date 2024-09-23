const tableHeading = ['#', 'First Name', 'Last Name', 'Email', 'Action'];

let userCount = 0;

const statusBarDiv = document.createElement('div');
const statusMessage = document.createElement('p');
statusBarDiv.appendChild(statusMessage);

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);


// Helper Methods
function buttonDivFunction(listOfButtonValues) {
    let buttonDiv = document.createElement('td');
    listOfButtonValues.forEach(value => {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = value;
        buttonDiv.append(buttonElement)
    });
    return buttonDiv;
}

function addSubmitAndCancelButtonFunction() {
    const listOfButtonValues = ['Submit', 'Cancel'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

function addUpdateAndDeleteButtonFunction() {
    const listOfButtonValues = ['Update', 'Delete'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

function createActionRow(addSubmitAndCancelButton = false, addUpdateAndDeleteButton = false) {
    let actionRow;
    if (addSubmitAndCancelButton) {
        actionRow = addSubmitAndCancelButtonFunction();
    }
    else if (addUpdateAndDeleteButton) {
        actionRow = addUpdateAndDeleteButtonFunction();
    }
    return actionRow
}

function setStatusMessage(message) {
    statusMessage.innerText = 'Status: ' + message;
}

function createUserInputHeadingFunction() {
    let tableHeadingDiv = document.createElement('tr');

    tableHeading.forEach(value => {
        let tableHeadingElement = document.createElement('th');
        tableHeadingElement.innerText = value;
        tableHeadingDiv.appendChild(tableHeadingElement);
    })
    return tableHeadingDiv;
}

function createTextBoxInsideTableRow() {
    const numberOfTextBox = tableHeading.length;
    const userInputDiv = document.createElement('tr');
    for (let i = 1; i < numberOfTextBox - 1; i++) {
        let tr = document.createElement('td');
        let inputElement = document.createElement('input');
        if (tableHeading[i].toLowerCase() === 'email') {
            inputElement.setAttribute('type', 'email');
        }
        else {
            inputElement.setAttribute('type', 'text');
        }
        inputElement.setAttribute('placeholder', tableHeading[i]);
        tr.appendChild(inputElement);
        userInputDiv.appendChild(tr);
    }
    return userInputDiv;
}

function createUserInputRowFunction() {
    const rowNumber = document.createElement('td');
    rowNumber.innerText = userCount;

    const userInputDiv = createTextBoxInsideTableRow();
    userInputDiv.prepend(rowNumber);

    const actionRow = createActionRow(addSubmitAndCancelButton=true);
    userInputDiv.appendChild(actionRow);

    return userInputDiv;

}

function createMainTable() {
    const tableContainerDiv = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainerDiv.appendChild(table);
    return tableContainerDiv;

}

function loadMainPage(event) {
    setStatusMessage("Click on create contact button.");

    const mainContainer = document.querySelector('.main-container');

    const appNameDiv = document.createElement('div');
    const appNameText = document.createElement('p');

    appNameText.innerText = "Contacts List Applicarion";
    appNameText.style.fontSize = '2rem';
    appNameDiv.appendChild(appNameText);

    const tableContainerDiv = createMainTable();

    const createButtonDiv = document.createElement('div');
    const createButton = document.createElement('button');

    createButton.innerText = 'Create Contact';
    createButtonDiv.appendChild(createButton);
    createButton.addEventListener('click', createContactFunction);

    mainContainer.appendChild(appNameDiv);
    mainContainer.appendChild(statusBarDiv);
    mainContainer.appendChild(tableContainerDiv);
    mainContainer.appendChild(createButtonDiv);
    // console.log(mainContainer.outerHTML);
}

function createContactFunction(event) {
    setStatusMessage('Please enter User details.');
    if (userCount == 0) {
        const tableHead = document.querySelector('thead');
        const createUserInputHeading = createUserInputHeadingFunction();
        tableHead.appendChild(createUserInputHeading);
    }
    userCount += 1

    const tableBody = document.querySelector('tbody');
    const createUserInputRow = createUserInputRowFunction()
    tableBody.appendChild(createUserInputRow);

    submitInput.addEventListener('click', (event) => {
        firstName = firstNameInput.value;
        lastName = lastNameInput.value;
        email = emailInput.value;
        if (!firstName) {
            setStatusMessage('Firstname not provided.')
        }
        else if (!lastName) {
            setStatusMessage('Lastname not provided.')
        }
        else if (!email) {
            setStatusMessage('Email not provided.')
        }
        else {
            setStatusMessage(`Contact '${firstName} ${lastName}' is saved.`);
            const submitButtonParentElement = submitInput.parentElement.parentElement.parentElement;
            let count = 0;
            while (submitButtonParentElement.firstChild) {
                if (!count) {
                    count = submitButtonParentElement.firstChild.innerText;
                }
                submitButtonParentElement.removeChild(submitButtonParentElement.firstChild);
            }
            const countElement = document.createElement('p');
            const firstNameElement = document.createElement('p');
            const lastNameElement = document.createElement('p');
            const emailElement = document.createElement('p');
            const actionsInput = document.createElement('div');
            const updateInput = document.createElement('button');
            const deleteInput = document.createElement('button');

            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            countElement.innerText = count;
            firstNameElement.innerText = firstName;
            lastNameElement.innerText = lastName;
            emailElement.innerText = email;
            updateInput.innerText = 'Update';
            deleteInput.innerText = 'Delete'

            countElement.style.textAlign = 'center';
            firstNameElement.style.textAlign = 'center';
            lastNameElement.style.textAlign = 'center';
            emailElement.style.textAlign = 'center';

            actionsInput.appendChild(updateInput);
            actionsInput.appendChild(deleteInput);

            td1.appendChild(countElement);
            td2.appendChild(firstNameElement);
            td3.appendChild(lastNameElement);
            td4.appendChild(emailElement);
            td5.appendChild(actionsInput);

            submitButtonParentElement.appendChild(td1);
            submitButtonParentElement.appendChild(td2);
            submitButtonParentElement.appendChild(td3);
            submitButtonParentElement.appendChild(td4);
            submitButtonParentElement.appendChild(td5);

        }
        console.log(firstName, lastName, email);
    });
    cancelInput.addEventListener('click', (event) => {
        const cancelButtonParentElement = cancelInput.parentElement.parentElement.parentElement;
        cancelButtonParentElement.remove();
    });
}

