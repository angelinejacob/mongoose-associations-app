const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
})

const albumSchema = new mongoose.Schema({
    title: String,
    year: String,
    artist: String,
    songs: [songSchema],
})

const Album = mongoose.model('Album', albumSchema)
const Song = mongoose.model('Song', songSchema)

module.exports = { Album, Song }