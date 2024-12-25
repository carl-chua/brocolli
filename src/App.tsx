import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/ui/footer';
import { Navbar } from './components/ui/navbar';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-secondary">
      <Navbar />

      <Routes>
        <Route path="/brocolli" element={<HomePage />}></Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
