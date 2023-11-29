import { useNavigate } from 'react-router-dom';
import './Style.css'
import {Text, StyleSheet} from 'react-native';

function NavBar() {
    const navigate = useNavigate()
    const navHome = async e => {
        navigate('/cityjail/home')
    }
    const navCriminals = async e =>{
        navigate('/cityjail/criminals')
    }
    const navSentences = async e =>{
        navigate('/cityjail/sentences')
    }
    const navOfficers = async e =>{
        navigate('/cityjail/officers')
    }
    const navCrimes = async e =>{
        navigate('/cityjail/crimes')
    }
    const navCharges = async e =>{
        navigate('/cityjail/charges')
    }

    return(
        <>
            <div className='nav-bar'>
                <button className="home-button" onClick={navHome}>
                    <Text style={styles.navText}>Home</Text>
                </button>
                <button className='criminals-button' onClick={navCriminals}>
                    <Text style={styles.navText}>Criminals</Text>
                </button>
                <button className='sentences-button' onClick={navSentences}>
                    <Text style={styles.navText}>Sentences</Text>
                </button>
                <button className='officers-button' onClick={navOfficers}>
                    <Text style={styles.navText}>Officers</Text>
                </button>
                <button className='crimes-button' onClick={navCrimes}>
                    <Text style={styles.navText}>Crimes</Text>
                </button>
                <button className='charges-button' onClick={navCharges}>
                    <Text style={styles.navText}>Charges</Text>
                </button>
            </div>
        </>
    )
}

const styles = StyleSheet.create({
    navText: {
        fontSize: 35,
        fontWeight: 'normal',
        color: 'black',
    }
});

export default NavBar;