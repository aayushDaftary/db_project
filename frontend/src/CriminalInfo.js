import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function CriminalInfo() {
  const navigate = useNavigate();
  const [criminalId, setCriminalId] = useState('');
  const [criminal, setCriminal] = useState(null);

  const handleChange = (e) => {
    setCriminalId(e.target.value);
  };

  const handleFetchCriminal = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3300/api/getCriminal/${criminalId}`);

      if (res.data.success) {
        setCriminal(res.data.criminal);
      } else {
        setCriminal(null);
        alert('Criminal does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <SignOut />
      <form>
        <div className="criminalID">
          <Text style={styles.authText}>Criminal ID:</Text>
        </div>
        <input type="text" name="id" className="id-text" onChange={handleChange} />

        <button type="submit" name="fetchCriminal" className="fetch-criminal" onClick={handleFetchCriminal}>
          <Text style={styles.buttonText}>Fetch Criminal</Text>
        </button>

        {criminal && (
          <div>
            <Text style={styles.infoText}>Criminal Info:</Text>
            <p>FirstName: {criminal.first}</p>
            <p>LastName: {criminal.last}</p>
            <p>Street: {criminal.street}</p>
            <p>City: {criminal.city}</p>
            <p>State: {criminal.state}</p>
            <p>Zip: {criminal.zip}</p>
            <p>Phone: {criminal.phone}</p>
            
          </div>
        )}
      </form>
    </>
  );
}

const styles = StyleSheet.create({
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
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default CriminalInfo;