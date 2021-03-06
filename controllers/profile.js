const handleGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('no matching users');
            }
        }).catch(error => res.status(400).json(error));
}

module.exports = {
    handleGet: handleGet
}