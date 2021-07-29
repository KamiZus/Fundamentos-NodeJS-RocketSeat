// Middleware
class Routers {

  verifyIfExistsAccountCPF(req, res, next) {
    const { cpf } = req.headers

    const customers = require("../controllers/routers.js")

    const customer = customers.find(customer => customer.cpf === cpf)

    if (!customer) {
      return res.status(400).json({ error: "Customer not found!" })
    }

  req.customer = customer

  return next()

  }

  getBalance(req, res, next) {
    const balance = req.reduce((acc, operation) => {
      if (operation.type === 'credit') {
        return acc + operation.amount
      } else {
        return acc - operation.amount
      }
    }, 0)
    
    return balance
    
  }

}

module.exports = new Routers

