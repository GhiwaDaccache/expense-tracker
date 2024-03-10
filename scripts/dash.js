const transactionsContainer = document.getElementById('transactions');



const loadTransactions=()=>{

    transactionsContainer.innerHTML=''
    transactions = JSON.parse(window.localStorage.getItem('transactions'));

    transactions.map((transaction,i)=>{

        transactionsContainer.innerHTML+=`<tr class="table__row">
            <td class="table__balance table__cell u-text-right u-font-mono">${transaction.id}</td>
            <td class="table__limit table__cell u-text-right u-font-mono">${transaction.amount}</td>
            <td class="table__available table__cell u-text-right u-font-mono">${transaction.currency}</td>
            <td class="table__transfer table__cell u-text-center">${transaction.description}</td>
            <td class="table__transfer table__cell u-text-center">${transaction.type}</td>
            <td class="table__transfer table__cell u-text-center"><button class="btn" name="edit" id="edit-${transaction.id}">Edit</button></td>
            <td class="table__transfer table__cell u-text-center"><button class="btn" name="delete" id="delete-${transaction.id}">Delete</button></td>
        </tr>`
    })

    
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


loadTransactions();