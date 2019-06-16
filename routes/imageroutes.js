const upload = require('../image-upload')

module.exports = app => {
    const uploadImg = upload.single('image')

    app.post('/image', (req, res) => {
        uploadImg(req, res, (e) => {
            if (e) {
                console.log(e)
            }
            return res.json({'imageUrl': req.file.location})
        })
    })
}