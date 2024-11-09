"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';
import Button from '@mui/material/Button';
import { Loader } from "@/app/components/Maps/MapComponent"

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
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [endpoint, setEndpoint] = useState<"customer_data/edit" | "customer_data/delete" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [sortBy, setSortBy] = useState<keyof Entity | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedEntities = entities.sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Entity) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: Entity, type: "edit" | "delete", endpoint: "customer_data/edit" | "customer_data/delete") => {
    setSelectedEntity(entity);
    setEndpoint(`${endpoint}`);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };

  const headers = [
    { name: 'Customer ID', key: 'pk' as keyof Entity },
    { name: 'Name', key: 'name' as keyof Entity },
    { name: 'Province', key: 'province' as keyof Entity },
    { name: 'City/Municipality', key: 'city' as keyof Entity },
    { name: 'Barangay', key: 'barangay' as keyof Entity },
    { name: 'Street Address', key: 'street_address' as keyof Entity },
    { name: 'Longitude', key: 'longitude' as keyof Entity },
    { name: 'Latitude', key: 'latitude' as keyof Entity },
    { name: 'Start of Time Window', key: 'time_window_start' as keyof Entity },
    { name: 'End of Time Window', key: 'time_window_end' as keyof Entity },
    { name: 'Zip', key: 'zip' as keyof Entity },
    { name: 'Actions', key: null },
  ];

  return (
    <>
      <table>
        <thead className="font-source_sans_pro">
          <tr>
            {headers.map((header) => (
              <th className="p-4" key={header.name}>
                {header.name}
                {header.key && (
                  <button className='ml-1' onClick={() => handleSort(header.key!)}>
                    {sortBy === header.key ? (
                      sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                    ) : (
                      <CiCircleChevDown />
                    )}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="font-ptsans">
          {sortedEntities.map((entity) => (
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
              <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "customer_data/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "customer_data/delete")}><div className="button-content">
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
          endpoint={endpoint}
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields={fields}
        />
      )}
    </>
  );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/customer_data/search/${searchQuery}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/customer_data?page=${page}&limit=10`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }

        const data = await response.json();
        setEntities(data.results || data);  // Adapt this line depending on the API response format for the search endpoint
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching entities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [page, searchQuery]);

  return (
    <>
      {loading && <Loader />}
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
          <SearchBar setSearchQuery={setSearchQuery} />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} searchQuery={searchQuery} />
          </div>
        </div>

        <div className="pagination flex justify-between mt-4">
          {page > 1 && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
          )}
          <span>Page {page}</span>
          {page < totalPages && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
