"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Ensure this path is correct
import Sidebar from "@/app/admin/sidebar/page";

const KelolaAuthor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedVerification, setSelectedVerification] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprovalChange = async (id, value) => {
    const userRef = doc(db, "users", id);

    try {
      await updateDoc(userRef, {
        isApproved: value === "true",
      });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, isApproved: value === "true" } : user
        )
      );
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  // Apply filters based on user input
  const filteredUsers = users.filter(
    (user) =>
      (selectedRole === "all" || user.role === selectedRole) &&
      (selectedVerification === "all" ||
        (user.isApproved ? "true" : "false") === selectedVerification) &&
      (user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex">
      <div className="w-55 bg-[#78AED6] text-white min-h-screen p-8">
        <div className="">
          <img src="/image/logofix.png" alt="logo" className="h-auto mb-6" />
        </div>
        <div className="flex items-center">
          <img
            src="/image/adminpic.jpeg"
            alt="logo"
            className="h-16 w-17 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">Wony</h2>
            <h2 className="text-xl font-semibold text-gray-600">
              Administrator
            </h2>
          </div>
        </div>

        {/* Sidebar content */}
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 bg-[#0B61AA] text-white p-4 rounded w-full">
          Kelola Author
        </h2>
        <div className="mb-4 space-y-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <div className="flex space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-1/2"
            >
              <option value="all">Semua Role</option>
              <option value="author">Author</option>
              <option value="user">User</option>
              {/* Add more options as needed */}
            </select>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-1/2"
            >
              <option value="all">Semua Status Verifikasi</option>
              <option value="true">Diizinkan</option>
              <option value="false">Tidak Diizinkan</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#696969] text-white">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">ID</th>
                <th className="py-2 px-4 border-b">Nama</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Verifikasi</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.nama}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={user.isApproved ? "true" : "false"}
                        onChange={(e) =>
                          handleApprovalChange(user.id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="true">Ya</option>
                        <option value="false">Tidak</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.isApproved ? "Diizinkan" : "Tidak Diizinkan"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 border-b text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default KelolaAuthor;
