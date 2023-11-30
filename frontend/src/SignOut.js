import './Style.css'
import {Text, StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-dom';

function SignOut() {
    const navigate = useNavigate()
    const navAuth = async e =>{
        navigate('/')
    }
    return (
        <button className='sign-out' onClick={navAuth}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </button>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 35,
        fontWeight: 'normal',
        color: 'white',
        bottom: 3,
    }
});

export default SignOut;