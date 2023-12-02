import express from "express"
import mysql from "mysql"
import cors from "cors"

/* create express app */
const app = express()
app.use(express.json())
app.use(cors())

/* create database connection */
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"cityjail",
    port: '3306'
})

/* api call for user sign in */
app.post('/api/signin', (req,res)=>{
    const {username, password} = req.body;
    const authorize = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`
    db.query(authorize, {username, password}, (err, data)=>{
        if (err) return res.json(err);
        if (data.length > 0) return res.send({authorization: true})
        else return res.send({authorization: false});
    })
})

/* api call for checking duplicate users */
app.post('/api/checkdup', (req, res) => {
    const { username } = req.body;
    const checkDuplicateQuery = `SELECT * FROM Users WHERE username = ?`;

    db.query(checkDuplicateQuery, [username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        const isDuplicate = data.length > 0;
        return res.json({ duplicate: isDuplicate });
    });
});

/* api call for user create account */
app.post('/api/createacc', (req, res) => {
    const { username, password } = req.body;
    const createAccountQuery = `INSERT INTO Users (username, password) VALUES (?, ?)`;

    db.query(createAccountQuery, [username, password], (err, result) => {
        if (err) {
            return res.json(err);
        }

        return res.json({ success: true, insertedId: result.insertId });
    });
});

/* api call for retrieving criminals table data */
app.get('/api/criminal-data', (req, res)=>{
    const {ID, Name, Address, Phone} = req.body;
    const q = `SELECT Criminal_ID, 
               CONCAT(First, ' ', Last) AS Name, 
               CONCAT(Street, ', ', City, ', ', State, ', ', Zip) AS Address,
               Phone FROM Criminals;`
    db.query(q, {ID, Name, Address, Phone}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

/* api call for searching criminal data */
app.get('/api/search-criminals', (req, res)=>{
    const {search} = req.query;
    const q = `SELECT Criminal_ID, 
               CONCAT(First, ' ', Last) AS Name, 
               CONCAT(Street, ', ', City, ', ', State, ', ', Zip) AS Address,
               Phone 
               FROM Criminals
               WHERE Criminal_ID LIKE "%${search}%" 
               OR CONCAT(First, ' ', Last) LIKE "%${search}%";`
    db.query(q, {search}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

/* api call for retrieving sentences table data */
app.get('/api/sentence-data', (req, res)=>{
    const {ID, Criminal, Type, Prob, Start, End} = req.body;
    const q = `SELECT Sentence_ID, 
               Criminal_ID,
               Type, 
               Prob_ID,
               Start_date,
               End_date FROM Sentences;`
    db.query(q, {ID, Criminal, Type, Prob, Start, End}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

/* api call for searching criminals table */
app.get('/api/search-sentences', (req, res)=>{
  const {search} = req.query;
  const q = `SELECT Sentence_ID, 
             Criminal_ID,
             Type, 
             Prob_ID,
             Start_date,
             End_date 
             FROM Sentences
             WHERE Sentence_ID LIKE "%${search}%";`
  db.query(q, {search}, (err, data)=>{
      if (err) return res.json(err);
      return res.json(data);
  }); 
})

/* api call for searching officers table */
app.get('/api/officer-data', (req, res)=>{
  const {ID, Name, Precinct, Badge, Phone, Status} = req.body;
  const q = `SELECT Officer_ID, 
             CONCAT(First, ' ', Last) AS Name,
             Precinct, 
             Badge,
             Phone,
             Status 
             FROM Officers;`
  db.query(q, {ID, Name, Precinct, Badge, Phone, Status}, (err, data)=>{
      if (err) return res.json(err);
      return res.json(data);
  }); 
})

/* api call for retrieving officers table data */
app.get('/api/search-officers', (req, res)=>{
  const {search} = req.query;
  const q = `SELECT Officer_ID, 
             CONCAT(First, ' ', Last) AS Name,
             Precinct, 
             Badge,
             Phone,
             Status 
             FROM Officers
             WHERE Officer_ID LIKE "%${search}%" 
             OR CONCAT(First, ' ', Last) LIKE "%${search}%"
             OR Precinct LIKE "%${search}%"
             OR Badge LIKE "%${search}%";`
  db.query(q, {search}, (err, data)=>{
      if (err) return res.json(err);
      return res.json(data);
  }); 
})

/* api call for retrieving crimes table data */
app.get('/api/crime-data', (req, res)=>{
    const {ID, Criminal, Classification, Status, Charged, Hearing, Appeal} = req.body;
    const q = `SELECT Crime_ID, 
               Criminal_ID,
               Classification, 
               Status,
               Date_charged,
               Hearing_date,
               Appeal_cut_date FROM Crimes;`
    db.query(q, {ID, Criminal, Classification, Status, Charged, Hearing, Appeal}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

/* api call for searching crimes table */
app.get('/api/search-crimes', (req, res)=>{
  const {search} = req.query;
  const q = `SELECT Crime_ID, 
             Criminal_ID,
             Classification, 
             Status,
             Date_charged,
             Hearing_date,
             Appeal_cut_date 
             FROM Crimes
             WHERE Crime_ID LIKE "%${search}%";`
  db.query(q, {search}, (err, data)=>{
      if (err) return res.json(err);
      return res.json(data);
  }); 
})

/* api call for retrieving charges table data */
app.get('/api/charge-data', (req, res)=>{
    const {ID, Crime, Code, Status, Fine, Fee, Paid, Due} = req.body;
    const q = `SELECT Charge_ID, 
               Crime_ID,
               Crime_code, 
               Charge_status,
               Fine_amount,
               Court_fee,
               Amount_paid,
               Pay_due_date FROM Crime_charges;`
    db.query(q, {ID, Crime, Code, Status, Fine, Fee, Paid, Due}, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

/* api call for searching charges table */
app.get('/api/search-charges', (req, res)=>{
  const {search} = req.query;
  const q = `SELECT Charge_ID, 
             Crime_ID,
             Crime_code, 
             Charge_status,
             Fine_amount,
             Court_fee,
             Amount_paid,
             Pay_due_date 
             FROM Crime_charges
             WHERE Charge_ID LIKE "%${search}%";`
  db.query(q, {search}, (err, data)=>{
      if (err) return res.json(err);
      return res.json(data);
  }); 
})

app.get('/api/getCriminal/:id', (req, res) => {
    const criminalId = req.params.id;
    const q = `SELECT * FROM Criminals WHERE Criminal_ID = ?`;
    db.query(q, [criminalId], (err, result) => {
      if (err) return res.json(err);
  
      if (result.length > 0) {
        const criminal = {
            first: result[0].First,
            last: result[0].Last,
            street: result[0].Street,
            city: result[0].City,
            state: result[0].State,
            zip: result[0].Zip,
            phone: result[0].Phone,
          };
        return res.json({ success: true, criminal });
      } else {
        return res.json({ success: false });
      }
    });
  });

  app.put('/api/updateCriminal/:id', (req, res) => {
    const criminalId = req.params.id;
    const updatedCriminal = req.body; 
    const q = `UPDATE Criminals SET ? WHERE Criminal_ID = ?`;
  
    db.query(q, [updatedCriminal, criminalId], (err, result) => {
      if (err) {
        console.error('Error updating criminal information:', err);
        return res.json({ success: false });
      }
  
      return res.json({ success: true });
    });
  });
  
app.post('/api/insertCriminals', (req, res) => {
    const { first, last, street, city, state, zip, phone } = req.body;
    const q = `INSERT INTO Criminals (First, Last, Street, City, State, Zip, Phone) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const values = [first, last, street, city, state, zip, phone];
    db.query(q, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ success: true, insertedId: result.insertId });
    });
});

