// src/services/authorServices.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const createAuthorService = async (authorData) => {
    return await prisma.author.create({
        data: {
            userId: authorData.userId,
            name: authorData.name,
            handphoneNum: authorData.handphoneNum,
            authorPhoto: authorData.authorPhoto,
            bank: authorData.bank,
            accountBank: authorData.accountBank,
            profit: authorData.profit,
            isApproved: authorData.isApproved,
        },
    });
};


export const getAuthorService = async () => {
  try {
    const authors = await prisma.author.findMany({
      select: {
        id: true,
        name: true,
        isApproved: true,
        handphoneNum: true,
        authorPhoto: true,
        bank: true,
        accountBank: true,
        profit: true,
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
        test: {
          where: {
            isPublished: true
          },
          select: {
            id: true
          }
        }
      },
    });

    // Map data untuk menyertakan rincian yang diminta
    const result = authors.map((author) => ({
      id: author.id,
      name: author.name,
      email: author.user.email,
      isApproved: author.isApproved,
      handphoneNum: author.handphoneNum,
      authorPhoto: author.authorPhoto,
      bank: author.bank,
      accountBank: author.accountBank,
      profit: author.profit,
      createdAt: author.user.createdAt,
      publishedTestCount: author.test.length
    }));

    return result;
  } catch (error) {
    throw new Error("Failed to retrieve authors: " + error.message);
  }
};


export const updateVerificationAuthorService = async (id, authorData) => {
    try {
        const existingAuthor = await prisma.author.findUnique({
            where: { id: id },
        });

        if (!existingAuthor) {
            throw new Error("Author not found");
        }

        const updatedAuthor = await prisma.author.update({
            where: { id: id },
            data: {
                isApproved: authorData.isApproved,
            },
        });

        const updatedUser = await prisma.user.update({
            where: { id: existingAuthor.userId },
            data: {
                isApproved: authorData.isApproved,
            },
        });

        console.log('Author updated: ', updatedAuthor);
        console.log('User updated: ', updatedUser);

        return updatedAuthor;
    } catch (error) {
        console.error("Error in updateVerificationAuthorService: ", error);
        throw new Error("Failed to update verification author: " + error.message);
    }
};

export const getAuthorByUserId = async (token) => {
    try {
        // Decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Find the author associated with this user ID
        const author = await prisma.author.findFirst({
            where: { userId: userId },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!author) {
            throw new Error("Author not found for this user");
        }

        // Split the name into first name and last name
        const names = author.name.split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' '); // Join the rest of the names together

        // Format the response
        return {
            id: author.id,
            firstName: firstName,
            lastName: lastName,
            email: author.user.email,
            handphoneNum: author.handphoneNum,
            authorPhoto: author.authorPhoto,
            bank: author.bank,
            accountBank: author.accountBank,
            profit: author.profit,
            isApproved: author.isApproved,
            createdAt: author.user.createdAt
        };
    } catch (error) {
        console.error("Error in getAuthorByUserId:", error);
        throw new Error("Failed to retrieve author: " + error.message);
    }
};


export const editAuthorProfileService = async (token, profileData) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.id;

        const author = await prisma.author.findFirst({
            where: { userId: userId }
        });

        if (!author) {
            throw new Error("Author not found for this user");
        }

        // Only update fields that are provided
        const updateData = {};
        if (profileData.name) updateData.name = profileData.name;
        if (profileData.handphoneNum) updateData.handphoneNum = profileData.handphoneNum;
        if (profileData.authorPhoto) updateData.authorPhoto = profileData.authorPhoto;
        if (profileData.bank) updateData.bank = profileData.bank;
        if (profileData.accountBank) updateData.accountBank = profileData.accountBank;

        const updatedAuthor = await prisma.author.update({
            where: { id: author.id },
            data: updateData,
        });

        // Update user name if it's provided
        if (profileData.name) {
            await prisma.user.update({
                where: { id: userId },
                data: { name: profileData.name },
            });
        }

        return updatedAuthor;
    } catch (error) {
        console.error("Error in editAuthorProfileService:", error);
        throw new Error("Failed to update author profile: " + error.message);
    }
};