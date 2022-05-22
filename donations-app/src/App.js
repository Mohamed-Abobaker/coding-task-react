import './App.css';
import Donations from './donations';
import AddDonation from './addDonation';

function App() {
  const baseUrl = 'https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems';
  return (
    <div className="App">
      <AddDonation baseUrl={baseUrl}/>
      <Donations baseUrl={baseUrl}/>
    </div>
  );
}

export default App;
