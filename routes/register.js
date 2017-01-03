module.exports = function (req, res) {
    res.render('register', {message: req.flash('message')});
};
