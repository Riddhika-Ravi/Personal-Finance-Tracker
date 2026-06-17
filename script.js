let transactions = [];

let chart;


// Load saved transactions

window.onload = function () {

    const saved = localStorage.getItem("transactions");

    if (saved) {

        transactions = JSON.parse(saved);

    }

    displayTransactions();

    updateSummary();

    updateChart();



    document

        .getElementById("typeFilter")

        .addEventListener(

            "change",

            displayTransactions

        );



    document

        .getElementById("monthFilter")

        .addEventListener(

            "change",

            displayTransactions

        );



    document

        .getElementById("date")

        .valueAsDate = new Date();

}




// ADD TRANSACTION


function addTransaction(){


    const description =

    document

    .getElementById(

        "description"

    ).value.trim();




    const amount = Number(

    document

    .getElementById(

        "amount"

    ).value

    );




    const date =

    document

    .getElementById(

        "date"

    ).value;




    const category =

    document

    .getElementById(

        "category"

    ).value;




    const type =

    document

    .querySelector(

    'input[name="type"]:checked'

    ).value;





    if(

        description===""

        ||

        amount<=0

        ||

        !date

    ){

        alert(

        "Please fill all fields"

        );

        return;

    }





    const transaction={


        id:Date.now(),


        description,


        amount,


        category,


        type,


        date


    };





    transactions.unshift(

        transaction

    );





    localStorage.setItem(

        "transactions",

        JSON.stringify(

            transactions

        )

    );



    displayTransactions();

    updateSummary();

    updateChart();



    clearForm();

}




// CLEAR FORM


function clearForm(){



document

.getElementById(

"description"

).value="";



document

.getElementById(

"amount"

).value="";



document

.getElementById(

"category"

).selectedIndex=0;



document

.getElementById(

"date"

).valueAsDate=

new Date();


}






// DISPLAY TRANSACTIONS



function displayTransactions(){



const list=


document

.getElementById(

"transactionList"

);




list.innerHTML="";





let filtered=[

...transactions

];





const typeFilter=

document

.getElementById(

"typeFilter"

).value;




const monthFilter=

document

.getElementById(

"monthFilter"

).value;






if(

typeFilter!=="all"

){


filtered=

filtered.filter(


t=>

t.type===typeFilter


);


}







if(

monthFilter!=="all"

){


filtered=

filtered.filter(


t=>{


const month=

new Date(

t.date

).getMonth();



return month==monthFilter;



});


}








if(

filtered.length===0

){

list.innerHTML=`

<p

style="

font-size:22px;

color:gray;

"

>

No transactions yet.

Add your first entry above.

</p>

`;

return;

}








filtered.forEach(


t=>{


list.innerHTML+=`


<div class="transaction">



<div class="left">



<h3>

${t.description}

</h3>




<div class="badge">

${t.category}

</div>





<div class="date">

${formatDate(

t.date

)}

</div>




</div>






<div class="right">



<div

class="amount

${t.type}"

>


${

t.type==="income"

?

"+"

:

"-"

}


₹${t.amount}



</div>





<button

class="delete-btn"


onclick=

"deleteTransaction(

${t.id}

)"


>

🗑️

</button>



</div>




</div>

`;

});



}








// DELETE TRANSACTION



function deleteTransaction(id){



transactions=


transactions.filter(


t=>


t.id!==id


);





localStorage.setItem(

"transactions",

JSON.stringify(

transactions

)

);





displayTransactions();

updateSummary();

updateChart();


}









// SUMMARY



function updateSummary(){



let income=0;



let expense=0;





transactions.forEach(


t=>{



if(

t.type==="income"

){


income+=

t.amount;


}



else{


expense+=

t.amount;


}


});


const balance=

income-expense;






document

.getElementById(

"income"

).innerText=


"₹"+income;







document

.getElementById(

"expense"

).innerText=


"₹"+expense;







document

.getElementById(

"balance"

).innerText=


"₹"+balance;

}










// PIE CHART




function updateChart(){



const totals={};






transactions.forEach(


t=>{



if(

t.type==="expense"

){



if(

totals[

t.category

]

){


totals[

t.category

]+=

t.amount;


}



else{


totals[

t.category

]=

t.amount;


}



}



});







const labels=


Object.keys(

totals

);




const data=


Object.values(

totals

);






const colors=[


"#6366f1",

"#22c55e",

"#f59e0b",

"#ef4444",

"#14b8a6",

"#a855f7",

"#ec4899",

"#0ea5e9",

"#64748b"


];








if(chart){

chart.destroy();

}






const ctx=


document

.getElementById(

"pieChart"

);








chart=


new Chart(


ctx,


{


type:"pie",



data:{


labels:labels,



datasets:[{


data:data,


backgroundColor:

colors



}]

},





options:{


responsive:true,



plugins:{



legend:{


position:

"bottom"


}



}



}



}



);



}








// FORMAT DATE



function formatDate(date){



const options={


day:"numeric",


month:"short",


year:"numeric"


};





return new Date(

date

).toLocaleDateString(

"en-IN",

options

);


}









// REAL AI USING GEMINI API



async function getAdvice() {



const adviceBox =

document.getElementById(

"advice"

);



if(transactions.length===0){

adviceBox.innerHTML=

"Add some transactions first.";

return;

}



let expenseTotals={};



transactions.forEach(t=>{


if(t.type==="expense"){


if(

expenseTotals[t.category]

){

expenseTotals[t.category]+=

t.amount;

}


else{

expenseTotals[t.category]=

t.amount;

}

}


});




let expenseText="";


for(

let category

in

expenseTotals

){

expenseText+=

`${category}: ₹${expenseTotals[category]}\n`;

}



const prompt=`

You are a personal finance advisor.

Analyze these expenses:

${expenseText}

Give:

1. Highest spending category

2. Spending pattern

3. Tips to save money

4. Keep response below 100 words.

`;




adviceBox.innerHTML=

"Generating advice...";



const API_KEY="YOUR_API_KEY";


const url =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;


const body={

contents:[

{

parts:[

{

text:prompt

}

]

}

]

};




try{


const response=

await fetch(

url,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify(

body

)

}

);




const data=

await response.json();




const answer=

data

.candidates[0]

.content

.parts[0]

.text;




const cleanAnswer =

answer

.replace(/\*\*/g,"")

.replace(/\*/g,"");



advice.innerHTML =

cleanAnswer.replace(

/\n/g,

"<br>"

);



}


catch(error){


adviceBox.innerHTML=

"Failed to get AI advice.";



console.log(error);


}



}