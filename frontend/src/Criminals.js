import NavBar from "./NavBar";
import SignOut from "./SignOut";
import './Style.css';
import {useState, useEffect} from "react";
import {StyleSheet} from 'react-native';
import axios from "axios";
import {Search} from 'react-feather';

function Criminals() {
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
            axios.get("http://localhost:3300/api/search-criminals", query)
                 .then((res) => setData(res.data))
                 .catch((err) => { console.error(err); });
        } else {
            axios.get("http://localhost:3300/api/criminal-data")
                 .then((res) => setData(res.data))
                 .catch((err) => { console.error(err); });
        }
    }, [search]);

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
                style={styles.searchText} placeholder={"Search Criminals"} 
                value={search} onChange={handleSearchInput}>
            </input>
            <div className='search-icon'><Search width="45x" height="45px" className='search-icon-svg' color="#9748FF"/> </div>
        </div>
        

        <table className="d-table">
            <thead> 
                <tr>
                    <th>Select</th>
                    <th>Criminal ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>

            <tbody>
                {
                    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((criminal, index)=>{
                        return <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRowKeys.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </td>
                            <td>{criminal.Criminal_ID}</td>
                            <td>{criminal.Name}</td>
                            <td>{criminal.Address}</td>
                            <td>{criminal.Phone}</td>
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

export default Criminals;