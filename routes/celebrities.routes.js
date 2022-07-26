const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model")


router.get("/create", (req, res, next)=>{
    res.render("celebrities/new-celebrity")
})


router.post("/create", (req, res, next)=>{

    const {name, occupation, catchParse} = req.body

    Celebrity.create({name, occupation, catchParse})
    .then(res.redirect("/celebrities"))
    .catch(err=>next(err))

})

router.get("/", (req, res, next)=>{
    
    Celebrity.find()
    .then(celebrities=> res.render("celebrities/celebrities", {celebrities}))
    .catch(err=>next(err))

})


module.exports = router
