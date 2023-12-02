import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';
import ManageInfo from './ManageInfo';

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
  const [newCriminal, setNewCriminal] = useState({
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

  const handleInsertChange = (e) => {
    setNewCriminal({
      ...newCriminal,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateCriminal/${criminalId}`, editedCriminal);

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
      const res = await axios.post(`http://localhost:3300/api/insertCriminals`, newCriminal);
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

      <form className='criminal-info-form'>
        <div className='info-container'>
          <div className='info-label'>View/Change Criminal Information</div>
          <div className='id-label'>Criminal ID:</div>
          <input type="text" name="id" className="id-input" placeholder={"Enter ID Here"} onChange={handleChange} />
          <button type="submit" name="fetchCriminal" className="info-button" onClick={handleFetchCriminal}>Enter</button>
        </div>
        
       
        {criminal && (
            <div className='attr-container'>
              <p className='attr'>First Name: {criminal.first}</p>
              <p className='attr'>Last: {criminal.last}</p>
              <p className='attr'>Street: {criminal.street}</p>
              <p className='attr'>City: {criminal.city}</p>
              <p className='attr'>State: {criminal.state}</p>
              <p className='attr'>Zip: {criminal.zip}</p>
              <p className='attr'>Phone: {criminal.phone}</p>
            </div>
        )}

        {criminal && (
          <div>
          <button type="button" className='confirmation-button' onClick={handleDelete}>Delete Criminal</button>
          <div className='edit-container'>
            <div className='edit-label'>Edit Criminal Info</div>
          </div>
            <div className='attr-container'>
                  <div className='attr'>
                    <label>
                      First Name:
                      <input type="text" name="first" value={editedCriminal.first} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      Last Name:
                      <input type="text" name="last" value={editedCriminal.last} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      Street:
                      <input type="text" name="street" value={editedCriminal.street} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      City:
                      <input type="text" name="city" value={editedCriminal.city} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      State:
                      <input type="text" name="state" value={editedCriminal.state} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      Zip:
                      <input type="text" name="zip" value={editedCriminal.zip} onChange={handleEditChange} />
                    </label>
                  </div>
                  <div className='attr'>
                    <label>
                      Phone:
                      <input type="text" name="phone" value={editedCriminal.phone} onChange={handleEditChange} />
                    </label>
                  </div>
                  <button type="button" className='confirmation-button' onClick={handleConfirm}>Confirm</button>
            </div>
            

              

          </div>
        )}
      </form>

      <form name='criminal-insert-form'>
      <div className='new-container'>
            <div className='new-label'>Add New Criminal Info:</div>
      </div>
            <div className='attr-container'>
              <div className='attr'>
                <label>
                  First Name:
                  <input type="text" name="first" value={newCriminal.first} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  Last Name:
                  <input type="text" name="last" value={newCriminal.last} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  Street:
                  <input type="text" name="street" value={newCriminal.street} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  City:
                  <input type="text" name="city" value={newCriminal.city} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  State:
                  <input type="text" name="state" value={newCriminal.state} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  Zip:
                  <input type="text" name="zip" value={newCriminal.zip} onChange={handleInsertChange} />
                </label>
              </div>
              <div className='attr'>
                <label>
                  Phone:
                  <input type="text" name="phone" value={newCriminal.phone} onChange={handleInsertChange} />
                </label>
              </div>
              <div>
                <button className='confirmation-button' type="button" onClick={handleInsert}>Add</button>
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

export default CriminalInfo;