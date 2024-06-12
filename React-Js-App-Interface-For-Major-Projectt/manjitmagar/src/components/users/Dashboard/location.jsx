import React from 'react';
import './location.css'; 

function VehicleCountTable() {
    return (
        <table className="vehicle-count-table">
            <thead>
                <tr>
                    <th colSpan="3"><b><span className='text'>OUTPUT</span></b></th>
                </tr>
            </thead>
            <tbody>
                <tr className="tablerow_color">
                    <td>Lane X</td>
                    <td>Lane Y</td>
                </tr>
                <tr>
                    <td>
                        <p>Number of Bus: 10</p>
                        <p>Number of Bike: 20</p>
                        <p>Number of Car: 30</p>
                    </td>
                    <td>
                        <p>Number of Bus: 15</p>
                        <p>Number of Bike: 25</p>
                        <p>Number of Car: 35</p>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" className='vechileCount'>
                        <p className="centered-text">Average Vehicle Count: 20</p>
                        <p className="centered-text">Estimated Green Time: 30 seconds</p>
                    </td>
                </tr>
                <tr className='tablerow_color'>
                    <td>Lane A</td>
                    <td>Lane B</td>
                </tr>
                <tr>
                    <td>
                        <p>Number of Bus: 10</p>
                        <p>Number of Bike: 20</p>
                        <p>Number of Car: 30</p>
                    </td>
                    <td>
                        <p>Number of Bus: 15</p>
                        <p>Number of Bike: 25</p>
                        <p>Number of Car: 35</p>
                    </td>
                </tr>
                <tr >
                    <td colSpan="3" className='vechileCount'>
                        <p className="centered-text">Average Vehicle Count: 20</p>
                        <p className="centered-text">Estimated Green Time: 30 seconds</p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default VehicleCountTable;
