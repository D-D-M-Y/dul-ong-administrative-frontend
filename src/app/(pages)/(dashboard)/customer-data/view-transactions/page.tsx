"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { Loader } from "@/app/components/Maps/MapComponent"



interface Entity {
  pk: number;
  payment_method: string;
  status: string;
  vehicleid: string;
  routeid: string;
  fooid: string;
  customerid: string;
  preferred: boolean;
  date: Date;
}


const MyGrid = ({ entities }: { entities: Entity[] }) => {
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

  const headers = [
    { name: 'Transaction ID', key: 'pk' as keyof Entity },
    { name: 'Payment Method', key: 'payment_method' as keyof Entity },
    { name: 'Status', key: 'status' as keyof Entity },
    { name: 'Vehicle ID', key: 'vehicleid' as keyof Entity },
    { name: 'Route ID', key: 'routeid' as keyof Entity },
    { name: 'FOO ID', key: 'fooid' as keyof Entity },
    { name: 'Customer ID', key: 'customerid' as keyof Entity },
    { name: 'Preferred Delivery', key: 'preferred' as keyof Entity },
    { name: 'Payment Date', key: 'date' as keyof Entity },
  ];



  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th className='p-4' key={header.name}>
                {header.name}
                {header.name !== 'Actions' && (
                  <button className='ml-1' onClick={() => handleSort(header.key!)}>
                    {sortBy === header.key ? (
                      sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                    ) : (
                      <CiCircleChevDown />
                    )}
                  </button>
                  // <button className='ml-1'> <CiCircleChevDown /></button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedEntities.map((entity) => (
            <tr key={entity.pk}>
              <td className='p-4'>{entity.pk}</td>
              <td className='p-4'>
                {entity.payment_method === 'GCA' ? 'GCash' :
                  entity.payment_method === 'CAR' ? 'Card' : 'Cash'}
              </td>              <td className='p-4'>{entity.status}</td>
              <td className='p-4'>{entity.vehicleid}</td>
              <td className='p-4'>{entity.routeid}</td>
              <td className='p-4'>{entity.fooid}</td>
              <td className='p-4'>{entity.customerid}</td>
              <td className='p-4'>{entity.preferred ? "Priority Shipping" : "Economy Shipping"}</td>
              <td className='p-4'>{entity.date}</td>
              {/* <td className='p-4'><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "transactions/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "transactions/delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isModalOpen && selectedEntity && (
        <Modal
          onToggle={handleModalToggle}
          endpoint={endpoint}
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields={fields}
        />
      )} */}
    </>
  );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/view`);
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();
        setEntities(data.results || []); // Set the entities state
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching entities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, [page]);
  return (
    <div>
      {loading && <Loader />}
      {/* Header */}
      <div>
        <h1 className='font-bold'>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline">
          <div className="customborder-link">
            <Link href="/customer-data">
              <h2>Manage Customers</h2>
            </Link>          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>View Transactions</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>


        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          {/* <SearchBar query={searchQuery} setQuery={setSearchQuery} /> */}
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} />
          </div>
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
  );
}
