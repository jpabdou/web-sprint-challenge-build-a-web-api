// Write your "actions" router here!
const express = require("express")
const actionsRouter = express.Router()
const Actions = require("./actions-model")
const {validateActionId, validateAction} = require("./actions-middleware")

actionsRouter.get("/", async (req, res, next)=>{
    const actions = await Actions.get()
    try {
        if (actions.length) {
            res.status(200).json(actions)
        }
        else {
            res.status(200).json([])
        }
    }
    catch(error) {
        next(error)
    }
})

actionsRouter.get("/:id", validateActionId, async (req, res, next)=>{
    const {id} = req.params
    const action = await Actions.get(id)
    try {
        res.status(200).json(action)
    }
    catch(error) {
        next(error)
    }
})

actionsRouter.post("/", validateAction, async (req, res, next)=>{
    const {project_id, description, notes} = req.body
    const action = await Actions.insert({project_id, description, notes})
    try {
        res.status(200).json(action)
    } 
    catch(error) {
        next(error)
    }
})

actionsRouter.use((error, req, res, next)=>{
    res.status(error.status || 500).json({message: error.message || "Request failed"})
})

module.exports =actionsRouter
