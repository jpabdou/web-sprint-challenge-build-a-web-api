// add middlewares here related to projects
const Projects = require("./projects-model")

async function validateProjectId (req, res, next) {
    const project = await Projects.get(req.params.id)
    if (project) {
        req.project = project
        next()
    } else {
        next({status: 404, message: "Project id not found"})
    }
}

function validateProject (req, res, next) {
    const {name, description, completed} = req.body
    if (name && description && name.length && description.length && typeof name === "string" && typeof description === "string" && typeof completed === "boolean") {
        next()
    } else {
        next({status: 400, message: "Project name, description, and completed status required"})

    }
}

module.exports={validateProjectId, validateProject}
