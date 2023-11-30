import NavBar from "./NavBar";
import SignOut from "./SignOut";
import './Style.css'
import {useState, useEffect} from "react";
import {StyleSheet} from 'react-native';
import axios from "axios";
import {Search} from 'react-feather';

function Crimes() {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
            axios.get("http://localhost:3300/api/search-crimes", query)
                 .then((res) => setData(res.data))
                 .catch((err) => { console.error(err); });
        } else {
            axios.get("http://localhost:3300/api/crime-data", data)
            .then((res) => setData(res.data))
        }
    });

    /* handling search bar */
    const handleSearchInput = (e) =>{
        setSearch(e.target.value);
    };

    /* handling selection of rows */
    const toggleSelection = (index) => {
        const newSelectedRowKeys = [...selectedRowKeys];
        if (newSelectedRowKeys.includes(index)) {
          // Row is already selected, so remove it
          newSelectedRowKeys.splice(newSelectedRowKeys.indexOf(index), 1);
        } else {
          // Row is not selected, so add it
          newSelectedRowKeys.push(index);
        }
        setSelectedRowKeys(newSelectedRowKeys);
    };

    /* pagination */
    const indexOfLastItem = currentPage * itemsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
        <NavBar />

        <div className='search-bar-wrapper'>
            <input type="text" className="search-bar"
                style={styles.searchText} placeholder={"Search Crimes"} 
                value={search} onChange={handleSearchInput}>
            </input>
            <div className='search-icon'><Search width="45x" height="45px" className='search-icon-svg' color="#9748FF"/> </div>
        </div>

        <table className="d-table">
            <thead> 
                <tr>
                    <th>Select</th>
                    <th>Crime ID</th>
                    <th>Criminal ID</th>
                    <th>Classification</th>
                    <th>Status</th>
                    <th>Date Charged</th>
                    <th>Hearing Date</th>
                    <th>Appeal Cutoff Date</th>
                </tr>
            </thead>

            <tbody>
                {
                    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((crime, index)=>{
                        return <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRowKeys.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </td>
                            <td>{crime.Crime_ID}</td>
                            <td>{crime.Criminal_ID}</td>
                            <td>{crime.Classification}</td>
                            <td>{crime.Status}</td>
                            <td>{new Date(crime.Date_charged).toJSON().slice(0,10).split('-').reverse().join('/')}</td>
                            <td>{new Date(crime.Hearing_date).toJSON().slice(0,10).split('-').reverse().join('/')}</td>
                            <td>{new Date(crime.Appeal_cut_date).toJSON().slice(0,10).split('-').reverse().join('/')}</td>
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
        <SignOut />
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

export default Crimes;