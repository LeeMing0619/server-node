const { matchedData } = require('express-validator')
const clientModel = require('../models/tClient')
const connectModel = require('../models/tClientConnect')
const utils = require('../middleware/utils')

exports.getDepositInfo = async (req, res) => {
    try {
        req = matchedData(req)

        const result = await clientModel.getItemsByName(req.id)
        const balance = result.map(data => ({bankBalance: data.bankBalance}))

        res.status(200).json(balance)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getJoinTimeInfo = async (req, res) => {
    try {
        req = matchedData(req)
        
        const result = await connectModel.fetchConnectInfoById(req.id)
        const date = result.map(data => ({time: data.time}))

        res.status(200).json(date)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getBankInfo = async (req, res) => {
    try {
        req = matchedData(req)
        
        let result = await clientModel.getItemsByName(req.id)
        info = result.map(data => ({
            bank: data.bank,
            bankAccount: data.bankAccount,
            bankOwner: data.bankOwner
        }))

        res.status(200).json(info)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getOutbalanceInfo = async (req, res) => {
    try {
        req = matchedData(req)
        let amount = await clientModel.getRequestAmount(req.id)
        amount = amount.map(a => ({
            bankOutBalance: req.amount
        }))

        res.status(200).json(amount)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getUserLoginChk = async (req, res) => {
    try {
        req = matchedData(req)

        let results = await clientModel.getItemsByName(req.id)
        results = results.map(result => ({
            is_login: result.is_login
        }));

        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(400)
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getUserIdChk = async (req, res) => {
    try {
        req = matchedData(req)

        let results = await clientModel.getItemsByName(req.id)
        results = results.map(result => ({
            id: result.name
        }));

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getUserOvernightInfo = async (req, res) => {
    try {
        req = matchedData(req)

        let results = await clientModel.getItemsByName(req.id)
        results = results.map(result => ({
            enableOvernight: result.enableOvernight
        }));

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getNewMember = async (req, res) => {
    try {
        const id = req.query.username.trim().tolowercase()
        const password = req.query.password
        const name = req.query.name
        const mobile = req.query.mobile
        const recommender = req.query.recommender
        const bank = req.query.bank
        const bankAccount = req.query.bankAccount
        const bankOwner = req.query.bankOwner
        const email = req.query.email

        let result = await clientModel.registerNewMember(id, password, name, mobile, recommender, bank, bankAccount, bankOwner, email)
        if (result == true) {
            res.status(200)
        } else {
            res.status(409)
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}