import React, { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import SignOut from './SignOut';

function SentenceInfo({setAuth}) {
  const navigate = useNavigate();
  const [sentenceId, setSentenceId] = useState('');
  const [sentenceInfo, setSentenceInfo] = useState(null);
  const [editedSentence, setEditedSentence] = useState({});
  const [newSentence, setNewSentence] = useState({
    Sentence_ID: '',
    Criminal_ID: '',
    Type: '',
    Prob_ID: '',
    Start_date: '',
    End_date: '',
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewSentence(prevSentence => ({
      ...prevSentence,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    setSentenceId(e.target.value);
  };

  const handleFetchSentence = async (e) => {
    e.preventDefault();
    try {
      const resSentence = await axios.get(`http://localhost:3300/api/getSentence/${sentenceId}`);
      if (resSentence.data.success) {
        const sentence = resSentence.data.sentence;
        sentence.Start_date = new Date(sentence.Start_date).toISOString().substring(0, 10);
        sentence.End_date = new Date(sentence.End_date).toISOString().substring(0, 10);
        setSentenceInfo(sentence);
        setEditedSentence(sentence);
      } else {
        alert('Sentence does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSentenceChange = (e) => {
    const { name, value } = e.target;
    setEditedSentence(prevSentence => ({
      ...prevSentence,
      [name]: value
    }));
  };

  const handleConfirmSentence = async () => {
    try {
      const res = await axios.put(`http://localhost:3300/api/updateSentence/${sentenceId}`, editedSentence);
      if (res.data.success) {
        alert('Sentence Update successful');
      } else {
        alert('Sentence Update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSentence = async () => {
    try {
      const res = await axios.delete(`http://localhost:3300/api/deleteSentence/${sentenceId}`);
      if (res.data.success) {
        alert('Sentence Deletion successful');
        handleFetchSentence({ preventDefault: () => { } });
      } else {
        alert('Sentence Deletion failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSentence = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3300/api/addSentence`, newSentence);
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
        <div className="sentenceID">
          <Text style={styles.authText}>Sentence ID:</Text>
        </div>
        <input type="text" name="sentenceId" className="sentence-id-text" onChange={handleChange} />

        <button type="submit" name="fetchSentence" className="fetch-sentence" onClick={handleFetchSentence}>
          <Text style={styles.buttonText}>Fetch Sentence</Text>
        </button>

        {sentenceInfo && (
          <div style={styles.sentenceInfoContainer}>
            <Text style={styles.infoText}>Sentence Info:</Text>
            <p>Criminal ID: {sentenceInfo.Criminal_ID}</p>
            <p>Type: {sentenceInfo.Type}</p>
            <p>Probation ID: {sentenceInfo.Prob_ID}</p>
            <p>Start Date: {sentenceInfo.Start_date}</p>
            <p>End Date: {sentenceInfo.End_date}</p>
          </div>
        )}

        {sentenceInfo && (
          <div style={styles.editContainer}>
            <Text style={styles.infoText}>Edit Sentence:</Text>
            <div>
              <label>
                Criminal ID:
                <input
                  type="text"
                  value={editedSentence.Criminal_ID || ''}
                  name="Criminal_ID"
                  onChange={handleEditSentenceChange}
                />
              </label>
            </div>
            <div>
              <label>
                Type:
                <input
                  type="text"
                  value={editedSentence.Type || ''}
                  name="Type"
                  onChange={handleEditSentenceChange}
                />
              </label>
            </div>
            <div>
              <label>
                Probation ID:
                <input
                  type="text"
                  value={editedSentence.Prob_ID || ''}
                  name="Prob_ID"
                  onChange={handleEditSentenceChange}
                />
              </label>
            </div>
            <div>
              <label>
                Start Date:
                <input
                  type="date"
                  value={editedSentence.Start_date || ''}
                  name="Start_date"
                  onChange={handleEditSentenceChange}
                />
              </label>
            </div>
            <div>
              <label>
                End Date:
                <input
                  type="date"
                  value={editedSentence.End_date || ''}
                  name="End_date"
                  onChange={handleEditSentenceChange}
                />
              </label>
            </div>
            <button type="button" onClick={handleConfirmSentence}>
              <Text style={styles.buttonText}>Confirm Sentence Update</Text>
            </button>
            <button type="button" onClick={handleDeleteSentence}>
              <Text style={styles.buttonText}>Delete Sentence</Text>
            </button>
          </div>
        )}
      </form>
      <form>
        <div style={{transform: `translate(44%, 0%)`}}>
        <div className="criminal_id">
          <Text style={styles.authText}>Criminal ID:</Text>
        </div>
        <input type="text" name="Criminal_ID" className="criminal-id-text" onChange={handleNewChange} />

        <div className="type">
          <Text style={styles.authText}>Type:</Text>
        </div>
        <input type="text" name="Type" className="type-text" onChange={handleNewChange} />

        <div className="prob_id">
          <Text style={styles.authText}>Probation ID:</Text>
        </div>
        <input type="text" name="Prob_ID" className="prob-id-text" onChange={handleNewChange} />

        <div className="start_date">
          <Text style={styles.authText}>Start Date:</Text>
        </div>
        <input type="date" name="Start_date" className="start-date-text" onChange={handleNewChange} />

        <div className="end_date">
          <Text style={styles.authText}>End Date:</Text>
        </div>
        <input type="date" name="End_date" className="end-date-text" onChange={handleNewChange} />

        <button type="submit" name="addSentence" className="add-sentence" onClick={handleAddSentence}>
          <Text style={styles.buttonText}>Add Sentence</Text>
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
  sentenceInfoContainer: {
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
export default SentenceInfo;