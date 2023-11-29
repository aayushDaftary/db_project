import './Style.css'
import {Text, StyleSheet} from 'react-native';
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut'

function Home() {
    const navigate = useNavigate()
    const navManageInfo = async e => {
        navigate('/cityjail/manage-info')
    }

    return(
        <>
        <NavBar />
        <div className="home-title">
            <Text style={styles.titleText}>City Jail Information Center</Text>
        </div>
        <button className="manage-info" onClick={navManageInfo}>
            <Text style={styles.infoText}>Manage Information</Text>
        </button>
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
        color: 'white',
    }
  });

export default Home;