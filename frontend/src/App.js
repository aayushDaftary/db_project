import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
import Home from './Home';
import Criminals from './Criminals'
import Sentences from './Sentences'
import Officers from './Officers'
import Crimes from './Crimes'
import Charges from './Charges'
import ManageInformation from './ManageInformation'
import CriminalInfo from './CriminalInfo'
import AliasInfo from './AliasInfo'
import AppealInfo from './AppealInfo'
import OfficerInfo from './OfficerInfo'
import ProbOfficerInfo from './ProbOfficerInfo'
import CrimeInfo from './CrimeInfo'
import ChargeInfo from './ChargeInfo'
import SentenceInfo from './SentenceInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthForm />}/>
        <Route path='/cityjail/home' element={<Home />}/>
        <Route path='/cityjail/criminals' element={<Criminals />}/>
        <Route path='/cityjail/sentences' element={<Sentences />}/>
        <Route path='/cityjail/officers' element={<Officers />}/>
        <Route path='/cityjail/crimes' element={<Crimes />}/>
        <Route path='/cityjail/charges' element={<Charges />}/>

        <Route path='/cityjail/manage-info' element={<ManageInformation />}/>
        <Route path='/cityjail/criminal-info' element={<CriminalInfo />}/>
        <Route path='/cityjail/alias-info' element={<AliasInfo />}/>
        <Route path='/cityjail/appeal-info' element={<AppealInfo />}/>
        <Route path='/cityjail/officer-info' element={<OfficerInfo />}/>
        <Route path='/cityjail/probation-officer-info' element={<ProbOfficerInfo />}/>
        <Route path='/cityjail/sentence-info' element={<SentenceInfo />}/>
        <Route path='/cityjail/crime-info' element={<CrimeInfo />}/>
        <Route path='/cityjail/charge-info' element={<ChargeInfo />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
