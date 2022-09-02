import Calendar from './components/Calendar';
import './main.css';

const now = new Date(1977, 0, 23);

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
