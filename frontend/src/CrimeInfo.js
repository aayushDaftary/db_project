import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function CrimeInfo({setAuth}) {
  const navigate = useNavigate();
  const [crimeId, setCrimeId] = useState('');
  const [crimeInfo, setCrimeInfo] = useState(null);
  const [editedCrime, setEditedCrime] = useState({});
  const [newCrime, setNewCrime] = useState({
    Criminal_ID: '',
    Classification: '',
    Date_charged: '',
    Status: '',
    Hearing_date: '',
    Appeal_cut_date: '',
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewCrime(prevCrime => ({
      ...prevCrime,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setCrimeId(e.target.value);
    console.log('crimeId:', e.target.value);
  };

  const handleFetchCrime = async (e) => {
    console.log('Starting handleFetchCrime function');
    e.preventDefault();
  
    try {
      const resCrime = await axios.get(`http://localhost:3300/api/getCrime/${crimeId}`);
      console.log('Checking success property', resCrime.data.success);
      console.log('Response data:', resCrime.data);
      if (resCrime.data.success) {
        const crime = resCrime.data.crime;
        console.log('Date_charged:', new Date(crime.Date_charged).toISOString().substring(0, 10));
        console.log('Hearing_date:', new Date(crime.Hearing_date).toISOString().substring(0, 10));
        console.log('Appeal_cut_date:', new Date(crime.Appeal_cut_date).toISOString().substring(0, 10));
        console.log('Fetched Crime:', crime);
        crime.Date_charged = new Date(crime.Date_charged).toISOString().substring(0, 10);
        crime.Hearing_date = new Date(crime.Hearing_date).toISOString().substring(0, 10);
        crime.Appeal_cut_date = new Date(crime.Appeal_cut_date).toISOString().substring(0, 10);
        console.log('Date_charged:', new Date(crime.Date_charged).toISOString().substring(0, 10));
        console.log('Hearing_date:', new Date(crime.Hearing_date).toISOString().substring(0, 10));
        console.log('Appeal_cut_date:', new Date(crime.Appeal_cut_date).toISOString().substring(0, 10));
        setCrimeInfo(crime);
        setEditedCrime(crime);
        console.log('Updated crimeInfo', crime);
      } else {
        alert('Crime does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCrimeChange = (e) => {
    const { name, value } = e.target;
    setEditedCrime(prevCrime => ({
      ...prevCrime,
      [name]: value
    }));
  };

  const handleConfirmCrime = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateCrime/${crimeId}`, editedCrime);

      if (res.data.success) {
        alert('Crime Update successful');
      } else {
        alert('Crime Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteCrime = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteCrime/${crimeId}`);

      if (res.data.success) {
        alert('Crime Deletion successful');
        // Fetch crime again after deletion
        handleFetchCrime({ preventDefault: () => {} });
      } else {
        alert('Crime Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCrime = async (e) => {
    e.preventDefault();
    console.log('handleAddCrime called', newCrime); 
    try {
      console.log('Sending post request');
      const res = await axios.post(`http://localhost:3300/api/addCrime`, newCrime);
      if (res.data.success) {
        alert('Successfully added');
      } else {
        alert('Unsuccessful');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <SignOut setAuth={setAuth} />
      <form style={styles.form}>
        <div className="crimeID">
          <Text style={styles.authText}>Crime ID:</Text>
        </div>
        <input type="text" name="crimeId" className="crime-id-text" onChange={handleChange} />

        <button type="submit" name="fetchCrime" className="fetch-crime" onClick={handleFetchCrime}>
          <Text style={styles.buttonText}>Fetch Crime</Text>
        </button>

        {crimeInfo && (
          <div style={styles.crimeInfoContainer}>
            <Text style={styles.infoText}>Crime Info:</Text>
            <p>Criminal ID: {crimeInfo.Criminal_ID}</p>
            <p>Classification: {crimeInfo.Classification}</p>
            <p>Date Charged: {crimeInfo.Date_charged}</p>
            <p>Status: {crimeInfo.Status}</p>
            <p>Hearing Date: {crimeInfo.Hearing_date}</p>
            <p>Appeal Cut Date: {crimeInfo.Appeal_cut_date}</p>
          </div>
        )}
        {crimeInfo && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Crime:</Text>
            <label>
              Criminal ID:
              <input
                type="text"
                value={editedCrime.Criminal_ID || ''}
                name="Criminal_ID"
                onChange={handleEditCrimeChange}
              />
            </label>
            <label>
              Classification:
              <input
                type="text"
                value={editedCrime.Classification || ''}
                name="Classification"
                onChange={handleEditCrimeChange}
              />
            </label>
            <label>
              Date Charged:
              <input
                type="date"
                value={editedCrime.Date_charged || ''}
                name="Date_charged"
                onChange={handleEditCrimeChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                value={editedCrime.Status || ''}
                name="Status"
                onChange={handleEditCrimeChange}
              />
            </label>
            <label>
              Hearing Date:
              <input
                type="date"
                value={editedCrime.Hearing_date || ''}
                name="Hearing_date"
                onChange={handleEditCrimeChange}
              />
            </label>
            <label>
              Appeal Cut Date:
              <input
                type="date"
                value={editedCrime.Appeal_cut_date || ''}
                name="Appeal_cut_date"
                onChange={handleEditCrimeChange}
              />
            </label>
            <button type="submit" name="confirmEdit" className="confirm-edit" onClick={handleConfirmCrime}>
              <Text style={styles.buttonText}>Confirm Edit</Text>
            </button>
            <button type="submit" name="deleteCrime" className="delete-crime" onClick={handleDeleteCrime}>
              <Text style={styles.buttonText}>Delete Crime</Text>
            </button>
          </div>
        )}

        <div style={styles.addContainer}>
          <Text style={styles.infoText}>Add Crime:</Text>
          <label>
            Criminal ID:
            <input
              type="text"
              value={newCrime.Criminal_ID || ''}
              name="Criminal_ID"
              onChange={handleNewChange}
            />
          </label>
          <label>
            Classification:
            <input
              type="text"
              value={newCrime.Classification || ''}
              name="Classification"
              onChange={handleNewChange}
            />
          </label>
          <label>
            Date Charged:
            <input
              type="date"
              value={newCrime.Date_charged || ''}
              name="Date_charged"
              onChange={handleNewChange}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={newCrime.Status || ''}
              name="Status"
              onChange={handleNewChange}
            />
          </label>
          <label>
            Hearing Date:
            <input
              type="date"
              value={newCrime.Hearing_date || ''}
              name="Hearing_date"
              onChange={handleNewChange}
            />
          </label>
          <label>
            Appeal Cut Date:
            <input
              type="date"
              value={newCrime.Appeal_cut_date || ''}
              name="Appeal_cut_date"
              onChange={handleNewChange}
            />
          </label>
          <button type="submit" name="addCrime" className="add-crime" onClick={handleAddCrime}>
            <Text style={styles.buttonText}>Add Crime</Text>
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  authText: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
  },
  buttonText: {
    fontSize: '16px',
    color: '#fff',
  },
  crimeInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    marginTop: '20px',
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    marginTop: '20px',
  },
  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    marginTop: '20px',
  },
  infoText: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
  },
});

export default CrimeInfo;
