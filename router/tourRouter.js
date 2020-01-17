const express = require('express');
const tourController = require('../Controller/tourController');


const router = express.Router();

// router.param('id', tourController.checkID);


router.route('/top-5-tours').get(tourController.alias, tourController.getAlltours);
router.route('/').get(tourController.getAlltours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);


module.exports = router;