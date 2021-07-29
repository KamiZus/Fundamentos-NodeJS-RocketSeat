const { response } = require("express")
const express = require('express') 
const { v4: uuidv4 } = require("uuid")
const Routers = require("../models/routers.js")

const customers = []

module.exports = customers

module.exports = app => {
 
  app.use(express.json())
  
    app.post("/account", (req, res) => {
      const { cpf, name } = req.body
    
      const customerAlreadyExists = customers.some(
          (customer) => customer.cpf === cpf
      )
      
      if (customerAlreadyExists) {
          return res.status(400).json({ error: "Customer already exists!" })
      }
    
      customers.push({
          cpf,
          name,
          id: uuidv4(),
          statement: []
      })

      module.exports = customers

      return res.status(201).send()
    })

    app.use(Routers.verifyIfExistsAccountCPF)

    app.get("/statement", (req, res) => {
      const { customer } = req
      return res.json(customer.statement)
    })

    app.post("/deposit", (req, res) => {
      const { description, amount } = req.body;
    
      const { customer } = req
    
      const statementOperation = {
          description,
          amount,
          created_at: new Date(),
          type: "credit"
      }
    
      customer.statement.push(statementOperation)

      module.exports = customers
    
      return res.status(201).send()
    })

    app.post("/withdraw", (req, res) => {
      const { amount } = req.body
      const { customer } = req
    
      const balance = Routers.getBalance(customer.statement)
    
      if (balance < amount) {
          return res.status(400).json({ error: "Insufficient funds!" })
      }
    
      const statementOperation = {
          amount,
          created_at: new Date(),
          type: "debit"
      }
    
      customer.statement.push(statementOperation)

      module.exports = customers
    
      return res.status(201).send()
    })

    app.get("/statement/date", (req, res) => {
      const { customer } = req
      const { date } = req.query
    
      const dateFormat = new Date(date + " 00:00")
    
      const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())
    
      return res.json(statement)
    })

    app.put("/account", (req, res) => {
      const { name } = req.body
      const { customer } = req
    
      customer.name = name

      module.exports = customers
    
      return res.status(201).send()
    })

    app.get("/account", (req, res) => {
      const { customer } = req
    
      return res.json(customer)
    })

    app.delete("/account", (req, res) => {
      const { customer } = req
    
      // splice
      customers.splice(customer, 1)

      module.exports = customers
    
      return res.status(200).json(customers)
    })

    app.get("/balance", (req, res) => {
      const { customer } = req
    
      const balance = Routers.getBalance(customer.statement)
    
      return res.json(balance)
    })

}
