import React from 'react'; 
import Link from 'next/link';

interface Entity {
  customerID: string
  name: string;
  city: string;
  barangay: string;
  staddress: string;
  longitude: number;
  latitude: number;
  waitingCost: number;
  editIcon: string;
  deleteIcon: string;
}

const entities: Entity[] = [
  // Populate entity data here
  { 
  customerID: "CUS0000001", 
  name: "John Celiz", 
  city: "Iloilo City", 
  barangay: "So-oc", 
  staddress: "12", 
  longitude: 10.687027, 
  latitude: 122.517291, 
  waitingCost: 0.0,
  editIcon: "/icons/edit.svg", 
  deleteIcon: "/icons/trash.svg"},
{ 
  customerID: "CUS0000002", 
  name: "Belle Mirasol", 
  city: "Iloilo City", 
  barangay: "Quezon", 
  staddress: "8", 
  longitude: 10.687027, 
  latitude: 122.517291, 
  waitingCost: 0.0,
  editIcon: "/icons/edit.svg", 
  deleteIcon: "/icons/trash.svg"}  
  // ... more entities
];

const MyGrid = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Barangay</th>
          <th>Street Address</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Waiting Cost</th>
          <th>Edit</th>
          <th>Delete</th>
          {/* Add table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.customerID}>
            <td>{entity.customerID}</td>
            <td>{entity.name}</td>
            <td>{entity.city}</td>
            <td>{entity.barangay}</td>
            <td>{entity.staddress}</td>
            <td>{entity.longitude}</td>
            <td>{entity.latitude}</td>
            <td>{entity.waitingCost}</td>
            <td className="icon-cell">
              {entity.editIcon && (
                <img src={entity.editIcon} alt="Edit" width="20" height="20" />
              )}
            </td>
            <td className="icon-cell">
              {entity.deleteIcon && (
                <img src={entity.deleteIcon} alt="Delete" width="20" height="20" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold'>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline"> 
          <div className="customborder-active">
            <h2>Manage Customers</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>
        

        {/* Body */}
        <div className="customborder-body">
        <div className="p-5"> 
          <div className="grid table">
            <MyGrid />
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}
