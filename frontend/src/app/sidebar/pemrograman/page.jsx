"use client"; 
import Link from 'next/link';
import { useState } from 'react';

const testData = [
  {
    id: 1,
    kategori : "Try Out Pemrograman",
    judul : "TRY OUT PEMROGRAMAN 2025#1",
    prediksi_kemiripan: "Prediksi kemiripan 45%",
    views: 1386,
    author: " Rania Suyati",
    free: true,
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  {
    id: 2,
    kategori : "Try Out Pemrograman",
    judul: "TRY OUT PEMROGRAMAN 2025#2",
    prediksi_kemiripan: "Prediksi kemiripan 50%",
    views: 2000,
    author: " Desti Nur Irawati",
    free: false, // ubah ke false untuk tes menampilkan gambar
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  {
    id: 3,
    kategori : "Try Out CPNS",
    judul: "TRY OUT CPNS 2025#2",
    prediksi_kemiripan: "Prediksi kemiripan 55%",
    views: 2000,
    author: "Zhang Yixing",
    free: true, // ubah ke false untuk tes menampilkan gambar
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  {
    id: 4,
    kategori : "Try Out Psikotes",
    judul: "TRY OUT PSIKOTEST 2025#2",
    prediksi_kemiripan: "Prediksi kemiripan 70%",
    views: 1994,
    author: " Oh Sehun",
    free: true, // ubah ke false untuk tes menampilkan gambar
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  {
    id: 5,
    kategori : "Try Out Pemrograman",
    judul: "TRY OUT PEMROGRAMAN 2025#2",
    prediksi_kemiripan: "Prediksi kemiripan 70%",
    views: 1994,
    author: " Oh Sehun",
    free: true, // ubah ke false untuk tes menampilkan gambar
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  
];

export default function pemrograman() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <header className="bg-deepBlue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <div className="container mx-auto">
      {/* Judul besar */}
      <h5 className="text-3xl font-bold font-bodoni ">Latihan Soal Tes Pemrogrman</h5>
          {/* Breadcrumb di bawah h2 */}
          <nav className="mt-2">
            <ol className="list-reset flex space-x-2 ">
              <li>
                <Link href="/userDashboard" legacyBehavior>
                  <a className="hover:text-orange font-bodoni font-bold">Home</a>
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/pemrograman" legacyBehavior>
                  <a className="hover:text-orange font-bodoni font-bold ">Latihan Tes Pemrograman</a>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        {/* Logo */}
        <div className="flex space-x-5">
          <Link href="/">
            <img 
              src="/images/etamtest.png" 
              alt="EtamTest" 
              className="h-14 mr-9 p-1" 
            />
          </Link>
        </div>
        {/* Profile */}
      <div className="relative inline-block">
        <img 
          src="/images/profile.png" 
          alt="profile" 
          className="h-14 cursor-pointer mr-7 p-0"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        />

        {/* Dropdown */}
        {isDropdownOpen && (
          <div 
            className="absolute right-0 mt-1 w-37 bg-white rounded-lg shadow-lg z-10 p-1
                       before:content-[''] before:absolute before:-top-4 before:right-8 before:border-8 
                       before:border-transparent before:border-b-white"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link legacyBehavior href="/profile-edit">
              <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md border-abumuda">
                Ubah Profil
              </a>
            </Link>
            <Link legacyBehavior href="/logout">
              <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
      </div>
    </header>

    <section className="bg-gradient-custom p-20">
       {/* Search Bar */}
       <div className="container mx-auto mt-4 ">
            <form className="flex mx-auto items-center p-1 rounded-2xl bg-white max-w-[610px] font-poppins  ">
            <input 
              type="text" 
              placeholder="Cari Tes Soal" 
              className="flex-grow p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-powderBlue font-poppins"/>
               <button 
                type="submit" 
                className="ml-auto p-2 text-deepBlue font-bold rounded-2xl hover:bg-gray-200 font-poppins">
                <img 
                  src="/images/search-bar.png" 
                  alt="Search Icon" 
                  className="h-6 w-6" 
                /> 
              </button>
            </form>
        </div>
    </section>

    {/* Bagian Paling Populer */}
      <section className="bg-putih p-5">
        <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue ">
          Paling Populer
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
      {testData
        .filter((test) => test.kategori === "Try Out Pemrograman")
        .map((test) => (
          <div key={test.id} className="bg-abumuda shadow-lg p-1 relative group">
            {/* Overlay background abu-abu yang muncul saat hover */}
            <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

            <div className="flex justify-between items-center relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 font-bold text-deepBlue">
                <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                <span className="text-sm">{test.views}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                <img src="/images/more-icon.png" alt="More" className="h-7/2" />
              </div>
            </div>

            <div className="flex justify-center mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <Link href={`/tes/${test.id}`}>
                <img src={test.imageUrl} alt={test.kategori} className="h-20 w-20 cursor-pointer" />
              </Link>
            </div>

            <div className="flex justify-center mt-4 text-deepBlue relative z-20 group-hover:blur-sm transition duration-300">
              <h3 className="text-center text-lg font-bold mt-2">{test.kategori}</h3>
            </div>

            <div className="bg-deepBlue text-white p-2 mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 justify-between">
                <h3 className="text-left text-base font-bold mt-2">{test.judul}</h3>
                <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
              </div>

              <p className="text-left text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
              <p className="text-xs leading-relaxed">Dibuat Oleh :</p>

              <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                <div className="flex text-left space-x-4">
                  <img src={test.authorProfile} alt={test.kategori} className="h-5 w-5" />
                  <span className="text-sm font-semibold">{test.author}</span>
                </div>
                <span className="text-sm font-semibold">
                  {test.free ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />}
                </span>
              </div>
            </div>

            {/* Tombol yang berada di bagian paling bawah */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-2">
              <a href="/tes" className="bg-paleBlue text-deepBlue text-bold px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Mulai</a>
              <a href="/topScore" className="bg-paleBlue text-deepBlue text-bold px-4 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Top Score</a>
              </div>
          </div>
    ))}
        </div>

      </section>

      {/* Bagian Gratis */}
      <section className="bg-putih p-5">
        <div className="container mx-auto font-bold font-poppins text-deepBlue">
          Gratis
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-8">
        {testData
          .filter((test) => test.free) // Filter hanya data dengan free = true
          .filter((test) => test.kategori === "Try Out CPNS")
          .map((test) => (
            <div key={test.id} className="bg-abumuda shadow-lg p-1 relative">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 font-bold text-deepBlue">
                  <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                  <span className="text-sm">{test.views}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                  <img src="/images/more-icon.png" alt="More" className="h-7/2" />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <img src={test.imageUrl} alt={test.kategori} className="h-20 w-20" />
              </div>

              <div className="flex justify-center mt-4 text-deepBlue">
                <h3 className="text-center text-lg font-bold mt-2">{test.kategori}</h3>
              </div>

              <div className="bg-deepBlue text-white p-2 mt-4">
                <div className="flex items-center space-x-2 justify-between">
                  <h3 className="text-left text-base font-bold mt-2">{test.judul}</h3>
                  <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
                </div>

                <p className="text-left text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
                <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                
                <div className="flex space-x-2 justify-between leading-relaxed mt-1">
                  <div className="flex text-left space-x-4">
                    <img src={test.authorProfile} alt={test.kategori} className="h-5 w-5" />
                    <span className="text-sm font-semibold">{test.author}</span>
                  </div>
                  <span className="text-sm font-semibold">Gratis</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
       
    </>
  );

}