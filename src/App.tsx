import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/ui/footer';
import { Navbar } from './components/ui/navbar';
import { HomePage } from './pages/home-page';

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary">
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
