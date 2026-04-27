import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Users, Home, Bell, Settings, StickyNote,
    BarChart3, HeartHandshake, Building2, Accessibility,
    FileText // Dilekçe için yeni ikon
} from 'lucide-react';
import '../css/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', name: 'İstatistik', icon: <BarChart3 size={20} /> },
        { path: '/sakinler', name: 'Sakinler', icon: <Users size={20} /> },
        { path: '/sokaklar', name: 'Sokaklar', icon: <Home size={20} /> },
        { path: '/muhtar-islem', name: 'Muhtar İşlem', icon: <Settings size={20} /> },
        { path: '/ihtiyac-sahipleri', name: 'İhtiyaç Sahipleri', icon: <HeartHandshake size={20} /> },
        { path: '/kamu-kuruluslari', name: 'Kamu Kurumları', icon: <Building2 size={20} /> },
        { path: '/engelli-takibi', name: 'Engelli Takibi', icon: <Accessibility size={20} /> },

        // İbrahim Amca için yeni eklenen Dilekçe Modülü:
        { path: '/dilekce-olustur', name: 'Dilekçe Oluştur', icon: <FileText size={20} /> },

        { path: '/duyurular', name: 'Duyurular', icon: <Bell size={20} /> },
        { path: '/notlar', name: 'Notlar', icon: <StickyNote size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>Muhtar <span>Panel</span></h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;