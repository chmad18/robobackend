const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
  })

  const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(400).json('unable to get detect face'));
  }

const handleSubmit = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(error => res.status(400).json(error));
}

module.exports = {
    handleSubmit: handleSubmit,
    handleAPICall: handleAPICall
}