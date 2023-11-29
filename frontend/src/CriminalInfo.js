import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function CriminalInfo() {
  const navigate = useNavigate();
  const [criminalId, setCriminalId] = useState('');

  const handleChange = (e) => {
    setCriminalId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteCriminal/${criminalId}`);

      if (res.data.success) {
        alert('Success');
      } else {
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

        <button type="submit" name="deleteCriminal" className="delete-criminal" onClick={handleDelete}>
          <Text style={styles.buttonText}>Delete Criminal</Text>
        </button>
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
});

export default CriminalInfo;