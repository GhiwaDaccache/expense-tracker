const transactionsContainer = document.getElementById('transactions');
const currencyApiResult = axios.get("https://rich-erin-angler-hem.cyclic.app/students/available");
const totalElement = document.getElementById('total');


// waits till elements added in html
document.addEventListener('DOMContentLoaded', function() { 
    document.getElementById('addForm').addEventListener('submit', addTransaction);   
    document.getElementById('filterForm').addEventListener('submit', filterTransactions);

    currencyApiResult.then((response) => { 
        let currencies = response.data;
        const selectElement = document.getElementById('currency');
        const selectFilterElement = document.getElementById('currencyFilter');
            currencies.forEach(currency => {
            const optionElement = document.createElement('option');
            const optionFilterElement = document.createElement('option');
    
            optionElement.value = currency.code;
            optionElement.textContent = currency.name;
            optionFilterElement.value = currency.code;
            optionFilterElement.textContent = currency.name;
    
            selectElement.appendChild(optionElement);
            selectFilterElement.appendChild(optionFilterElement);
        });
    });
});




const loadTransactions=()=>{

    transactionsContainer.innerHTML=''
    transactions = JSON.parse(window.localStorage.getItem('transactions'));

    transactions.map((transaction,i)=>{

        transactionsContainer.innerHTML+=`<tr class="table_row">
            <td class="table-cell text-right">${transaction.id}</td>
            <td class="table-cell text-right">${transaction.amount}</td>
            <td class="table-cell text-right">${transaction.currency}</td>
            <td class="table-cell text-center">${transaction.description}</td>
            <td class="table-cell text-center">${transaction.type}</td>
            <td class="table-cell text-center"><button class="btn button-style" name="edit" id="edit-${transaction.id}">Edit</button></td>
            <td class="table-cell text-center"><button class="btn button-style" name="delete" id="delete-${transaction.id}">Delete</button></td>
        </tr>`
    })

    let editBtns = document.querySelectorAll('[name="edit"]');
    for (let i = 0; i< editBtns.length; i++)
    {
        const elementId = editBtns[i].id;
        editBtns[i].addEventListener('click', function() {
            editTransaction(elementId);
        });
    }

    
    let deleteBtns = document.querySelectorAll('[name="delete"]');
    for (let i = 0; i< deleteBtns.length; i++)
    {
        const elementId = deleteBtns[i].id;
        deleteBtns[i].addEventListener('click', function() {
            deleteTransaction(elementId);
        });
    }

    const total = getTotal();
    totalElement.innerHTML = total;
    
}

function addTransaction(event) {
    let amount = event.target.amount.value;
    let currency = event.target.currency.value;
    let description = event.target.description.value;
    let type = event.target.type.value;
    transactions = JSON.parse(window.localStorage.getItem('transactions'));
    let transactionsCount = JSON.parse(window.localStorage.getItem('transactionsCount'));
    if (transactionsCount == null) {
        transactionsCount = 1;
    }
    else
    {
        transactionsCount += 1;
    }

    window.localStorage.setItem('transactionsCount', JSON.stringify(transactionsCount));
    let newTransaction = {
        id: transactionsCount,
        amount: amount,
        currency: currency,
        description: description,
        type: type,
    }

    if (!transactions) {
        transactions = [];
    }
    transactions.push(newTransaction);

    window.localStorage.setItem('transactions', JSON.stringify(transactions));
    window.location.reload();
}

function editTransaction(elementId) {
    transactions = JSON.parse(window.localStorage.getItem('transactions'));
    let newId = elementId.replace("edit-", "");
    let editElement = searchById(transactions, newId);

}

function deleteTransaction(elementId) {
    transactions = JSON.parse(window.localStorage.getItem('transactions'));
    let newId = elementId.replace("delete-", "");
    let index = transactions.findIndex(item => item.id == newId);
    transactions.splice(index, 1);
    window.localStorage.setItem('transactions', JSON.stringify(transactions));
    window.location.reload();
}

function searchById(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return array[i]; 
        }
    }
    return null; 
}

function getTotal() {
    transactions = JSON.parse(window.localStorage.getItem('transactions'));
    let sum = 0;
    for (let i = 0; i < transactions.length; i++)
    {
        currency = transactions[i].currency;
        amount = transactions[i].amount;
        const postData = {
            "from": currency,
            "to": 'USD',
            "amount": amount
            };
        
            const transformCurrency = async () => {
                const { data } = await axios.post("https://rich-erin-angler-hem.cyclic.app/students/available/convert", postData);
                console.log(data);
                sum = sum + data;
                alert('Check the console for response data.');
            };
            transformCurrency()

    }
    return sum;
}


function filterTransactions(event)
{
    let amountFrom = event.target.fromAmountFilter.value;
    let amountTo = event.target.toAmountFilter.value;
    let currency = event.target.currencyFilter.value;
    let type = event.target.typeFilter.value;
    transactions = JSON.parse(window.localStorage.getItem('transactions'));
    let filtered = transactions.filter(item => item[amount] > amountFrom);
    
    transactionsContainer.innerHTML = "";
    filtered.map((transaction,i)=>{

        transactionsContainer.innerHTML+=`<tr class="table_row">
            <td class="table-cell text-right">${transaction.id}</td>
            <td class="table-cell text-right">${transaction.amount}</td>
            <td class="table-cell text-right">${transaction.currency}</td>
            <td class="table-cell text-center">${transaction.description}</td>
            <td class="table-cell text-center">${transaction.type}</td>
            <td class="table-cell text-center"><button class="btn button-style" name="edit" id="edit-${transaction.id}">Edit</button></td>
            <td class="table-cell text-center"><button class="btn button-style" name="delete" id="delete-${transaction.id}">Delete</button></td>
        </tr>`
    })
}


loadTransactions();