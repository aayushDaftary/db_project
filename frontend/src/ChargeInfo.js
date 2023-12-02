import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function ChargeInfo() {
  const navigate = useNavigate();
  const [chargeId, setChargeId] = useState('');
  const [chargeInfo, setChargeInfo] = useState(null);
  const [editedCharge, setEditedCharge] = useState({});
  const [newCharge, setNewCharge] = useState({
    crimeId: '',
    crimeCode: '',
    chargeStatus: '',
    fineAmount: '',
    courtFee: '',
    amountPaid: '',
    payDueDate: '',
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewCharge(prevCharge => ({
      ...prevCharge,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setChargeId(e.target.value);
    console.log('chargeId:', e.target.value);
  };

  const handleFetchCharge = async (e) => {
    console.log('Starting handleFetchCharge function');
    e.preventDefault();
  
    try {
      const resCharge = await axios.get(`http://localhost:3300/api/getCharge/${chargeId}`);
      console.log('Server response:', resCharge.data);  // Log server response
  
      if (resCharge.data.success) {
        const charge = resCharge.data.charge;
        console.log('Received charge:', charge);
  
        if (charge.payDueDate) {
          const date = new Date(charge.payDueDate);
          const datePart = date.toISOString().substring(0, 10);
          console.log('Pay_due_date:', datePart);
          charge.payDueDate = datePart;
        }
        setChargeInfo(charge);
        setEditedCharge(charge);
        console.log('Updated chargeInfo', charge);  // Log updated state
      } 
      else {
        alert('Charge does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChargeChange = (e) => {
    const { name, value } = e.target;
    setEditedCharge(prevCharge => ({
      ...prevCharge,
      [name]: value
    }));
  };

  const handleConfirmCharge = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateCharge/${chargeId}`, editedCharge);

      if (res.data.success) {
        alert('Charge Update successful');
      } else {
        alert('Charge Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCharge = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteCharge/${chargeId}`);

      if (res.data.success) {
        alert('Charge Deletion successful');
        handleFetchCharge({ preventDefault: () => {} });
      } else {
        alert('Charge Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCharge = async (e) => {
    e.preventDefault();
    console.log('handleAddCharge called', newCharge); 
    try {
      console.log('Sending post request');
      const res = await axios.post(`http://localhost:3300/api/addCharge`, newCharge);
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
      <SignOut />
      <form style={styles.form}>
        <div className="chargeID">
          <Text style={styles.authText}>Charge ID:</Text>
        </div>
        <input type="text" name="chargeId" className="charge-id-text" onChange={handleChange} />

        <button type="submit" name="fetchCharge" className="fetch-charge" onClick={handleFetchCharge}>
          <Text style={styles.buttonText}>Fetch Charge</Text>
        </button>

        {chargeInfo && (
  <div style={styles.chargeInfoContainer}>
    <Text style={styles.infoText}>Charge Info:</Text>
    {console.log('Rendering chargeInfo:', chargeInfo)}  

    <p>Crime ID: {chargeInfo.crimeId}</p>
    <p>Crime Code: {chargeInfo.crimeCode}</p>
    <p>Charge Status: {chargeInfo.chargeStatus}</p>
    <p>Fine Amount: {chargeInfo.fineAmount}</p>
    <p>Court Fee: {chargeInfo.courtFee}</p>
    <p>Amount Paid: {chargeInfo.amountPaid}</p>
    <p>Pay Due Date: {chargeInfo.payDueDate}</p>
  </div>
)}

{chargeInfo && (
  <div style={styles.editContainer}>
    <Text style={styles.infoText}>Edit Charge:</Text>
    <label>
      Crime ID:
      <input
        type="text"
        value={editedCharge.crimeId || ''}
        name="crimeId"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Crime Code:
      <input
        type="text"
        value={editedCharge.crimeCode || ''}
        name="crimeCode"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Charge Status:
      <input
        type="text"
        value={editedCharge.chargeStatus || ''}
        name="chargeStatus"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Fine Amount:
      <input
        type="text"
        value={editedCharge.fineAmount || ''}
        name="fineAmount"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Court Fee:
      <input
        type="text"
        value={editedCharge.courtFee || ''}
        name="courtFee"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Amount Paid:
      <input
        type="text"
        value={editedCharge.amountPaid || ''}
        name="amountPaid"
        onChange={handleEditChargeChange}
      />
    </label>
    <label>
      Pay Due Date:
      <input
        type="date"
        value={editedCharge.payDueDate || ''}
        name="payDueDate"
        onChange={handleEditChargeChange}
      />
    </label>
    <button type="button" onClick={handleConfirmCharge}>
      <Text style={styles.buttonText}>Confirm Charge Update</Text>
    </button>
    <button type="button" onClick={handleDeleteCharge}>
      <Text style={styles.buttonText}>Delete Charge</Text>
    </button>
  </div>
)}
  </form>
      <form>
      <div className="crime_id">
        <Text style={styles.authText}>Crime ID:</Text>
      </div>
      <input type="text" name="crimeId" className="crime-id-text" onChange={handleNewChange} />

      <div className="crime_code">
        <Text style={styles.authText}>Crime Code:</Text>
      </div>
      <input type="text" name="crimeCode" className="crime-code-text" onChange={handleNewChange} />

      <div className="charge_status">
        <Text style={styles.authText}>Charge Status:</Text>
      </div>
      <input type="text" name="chargeStatus" className="charge-status-text" onChange={handleNewChange} />

      <div className="fine_amount">
        <Text style={styles.authText}>Fine Amount:</Text>
      </div>
      <input type="text" name="fineAmount" className="fine-amount-text" onChange={handleNewChange} />

      <div className="court_fee">
        <Text style={styles.authText}>Court Fee:</Text>
      </div>
      <input type="text" name="courtFee" className="court-fee-text" onChange={handleNewChange} />

      <div className="amount_paid">
        <Text style={styles.authText}>Amount Paid:</Text>
      </div>
      <input type="text" name="amountPaid" className="amount-paid-text" onChange={handleNewChange} />

      <div className="pay_due_date">
        <Text style={styles.authText}>Pay Due Date:</Text>
      </div>
      <input type="date" name="payDueDate" className="pay-due-date-text" onChange={handleNewChange} />

      <button type="submit" name="addCharge" className="add-charge" onClick={handleAddCharge}>
        <Text style={styles.buttonText}>Add Charge</Text>
      </button>
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
  chargeInfoContainer: {
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