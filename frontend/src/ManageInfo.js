import './Style.css'
import {Text, StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-dom';

function ManageInfo() {
    const navigate = useNavigate()
    const navAuth = async e =>{
        navigate('/cityjail/manage-info')
    }
    return (
        <button className='manage-info-button' onClick={navAuth}>
            <Text style={styles.buttonText}>Manage Information</Text>
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

export default ManageInfo;