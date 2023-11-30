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
  const [editedCriminal, setEditedCriminal] = useState({
    first: '',
    last: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleChange = (e) => {
    setCriminalId(e.target.value);
  };

  const handleFetchCriminal = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3300/api/getCriminal/${criminalId}`);

      if (res.data.success) {
        setCriminal(res.data.criminal);
        setEditedCriminal(res.data.criminal);
      } else {
        setCriminal(null);
        setEditedCriminal({
          first: '',
          last: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
        });
        alert('Criminal does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditChange = (e) => {
    setEditedCriminal({
      ...editedCriminal,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateCriminal/${criminalId}`, editedCriminal);

      if (res.data.success) {
        alert('Update successful');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteCriminal/${criminalId}`);

      if (res.data.success) {
        alert('Deletion successful');
        setCriminalId('');
        setCriminal(null);
        setEditedCriminal({
          first: '',
          last: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
        });
      } else {
        alert('Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div>
      <NavBar />
      <SignOut />
      <form style={styles.form}>
        <div className="criminalID">
          <Text style={styles.authText}>Criminal ID:</Text>
        </div>
        <input type="text" name="id" className="id-text" onChange={handleChange} />

        <button type="submit" name="fetchCriminal" className="fetch-criminal" onClick={handleFetchCriminal}>
          <Text style={styles.buttonText}>Fetch Criminal</Text>
        </button>

        {criminal && (
          <div style={styles.infoContainer}>
            <Text style={styles.infoText}>Criminal Info:</Text>
            <p>First: {criminal.first}</p>
            <p>Last: {criminal.last}</p>
            <p>Street: {criminal.street}</p>
            <p>City: {criminal.city}</p>
            <p>State: {criminal.state}</p>
            <p>Zip: {criminal.zip}</p>
            <p>Phone: {criminal.phone}</p>
          </div>
        )}
        {criminal && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Criminal Info:</Text>
            <div>
              <label>
                First Name:
                <input type="text" name="first" value={editedCriminal.first} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Last Name:
                <input type="text" name="last" value={editedCriminal.last} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Street:
                <input type="text" name="street" value={editedCriminal.street} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                City:
                <input type="text" name="city" value={editedCriminal.city} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                State:
                <input type="text" name="state" value={editedCriminal.state} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Zip:
                <input type="text" name="zip" value={editedCriminal.zip} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Phone:
                <input type="text" name="phone" value={editedCriminal.phone} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <button type="button" onClick={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </button>
            </div>
            <div>
              <button type="button" onClick={handleDelete}>
                <Text style={styles.buttonText}>Delete Criminal</Text>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  infoContainer: {
    textAlign: 'center',
    marginTop: 1,
  },
  editContainer: {
    textAlign: 'center',
    marginTop: 1,
  },
  authText: {
    fontSize: 35,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 10,
    
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
    marginTop: 20,
  },
});

export default CriminalInfo;