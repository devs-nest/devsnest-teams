import { HashRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Points from './components/Points';
import TeamPage from './components/TeamPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Route exact path='/'>
          <TeamPage/>
        </Route>
        <Route exact path='/points'>
          <Points/>
        </Route>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
