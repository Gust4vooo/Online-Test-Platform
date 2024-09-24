'use client';
import React, { useState } from "react"; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:2000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Terjadi kesalahan saat login. Silakan coba lagi.');
            }
    
            console.log("Login berhasil");
            setShowPopup(true);
    
            setTimeout(() => {
                setShowPopup(false);
                const role = data.role;

                // Tambahkan logika untuk mencegah admin login di halaman ini
                if (role === 'ADMIN') {
                    alert('Admin tidak dapat login di halaman ini.');
                    return;
                }
    
                // Adjust routing logic for only AUTHOR and USER
                if (role === 'AUTHOR') {
                    router.push('/author/dashboard');
                } else {
                    router.push('/user/dashboard');
                }
            }, 3000);
        } catch (err) {
            console.error("Kesalahan login", err);
            // Ganti pesan kesalahan menjadi lebih spesifik
            if (err.message === 'Pengguna tidak ditemukan') {
                alert('Pengguna dengan email ini tidak ditemukan.');
            } else if (err.message === 'Kata sandi tidak valid') {
                alert('Kata sandi yang Anda masukkan salah.');
            } else if (err.message === 'Akun author belum disetujui.') {
                alert('Akun Anda belum disetujui oleh admin.');
            } else {
                alert('Tidak dapat melakukan login dengan akun ini.');
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center bg-white">
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', padding: '20px' }}></div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full max-w-sm p-8 bg-secondary shadow-md rounded-3xl ml-20">
                <h2 className="text-3xl font-bold mb-6 text-black text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className="block text-sm font-medium text-black">Alamat Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="block text-sm font-medium text-black">Kata Sandi:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-birutua text-putih py-2 px-10 rounded-2xl shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Login
                        </button>
                    </div>
                    <p className="text-center mt-4 text-sm">
                        Belum memiliki akun? <Link href="/auth/registrasi" className="text-white font-bold hover:underline">Daftar</Link>
                    </p>
                </form>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Login Berhasil!</h3>
                        <p className="mt-2">Selamat! Anda berhasil login.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
