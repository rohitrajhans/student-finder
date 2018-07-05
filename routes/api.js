const express = require('express');
const router = express.Router();
const Student = require('../models/students.js');

// Getting a list of students from the database
router.get('/students', function (req, res, next) {
    // Student.find({}).then( function(students) {
    //     res.send(students);
    // });
    Student.aggregate().near({
        near: {
            'type': "point",
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
             //lng: longitude, lat: latitude (attached after ? in url)
        maxDistance: 9000000,
        spherical: true,
        distanceField: "dis"
    }).then(function(students) {
        res.send(students);
    });
});

// enrolling a new student
router.post('/students', function (req, res,  next) {
    Student.create(req.body).then(function (student) {
        res.send(student);
    }).catch(next);
});

// to update data of an existing student in the database
router.put('/students/:id', function (req, res, next) {
    Student.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(function() {
        Student.findOne({
            _id : req.params.id
        }).then(function(student) {
            res.send(student); 
        });
    });
});

// deleting a student from the database
router.delete('/students/:id', function (req, res, next) {
    Student.findByIdAndRemove({
        _id: req.params.id
    }).then(function (student) {
        res.send(student);
    });
});

module.exports = router;