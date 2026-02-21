import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import { Home, CourseDetail } from '@/pages';
import { Footer } from '@/components';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/course/:id' element={<CourseDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
