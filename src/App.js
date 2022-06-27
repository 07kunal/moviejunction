import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './component/Header/Header';
import SimpleBottomNavigation from './component/MainNav';
import { Container, Switch } from '@mui/material';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        {/* adding some data from the material ui  */}
        <Container>
     <Routes>
       <Route exact path="/" element={<Trending/>}></Route>
       <Route exact path="/movies" element={<Movies/>}></Route>
       <Route exact path="/series" element={<Series/>}></Route>
       <Route exact path="/search" element={<Search/>}></Route>

     </Routes>
        </Container>

      </div>



      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
