const express = require('express');
const router = express.Router();

// Asset Model
const Asset = require('../models/Asset');

// @route   GET api/assets
// @desc    Get All Assets
// @access  Public
router.get('/assets', async (req, res) => {
    try {
        const { placeName } = req.query;
        const query = placeName ? { placeName: placeName } : {};
        const assets = await Asset.find(query).sort({ createdAt: -1 });
        res.json(assets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/assets
// @desc    Create an Asset
// @access  Public
router.post('/assets', async (req, res) => {
    const {
        assetType,
        placeName,
        location,
        hasVisited,
        visitFrequency,
        lastVisitDate,
        seasonOfVisit,
        overallSatisfaction,
        wouldRecommend,
        bestThing,
        improvements
    } = req.body;

    try {
        const newAsset = new Asset({
            assetType,
            placeName,
            location,
            hasVisited,
            visitFrequency,
            lastVisitDate,
            seasonOfVisit,
            overallSatisfaction,
            wouldRecommend,
            bestThing,
            improvements
        });

        const asset = await newAsset.save();
        res.status(201).json(asset);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
