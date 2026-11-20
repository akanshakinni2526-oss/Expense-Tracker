let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let balance = document.getElementById("balance");
let income = document.getElementById("income");
let expense = document.getElementById("expense");
let tableBody = document.getElementById("tableBody");

function logout(){
    window.location.href = "index.html";
}

function displayTransactions(){

    tableBody.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item,index)=>{

        if(item.type=="Income"){
            totalIncome += item.amount;
        }else{
            totalExpense += item.amount;
        }

        tableBody.innerHTML += `
        <tr>
            <td>${item.title}</td>
            <td>₹${item.amount}</td>
            <td>${item.type}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                onclick="deleteTransaction(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;

    });

    income.innerHTML="₹"+totalIncome;
    expense.innerHTML="₹"+totalExpense;
    balance.innerHTML="₹"+(totalIncome-totalExpense);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    drawChart(totalIncome,totalExpense);
}

document.getElementById("addBtn").addEventListener("click",function(){

    let title=document.getElementById("title").value;
    let amount=parseFloat(document.getElementById("amount").value);
    let type=document.getElementById("type").value;

    if(title=="" || isNaN(amount)){
        alert("Please fill all fields");
        return;
    }

    transactions.push({
        title:title,
        amount:amount,
        type:type
    });

    document.getElementById("title").value="";
    document.getElementById("amount").value="";

    displayTransactions();

});

function deleteTransaction(index){

    transactions.splice(index,1);

    displayTransactions();

}

let chart;

function drawChart(incomeValue,expenseValue){

    let ctx=document.getElementById("expenseChart");

    if(chart){
        chart.destroy();
    }

    chart=new Chart(ctx,{
        type:"pie",
        data:{
            labels:["Income","Expense"],
            datasets:[{
                data:[incomeValue,expenseValue]
            }]
        }
    });

}

displayTransactions();