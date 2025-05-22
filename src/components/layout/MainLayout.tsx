import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activePage,
  onNavigate 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile menu when navigating
  const handleNavigate = (page: string) => {
    onNavigate(page);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        activeItem={activePage}
        onNavigate={handleNavigate}
      />
      
      {/* Main content */}
      <main className={`pt-16 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64'
      }`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;