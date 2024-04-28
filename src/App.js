
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path ="/favourites" element={<Favourite />}/>
      </Routes>
      {/* Banner/ */}
      {/* Movies/ */}
      {/* Favourite/ */}
    </Router>
  );
}
function Home() {
  return (
    <>
      <Banner />
      <Movies />
    </>
  );
}
export default App;
