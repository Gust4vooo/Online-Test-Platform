'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function PublikasiPage() {
  const [namaTes, setNamaTes] = useState('');
  const [testId, setTestId] = useState(null);
  const [durasiTes, setDurasiTes] = useState('');
  // const [acakPertanyaan, setAcakPertanyaan] = useState({
  //   waktu: false,
  //   acak: false,
  // });
  // const [maksimumPercobaan, setMaksimumPercobaan] = useState('');
  const [hargaTes, setHargaTes] = useState('');
  const [prediksiKemiripan, setPrediksiKemiripan] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setAcakPertanyaan({ ...acakPertanyaan, [event.target.name]: event.target.checked });
  // };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
  
    console.log("Fetched testId:", testIdFromUrl); // Cek nilai testId yang diambil
  
    if (testIdFromUrl) {
      setTestId(testIdFromUrl);
    }
  }, []);

  const handlePublish = async () => {
    const [hours, minutes] = durasiTes.split(':').map(Number);
    const totalMinutes = (hours || 0) * 60 + (minutes || 0);

    const payload = {
        price: hargaTes,
        similarity: parseFloat(prediksiKemiripan),
        worktime: totalMinutes
    };

    // Validasi input
    if (!payload.price || isNaN(payload.similarity) || isNaN(payload.worktime)) {
        alert("Semua field harus diisi untuk publikasi.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:2000/test/tests/${testId}/publish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Tes berhasil disimpan!');
            setShowSuccessPopup(true); 
            setShowErrorPopup(false);   
        } else {
            console.error('Gagal menyimpan tes.', await response.text());
            setShowErrorPopup(true);   
            setShowSuccessPopup(false);  
        }
    } catch (error) {
        console.error('Error:', error);
        setShowErrorPopup(true);      
        setShowSuccessPopup(false);     
    }
};

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };
  const [activeTab, setActiveTab] = useState('publikasi');
  return (
    <div>
      {/* Bar Atas */}
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6" style={{ maxWidth: '1440px', height: '108px' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/">
              <img src="/images/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '50px', height: '50px' }} />
            </Link>
            <Link href="/">
              <img src="/images/Vector.png" alt="Vector" className="h-6" style={{ maxWidth: '279px', height: '50px' }} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigasi */}
      <nav className="bg-[#FFFFFF] text-black p-4">
        <ul className="flex justify-around">
          <li>
            <button
              className={`px-20 py-6 rounded-full font-bold font-poppins ${activeTab === 'buatTes' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('buatTes')}
            >
              Buat Soal
            </button>
          </li>
          <li>
            <button
              className={`px-20 py-6 rounded-full font-bold font-poppins ${activeTab === 'publikasi' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('publikasi')}
            >
              Publikasi
            </button>
          </li>
        </ul>
      </nav>

      
      <div className="bg-[#78AED6] p-8 rounded-md mx-auto" style={{ width: '1100px', height: '750px', marginTop: '20px' }}>
        <div className="flex justify-start pr-9">
          {/* Bagian Kiri, Teks Rata Kanan */}
          <div className="text-left pr-5">
            <h3 className="font-poppins text-black text-lg mb-8 mt-8">Nama Tes</h3>
            <h3 className="font-poppins text-black text-lg mb-7 mt-5">Durasi Tes</h3>
            {/* <h3 className="font-poppins text-black text-lg mb-4 mt-5">Acak Pertanyaan</h3> */}
            {/* <h3 className="font-poppins text-black text-lg mb-4 mt-5">Maksimum Percobaan Kuis</h3> */}
            <h3 className="font-poppins text-black text-lg mb-7 mt-5">Harga Tes</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-5">Prediksi Kemiripan</h3>
          </div>

          {/* Bar putih di samping */}
          <div className="bg-white p-6 rounded-md shadow-lg" style={{ width: '902px', height: '654px' }}>
            {/* Input Nama Tes */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={namaTes}
                onChange={(e) => setNamaTes(e.target.value)}
                placeholder="Nama Tes"
              />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                    value={durasiTes}
                    onChange={(e) => setDurasiTes(e.target.value)}
                    placeholder="hh:mm"
                />
            </div>

            {/* Checkbox Acak Pertanyaan */}
            {/* <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="waktu"
                  name="waktu"
                  checked={acakPertanyaan.waktu}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="waktu" className="text-gray-700">Peserta akan memiliki waktu untuk menyelesaikan seluruh kuis.</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="acak"
                  name="acak"
                  checked={acakPertanyaan.acak}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="acak" className="text-gray-700">Pertanyaan akan ditampilkan secara acak kepada setiap responden.</label>
              </div>
            </div> */}

            {/* Input Maksimum Percobaan Kuis
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={maksimumPercobaan}
                onChange={(e) => setMaksimumPercobaan(e.target.value)}
                placeholder="Maksimum Percobaan Kuis"
              />
            </div> */}

            {/* Dropdown Harga Tes */}
            <div className="mb-4">
              <input
                type="number"
                step="0.01" // Mengizinkan input nilai desimal
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={hargaTes}
                onChange={(e) => setHargaTes(e.target.value)}
                placeholder="Masukkan Harga Tes (dalam format desimal)"
              />
            </div>

            {/* Dropdown Prediksi Kemiripan */}
            <div className="mb-4">
              <select
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={prediksiKemiripan}
                onChange={(e) => setPrediksiKemiripan(e.target.value)}
              >
                <option value="" disabled>Kemiripan Soal</option>
                <option value="0.85">45%</option>
                <option value="0.65">65%</option>
                <option value="0.80">80%</option>
              </select>
            </div>
          </div>
        </div>

        <div className='pt-4 flex justify-end pr-10'>
          <button
            onClick={handlePublish}
            className="bg-white text-black py-2 px-4 rounded-lg hover:bg-[#0B61AA] hover:text-white"
          >
            Publikasi
          </button>
        </div>
      </div>

        {/* Pop-up Sukses */}
        {showSuccessPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50  text-sm sm:text-lg">
        <div className="w-[90%] max-w-[619px] bg-[#78AED6] text-black p-4 rounded-lg text-center  text-sm sm:text-lg">
          <h2 className="font-bold bg-[#0B61AA] text-white p-4 rounded-t-lg">
            Tes Berhasil Di Publikasikan
          </h2>
          <p className="my-4">
            Tes kamu sekarang bisa diakses oleh peserta
          </p>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={closePopup}
          >
            Oke
          </button>
        </div>
      </div>
    )}

    {/* Pop-up Gagal */}
    {showErrorPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50  text-sm sm:text-lg">
        <div className="w-[90%] max-w-[619px] bg-[#78AED6] text-black p-4 rounded-lg text-center  text-sm sm:text-lg">
          <h2 className="font-bold bg-[#0B61AA] text-white p-4 rounded-t-lg">
            Publikasi Gagal
          </h2>
          <p className="my-4">
            Pastikan semua data telah diisi dengan lengkap
          </p>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={closePopup}
          >
            Oke
          </button>
        </div>
      </div>
    )}
      </div>
  );
}