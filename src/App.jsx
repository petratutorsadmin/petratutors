import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Tutors from './pages/Tutors';
import Pricing from './pages/Pricing';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import NoAdmissionFee from './pages/NoAdmissionFee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="programs" element={<Programs />} />
        <Route path="tutors" element={<Tutors />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="inquiry" element={<Inquiry />} />
        <Route path="about" element={<About />} />
        <Route path="no-admission-fee" element={<NoAdmissionFee />} />
      </Route>
    </Routes>
  );
}

export default App;
