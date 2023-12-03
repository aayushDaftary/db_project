import NavBar from "./NavBar";
import SignOut from "./SignOut";
import {Text, StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-dom';
import './Style.css'
import axios from "axios";

function ManageInformation({setAuth}) {
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
        <h1 className="edit-prompt">
            <Text style = {styles.editText}>Edit:</Text>
        </h1>

        <button className = "criminal-info-button" onClick={navCriminalInfo}>
            <Text style = {styles.buttonText}>Criminal Information</Text>
        </button>

        <button className="alias-info-button" onClick={navAliasInfo}>
            <Text style = {styles.buttonText}>Alias Information</Text>
        </button>

        <button className = "appeal-info-button" onClick={navAppealInfo}>
            <Text style = {styles.buttonText}>Appeal Information</Text>
        </button>

        <button className = "sentence-info-button" onClick={navSentenceInfo}>
            <Text style = {styles.buttonText}>Sentence Information</Text>
        </button>

        <button className = "officer-info-button" onClick={navOfficerlInfo}>
            <Text style = {styles.buttonText}>Officer Information</Text>
        </button>

        <button className = "prob-officer-info-button" onClick={navProbOfficerInfo}>
            <Text style = {styles.buttonText}>Probation Officer Information</Text>
        </button>

        <button className = "crime-info-button" onClick={navCrimeInfo}>
            <Text style = {styles.buttonText}>Crimes Information</Text>
        </button>

        <button className = "charge-info-button" onClick={navChargeInfo}>
            <Text style = {styles.buttonText}>Charges Information</Text>
        </button>

        <SignOut setAuth={setAuth}/>
        </>
    )
}

const styles = StyleSheet.create({
    editText: {
        fontSize: 40,
        fontWeight: 'normal',
        color: 'white',
        top: 5,
        fontFamily: 'Roboto',
      },
    buttonText: {
        fontSize: 24,
        fontWeight: 'normal',
        color: 'black',
        fontFamily: 'Roboto',
    },
  });

export default ManageInformation;