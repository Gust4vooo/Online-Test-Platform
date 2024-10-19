<<<<<<< HEAD
import { createTestService } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js
import { getTestDetailById } from '../services/testServices.js';

=======
import { createTestService, getTestService, getTestResult } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js
>>>>>>> 69fdcd2f2369f16bf65bfc55a52ec832a8940796

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

export { createTest }; // Menggunakan named export

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
<<<<<<< HEAD
};
=======
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
  
  

export { createTest , getTest, testResultController}; // Menggunakan named export



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
>>>>>>> 69fdcd2f2369f16bf65bfc55a52ec832a8940796
