const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/create", (req, res, next)=>{

    Celebrity.find().select("name")
    .then(celebrityName=> res.render("movies/new-movie", {celebrityName}))
    .catch(err=>next(err))
})

router.post("/create", (req, res, next)=>{
    
    const {title, genre, plot, cast} = req.body

    Movie.create({title, genre, plot, cast})
    .then(res.redirect("/movies"))
    .catch(err=>next(err))

})

router.get("/", (req, res, next)=>{

    Movie.find()
    .then(movies=>res.render("movies/movies", {movies}))
    .catch(err=>next(err))
    
})

router.get("/:id", (req, res, next)=>{

    const {id} = req.params

    Movie.findById(id).populate("cast")
    .then(movie=> res.render("movies/movie-details", {movie}))
    .catch(err=>next(err))

})

router.post("/:id/delete", (req, res, next)=>{
    const {id} = req.params

    Movie.findByIdAndDelete(id)
    .then(res.redirect("/movies"))
    .catch(err=>next(err))
})

router.get("/:id/edit", async (req, res, next)=>{
    try{
    const {id} = req.params

    const cast = await Celebrity.find().select("name")

    const movie = await Movie.findById(id)
    console.log(movie)

    res.render("movies/edit-movie", {movie, cast})
    }
    catch(err){next(err)}
})

router.post("/:id/edit", (req, res, next)=>{
    const {id} = req.params
    const {title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(res.redirect("/movies"))
    .catch(err=>next(err))
})


module.exports = router