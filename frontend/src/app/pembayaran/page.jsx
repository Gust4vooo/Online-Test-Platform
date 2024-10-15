import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [testId, setTestId] = useState('cm28h8tp70002o02ae6f0v4ir');

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.PUBLIC_CLIENT_KEY
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, []);

  useEffect(() => {

  }, []);

  const handlePayment = async () => {
    if (testId) {
      try {
        // Ambil token dari backend
        const response = await fetch('http://localhost:2000/api/payment/payment-process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ testId }), // Kirim testId ke backend
        });
  
        const data = await response.json();
  
        // Cek apakah token berhasil didapatkan
        if (response.ok && data.token) {
          // Menampilkan Midtrans Snap
          window.snap.pay(data.token, {
            onSuccess: function (result) {
              console.log('Payment success:', result);
            },
            onPending: function (result) {
              console.log('Payment pending:', result);
            },
            onError: function (result) {
              console.log('Payment error:', result);
            },
            onClose: function () {
              console.log('Payment dialog closed');
            },
          });
        } else {
          console.error('Failed to get payment token:', data.error);
        }
      } catch (error) {
        console.error('Error during payment:', error);
      }
    } else {
      console.error('Test ID not found');
    }
  };  

// Navbar Component
const Navbar = () => {
  return (
    <nav className="w-full bg-[#0B61AA] py-4 px-8 flex justify-between items-center">
      {/* Membeli Paket (pojok kiri) */}
      <div className="text-white text-lg font-bold">
        Membeli paket
      </div>
      
      {/* Vektor EtamTest dan Profile */}
      <div className="flex items-center space-x-4">
        {/* Vektor EtamTest */}
        <img 
          src="/images/Vector.png" 
          alt="EtamTest Logo" 
          className="h-8"  // Menyesuaikan ukuran dengan teks
        />
        
        {/* Profile */}
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">Profile</div>
          {/* Profile Picture */}
          <img 
            src="/images/Layer_1.png" 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}

// Box Content Component
const PaymentBox = () => {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-[#F3F3F3] shadow-lg rounded-lg p-8 w-full max-w-md text-center relative">
        {/* Logo Buku */}
        <img 
          src="/images/Vector_book.png" 
          alt="Logo Buku" 
          className="h-16 mx-auto mb-4"
        />

        {/* Header */}
        <h1 className="text-2xl font-bold mb-2">Try Out CPNS 2025 #2</h1>

        {/* Sub-header */}
        <h2 className="text-lg text-gray-500 mb-4">prediksi kemiripan 75%</h2>

        {/* Bullet List */}
        <ul className="text-left text-gray-700 list-disc list-inside space-y-2 mb-6">
          <li>Memiliki 1x kesempatan mengerjakan soal</li>
          <li>Mendapatkan hasil Try Out secara langsung</li>
          <li>Mengetahui jawaban salah dan benar</li>
          <li>Mendapatkan penjelasan soal dalam bentuk pdf</li>
        </ul>

        {/* Harga */}
        <div className="text-right text-2xl font-bold text-gray-800 mb-8">Rp.50.000,-</div>

        {/* Button Beli */}
        <button className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handlePayment}
        >
          Beli
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Box */}
      <div className="flex justify-center items-center flex-1">
        <PaymentBox />
      </div>
    </div>
  );
}

export default App;
