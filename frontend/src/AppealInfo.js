import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function AppealInfo({setAuth}) {
  const navigate = useNavigate();
  const [appealId, setAppealId] = useState('');
  const [appealInfo, setAppealInfo] = useState(null);
  const [editedAppeal, setEditedAppeal] = useState({});
  const [newAppeal, setNewAppeal] = useState({
    crimeId: '',
    filingDate: '',
    hearingDate: '',
    status: '',
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewAppeal(prevAppeal => ({
      ...prevAppeal,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setAppealId(e.target.value);
    console.log('appealId:', e.target.value);
  };

  const handleFetchAppeal = async (e) => {
    console.log('Starting handleFetchAppeal function');
    e.preventDefault();
  
    try {
      const resAppeal = await axios.get(`http://localhost:3300/api/getAppeal/${appealId}`);
      console.log('Checking success property', resAppeal.data.success);
      console.log('Response data:', resAppeal.data);
      if (resAppeal.data.success) {
        const appeal = resAppeal.data.appeal;
        console.log('filingDate:', new Date(appeal.filingDate).toISOString().substring(0, 10));
        console.log('hearingDate:', new Date(appeal.hearingDate).toISOString().substring(0, 10));
        console.log('Fetched Appeal:', appeal);  
        appeal.filingDate = new Date(appeal.filingDate).toISOString().substring(0, 10);
        appeal.hearingDate = new Date(appeal.hearingDate).toISOString().substring(0, 10);
        console.log('filingDate:', new Date(appeal.filingDate).toISOString().substring(0, 10));
        console.log('hearingDate:', new Date(appeal.hearingDate).toISOString().substring(0, 10));       
        setAppealInfo(appeal);
        setEditedAppeal(appeal);
        console.log('Updated appealInfo', appeal);
      } else {
        alert('Appeal does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAppealChange = (e) => {
    const { name, value } = e.target;
    setEditedAppeal(prevAppeal => ({
      ...prevAppeal,
      [name]: value
    }));
  };

  const handleConfirmAppeal = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateAppeal/${appealId}`, editedAppeal);

      if (res.data.success) {
        alert('Appeal Update successful');
      } else {
        alert('Appeal Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAppeal = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteAppeal/${appealId}`);

      if (res.data.success) {
        alert('Appeal Deletion successful');
        handleFetchAppeal({ preventDefault: () => {} });
      } else {
        alert('Appeal Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddAppeal = async (e) => {
    e.preventDefault();
    console.log('handleAddAppeal called', newAppeal); 
    try {
      console.log('Sending post request');
      const res = await axios.post(`http://localhost:3300/api/addAppeal`, newAppeal);
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
      <form>
        <div className='info-container'>
            <div className='info-label'>View/Change Appeal Information</div>
            <div className='id-label'>Appeal ID:</div>
            <input type="text" name="appealId" className="id-input" placeholder={"Enter ID Here"} onChange={handleChange} />
            <button type="submit" name="fetchAppeal" className="info-button" onClick={handleFetchAppeal}>Enter</button>
        </div>

        {appealInfo && (
          <div>
          <div className='attr-container'>
            <p className='attr'>Crime ID: {appealInfo.crimeId}</p>
            <p className='attr'>Filing Date: {appealInfo.filingDate}</p>
            <p className='attr'>Hearing Date: {appealInfo.hearingDate}</p>
            <p className='attr'>Status: {appealInfo.status}</p>
          </div>
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Appeal:</Text>
            <label>
              Crime ID:
              <input
                type="text"
                value={editedAppeal.crimeId || ''}
                name="crimeId"
                onChange={handleEditAppealChange}
              />
            </label>
            <label>
              Filing Date:
              <input
                type="text"
                value={editedAppeal.filingDate || ''}
                name="filingDate"  // Change this
                onChange={handleEditAppealChange}
              />
            </label>
            <label>
              Hearing Date:
              <input
                type="text"
                value={editedAppeal.hearingDate || ''}
                name="hearingDate"  // And this
                onChange={handleEditAppealChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                value={editedAppeal.status || ''}
                name="status"
                onChange={handleEditAppealChange}
              />
            </label>
                    <button type="button" onClick={handleConfirmAppeal}>
                      <Text style={styles.buttonText}>Confirm Appeal Update</Text>
                    </button>
                    <button type="button" onClick={handleDeleteAppeal}>
                      <Text style={styles.buttonText}>Delete Appeal</Text>
                    </button>
                  </div>
                </div>
              )}
      </form>



      <form>
      <div style={{transform: `translate(43%, 5%)`}}>
        <div className="crime_id">
          <Text style={styles.authText}>Crime ID:</Text>
        </div>
        <input type="text" name="crimeId" className="crime-id-text" onChange={handleNewChange} />

        <div className="filing_date">
          <Text style={styles.authText}>Filing Date:</Text>
        </div>
        <input
          type="date"
          name="filingDate"
          className="filing-date-text"
          onChange={handleNewChange}
        />

        <div className="hearing_date">
          <Text style={styles.authText}>Hearing Date:</Text>
        </div>
        <input
          type="date"
          name="hearingDate"
          className="hearing-date-text"
          onChange={handleNewChange}
        />

        <div className="status">
          <Text style={styles.authText}>Status:</Text>
        </div>
        <input type="text" name="status" className="status-text" onChange={handleNewChange} />

        <button type="submit" name="addAppeal" className="add-appeal" onClick={handleAddAppeal}>
          <Text style={styles.buttonText}>Add Appeal</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  appealInfoContainer: {
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

export default AppealInfo;
