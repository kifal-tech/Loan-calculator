const heading = document.querySelector('.heading');
const loanForm = document.querySelector('#loan-form');
const loanAmount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('.btn');
const monthlyPayments = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalinterest = document.querySelector('#total-interest');
const result = document.getElementById('results');
const loading = document.getElementById('loading');
const moredetail = document.getElementById('moredetail');
const amortization = document.getElementById('amortization');
const details = document.querySelector('.detailss');
details.style ='display: none;';

let MP, TP, TI;

loanForm.addEventListener('submit', start1)
loanAmount.addEventListener('click', start2)
interest.addEventListener('click', start2)
years.addEventListener('click', start2)
amortization.addEventListener('click', start3)



// UI Class
class UI { 

  // Clearing
  clearui() {
    loanAmount.value = '';
    interest.value = '';
    years.value = '';
    
  };

  // Calcuation
  calculate() {
    let IM, R, P, n, x, x2, t, d;
    
    n = 12;
    t = n * years.value;
    R = interest.value / 100;
    P = loanAmount.value;
    
    // Calculale
    IM = P * (R / n);
    x = 1 + (R / n);
    x2 = Math.pow(x, -t);
    d = Math.abs(1 - x2);
    MP = IM / d;
    TP = MP * t;
    TI = TP - P;
  };

  // Printing
  printdetails() {
    // Table
    const p = document.createElement('table');
    p.className = 'detail'
    p.innerHTML = `  
    <thead>
      <tr>
        <th>Loan Amount $</th>
        <th>Interest %</th>
        <th>Years</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${loanAmount.value}</td>
        <td>${interest.value}</td>
        <td>${years.value}</td>
      </tr>
    </tbody> 
    `
    // Inserting calculated value
    const resultheading = document.getElementById('resultheading');

    monthlyPayments.value = MP.toFixed(2);
    totalPayment.value = TP.toFixed(2);
    totalinterest.value = TI.toFixed(2);

    result.insertBefore(p, resultheading);

    
    
  };
  // show  loading
  showresult() {
    loading.style = 'display: unset;';
    setTimeout(function () {
      loading.style = 'display: none;';
      result.style   = 'display: unset;';
    }, 3000)  
  }
  // hide result
  hideresult() {
    result.style = 'display: none;';
    if (result.firstElementChild.classList == 'detail') {
      result.firstElementChild.remove();
    }
  }
  //Alert notification
  creatAlert() {
    const div = document.createElement('div');
    div.className = 'alertDiv';
    const alert = document.createElement('p');
    const loanheading = document.getElementById('loanheading');
    alert.innerHTML = 'Please fill in all fields'
    div.appendChild(alert);
    const card = document.getElementById('card');
    card.insertBefore(div, loanheading);
    
    setTimeout(function () {
      div.remove();
    },3000)

  }
};


// detail calculation
class detailCalculation{

  // Amortization Schedule
  amor() {
    let P, R, MP, Tmp, Rb, x, Im, Pri, Ending, starting;
    P = loanAmount.value;
    let n = 12;
    starting = P
    let t = n * parseFloat(years.value);
    R = interest.value / 100;
    MP = parseFloat(monthlyPayments.value);
    
    const p = document.createElement('table');
    p.className = 'sectable'
    const details = document.querySelector('.detailss');
    

    const thead = document.createElement('thead');
    p.appendChild(thead);
    thead.innerHTML = `
    <tr>
      <th></th>
      <th>Starting Balance</th>
      <th>Interest</th>
      <th>Principal</th>
      <th>Ending Balance</th>
    </tr>
    `
    const tbody = document.createElement('tbody');
    p.appendChild(tbody);
    starting = P
    for (let i = 0; i < t; i++){
      Tmp = MP * i;
      Rb = P - Tmp;
      x = R / n;
      Im = Rb * x;
      Pri = MP - Im; 
      Ending = starting -Pri;

      let row = document.createElement('tr');
      row.innerHTML = `
      <td>${i + 1}</td>
      <td>${Rb.toFixed(2)} </td>
      <td>${Im.toFixed(2)} </td>
      <td>${Pri.toFixed(2)} </td>
      <td>${Ending.toFixed(2)}</td>
      `
      starting = Ending
      tbody.appendChild(row);
      
    }
    details.appendChild(p);
  }

  showresult() {
    details.style = 'display = block;'
  }

  removedetails() {
    if (details.firstElementChild != null) {
      details.firstElementChild.remove();
    }
  }
};


function start1(e) {
  if (loanAmount.value === '' || interest.value === ''|| years.value === '') {
    // alert('Please fill all the feild')
    const ui = new UI();
    ui.creatAlert();
  } else {
    const ui = new UI();
    ui.calculate();
    ui.printdetails();
    ui.showresult();
    const dc = new detailCalculation();
    dc.amor();
    ui.clearui();
  }
  e.preventDefault();
}

function start2(e) {
  const ui = new UI();
  ui.hideresult();
  const dc = new detailCalculation();
  dc.removedetails();
  e.preventDefault();
}
  

function start3(e) { 
  const dc = new detailCalculation();
  dc.showresult(); 
  e.preventDefault();
}
 
