
import _Navbar from './components/_Navbar';
import Setup from './views/Setup';
import WaterControl from './views/WaterControl';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <_Navbar/>
      <Setup/>    
    </div>
  );
}

export default App;
