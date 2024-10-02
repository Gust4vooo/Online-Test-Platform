'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';

const MembuatSoal = () => {
  const [testId, setTestId] = useState('');
  const [question, setQuestion] = useState('');
  const [number, setNumber] = useState('');
  const [questionPhoto, setQuestionPhoto] = useState('');
  const [weight, setWeight] = useState('');
  const [discussion, setDiscussion] = useState('');
  const [options, setOptions] = useState([{ optionDescription: '', isCorrect: false }]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [labelCount, setlabelCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const addOption = () => {
    setOptions([...options, { optionDescription: '', isCorrect: false }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const cleanHtml = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [], // Kosongkan jika tidak ingin ada tag
      allowedAttributes: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      testId: 'cm1rb82i20002atqkcil4ub2z',
      questions: [
        {
          question: cleanHtml(question), // Ambil dari input
          number: parseInt(number), // Pastikan menjadi integer
          questionPhoto: questionPhoto || "",
          weight: parseInt(weight), // Pastikan menjadi integer
          discussion: cleanHtml(discussion), // Ambil dari input
          options 
        }
      ]
    };

    console.log(JSON.stringify(data, null, 2));

    try {
      const response = await fetch('http://localhost:2000/multiplechoice/add-questions', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Failed to submit:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ header: [1, 2, 3, false] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: '1440px' }}>
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ maxWidth: '1440px', height: '108px' }}>
        <div className="container mx-auto flex justify-start items-center p-0">
          <Link href="/">
            <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '69px', height: '70px' }} />
          </Link>
          <Link href="/">
            <img src="/img/Vector.png" alt="Vector" className="h-6 ml-4" style={{ maxWidth: '279px', height: '50px' }} />
          </Link>
        </div>
      </header>

      <header className="bg-white text-black-500 p-1 sm:p-2" style={{ maxWidth: '1440px', height: '71px' }}>
      <div className="container mx-auto flex justify-start items-center p-4">
        {/* Navigation Bar */}
        <nav className="flex w-full justify-start space-x-4">
          <Link href="/Buat Soal" legacyBehavior>
            <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0.5 
              hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
              shadow-lg transition-all duration-300 flex items-center justify-center">
              Buat Soal
            </a>
          </Link>
          <Link href="/Publikasi" legacyBehavior>
            <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0
              hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
              shadow-lg transition-all duration-300 flex items-center justify-center">
              Publikasi
            </a>
          </Link>
        </nav>
      </div>
      </header>

      <div className="container mx-auto p-2 sm:p-4 w-full" style={{ maxWidth: '1309px' }}>
        <header className='bg-[#0B61AA] font-bold font-poppins text-white p-4'>
          <div className="flex items-center justify-between">
            <span>Tes Potensi Skolastik {labelCount}</span>
            <div className="relative inline-block">
            <button
              className="w-14 h-14 text-white  rounded-full flex items-center justify-center cursor-pointer border-none"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              <span className="text-3xl">:</span> {/* Simbol dua titik */}
            </button>
        
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10 p-1">
                <Link href="/profile-edit">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">Rename</a>
                </Link>
                <Link href="/logout">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">Delete page</a>
                </Link>
              </div>
            )}
          </div>
          </div>
        </header>

        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md w-full mb-6 " >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="number">Nomor</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value )}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Soal</label>
              <ReactQuill value={question} onChange={setQuestion} modules={modules}/>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Unggah Photo Soal</label>
              <input
                type="file"
                value={questionPhoto}
                onChange={(e) => setQuestionPhoto(e.target.value)}
                className="border p-2 w-full"
                accept="image/*"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Bobot</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Diskusi</label>
              <ReactQuill value={discussion} onChange={setDiscussion} modules={modules} />
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Opsi</h2>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option.optionDescription}
                    onChange={(e) => handleOptionChange(index, 'optionDescription', e.target.value)}
                    placeholder="Deskripsi Opsi"
                    className="border p-2 w-full"
                    required
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                    />
                    Benar
                  </label>
                </div>
              ))}
              <button type="button" onClick={addOption} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Tambah Opsi
              </button>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/hapus" legacyBehavior>
                <button className="bg-[#E58A7B] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]">Hapus</button>
              </Link>
            </div>
            <div className="flex justify-end space-x-2">
              {/* <Link href="/simpan" legacyBehavior> */}
                <button type="submit" className="bg-[#E8F4FF] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]">Simpan</button>
              {/* </Link> */}
            </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default MembuatSoal;