import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import SignOut from './SignOut';

function AliasInfo({setAuth}) {
  const [criminalId, setCriminalId] = useState('');
  const [aliases, setAliases] = useState([]);
  const [editedAliases, setEditedAliases] = useState({});
  const [criminalInfo, setCriminalInfo] = useState(null);
  const [newAlias, setNewAlias] = useState({
    criminalId: '',
    alias: '',
  });

  const handleNewChange = (e) => {
    setNewAlias((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setCriminalId(e.target.value);
  };

  const handleFetchAliases = async (e) => {
    e.preventDefault();

    try {
      const resCriminal = await axios.get(`http://localhost:3300/api/getCriminal/${criminalId}`);
      const resAliases = await axios.get(`http://localhost:3300/api/getAliases/${criminalId}`);

      if (resCriminal.data.success && resAliases.data.success) {
        setCriminalInfo(resCriminal.data.criminal);
        setAliases(resAliases.data.aliases);
        setEditedAliases(
          resAliases.data.aliases.reduce((acc, alias) => {
            acc[alias.aliasID] = alias.alias;
            return acc;
          }, {})
        );
      } else {
        setCriminalInfo(null);
        setAliases([]);
        setEditedAliases({});
        alert('Criminal does not have any aliases');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditAliasChange = (aliasID, e) => {
    setEditedAliases((prevAliases) => ({
      ...prevAliases,
      [aliasID]: e.target.value,
    }));
  };

  const handleConfirmAlias = async (aliasID) => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateAlias/${criminalId}`, {
        aliasID,
        updatedAlias: editedAliases[aliasID],
      });

      if (res.data.success) {
        alert('Alias Update successful');
      } else {
        alert('Alias Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAlias = async (aliasID) => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteAlias/${criminalId}/${aliasID}`);

      if (res.data.success) {
        alert('Alias Deletion successful');
        handleFetchAliases({ preventDefault: () => {} });
      } else {
        alert('Alias Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async e => {
    //e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:3300/api/addAlias`, newAlias);
      if(res.data.success){
        alert('Successfully added');
      }
      else{
        alert('Unsuccessful')
      }
    }
    catch(err)
    {
      console.log(err);
    }

  };

  return (
    <div>
      
      <NavBar />
      <SignOut setAuth={setAuth}/>
      <form style={styles.form}>
        <div className='info-container'>
          <div className='info-label'>View/Change Alias Information</div>
          <div className='id-label'>Criminal ID:</div>
          <input type="text" name="id" className="id-input" placeholder={"Enter ID Here"} onChange={handleChange} />
          <button type="submit" name="fetchCriminal" className="info-button" onClick={handleFetchAliases}>Enter</button>
        </div>

        {criminalInfo && aliases.length > 0 && (
          <div>
            <div>
            <p className='alias-attr'>First Name: {criminalInfo.first}</p>
            <p className='alias-attr'>Last Name: {criminalInfo.last}</p>
            </div>
          <div>
            {aliases.map((alias) => (
              <div key={alias.aliasID}>
                <p className='alias-attr'>Alias: {alias.alias}</p>
                <label>
                  <div className='alias-attr'>
                    Update Alias:
                    <input
                      type="text"
                      value={editedAliases[alias.aliasID] || ''}
                      onChange={(e) => handleEditAliasChange(alias.aliasID, e)}
                    />
                  </div>
                  <button type="button" className='alias-button' onClick={() => handleConfirmAlias(alias.aliasID)}>
                    Update
                  </button>
                  <button type="button" className='alias-button' onClick={() => handleDeleteAlias(alias.aliasID)}>
                    Delete Alias
                  </button>
                </label>
               
              </div>
            ))}
          </div>
          </div>
        )}
      </form>
      <form>
        <div className="criminal_id">
                <Text style={styles.authText}>Criminal ID:</Text>
            </div>
            <input type="id" name ="criminalId" className="crim-id-text" onChange={handleNewChange}/>

            <div className="alias_name"> 
                <Text style={styles.authText}>Alias:</Text>
            </div>
            <input type="Alias" name ="alias" className="alias-text" onChange={handleNewChange}/>

            <button type="submit" name="add" className="add-person" onClick={handleAdd}>
                <Text style={styles.buttonText}>Add Alias</Text>
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
  aliasContainer: {
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

export default AliasInfo;