'use client';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const FIXINI = () => {
  const [nomorl, setNomor] = useState('');
  const [pertanyaanSoal, setPertanyaanSoal] = useState('');
  const [bobot, setBobot] = useState(1);
  const [opsiList, setOpsiList] = useState(['a']);
  const [jawabanBenar, setJawabanBenar] = useState('');
  const [jawabanOpsi, setJawabanOpsi] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
  });
  const [kunciJawaban, setKunciJawaban] = useState('');

  const handleBobotChange = (event) => {
    setBobot(parseInt(event.target.value));
  };

  const handleTambahOpsi = () => {
    const opsiSelanjutnya = opsiList.length < 4 ? String.fromCharCode(97 + opsiList.length) : null;
    if (opsiSelanjutnya && !opsiList.includes(opsiSelanjutnya)) {
      setOpsiList((prev) => [...prev, opsiSelanjutnya]);
    }
  };

  const handleJawabanBenarChange = (opsi) => {
    setJawabanBenar(opsi);
  };

  const handleJawabanOpsiChange = (opsi, value) => {
    setJawabanOpsi({
      ...jawabanOpsi,
      [opsi]: value,
    });
  };

  const handleSubmit = async () => {
    // Siapkan data yang akan dikirim
    const dataToSend = {
      nomor,
      pertanyaanSoal,
      bobot,
      jawabanOpsi,
      jawabanBenar,
      kunciJawaban,
    };

    try {
      const response = await fetch('https://your-backend-api-url.com/endpoint', { // Ganti dengan URL API kamu
        method: 'POST', // Gunakan metode yang sesuai (POST, PUT, dll)
        headers: {
          'Content-Type': 'application/json', // Mengatur header untuk JSON
        },
        body: JSON.stringify(dataToSend), // Mengonversi data menjadi string JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // Mengambil data JSON dari response
      console.log('Data berhasil disimpan:', responseData);
      // Lakukan sesuatu setelah berhasil menyimpan data, seperti redirect atau menampilkan pesan sukses

    } catch (error) {
      console.error('Ada masalah dengan pengiriman data:', error);
    }
  }

  const handleHapusSemua = () => {
    setPertanyaanSoal('');
    setBobot(1);
    setOpsiList(['a']);
    setJawabanBenar('');
    setJawabanOpsi({
      a: '',
      b: '',
      c: '',
      d: '',
    });
    setKunciJawaban('');
  };

  const handleHapusOpsi = (opsi) => {
    const filteredOpsiList = opsiList.filter((item) => item !== opsi);
    const newJawabanOpsi = { ...jawabanOpsi };
    delete newJawabanOpsi[opsi];

    const updatedOpsiList = filteredOpsiList.map((item, index) => String.fromCharCode(97 + index));
    const updatedJawabanOpsi = {};
    updatedOpsiList.forEach((item, index) => {
      const opsiLama = filteredOpsiList[index];
      updatedJawabanOpsi[item] = jawabanOpsi[opsiLama];
    });

    setOpsiList(updatedOpsiList);
    setJawabanOpsi(updatedJawabanOpsi);

    if (jawabanBenar === opsi) {
      setJawabanBenar('');
    }
  };

  return (
    <>
      <div className="container mx-auto p-0" style={{ maxWidth: '1440px' }}></div>
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ height: '108px' }}>
        <div className="flex justify-start items-center w-full h-full">
          <Link href="/">
            <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '69px', height: '70px' }} />
          </Link>
          <Link href="/">
            <img src="/img/Vector.png" alt="Vector" className="h-6 ml-4" style={{ maxWidth: '279px', height: '50px' }} />
          </Link>
        </div>
      </header>

      <header className="bg-white text-black-500 p-1 sm:p-2 mt-[5px]" style={{ maxWidth: '1440px', height: '71px' }}>
        <div className="container mx-auto flex justify-start items-center p-4">
          <nav className="flex w-full justify-start space-x-4">
            <Link href="/Buat Soal" legacyBehavior>
              <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0.5 hover:bg-[#78AED6] hover:text-black bg-white text-black rounded-full border border-white shadow-lg transition-all duration-300 flex items-center justify-center">
                Buat Soal
              </a>
            </Link>
            <Link href="/Publikasi" legacyBehavior>
              <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0 hover:bg-[#78AED6] hover:text-black bg-white text-black rounded-full border border-white shadow-lg transition-all duration-300 flex items-center justify-center">
                Publikasi
              </a>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-2 sm:p-4 w-full" style={{ maxWidth: '1309px', height: '1153px' }}>
        <header className='bg-[#0B61AA] font-bold font-poppins text-white p-4'>
          <div className="flex items-center justify-between">
            <span>Tes Potensi Skolastik </span>
          </div>
        </header>
        <div className="flex items-center">
            <span>Nilai 1 </span>
          </div>
        <div className='m'>
          <div className="border border-black bg-[#D9D9D9] p-2 rounded mb-4" style={{ maxWidth: '1309px', height: '250px' }}>
            <div className="p-4 flex justify-between items-center mb-0.5 w-full">
              <div className="flex items-center">
                <Link href="/Soal Pilihan Ganda" legacyBehavior>
                  <a className="hover:text-orange font-medium-bold font-poppins ">Soal pilihan ganda</a>
                </Link>
              </div>
              <div className="flex items-center ">
                <span className="mr-2 font-medium-bold">Bobot Soal:</span>
                <select
                  value={bobot}
                  onChange={handleBobotChange}
                  className="border border-gray-400 rounded-md p-1"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ReactQuill
            value={pertanyaanSoal}
            onChange={setPertanyaanSoal}
            theme="snow"
            placeholder="Anda sekarang harus mengerjakan soal Tes CPNS"
            className="bg-white shadow-md rounded-md border border-gray-500" // Tambahkan border di sini
            style={{ maxWidth: '1220px', height: '150px', overflow: 'hidden' }}
            />
          </div>
        </div>
        {/* kontainerjawaban */}
        <div className="mb-4 space-y-4">
          <span className='mb-4'> Jawaban</span>
          {opsiList.map((opsi) => (
            <div key={opsi} className="flex space-x-4 items-center">
              <span className="mr-2 font-bold">{opsi}</span>
              <div className="w-full">
                <ReactQuill
                  value={jawabanOpsi[opsi]}
                  onChange={(value) => handleJawabanOpsiChange(opsi, value)}
                  theme="snow"
                  placeholder={`Tulis jawaban untuk opsi ${opsi}`}
                  className="bg-white shadow-md rounded-md border border-gray-500"
                />
              </div>
              {/* <div className="flex items-center space-x-4 ml-4"> */}
              <div className="border border-black rounded-[15px] p-2 flex items-center space-x-2 bg-white">
                <input
                  type="radio"
                  id={`jawaban-${opsi}`}
                  name="jawabanBenar"
                  value={opsi}
                  checked={jawabanBenar === opsi}
                  onChange={() => handleJawabanBenarChange(opsi)}
                  className="w-4 h-4"
                />
                <Link href="/Benar" legacyBehavior>
                  <a className="hover:text-orange font-bold font-poppins text-sm mb-0">Benar</a>
                </Link>
              </div>
              <button
                onClick={() => handleHapusOpsi(opsi)}
                className="bg-[#E58A7B] hover:bg-[#D37469] text-black p-2 rounded-[10px] border border-black"
              >
                Hapus
              </button>
            </div>
            // </div>
          ))}
        </div>

        {opsiList.length < 4 && (
          <div className="container mx-auto mt-4 p-4 flex justify-start">
            <button
              onClick={handleTambahOpsi}
              className="bg-[#7bb3b4] hover:bg-[#8CC7C8] text-black font-bold py-2 px-4 rounded-[15px] border border-black"
            >
              + Tambah
            </button>
          </div>
        )}

        {/* Kotak Kunci Jawaban */}
        <div className="container mx-auto mt-4 p-4 flex flex-col">
          <label className="font-medium-bold text-lg mb-4">Pembahasan</label>
          <ReactQuill
            value={kunciJawaban}
            onChange={setKunciJawaban}
            theme="snow"
            placeholder="Tulis kunci jawaban di sini..."
            className="bg-white shadow-md rounded-md border border-gray-500"
            style={{ minHeight: '100px' }}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleHapusSemua}
            className="bg-[#E58A7B] hover:bg-[#D37469] text-black font-medium-bold py-2 px-4 rounded-[15px] border border-black"
          >
            Hapus 
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#CFE9E6] hover:bg-[#B7E1DC] text-black font-medium-bold py-2 px-4 rounded-[15px] border border-black"
          >
            Simpan
          </button>
        </div>
      </div>

    </>
  );
};

export default FIXINI;