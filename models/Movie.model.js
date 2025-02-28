const {Schema, model} = require("mongoose")

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Celebritie"
    }]
})

const Movie = model("Movie", movieSchema)

module.exports = Movie