app.put('/api/editCriminal/:id', (req, res) => {
    const criminalId = req.params.id;
    const { name, address, phone } = req.body;
    const q = `UPDATE Criminals SET First = ?, Last = ?, Street = ?, City = ?, State = ?, Zip = ?, Phone = ? WHERE Criminal_ID = ?`;
    const values = [name.first, name.last, address.street, address.city, address.state, address.zip, phone, criminalId];
    db.query(q, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ success: true, affectedRows: result.affectedRows });
    });
});

app.delete('/api/deleteCriminal/:id', (req, res) => {
    const criminalId = req.params.id;
    const q = `DELETE FROM Criminals WHERE Criminal_ID = ?`;
    db.query(q, [criminalId], (err, result) => {
        if (err) return res.json(err);
        return res.json({ success: true, affectedRows: result.affectedRows });
    });
});


app.get('/api/getAliases/:id', (req, res) => {
    const criminalId = req.params.id;
    const q = `SELECT * FROM Aliases WHERE Criminal_ID = ?`;
    db.query(q, [criminalId], (err, result) => {
      if (err) return res.json(err);
  
      if (result.length > 0) {
        const aliases = result.map((row) => ({
          aliasID: row.Alias_ID,
          alias: row.Alias,
        }));
        return res.json({ success: true, aliases });
      } else {
        return res.json({ success: false });
      }
    });
  });
  
  app.put('/api/editCharge/:id', (req, res) => {
    const chargeID = req.params.id;
    const { crimeID, crimeCode, status, fine, fee, paid, due } = req.body;
    const q = `UPDATE Crime_charges 
              SET Crime_ID = ?, Crime_code = ?, Charge_status = ?, Fine_amount = ?, 
              Court_fee = ?, Amount_paid = ?, Pay_due_date = ? WHERE Charge_ID = ?;`
    const values = [crimeID, crimeCode, status, fine, fee, paid, due, chargeID];
    db.query(q, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ success: true, affectedRows: result.affectedRows });
    });
});
  
  app.delete('/api/deleteAlias/:criminalId/:aliasId', (req, res) => {
    const { criminalId, aliasId } = req.params;
  
    const q = `DELETE FROM Aliases WHERE Criminal_ID = ? AND Alias_ID = ?`;
    db.query(q, [criminalId, aliasId], (err, result) => {
      if (err) return res.json(err);
  
      if (result.affectedRows > 0) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    });
});


