import './App.css';
import {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RequireAuth from './RequireAuth';
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
  const [auth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cityjail/auth' element={<AuthForm setAuth={setAuth}/>}/>
        <Route path='/cityjail/criminals' element={<Criminals />}/>
        <Route path='/cityjail/sentences' element={<Sentences />}/>
        <Route path='/cityjail/officers' element={<Officers />}/>
        <Route path='/cityjail/crimes' element={<Crimes />}/>
        <Route path='/cityjail/charges' element={<Charges />}/>

        <Route path='/cityjail/manage-info' element={<RequireAuth isAuthenticated={auth}> <ManageInformation setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/criminal-info' element={<RequireAuth isAuthenticated={auth}><CriminalInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/alias-info' element={<RequireAuth isAuthenticated={auth}><AliasInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/appeal-info' element={<RequireAuth isAuthenticated={auth}><AppealInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/officer-info' element={<RequireAuth isAuthenticated={auth}><OfficerInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/probation-officer-info' element={<RequireAuth isAuthenticated={auth}><ProbOfficerInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/sentence-info' element={<RequireAuth isAuthenticated={auth}><SentenceInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/crime-info' element={<RequireAuth isAuthenticated={auth}><CrimeInfo setAuth={setAuth} /></RequireAuth>}/>
        <Route path='/cityjail/charge-info' element={<RequireAuth isAuthenticated={auth}><ChargeInfo setAuth={setAuth} /></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
