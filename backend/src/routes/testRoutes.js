const express = require("express");
const { createTestController, fetchTestsByCategory, getAllTests, publishTestController } = require("backend/src/controllers/testControllers.js");

const router = express.Router();

router.post('/tests', createTestController);

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);

module.exports = router;