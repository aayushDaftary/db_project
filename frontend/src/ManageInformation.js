import NavBar from "./NavBar";
import SignOut from "./SignOut";
import {Text, StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-dom';
import './Style.css'

function ManageInformation() {
    const navigate = useNavigate()
    const navCriminalInfo = async e => {
        navigate('/cityjail/criminal-info')
    }
    const navAliasInfo = async e => {
        navigate('/cityjail/alias-info')
    }
    const navAppealInfo = async e => {
        navigate('/cityjail/appeal-info')
    }
    const navOfficerlInfo = async e => {
        navigate('/cityjail/officer-info')
    }
    const navProbOfficerInfo = async e => {
        navigate('/cityjail/probation-officer-info')
    }
    const navSentenceInfo = async e => {
        navigate('/cityjail/sentence-info')
    }
    const navCrimeInfo = async e => {
        navigate('/cityjail/crime-info')
    }
    const navChargeInfo = async e => {
        navigate('/cityjail/charge-info')
    }
    return (
        <>
        <NavBar />
        <h1>manage info page</h1>
        <div className = "manage1-button">
            <button className = "Page1" onClick={navCriminalInfo}>
                <Text style = {styles.buttonText}>Criminal Information</Text>
            </button>
        </div>
        <div className = "manage-button">
            <button className = "Page2" onClick={navAliasInfo}>
                <Text style = {styles.buttonText}>Alias      Information</Text>
            </button>
        </div>
        <div className = "manage2-button">
            <button className = "Page2" onClick={navAppealInfo}>
                <Text style = {styles.buttonText}>Appeal      Information</Text>
            </button>
        </div>
        <div className = "manage3-button">
            <button className = "Page2" onClick={navSentenceInfo}>
                <Text style = {styles.buttonText}>Sentence      Information</Text>
            </button>
        </div>
        <div className = "manage4-button">
            <button className = "Page2" onClick={navOfficerlInfo}>
                <Text style = {styles.buttonText}>Officer      Information</Text>
            </button>
        </div>
        <div className = "manage5-button">
            <button className = "Page2" onClick={navProbOfficerInfo}>
                <Text style = {styles.buttonText}>Probation Officer Information</Text>
            </button>
        </div>
        <div className = "manage6-button">
            <button className = "Page2" onClick={navCrimeInfo}>
                <Text style = {styles.buttonText}>Crimes Information</Text>
            </button>
        </div>
        <div className = "manage7-button">
            <button className = "Page2" onClick={navChargeInfo}>
                <Text style = {styles.buttonText}>Charges Information</Text>
            </button>
        </div>
       
        <SignOut />
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
      fontSize: 70,
      fontWeight: 'bold',
      color: 'white',
    },
    infoText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
      },
    authText: {
        fontSize: 35,
        fontWeight: 'normal',
        color: 'black',
        top: 30,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'normal',
        color: 'purple',
    },
  
  });

export default ManageInformation;