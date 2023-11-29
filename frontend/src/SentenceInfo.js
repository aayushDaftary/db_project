import './Style.css'
import {Text, StyleSheet} from 'react-native';
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut'

function SentenceInfo() {
    const navigate = useNavigate()
    

    return(
        <>
        <NavBar />

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
    }
  });

export default SentenceInfo;