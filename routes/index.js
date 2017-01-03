module.exports = function (req, res) {
    res.render('index', {message: req.flash('message')});
};
