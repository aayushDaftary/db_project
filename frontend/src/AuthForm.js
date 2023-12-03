import './Style.css'
import {Text, StyleSheet} from 'react-native';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';


function AuthForm({setAuth}) {
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        username: "",
        password:"",
    });

    const handleChange = (e) =>{
        setUsers((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSignIn = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:3300/api/signin", users)
            .then(res => {
                if (res.data.authorization) {
                    alert("Signed in!");
                    setAuth(true);
                    navigate("/cityjail/manage-info")
                } else {
                    console.log(res.data);
                    alert("Invalid credentials. Please try again.")
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateAcc = async e =>{
        e.preventDefault()
        var isDup = false;
        try {
            await axios.post("http://localhost:3300/api/checkdup", users)
            .then(res =>{
                isDup = res.data.duplicate;
            })
        } catch (err) {
            console.log(err)
        }

        if (isDup) {
            alert("Username already exists.");
        } else {
            try {
                await axios.post("http://localhost:3300/api/createacc", users);
                alert("Account created. Please sign in.")
                window.location.reload(true);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return(
        <>
        <NavBar />
        <div className="auth-title">
                <Text style={styles.titleText}>City Jail Information Center</Text>
        </div>
        <form>
            <div className="username">
                <Text style={styles.authText}>User Name:</Text>
            </div>
            <input type="text" name ="username" className="username-text" onChange={handleChange}/>

            <div className="password"> 
                <Text style={styles.authText}>Password:</Text>
            </div>
            <input type="password" name ="password" className="password-text" onChange={handleChange}/>

            <button type="submit" name="signIn" className="sign-in" onClick={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </button>

            <button type="submit" name="createAccount" className="create-account" onClick={handleCreateAcc}> 
                <Text style={styles.buttonText}>Create Account</Text>
            </button>
        </form>
        </>
    );
}

const styles = StyleSheet.create({
    titleText: {
      fontSize: 70,
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



export default AuthForm;
  