import NavBar from "./NavBar";
import './Style.css'
import {useState, useEffect} from "react";
import {StyleSheet} from 'react-native';
import axios from "axios";
import {Search} from 'react-feather';


function Charges() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState("");

    /* api call for data */
    useEffect(() => {
        const query = {
            'params': {
                'search' : search
            }
        };
        if (search) {
            axios.get("http://localhost:3300/api/search-charges", query)
                 .then((res) => setData(res.data))
                 .catch((err) => { console.error(err); });
        } else {
            axios.get("http://localhost:3300/api/charge-data", data)
            .then((res) => setData(res.data))
            .catch(err => { console.error(err); });
        }
    });

    /* handling search bar */
    const handleSearchInput = (e) =>{
        setSearch(e.target.value);
    };

    /* pagination */
    const indexOfLastItem = currentPage * itemsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
        <NavBar />

        <div className='search-bar-wrapper'>
            <input type="text" className="search-bar"
                style={styles.searchText} placeholder={"Search Charges"} 
                value={search} onChange={handleSearchInput}>
            </input>
            <div className='search-icon'><Search width="45x" height="45px" className='search-icon-svg' color="#9748FF"/> </div>
        </div>

        <table className="d-table">
            <thead> 
                <tr>
                    <th>Charge ID</th>
                    <th>Crime ID</th>
                    <th>Crime Code</th>
                    <th>Status</th>
                    <th>Fine Amount</th>
                    <th>Court Fee</th>
                    <th>Pay Due Date</th>
                </tr>
            </thead>

            <tbody>
                {
                    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((charge, index)=>{
                        return <tr key={index}>
                            <td>{charge.Charge_ID}</td>
                            <td>{charge.Crime_ID}</td>
                            <td>{charge.Crime_code}</td>
                            <td>{charge.Charge_status}</td>
                            <td>{charge.Fine_amount}</td>
                            <td>{charge.Court_fee}</td>
                            <td>{new Date(charge.Pay_due_date).toJSON().slice(0,10).split('-').reverse().join('/')}</td>
                        </tr>
                    })
                }
            </tbody>

            <div className="pagination">
                <button className="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{currentPage}</span>
                <button className="next" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
                    Next
                </button>
            </div>
        </table>
        </>
    )
}

const styles = StyleSheet.create({
    searchText: {
      color: 383838,
      fontSize: 30,
      fontWeight: 'normal',
    }
  });

export default Charges;