import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';
import './Style.css'

function ProbOfficer({setAuth}) {
  const navigate = useNavigate();
  const [probId, setProbId] = useState('');
  const [probOfficerInfo, setProbOfficerInfo] = useState(null);
  const [editedProbOfficer, setEditedProbOfficer] = useState({});
  const [newProbOfficer, setNewProbOfficer] = useState({
    Last: '',
    First: '',
    Street: '',
    City: '',
    State: '',
    Zip: '',
    Phone: '',
    Email: '',
    Status: '',
  });

  const validatePhoneNumber = (input_str) => {
    var phoneno = /^\d+$/;
    return phoneno.test(input_str);
  };
  
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Phone' && !validatePhoneNumber(value)) {
      alert('Phone number should only contain numbers');
      return;
    }
    setNewProbOfficer(prevProbOfficer => ({
      ...prevProbOfficer,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setProbId(e.target.value);
    console.log('probId:', e.target.value);
  };

  const handleFetchProbOfficer = async (e) => {
    console.log('Starting handleFetchProbOfficer function');
    e.preventDefault();
  
    try {
      const resProbOfficer = await axios.get(`http://localhost:3300/api/getProbOfficer/${probId}`);
      console.log('Checking success property', resProbOfficer.data.success);
      console.log('Response data:', resProbOfficer.data);
      if (resProbOfficer.data.success) {
        const probOfficer = resProbOfficer.data.probOfficer;
        console.log('Fetched ProbOfficer:', probOfficer);
        setProbOfficerInfo(probOfficer);
        setEditedProbOfficer(probOfficer);
        console.log('Updated probOfficerInfo', probOfficer);
      } else {
        alert('Probation Officer does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProbOfficerChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Phone' && !validatePhoneNumber(value)) {
      alert('Phone number should only contain numbers');
      return;
    }
    setEditedProbOfficer(prevProbOfficer => ({
      ...prevProbOfficer,
      [name]: value
    }));
  };

  const handleConfirmProbOfficer = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateProbOfficer/${probId}`, editedProbOfficer);

      if (res.data.success) {
        alert('Probation Officer Update successful');
      } else {
        alert('Probation Officer Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProbOfficer = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteProbOfficer/${probId}`);

      if (res.data.success) {
        alert('Probation Officer Deletion successful');
        handleFetchProbOfficer({ preventDefault: () => {} });
      } else {
        alert('Probation Officer Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProbOfficer = async (e) => {
    e.preventDefault();
    console.log('handleAddProbOfficer called', newProbOfficer); 
    try {
      console.log('Sending post request');
      const res = await axios.post(`http://localhost:3300/api/addProbOfficer`, newProbOfficer);
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
        <div className="probID">
          <Text style={styles.authText}>Probation Officer ID:</Text>
        </div>
        <input type="text" name="probId" className="prob-id-text" onChange={handleChange} />
  
        <button type="button" name="fetchProbOfficer" className="prob-button" onClick={handleFetchProbOfficer}>
          Enter
        </button>
  
        {probOfficerInfo && (
          <div style={styles.probOfficerInfoContainer}>
            <Text style={styles.infoText}>Probation Officer Info:</Text>
            <p>Last Name: {probOfficerInfo.Last}</p>
            <p>First Name: {probOfficerInfo.First}</p>
            <p>Street: {probOfficerInfo.Street}</p>
            <p>City: {probOfficerInfo.City}</p>
            <p>State: {probOfficerInfo.State}</p>
            <p>Zip: {probOfficerInfo.Zip}</p>
            <p>Phone: {probOfficerInfo.Phone}</p>
            <p>Email: {probOfficerInfo.Email}</p>
            <p>Status: {probOfficerInfo.Status}</p>
          </div>
        )}
  
        {probOfficerInfo && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Probation Officer:</Text>
            <input type="text" name="Last" value={editedProbOfficer.Last} onChange={handleEditProbOfficerChange} />
            <input type="text" name="First" value={editedProbOfficer.First} onChange={handleEditProbOfficerChange} />
            <input type="text" name="Street" value={editedProbOfficer.Street} onChange={handleEditProbOfficerChange} />
            <input type="text" name="City" value={editedProbOfficer.City} onChange={handleEditProbOfficerChange} />
            <input type="text" name="State" value={editedProbOfficer.State} onChange={handleEditProbOfficerChange} />
            <input type="text" name="Zip" value={editedProbOfficer.Zip} onChange={handleEditProbOfficerChange} />
            <input type="text" name="Phone" value={editedProbOfficer.Phone} onChange={handleEditProbOfficerChange} />
            <input type="text" name="Email" value={editedProbOfficer.Email} onChange={handleEditProbOfficerChange} />
            <input type="text" name="Status" value={editedProbOfficer.Status} onChange={handleEditProbOfficerChange} />
            <button type="submit" name="confirmProbOfficer" className="prob-button" onClick={handleConfirmProbOfficer}>
              Confirm
            </button>
            <button type="submit" name="deleteProbOfficer" className="prob-button" onClick={handleDeleteProbOfficer}>
              Delete
            </button>
          </div>
        )}
  
        <form onSubmit={handleAddProbOfficer}>
        <div style={{transform: `translate(0%, 20%)`}}><Text style={styles.infoText}>Add New Probation Officer:</Text></div>
        
          <div style={{transform: `translate(18%, 5%)`}}>
            <div>
              <input type="text" name="Last" value={newProbOfficer.Last} onChange={handleNewChange} placeholder="Last Name" />
            </div>
            <div>
              <input type="text" name="First" value={newProbOfficer.First} onChange={handleNewChange} placeholder="First Name" />
            </div>
            <div>
              <input type="text" name="Street" value={newProbOfficer.Street} onChange={handleNewChange} placeholder="Street" />
            </div>
            <div>
              <input type="text" name="City" value={newProbOfficer.City} onChange={handleNewChange} placeholder="City" />
            </div>
            <div>
              <input type="text" name="State" value={newProbOfficer.State} onChange={handleNewChange} placeholder="State" />
            </div>
            <div>
              <input type="text" name="Zip" value={newProbOfficer.Zip} onChange={handleNewChange} placeholder="Zip" />
            </div>
            <div>
              <input type="text" name="Phone" value={newProbOfficer.Phone} onChange={handleNewChange} placeholder="Phone" />
            </div>
            <div>
              <input type="text" name="Email" value={newProbOfficer.Email} onChange={handleNewChange} placeholder="Email" />
            </div>
            <div>
              <input type="text" name="Status" value={newProbOfficer.Status} onChange={handleNewChange} placeholder="Status" />
            </div>
          </div>
          <button type="submit" name="addProbOfficer" className="prob-button" style={{transform: `translate(45%, 30%)`}}>
              Add Probation Officer
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
  probOfficerInfoContainer: {
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

export default ProbOfficer;