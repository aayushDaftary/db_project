import './Style.css'
import {Text, StyleSheet} from 'react-native';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AuthForm() {
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        username: "",
        password:"",
    });

    const handleChange = (e) =>{
        setUsers((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSignIn = async e =>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:3300/api/signin", users)
            .then(res => {
                if (res.data.authorization) {
                    alert("Signed in!")
                    navigate("/cityjail/home")
                } else {
                    alert("Invalid credentials. Please try again.")
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateAcc = async (e) => {
        e.preventDefault();
        
        try {
            const dupResponse = await axios.post("http://localhost:3300/api/checkdup", { username: users.username });
            const isDuplicate = dupResponse.data.duplicate;
    
            if (isDuplicate) {
                alert("Account already exists. Please try a different username.");
            } else {
                await axios.post("http://localhost:3300/api/createacc", users);
                alert("Account created!");
                navigate("/cityjail/home");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(()=>{
    //     const fetchallUsers = async ()=>{
    //         try {
    //             const res = await axios.get("http://localhost:3300/api/signin")
    //             console.log(res)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchallUsers()
    // },[])

    return(
        <>
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
  