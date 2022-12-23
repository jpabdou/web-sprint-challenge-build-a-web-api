// add middlewares here related to actions
const Actions = require("./actions-model")

async function validateActionId(req, res, next){
    const {id} = req.params
    const action = await Actions.get(id)
    if (action) {
        req.action = action
        next()
    } else {
        next({status:404, message: "Action id not found"})
    }
}

async function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body
    if (project_id && description && notes && description.trim().length && notes.trim().length && typeof project_id === "number" && typeof description === "string" && typeof notes === "string") {
        next()
    } else {
        next({status:400, message: "Action project_id, notes, and description required"})

    }
}

module.exports = { validateActionId, validateAction}
