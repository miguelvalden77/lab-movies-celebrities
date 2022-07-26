const {Schema, model} = require("mongoose")

const CelebritieSchema = new Schema({
    name: String,
    occupation: String,
    catchParse: String
})

const Celebritie = model("Celebritie", CelebritieSchema)

module.exports = Celebritie