app.post('/api/addAlias', (req, res) => {
    const { criminalId, alias } = req.body;
    
    const q = `INSERT INTO Aliases (Criminal_ID, Alias) VALUES (?, ?)`;
    const values = [criminalId, alias];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error('Error adding alias:', err);
            return res.json({ success: false });
        }

        return res.json({ success: true, insertedId: result.insertId });
    });
});

// app.get('/api/getCharge/:id', (req, res) => {
//   const chargeID = req.params.id;
//   const q = `SELECT * FROM Crime_charges WHERE Charge_ID = ?`;
//   db.query(q, [chargeID], (err, result) => {
//     if (err) return res.json(err);

//     if (result.length > 0) {
//       const charge = {
//           crime_id: result[0].Crime_ID,
//           crime_code: result[0].Crime_code,
//           status: result[0].Charge_status,
//           fine: result[0].Fine_amount,
//           fee: result[0].Court_fee,
//           paid: result[0].Amount_paid,
//           due: result[0].Pay_due_date,
//         };
//       return res.json({ success: true, charge });
//     } else {
//       return res.json({ success: false });
//     }
//   });
// });

// app.put('/api/updateCharge/:id', (req, res) => {
//   const chargeID = req.params.id;
//   const updatedCharge = req.body; 
//   const q = `UPDATE Crime_charges SET ? WHERE Charge_ID = ?`;
//   db.query(q, [updatedCharge, chargeID], (err, result) => {
//     if (err) {
//       console.error('Error updating charge information:', err);
//       return res.json({ success: false });
//     }
//     return res.json({ success: true });
//   });
// });

app.listen(3300, ()=>{
    console.log("Connected to backend!")
    return true;
})


