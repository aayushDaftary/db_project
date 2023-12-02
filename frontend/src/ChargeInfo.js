import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import SignOut from './SignOut';
import ManageInfo from './ManageInfo';

function ChargeInfo() {
  const [chargeID, setChargeID] = useState('');
  const [charge, setCharge] = useState(null);
  const [editedCharge, setEditedCharge] = useState({
    crime_id: '',
    crime_code: '',
    status: '',
    fine: '',
    fee: '',
    paid: '',
    due: '',
  });
  const [newCharge, setNewCharge] = useState({
    crime_id: '',
    crime_code: '',
    status: '',
    fine: '',
    fee: '',
    paid: '',
    due: '',
  });

  const handleChange = (e) => {
    setChargeID(e.target.value);
  };

  const handleFetchCharge = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3300/api/getCharge/${chargeID}`);

      if (res.data.success) {
        setCharge(res.data.charge);
        setEditedCharge(res.data.charge);
      } else {
        setCharge(null);
        setEditedCharge({
          crime_id: '',
          crime_code: '',
          status: '',
          fine: '',
          fee: '',
          paid: '',
          due: '',
        });
        alert('Charge does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditChange = (e) => {
    setEditedCharge((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleInsertChange = (e) => {
    setNewCharge((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleConfirm = async () => {
    editedCharge.due = new Date(editedCharge.due).toJSON().slice(0,10);
    try {
      const res = await axios.put(`http://localhost:3300/api/editCharge/${chargeID}`, editedCharge);
      if (res.data.success) {
        alert('successful');
      } else {
        alert('failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInsert = async (e) => {
    try{
      const res = await axios.post(`http://localhost:3300/api/insertCharges`, newCharge);
      if(res.data.success){
        alert('Successfully added');
      }
      else{
        console.log(res.data);
        alert('Unsuccessful');
      }
    }
    catch(err)
    {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteCharge/${chargeID}`);

      if (res.data.success) {
        alert('Deletion successful');
        setChargeID('');
        setCharge(null);
        setEditedCharge({
          crime_id: '',
          crime_code: '',
          status: '',
          fine: '',
          fee: '',
          paid: '',
          due: '',
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
      
      <form className='charge-info-form'>
        <div style={styles.container}> 
          <Text style={styles.authText}>Charge ID:</Text>
          <input type="text" name="id" className="id-text" onChange={handleChange} />
          <button type="submit" name="fetchCharge" className="fetch-charge" onClick={handleFetchCharge}>
            <Text style={styles.buttonText}>Fetch Charge</Text>
          </button>
        </div>
       
        {charge && (
          <div style={styles.infoContainer}>
            <Text style={styles.infoText}>Charge Info:</Text>
            <p>Crime ID: {charge.crime_id}</p>
            <p>Crime Code: {charge.crime_code}</p>
            <p>Charge Status: {charge.status}</p>
            <p>Fine Amount: {charge.fine}</p>
            <p>Court Fee: {charge.fee}</p>
            <p>Paid Amount: {charge.paid}</p>
            <p>Pay Due Date: {new Date(charge.due).toJSON().slice(0,10)}</p>
          </div>
        )}
        {charge && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Charge Info:</Text>
            <div>
              <label>
                Crime ID:
                <input type="text" name="crime_id" value={editedCharge.crime_id} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Crime Code:
                <input type="text" name="crime_code" value={editedCharge.crime_code} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Charge Status:
                <input type="text" name="status" value={editedCharge.status} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Fine Amount:
                <input type="text" name="fine" value={editedCharge.fine} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Court Fee:
                <input type="text" name="fee" value={editedCharge.fee} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Amount Paid:
                <input type="text" name="paid" value={editedCharge.paid} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <label>
                Pay Due Date:
                <input type="text" name="due" value={editedCharge.due} onChange={handleEditChange} />
              </label>
            </div>
            <div>
              <button type="button" onClick={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </button>
            </div>
            <div>
              <button type="button" onClick={handleDelete}>
                <Text style={styles.buttonText}>Delete Charge</Text>
              </button>
            </div>
          </div>
        )}
      </form>

      <form name='charge-insert-form'>
      <div style={styles.editContainer}>
            <Text style={styles.infoText}>Add New Charge Info:</Text>
            <div>
              <label>
                Crime ID:
                <input type="text" name="crime_id" value={newCharge.crime_id} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Crime Code:
                <input type="text" name="crime_code" value={newCharge.crime_code} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Charge Status:
                <input type="text" name="status" value={newCharge.status} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Fine Amount:
                <input type="text" name="fine" value={newCharge.fine} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Court Fee:
                <input type="text" name="fee" value={newCharge.fee} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Amount Paid:
                <input type="text" name="paid" value={newCharge.paid} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <label>
                Pay Due Date:
                <input type="date" name="due" value={newCharge.due} onChange={handleInsertChange} />
              </label>
            </div>
            <div>
              <button type="button" onClick={handleInsert}>
                <Text style={styles.buttonText}>Add New charge</Text>
              </button>
            </div>
        </div>
      </form>

      <ManageInfo />
      <SignOut />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

export default ChargeInfo;