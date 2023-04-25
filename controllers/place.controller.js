const db = require('../models');

const Place = db.place;

exports.add = function (req, res) {
    let place = new Place({
        title: 'Test2',
        description: 'Test',
        history: 'Test',
        town: 'Test',
        is_active: true,
        created_at: new Date(),
        likes: 0,
    });
    place.save();
    res.send({message: 'Place was registered successfully!'});
}

exports.findAll = function (req, res) {
    Place.find().then(places => {
        res.send(places);
    }
    );
}