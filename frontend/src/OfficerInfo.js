import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';
import './Style.css'

function OfficerInfo({setAuth}) {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('');
  const [officerInfo, setOfficerInfo] = useState(null);
  const [editedOfficer, setEditedOfficer] = useState({});
  const [newOfficer, setNewOfficer] = useState({
    Last: '',
    First: '',
    Precinct: '',
    Badge: '',
    Phone: '',
    Status: '',
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewOfficer(prevOfficer => ({
      ...prevOfficer,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setOfficerId(e.target.value);
    console.log('officerId:', e.target.value);
  };

  const handleFetchOfficer = async (e) => {
    console.log('Starting handleFetchOfficer function');
    e.preventDefault();
  
    try {
      const resOfficer = await axios.get(`http://localhost:3300/api/getOfficer/${officerId}`);
      console.log('Checking success property', resOfficer.data.success);
      console.log('Response data:', resOfficer.data);
      if (resOfficer.data.success) {
        const officer = resOfficer.data.officer;
        console.log('Fetched Officer:', officer);
        setOfficerInfo(officer);
        setEditedOfficer(officer);
        console.log('Updated officerInfo', officer);
      } else {
        alert('Officer does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditOfficerChange = (e) => {
    const { name, value } = e.target;
    setEditedOfficer(prevOfficer => ({
      ...prevOfficer,
      [name]: value
    }));
  };

  const handleConfirmOfficer = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateOfficer/${officerId}`, editedOfficer);

      if (res.data.success) {
        alert('Officer Update successful');
      } else {
        alert('Officer Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteOfficer = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteOfficer/${officerId}`);

      if (res.data.success) {
        alert('Officer Deletion successful');
        handleFetchOfficer({ preventDefault: () => {} });
      } else {
        alert('Officer Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    console.log(newOfficer);
    console.log('handleAddOfficer called', newOfficer); 
    try {
      console.log('Sending post request');
      const res = await axios.post(`http://localhost:3300/api/addOfficer`, newOfficer);
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
      <div style={styles.form}>
        <div className="officerID">
          <Text style={styles.authText}>Officer ID:</Text>
        </div>
        <input type="text" name="officerId" className="officer-id-text" onChange={handleChange} />
  
        <button type="button" name="fetchOfficer" className="fetch-officer" onClick={handleFetchOfficer}>
          <Text style={styles.buttonText}>Fetch Officer</Text>
        </button>
  
        {officerInfo && (
          <div style={styles.officerInfoContainer}>
            <Text style={styles.infoText}>Officer Info:</Text>
            <p>Last Name: {officerInfo.Last}</p>
            <p>First Name: {officerInfo.First}</p>
            <p>Precinct: {officerInfo.Precinct}</p>
            <p>Badge: {officerInfo.Badge}</p>
            <p>Phone: {officerInfo.Phone}</p>
            <p>Status: {officerInfo.Status}</p>
          </div>
        )}
  
        {officerInfo && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Officer:</Text>
            <input type="text" name="Last" value={editedOfficer.Last} onChange={handleEditOfficerChange} />
            <input type="text" name="First" value={editedOfficer.First} onChange={handleEditOfficerChange} />
            <input type="text" name="Precinct" value={editedOfficer.Precinct} onChange={handleEditOfficerChange} />
            <input type="text" name="Badge" value={editedOfficer.Badge} onChange={handleEditOfficerChange} />
            <input type="text" name="Phone" value={editedOfficer.Phone} onChange={handleEditOfficerChange} />
            <input type="text" name="Status" value={editedOfficer.Status} onChange={handleEditOfficerChange} />
            <button type="button" name="confirmOfficer" className="confirm-officer" onClick={handleConfirmOfficer}>
              <Text style={styles.buttonText}>Confirm Changes</Text>
            </button>
            <button type="button" name="deleteOfficer" className="delete-officer" onClick={handleDeleteOfficer}>
              <Text style={styles.buttonText}>Delete Officer</Text>
            </button>
          </div>
        )}
  
        <form onSubmit={handleAddOfficer}>
          <Text style={styles.infoText}>Add New Officer:</Text>
          <input type="text" name="Last" value={newOfficer.Last} onChange={handleNewChange} placeholder="Last Name" />
          <input type="text" name="First" value={newOfficer.First} onChange={handleNewChange} placeholder="First Name" />
          <input type="text" name="Precinct" value={newOfficer.Precinct} onChange={handleNewChange} placeholder="Precinct" />
          <input type="text" name="Badge" value={newOfficer.Badge} onChange={handleNewChange} placeholder="Badge" />
          <input type="text" name="Phone" value={newOfficer.Phone} onChange={handleNewChange} placeholder="Phone" />
          <input type="text" name="Status" value={newOfficer.Status} onChange={handleNewChange} placeholder="Status" />
          <button type="submit" name="addOfficer" className="add-officer">
            <Text style={styles.buttonText}>Add Officer</Text>
          </button>
        </form>
      
      </div>
  </div>
  );
}
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  authText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  buttonText: {
    fontSize: '16px',
    color: '#fff',
  },
  officerInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginTop: '20px',
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginTop: '20px',
  },
  infoText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
};
export default OfficerInfo;