const transactionsContainer = document.getElementById('transactions');


const fillTransactions=()=>{

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



fillTransactions();