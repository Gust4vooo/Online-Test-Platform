const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi untuk membuat tes baru
const createTestService = async (newTest) => {
    try {
        return await prisma.test.create({
            data: {
                authorId: newTest.authorId,
                category: newTest.category,
                title: newTest.title,
                testDescription: newTest.testDescription,
            },
        });
    } catch (error) {
        console.error("Error saat membuat tes:", error);
        throw new Error('Gagal membuat tes');
    }
};

// Fungsi untuk mempublish tes yang sudah dibuat
const publishTestService = async (testId, updateData) => {
    try {
        return await prisma.test.update({
            where: { id: testId },
            data: {
                price: updateData.price,
                similarity: updateData.similarity,
                worktime: updateData.worktime,
                review: updateData.review,
                isPublished: true // 
            },
        });
    } catch (error) {
        throw new Error('Gagal mempublish tes');
    }
};

const getAllTestsService = async () => {
    return await prisma.test.findMany({
        select: {
            title: true,
            similarity: true
        }
    });
};

const getTestsByCategory = async (category) => {
    return await prisma.test.findMany({
        where: { category },
    });
};

module.exports = { 
    createTestService,
    publishTestService,
    getAllTestsService,
    getTestsByCategory
};