const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json('empty fields');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(error => res.status(400).json(error));
        }
    })
    .catch(error => res.status(400).json('Wrong email and password combination'));
}

module.exports = {
    handleSignin: handleSignin
}