// Write your "projects" router here!
const express = require("express")
const projectsRouter = express.Router()
const Projects = require("./projects-model")
const {validateProjectId , validateProject} = require("./projects-middleware")

projectsRouter.get("/", async (req, res, next)=>{
    const projects = await Projects.get()
    try {
        if (projects.length) {
            res.status(200).json(projects)

        } else {
            res.status(200).json([])
        }
    }
    catch(error) {
        next(error)
    }
})

projectsRouter.get("/:id", validateProjectId, async (req, res, next)=>{
    const {id} = req.params
    const projects = await Projects.get(id)
    try {
        res.status(200).json(projects)
    }
    catch(error) {
        next(error)
    }
})

projectsRouter.post("/", validateProject, async (req, res, next) =>{
    const {name, description, completed} = req.body
    const project = await Projects.insert({name, description, completed})
    try {
        res.status(200).json(project)
    }
    catch(error) {
        next(error)
    }
})

projectsRouter.put("/:id", validateProjectId, validateProject, async (req, res, next)=>{
    const {id} = req.params
    const {name, description, completed} = req.body
    const project = await Projects.update(id, {name, description, completed} )
    try {
        res.status(200).json(project)
    }
    catch(error) {
        next(error)
    }

})

projectsRouter.delete("/:id", validateProjectId, async (req, res, next)=>{
    const {id} = req.params
    const project = await Projects.remove(id)
    try {
        res.status(200).json(project)
    }
    catch(error) {
        next(error)
    }

})

projectsRouter.get("/:id/actions", validateProjectId, async (req, res, next)=>{
    const {id} =req.params
    const actionsList = await Projects.getProjectActions(id)
    try {
        if (actionsList.length) {
            res.status(200).json(actionsList)

        } else {
            res.status(200).json([])
        }    }
    catch(error) {
        next(error)
    }
})

projectsRouter.use((error, req, res, next)=>{
    res.status(error.status || 500).json({message: error.message || "the request failed"})
})

module.exports = projectsRouter
