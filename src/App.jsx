import React, { useState, useMemo } from 'react';
import { Droplets, ShieldAlert, BookOpen, Map, Camera, Pipette, Star, Clock, Send, ChevronRight, ChevronLeft, Search, SlidersHorizontal, Bell, Settings, BarChart3, History, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Video, FileText, Lightbulb, BadgeCheck, Lock, Mail, Compass, UserCog } from 'lucide-react';

// Mock Data (Data Tiruan)
// ==========================
const mockUserData = {
  name: 'Keenie',
  location: 'Jakarta Pusat',
  contributionPoints: 1250,
  reports: [
    { id: 'RPT001', date: '2024-05-20', type: 'Pipa Bocor', status: 'Selesai', location: 'Jl. Merdeka No. 10' },
    { id: 'RPT002', date: '2024-06-01', type: 'Air Keruh', status: 'Dalam Proses', location: 'Jl. Sudirman No. 25' },
    { id: 'RPT003', date: '2024-06-05', type: 'Sanitasi Buruk', status: 'Ditinjau', location: 'Area Pasar Senen' },
  ],
};

const mockWaterQuality = {
  status: 'Layak Konsumsi',
  level: 'Baik',
  contamination: 'Kontaminasi Ringan Terdeteksi',
  recommendation: 'Tetap waspada, masak air hingga mendidih sebelum diminum.',
};

const mockNews = [
  { id: 1, title: 'Perbaikan Pipa Utama di Wilayah Jakarta Barat', category: 'Pengumuman', date: '2 hari lalu', excerpt: 'Akan ada penghentian sementara aliran air bersih untuk perbaikan...' },
  { id: 2, title: 'Tips Menghemat Air Selama Musim Kemarau', category: 'Edukasi', date: '5 hari lalu', excerpt: 'Musim kemarau tiba, mari bijak menggunakan air bersih di rumah...' },
  { id: 3, title: 'Waspada! Kualitas Air Menurun di Beberapa Titik Sungai Ciliwung', category: 'Peringatan', date: '1 minggu lalu', excerpt: 'Hasil pemantauan terbaru menunjukkan peningkatan kadar polutan...'},
];

const mockEducationContent = [
    { id: 'E01', type: 'artikel', title: '5 Langkah Mudah Membuat Air Minum Aman', category: 'Air Minum Aman', icon: FileText, audience: 'Semua Usia' },
    { id: 'E02', type: 'video', title: 'Tutorial Cuci Tangan Pakai Sabun yang Benar', category: 'Cuci Tangan', icon: Video, audience: 'Anak-anak' },
    { id: 'E03', type: 'kuis', title: 'Seberapa Tahu Kamu Tentang Sanitasi?', category: 'Sanitasi Layak', icon: BadgeCheck, audience: 'Remaja' },
    { id: 'E04', type: 'artikel', title: 'Mengenal Berbagai Jenis Pencemaran Air', category: 'Konservasi Air', icon: FileText, audience: 'Dewasa' },
    { id: 'E05', type: 'tips', title: 'Tips Harian: Gunakan Kembali Air Bekas Cucian Sayur', category: 'Tips Harian', icon: Lightbulb, audience: 'Semua Usia' },
];

const mockCheckHistory = [
    {id: 1, date: '2024-06-08', location: 'Rumah', score: 'Jernih', result: 'Baik'},
    {id: 2, date: '2024-05-15', location: 'Kantor', score: 'Perlu Waspada', result: 'Sedang'},
    {id: 3, date: '2024-04-22', location: 'Taman Kota', score: 'Tercemar', result: 'Buruk'},
];


// Komponen UI (Reusable)
// =========================
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', icon: Icon, variant = 'primary', type = 'button' }) => {
  const baseClasses = 'w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      {children}
    </button>
  );
};

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { name: 'Beranda', icon: Compass },
    { name: 'Cek Air', icon: Droplets },
    { name: 'Lapor', icon: ShieldAlert },
    { name: 'Edukasi', icon: BookOpen },
    { name: 'Profil', icon: UserCog },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center justify-center w-full pt-3 pb-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === item.name ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <item.icon className={`h-6 w-6 mb-1 ${activeTab === item.name ? 'scale-110' : ''}`} />
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};


// Halaman-halaman Aplikasi
// ========================

