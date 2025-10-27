import { useState } from 'react';

import Sidebar from './components/layout/Sidebar';
import Products from './pages/Products';
import About from './pages/About';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

type PageType = 'products' | 'about';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('products');

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <ErrorBoundary>
            {currentPage === 'products' && <Products />}
            {currentPage === 'about' && <About />}
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
