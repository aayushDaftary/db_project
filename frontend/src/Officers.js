import NavBar from "./NavBar";
import SignOut from "./SignOut";
import './Style.css'
import {useState, useEffect} from "react";
import axios from "axios";

function Officers() {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    /* api call for data */
    useEffect(() => {
        axios.get("http://localhost:3300/api/officer-data", data)
        .then((res) => setData(res.data))
        .catch(err => { console.error(err); });
    });

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
        <table className="d-table">
            <thead> 
                <tr>
                    <th>Select</th>
                    <th>Officer ID</th>
                    <th>Name</th>
                    <th>Precinct</th>
                    <th>Badge</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {
                    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((officer, index)=>{
                        return <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRowKeys.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </td>
                            <td>{officer.Officer_ID}</td>
                            <td>{officer.Name}</td>
                            <td>{officer.Precinct}</td>
                            <td>{officer.Badge}</td>
                            <td>{officer.Phone}</td>
                            <td>{officer.Status}</td>
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

export default Officers;