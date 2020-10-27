const router = require('express').Router()
const Album = require('../models/album').Album
const Song = require('../models/album').Song


// ALBUM INDEX PAGE
router.get('/', (req, res) => {
    Album.find({}, (error, albums) => {
        res.render('albums/index.ejs', {
            albums,
        })
    })
})

// NEW ALBUMN
router.get('/new', (req, res) => {
    res.render('albums/new.ejs')
})

// SHOW ALBUM ROUTE
router.get('/:albumId', (req, res) => {
    Album.findById(req.params.albumId, (error, album) => {
        res.render('albums/show.ejs', {
            album
        })
    })
})

// CREATE NEW ALBUM
router.post('/', (req, res) => {
    Album.create(req.body, (err, album) => {
        res.redirect('/albums')
    })
})

// ADD A SONG
router.post('/:albumId/songs', (req, res) =>{
    Album.findById(req.params.albumId, (error, album) => {
        if(error) res.send(error)
        const newSong = new Song({title: req.body.title})
        album.songs.push(newSong)
        album.save((error, album) => {
            res.redirect(`/albums/${album.id}`)
        })
    })
})

// GET FORM TO EDIT SONG
router.get('/:albumId/songs/:songId/edit', (req, res) => {
    Album.findById(req.params.albumId, (error, album) => {
        if (error) res.send(error)
        const song = album.songs.id(req.params.songId)
        res.render('songs/edit.ejs', {
            album,
            song,
        })
    })    
})

// PUT ROUTE FOR SONG - EDIT SONG  
router.put('/:albumId/songs/:songId', (req, res) => {
    const albumId = req.params.albumId;
    const songId = req.params.songId;

    Album.findById(albumId, (error, album) => {
        if (error) res.send(error)
        const song = album.songs.id(songId)
        song.title = req.body.title
        album.save((error, album) => {
            res.redirect(`/albums/${albumId}`)
        })
    })
})

// DELETE SONG
router.delete('/:albumId/songs/:songId', (req, res) => {
    const albumId = req.params.albumId;
    const songId = req.params.songId;

    Album.findById(albumId, (err, album) => {
        album.songs.id(songId).remove()
        album.save((error, album) => {
            res.redirect(`/albums/${album.id}`)
        })
    })
})

// DELETE USER
router.delete('/:albumId', (req, res) => {
    Album.findByIdAndRemove(req.params.albumId, (error, album) => {
        if (error) res.send(error)
        res.redirect('/albums')
    })
})

module.exports = router