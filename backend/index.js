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
    password:"pass",
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
  
app.post('/api/addCriminal', (req, res) => {
    const { name, address, phone } = req.body;
    const q = `INSERT INTO Criminals (First, Last, Street, City, State, Zip, Phone) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name.first, name.last, address.street, address.city, address.state, address.zip, phone];
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
  
  app.put('/api/updateAlias/:id', (req, res) => {
    const criminalId = req.params.id;
    const { aliasID, updatedAlias } = req.body;
  
    const q = `UPDATE Aliases SET Alias = ? WHERE Criminal_ID = ? AND Alias_ID = ?`;
    db.query(q, [updatedAlias, criminalId, aliasID], (err, result) => {
      if (err) return res.json(err);
  
      if (result.affectedRows > 0) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
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