const LoginPage = ({ onLogin }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-8">
                    <Droplets className="mx-auto h-12 w-12 text-blue-600"/>
                    <h1 className="mt-4 text-4xl font-extrabold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>PureShield</h1>
                    <p className="mt-2 text-gray-500">Jaga Kualitas Air, Jaga Kehidupan.</p>
                </div>
                
                <Card className="shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="email" id="email" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="user@email.com" defaultValue="sagita@email.com" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="password" id="password" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="********" defaultValue="password123" required />
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="w-full">Masuk</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

const HomePage = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-extrabold text-3xl text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>PureShield</h1>
        <p className="text-gray-500 mt-1">Selamat datang, {mockUserData.name.split(' ')[0]}!</p>
      </div>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg flex items-center">
        <Bell className="h-6 w-6 mr-3"/>
        <div>
          <p className="font-bold">Peringatan Kualitas Air!</p>
          <p className="text-sm">Kualitas air di wilayah Anda terdeteksi menurun. Disarankan untuk memasak air.</p>
        </div>
      </div>
      <Card>
        <h2 className="text-lg font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Kualitas Air di {mockUserData.location}</h2>
        <div className="mt-4 text-center">
          <p className={`text-4xl font-extrabold ${mockWaterQuality.level === 'Baik' ? 'text-green-500' : 'text-yellow-500'}`}>{mockWaterQuality.status}</p>
          <p className="text-gray-600 mt-2">{mockWaterQuality.contamination}</p>
        </div>
        <Button onClick={() => setActiveTab('Cek Air')} className="mt-6" icon={Droplets}>
          Cek Kualitas Air Sekarang
        </Button>
      </Card>
       <div className="grid grid-cols-2 gap-4">
            <div onClick={() => setActiveTab('Cek Air')} className="bg-blue-50 p-4 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition">
                <Pipette className="mx-auto text-blue-600 h-8 w-8"/>
                <p className="mt-2 font-semibold text-sm text-gray-700">Cek Air Mandiri</p>
            </div>
             <div onClick={() => setActiveTab('Lapor')} className="bg-red-50 p-4 rounded-lg text-center cursor-pointer hover:bg-red-100 transition">
                <ShieldAlert className="mx-auto text-red-600 h-8 w-8"/>
                <p className="mt-2 font-semibold text-sm text-gray-700">Laporkan Masalah</p>
            </div>
        </div>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Info & Berita Terkini</h2>
        {mockNews.map(news => (
          <Card key={news.id} className="!p-4">
            <div className="flex items-center space-x-4">
               <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full ${news.category === 'Pengumuman' ? 'bg-blue-100 text-blue-600' : news.category === 'Edukasi' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {news.category === 'Pengumuman' && <Bell className="h-5 w-5"/>}
                     {news.category === 'Edukasi' && <BookOpen className="h-5 w-5"/>}
                     {news.category === 'Peringatan' && <AlertTriangle className="h-5 w-5"/>}
                  </div>
              </div>
              <div className="flex-grow">
                <p className="font-bold text-gray-800">{news.title}</p>
                <p className="text-sm text-gray-500">{news.date}</p>
              </div>
               <ChevronRight className="flex-shrink-0 text-gray-400"/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CheckWaterPage = () => {
    const [view, setView] = useState('main');
    const CheckFeatureCard = ({ icon: Icon, title, description, onClick }) => (
        <div onClick={onClick} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-100 p-4 rounded-full"> <Icon className="h-8 w-8 text-blue-600" /> </div>
            <h3 className="mt-4 font-bold text-lg text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
    );
    if (view === 'manual') { /* Omitted for brevity */ }
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center" style={{fontFamily: 'Poppins, sans-serif'}}>Cek Kualitas Air</h2>
        <p className="text-gray-500 text-center">Pilih metode pengecekan kualitas air di sekitar Anda.</p>
        <div className="space-y-4 pt-4">
            <CheckFeatureCard icon={Pipette} title="Cek Manual" description="Masukkan ciri-ciri fisik air untuk analisis cepat." onClick={() => setView('manual')}/>
            <CheckFeatureCard icon={Camera} title="Analisis Foto" description="Upload foto sampel air untuk dianalisis oleh sistem AI kami." onClick={() => setView('photo')}/>
            <CheckFeatureCard icon={History} title="Riwayat Pengecekan" description="Lihat kembali hasil pengecekan yang pernah Anda lakukan." onClick={() => setView('history')}/>
            <CheckFeatureCard icon={Map} title="Peta Kualitas Air" description="Jelajahi peta interaktif untuk melihat kualitas air di berbagai lokasi." onClick={() => setView('map')}/>
        </div>
      </div>
    );
};

const ReportPage = () => {
    const [view, setView] = useState('main');

    const getStatusChip = (status) => {
        switch (status) {
            case 'Selesai': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">{status}</span>;
            case 'Dalam Proses': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">{status}</span>;
            case 'Ditinjau': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">{status}</span>;
            default: return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{status}</span>;
        }
    };
    
    if (view === 'form') {
        return (
             <div className="space-y-6">
                <button onClick={() => setView('main')} className="text-blue-600 font-semibold mb-4 flex items-center">
                    <ChevronLeft className="h-5 w-5 mr-1" /> Kembali
                </button>
                <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Buat Laporan Baru</h2>
                <Card>
                    <form className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Laporan</label>
                            <select className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option>Air Tercemar/Keruh</option>
                                <option>Pipa Rusak/Bocor</option>
                                <option>Sanitasi Tidak Layak</option>
                                <option>Pembuangan Limbah Ilegal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Masalah</label>
                            <textarea rows="4" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Jelaskan kondisi secara rinci..."></textarea>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto/Video</label>
                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-sm text-gray-600">Klik untuk mengunggah bukti visual</p>
                                     <p className="text-xs text-gray-500">PNG, JPG, MP4 hingga 10MB</p>
                                </div>
                             </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Masalah</label>
                            <input type="text" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: Depan Balai Kota" />
                        </div>
                        <Button icon={Send} className="w-full">Kirim Laporan</Button>
                    </form>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Lapor Masalah</h2>
            <p className="text-gray-500 text-center">Laporkan masalah air dan sanitasi di sekitar Anda untuk ditindaklanjuti.</p>
            <Button onClick={() => setView('form')} icon={ShieldAlert} className="w-full" variant="primary">Buat Laporan Baru</Button>
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Riwayat Laporan Anda</h3>
                {mockUserData.reports.length > 0 ? (
                    mockUserData.reports.map(report => (
                        <Card key={report.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-800">{report.type}</p>
                                    <p className="text-sm text-gray-500">{report.location}</p>
                                    <p className="text-xs text-gray-400 mt-1">{report.date}</p>
                                </div>
                                {getStatusChip(report.status)}
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card className="text-center text-gray-500">
                        Anda belum membuat laporan.
                    </Card>
                )}
            </div>
        </div>
    );
};

const EducationPage = () => {
    const [filter, setFilter] = useState('Semua');
    const categories = ['Semua', 'Air Minum Aman', 'Cuci Tangan', 'Sanitasi Layak', 'Konservasi Air'];
    const filteredContent = useMemo(() => {
        if (filter === 'Semua') return mockEducationContent;
        return mockEducationContent.filter(item => item.category === filter);
    }, [filter]);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>Pusat Edukasi</h2>
        <p className="text-gray-500">Tingkatkan pengetahuanmu tentang air bersih dan sanitasi.</p>
        <div className="space-y-4 pt-4">
            {filteredContent.map(item => (
                <Card key={item.id} className="flex items-center space-x-4">
                     <div className="p-3 bg-blue-100 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-600"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <ChevronRight className="flex-shrink-0 text-gray-400"/>
                </Card>
            ))}
        </div>
      </div>
    );
};

const ProfilePage = ({ onLogout }) => {
    const stats = [
        { label: 'Laporan Dibuat', value: mockUserData.reports.length, icon: ShieldAlert },
        { label: 'Poin Kontribusi', value: mockUserData.contributionPoints, icon: Star },
        { label: 'Cek Dilakukan', value: mockCheckHistory.length, icon: CheckCircle2 },
    ];
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
            <img 
                src="https://placehold.co/150x150/a7f3d0/166534?text=Keenie" 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>{mockUserData.name}</h2>
            <p className="text-gray-500">{mockUserData.location}</p>
        </div>
        <Card className="p-4">
             <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                         <stat.icon className="mx-auto h-7 w-7 text-blue-600 mb-1"/>
                         <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                         <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </Card>
        <div className="space-y-2">
            <h3 className="px-4 text-sm font-semibold text-gray-500">Akun</h3>
            <div className="bg-white rounded-lg shadow-sm">
                <button className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"><span>Pengaturan Akun</span><ChevronRight className="h-5 w-5 text-gray-400" /></button>
                <button className="w-full text-left p-4 flex justify-between items-center border-t border-gray-100 hover:bg-gray-50"><span>Notifikasi</span><ChevronRight className="h-5 w-5 text-gray-400" /></button>
            </div>
            <h3 className="px-4 pt-4 text-sm font-semibold text-gray-500">Aktivitas</h3>
             <div className="bg-white rounded-lg shadow-sm">
                 <button className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"><span>Riwayat Laporan</span><ChevronRight className="h-5 w-5 text-gray-400" /></button>
                 <button className="w-full text-left p-4 flex justify-between items-center border-t border-gray-100 hover:bg-gray-50"><span>Statistik Kontribusi</span><ChevronRight className="h-5 w-5 text-gray-400" /></button>
            </div>
        </div>
         <Button variant="secondary" onClick={onLogout}>Logout</Button>
      </div>
    );
};

// Komponen Utama Aplikasi
// ======================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Beranda');

  if (!isLoggedIn) {
      return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Beranda': return <HomePage setActiveTab={setActiveTab}/>;
      case 'Cek Air': return <CheckWaterPage />;
      case 'Lapor': return <ReportPage />;
      case 'Edukasi': return <EducationPage />;
      case 'Profil': return <ProfilePage onLogout={() => setIsLoggedIn(false)} />;
      default: return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen" style={{fontFamily: 'Inter, sans-serif'}}>
        <main className="p-4 pb-24 max-w-lg mx-auto">
            {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
