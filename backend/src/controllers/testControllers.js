import { createTestService, getTestResult } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js

const createTest = async (req, res) => {
    try {
        const newTest = req.body;

        const test = await createTestService(newTest);

        res.status(201).send({
            data: test,
            message: 'Create test success',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create test',
            error: error.message,
        });
    }
};

export const getTestDetail = async (req, res) => {
    const { testId } = req.params;

    try {
        const test = await getTestDetailById(testId); // Memanggil service untuk mendapatkan detail test

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        res.status(200).json({
            title: test.title,
            similarity: test.similarity,
            price: test.price,
        });
    } catch (error) {
        console.error("Error fetching test detail:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const testResultController = async (req, res) => {
    const { resultId } = req.params;
  
    try {
      const result = await getTestResult(resultId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in controller:', error);
        res.status(500).json({ message: error.message });
    }
  };
  
  

export { createTest , testResultController}; // Menggunakan named export



// const { createTestService } = require("backend/src/services/testServices.js");

// const createTest = async (req, res) => {
//     try {
//         const newTest = req.body;

//         const test = await createTestService(newTest);

//         res.status(201).send({
//             data: test,
//             message: "Create test success",
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "Failed to create test",
//             error: error.message,
//         });
//     }
// };

// module.exports = { createTest };