/* api dump
app.post('/api/checkdup', (req, res)=>{
    const {username, password} = req.body;
    const create = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
    db.query(create, {username, password}, (err, data)=>{
        if (err) return res.json(err);
        //if (data.length > 0) return res.send({duplicate: true});
        return res.send({duplicate: data.length});
    })
})

app.get('/api/data', (req, res)=>{
    const values = [req.body.ID];
    const q = `SELECT * FROM Criminals;`
    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    }); 
})

app.post('/cityjail', (req,res)=>{
    const q = "INSERT INTO Users VALUES (?)"
    const values = [req.body.username, req.body.password]
    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
})
*/

app.get('/api/getAppeal/:id', (req, res) => {

  const appealId = req.params.id;
  const q = `SELECT * FROM Appeals WHERE Appeal_ID = ?`;
  db.query(q, [appealId], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const appeal = {
        crimeId: result[0].Crime_ID,
        filingDate: result[0].Filing_date,
        hearingDate: result[0].Hearing_date,
        status: result[0].Status,
      };
      return res.json({ success: true, appeal });
    } else {
      return res.json({ success: false });
    }
  });
});

app.put('/api/updateAppeal/:id', (req, res) => {
  const appealId = req.params.id;
  const { crimeId, filingDate, hearingDate, status } = req.body;

  const q = `UPDATE Appeals SET Crime_ID = ?, Filing_Date = ?, Hearing_Date = ?, Status = ? WHERE Appeal_ID = ?`;
  db.query(q, [crimeId, filingDate, hearingDate, status, appealId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.delete('/api/deleteAppeal/:id', (req, res) => {
  const appealId = req.params.id;

  const q = `DELETE FROM Appeals WHERE Appeal_ID = ?`;
  db.query(q, [appealId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.post('/api/addAppeal', (req, res) => {
  
  
  const { crimeId, filingDate, hearingDate, status } = req.body;
  
  const q = `INSERT INTO Appeals (Crime_ID, Filing_Date, Hearing_Date, Status) VALUES (?, ?, ?, ?)`;
  const values = [crimeId, filingDate, hearingDate, status];

  db.query(q, values, (err, result) => {
      if (err) {
          console.error('Error adding appeal:', err);
          return res.json({ success: false });
      }

      return res.json({ success: true, insertedId: result.insertId });
  });
});

app.get('/api/getProbOfficer/:id', (req, res) => {
  const probId = req.params.id;
  const q = `SELECT * FROM Prob_officers WHERE Prob_ID = ?`;
  db.query(q, [probId], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const probOfficer = {
        Last: result[0].Last,
        First: result[0].First,
        Street: result[0].Street,
        City: result[0].City,
        State: result[0].State,
        Zip: result[0].Zip,
        Phone: result[0].Phone,
        Email: result[0].Email,
        Status: result[0].Status,
      };
      return res.json({ success: true, probOfficer });
    } else {
      return res.json({ success: false });
    }
  });
});

app.put('/api/updateProbOfficer/:id', (req, res) => {
  const probId = req.params.id;
  const { Last, First, Street, City, State, Zip, Phone, Email, Status } = req.body;
  const q = `UPDATE Prob_officers SET Last = ?, First = ?, Street = ?, City = ?, State = ?, Zip = ?, Phone = ?, Email = ?, Status = ? WHERE Prob_ID = ?`;
  db.query(q, [Last, First, Street, City, State, Zip, Phone, Email, Status, probId], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

app.delete('/api/deleteProbOfficer/:id', (req, res) => {
  const probId = req.params.id;
  const q = `DELETE FROM Prob_officers WHERE Prob_ID = ?`;
  db.query(q, [probId], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

app.post('/api/addProbOfficer', (req, res) => {
  const { Last, First, Street, City, State, Zip, Phone, Email, Status } = req.body;
  const q = `INSERT INTO Prob_officers (Last, First, Street, City, State, Zip, Phone, Email, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(q, [Last, First, Street, City, State, Zip, Phone, Email, Status], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true, insertedId: result.insertId });
  });
});

app.get('/api/getOfficer/:id', (req, res) => {
  const officerId = req.params.id;
  const q = `SELECT * FROM Officers WHERE Officer_ID = ?`;
  db.query(q, [officerId], (err, result) => {
    if (err) return res.json(err);
    if (result.length > 0) {
      const officer = {
        Last: result[0].Last,
        First: result[0].First,
        Precinct: result[0].Precinct,
        Badge: result[0].Badge,
        Phone: result[0].Phone,
        Status: result[0].Status,
      };
    return res.json({ success: true, officer });
    }
    else {
      return res.json({ success: false });
    }
  
  });
});

app.put('/api/updateOfficer/:id', (req, res) => {
  const officerId = req.params.id;
  const { Last, First, Precinct, Badge, Phone, Status } = req.body;
  const q = `UPDATE Officers SET Last = ?, First = ?, Precinct = ?, Badge = ?, Phone = ?, Status = ? WHERE Officer_ID = ?`;
  db.query(q, [Last, First, Precinct, Badge, Phone, Status, officerId], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

app.delete('/api/deleteOfficer/:id', (req, res) => {
  const officerId = req.params.id;
  const q = `DELETE FROM Officers WHERE Officer_ID = ?`;
  db.query(q, [officerId], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});

app.post('/api/addOfficer', (req, res) => {
  console.log(req.body);
  const { Last, First, Precinct, Badge, Phone, Status } = req.body;
  const q = `INSERT INTO Officers (Last, First, Precinct, Badge, Phone, Status) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(q, [Last, First, Precinct, Badge, Phone, Status], (err, result) => {
    if (err) return res.json(err);
    return res.json({ success: true });
  });
});


app.get('/api/getSentence/:id', (req, res) => {
  const sentenceId = req.params.id;
  const q = `SELECT * FROM Sentences WHERE Sentence_ID = ?`;
  db.query(q, [sentenceId], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const sentence = {
        Criminal_ID: result[0].Criminal_ID,
        Type: result[0].Type,
        Prob_ID: result[0].Prob_ID,
        Start_date: result[0].Start_date,
        End_date: result[0].End_date,
      };
      return res.json({ success: true, sentence });
    } else {
      return res.json({ success: false });
    }
  });
});


app.put('/api/updateSentence/:id', (req, res) => {
  const sentenceId = req.params.id;
  const { Criminal_ID, Type, Prob_ID, Start_date, End_date } = req.body;

  const q = `UPDATE Sentences SET Criminal_ID = ?, Type = ?, Prob_ID = ?, Start_date = ?, End_date = ? WHERE Sentence_ID = ?`;
  db.query(q, [Criminal_ID, Type, Prob_ID, Start_date, End_date, sentenceId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.delete('/api/deleteSentence/:id', (req, res) => {
  const sentenceId = req.params.id;

  const q = `DELETE FROM Sentences WHERE Sentence_ID = ?`;
  db.query(q, [sentenceId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.post('/api/addSentence', (req, res) => {
  const { Criminal_ID, Type, Prob_ID, Start_date, End_date } = req.body;
  
  const q = `INSERT INTO Sentences (Criminal_ID, Type, Prob_ID, Start_date, End_date) VALUES (?, ?, ?, ?, ?)`;
  const values = [Criminal_ID, Type, Prob_ID, Start_date, End_date];

  db.query(q, values, (err, result) => {
      if (err) {
          console.error('Error adding sentence:', err);
          return res.json({ success: false });
      }

      return res.json({ success: true, insertedId: result.insertId });
  });
});

app.get('/api/getCrime/:id', (req, res) => {
  const crimeId = req.params.id;
  const q = `SELECT * FROM Crimes WHERE Crime_ID = ?`;
  db.query(q, [crimeId], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const crime = {
        Criminal_ID: result[0].Criminal_ID,
        Classification: result[0].Classification,
        Date_charged: result[0].Date_charged,
        Status: result[0].Status,
        Hearing_date: result[0].Hearing_date,
        Appeal_cut_date: result[0].Appeal_cut_date,
      };
      return res.json({ success: true, crime });
    } else {
      return res.json({ success: false });
    }
  });
});

app.put('/api/updateCrime/:id', (req, res) => {
  const crimeId = req.params.id;
  const { Criminal_ID, Classification, Date_charged, Status, Hearing_date, Appeal_cut_date } = req.body;

  const q = `UPDATE Crimes SET Criminal_ID = ?, Classification = ?, Date_charged = ?, Status = ?, Hearing_date = ?, Appeal_cut_date = ? WHERE Crime_ID = ?`;
  db.query(q, [Criminal_ID, Classification, Date_charged, Status, Hearing_date, Appeal_cut_date, crimeId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.delete('/api/deleteCrime/:id', (req, res) => {
  const crimeId = req.params.id;

  const q = `DELETE FROM Crimes WHERE Crime_ID = ?`;
  db.query(q, [crimeId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.post('/api/addCrime', (req, res) => {
  const { Criminal_ID, Classification, Date_charged, Status, Hearing_date, Appeal_cut_date } = req.body;
  
  const q = `INSERT INTO Crimes (Criminal_ID, Classification, Date_charged, Status, Hearing_date, Appeal_cut_date) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [Criminal_ID, Classification, Date_charged, Status, Hearing_date, Appeal_cut_date];

  db.query(q, values, (err, result) => {
      if (err) {
          console.error('Error adding crime:', err);
          return res.json({ success: false });
      }

      return res.json({ success: true, insertedId: result.insertId });
  });
});

app.get('/api/getCharge/:id', (req, res) => {
  const chargeId = req.params.id;
  const q = `SELECT * FROM Crime_charges WHERE Charge_ID = ?`;
  db.query(q, [chargeId], (err, result) => {
    if (err) return res.json(err);

    if (result.length > 0) {
      const charge = {
        crimeId: result[0].Crime_ID,
        crimeCode: result[0].Crime_code,
        chargeStatus: result[0].Charge_status,
        fineAmount: result[0].Fine_amount,
        courtFee: result[0].Court_fee,
        amountPaid: result[0].Amount_paid,
        payDueDate: result[0].Pay_due_date,
      };
      return res.json({ success: true, charge });
    } else {
      return res.json({ success: false });
    }
  });
});

app.put('/api/updateCharge/:id', (req, res) => {
  const chargeId = req.params.id;
  const { crimeId, crimeCode, chargeStatus, fineAmount, courtFee, amountPaid, payDueDate } = req.body;

  const q = `UPDATE Crime_charges SET Crime_ID = ?, Crime_code = ?, Charge_status = ?, Fine_amount = ?, Court_fee = ?, Amount_paid = ?, Pay_due_date = ? WHERE Charge_ID = ?`;
  db.query(q, [crimeId, crimeCode, chargeStatus, fineAmount, courtFee, amountPaid, payDueDate, chargeId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.delete('/api/deleteCharge/:id', (req, res) => {
  const chargeId = req.params.id;

  const q = `DELETE FROM Crime_charges WHERE Charge_ID = ?`;
  db.query(q, [chargeId], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.post('/api/addCharge', (req, res) => {
  const { crimeId, crimeCode, chargeStatus, fineAmount, courtFee, amountPaid, payDueDate } = req.body;
  
  const q = `INSERT INTO Crime_charges (Crime_ID, Crime_code, Charge_status, Fine_amount, Court_fee, Amount_paid, Pay_due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [crimeId, crimeCode, chargeStatus, fineAmount, courtFee, amountPaid, payDueDate];

  db.query(q, values, (err, result) => {
      if (err) {
          console.error('Error adding charge:', err);
          return res.json({ success: false });
      }

      return res.json({ success: true, insertedId: result.insertId });
  });
});