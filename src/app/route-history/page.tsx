import React from 'react'; 

interface Entity {
  routeID: string
  date: Date;
  route: string;
  cargoQuantity: number;
  transportationCost: string;
  vehicleID: string;
  gas: number;
  carryingCapacity: number;
  deleteIcon: string;
}

const entities: Entity[] = [
  // Populate entity data here
  { 
  routeID: "CUS000001", 
  date: new Date(),  
  route: "Iloilo City", 
  cargoQuantity: 1000, 
  transportationCost: "8", 
  vehicleID: "VEH000001", 
  gas: 50,
  carryingCapacity: 1000,
  deleteIcon: "/icons/trash.svg"}
  // ... more entities
];

const MyGrid = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Route ID</th>
          <th>Date</th>
          <th>Route</th>
          <th>Cargo Quantity</th>
          <th>Transportation Cost</th>
          <th>Vehicle ID</th>
          <th>Gas</th>
          <th>Carrying Capaicty</th>
          <th>Delete</th>
          {/* Add table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.routeID}>
            <td>{entity.routeID}</td>
            <td>{entity.date.toLocaleDateString()}</td>
            <td>{entity.route}</td>
            <td>{entity.cargoQuantity}</td>
            <td>{entity.transportationCost}</td>
            <td>{entity.vehicleID}</td>
            <td>{entity.gas}</td>
            <td>{entity.carryingCapacity}</td>
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
          Route History
        </h1>

        {/* Folder */}
        <div className="customborder-active">
          <h2>Manage Routes</h2>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className='p-5'>
          <div className="grid table">
            <MyGrid />
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
