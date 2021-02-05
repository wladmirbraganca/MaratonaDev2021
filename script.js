const Modal = {
  open() {
    // Abrir modal
    //adicionar a class active ao modal
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
  // pode-se trocar tudo por toogle().
}
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },
  set(transaction) {
    localStorage.setItem("dev.finances:transaction", JSON.stringify(transaction))
  }
}

const Transaction = {
  /* all: [
     {
       description: 'Luz',
       amount: -50000,
       date: '23/01/2021',
     },
     {
       description: 'Website',
       amount: 500000,
       date: '23/01/2021',
     },
     {
       description: 'Internet',
       amount: -20000,
       date: '23/01/2021',
     },
   ],*/

  //no lugar da arrey fica o Storage.get()

  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)


    App.reload()

  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })
    //somar as entradas
    return income;

  },
  expenses() {
    //somar as saídas
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    })
    //somar as entradas
    return expense;
  },
  total() {
    //entradas - saídas
    return Transaction.incomes() + Transaction.expenses();
  }
}
// Eu preciso pegar as minhas transações do meu 
// objeto aqui no javascript e colocar
// no html

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {

    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" :
      "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="remover transação">
        </td>
      
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())


  },

  clearTransaction() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100
    //ou também "value = Number(value.replace(/\,\./g, """))*100

    return value
  },
  formateData(date) {
    const splittedDate = date.split("-")

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value

  }
}

const Form = {
  //linkando javascript com o HTML
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  //pegando apenas o valor
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    if (description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "") {
      throw new Error("Por favor preencha todos os campos")
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formateData(date)

    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transaction) {
    Transaction.add(transaction)

  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      //verificaar se todas as infromações foram reenchidas
      Form.validateFields()
      //formatar os dados para salvar
      const transaction = Form.formatValues()
      //salvar
      Form.saveTransaction(transaction)
      //apagar os dados no formulário
      Form.clearFields()
      // modal feche
      Modal.close()

    } catch (error) {
      alert(error.message)
    }


  }
}


const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()

    Storage.set(Transaction.all)

  },
  reload() {
    DOM.clearTransaction()
    App.init()
  },
}

App.init()


