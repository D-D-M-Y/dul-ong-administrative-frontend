"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import { 
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';
import Button from '@mui/material/Button';

interface Entity {
  pk: number;
  name: string;
  province: string;
  city: string;
  barangay: string;
  street_address: string;
  longitude: string;
  latitude: string;
  time_window_start: number;
  time_window_end: number;
  zip: number;
}

const fields = [
  { label: "Name", name: "customerName", type: "text" },
  { label: "Province", name: "province", type: "text" },
  { label: "City", name: "city", type: "text" },
  { label: "Barangay", name: "barangay", type: "text" },
  { label: "Street No.", name: "streetAddress", type: "text" },
  { label: "Zip", name: "zip", type: "number" },
  { label: "Longitude", name: "longitude", type: "number" },
  { label: "Latitude", name: "latitude", type: "number" },
  { label: "Start of Time Window", name: "time_window_start", type: "number" },
  { label: "End of Time Window", name: "time_window_end", type: "number" },
];

const MyGrid = ({ entities, searchQuery }: { entities: Entity[], searchQuery: string }) => {
  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null); 

  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: Entity, type: "edit" | "delete") => {
    setSelectedEntity(entity);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };
  
  const headers = [
    { name: 'Customer ID' },
    { name: 'Name' },
    { name: 'Province' },
    { name: 'City/Municipality' },
    { name: 'Barangay' },
    { name: 'Street Address' },
    { name: 'Longitude' },
    { name: 'Latitude' },
    { name: 'Start of Time Window' },
    { name: 'End of Time Window' },
    { name: 'Zip' },
    { name: 'Actions' },
  ];

   return (
    <>
    <table>
      <thead className="font-source_sans_pro">
        <tr>
          {headers.map((header) => (
            <th className="p-4" key={header.name}>
              {header.name}
              {header.name !== 'Actions' && (
                <button className='ml-1'><CiCircleChevDown /></button>
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="font-ptsans">
        {filteredEntities.map((entity) => (
          <tr key={entity.pk}>
            <td className='p-4'>{entity.pk}</td>
            <td className='p-4'>{entity.name}</td>
            <td className='p-4'>{entity.province}</td>
            <td className='p-4'>{entity.city}</td>
            <td className='p-4'>{entity.barangay}</td>
            <td className='p-4'>{entity.street_address}</td>
            <td className='p-4'>{entity.longitude}</td>
            <td className='p-4'>{entity.latitude}</td>
            <td className='p-4'>{entity.time_window_start}</td>
            <td className='p-4'>{entity.time_window_end}</td>
            <td className='p-4'>{entity.zip}</td>
             <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit")}><div className="button-content">
                    <CiEdit size={24} />
                </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && selectedEntity && (
        <Modal
          onToggle={handleModalToggle}
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields = {fields}
        />
      )}
          </>
                );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer_data`);
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();
        setEntities(data); // Set the entities state
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);

  return (
    <div>
      <h1 className='font-roboto font-bold'>Customer Data</h1>

      <div className="flex items-baseline">
        <div className="customborder-active"><h2>Manage Customers</h2></div>
        <div className="customborder-link">
          <Link href="/customer-data/manage-packages"><h2>Manage Packages</h2></Link>
        </div>
        <div className="customborder-link">
          <Link href="/customer-data/view-transactions"><h2>View Transactions</h2></Link>
        </div>
        <div className="customborder-link">
          <Link href="/customer-data/new-package"><h2>New Package</h2></Link>
        </div>
      </div>

      <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
          <MyGrid entities={entities} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
