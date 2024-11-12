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
  pk: number
  name: string;
  size: number;
  cost: string;
  amount: number;
  payment_method: string;
  status: string;
}

type PackageSize = {
  pk: number;
  size_type: string;
  length: number;
  width: number;
  height: number;
  weight: number;
};




const MyGrid = ({ entities, searchQuery, fields }: { entities: Entity[], searchQuery: string, fields:any }) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [endpoint, setEndpoint] = useState<"packages/edit" | "packages/delete" | null>(null);
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

  const openModal = (entity: Entity, type: "edit" | "delete", endpoint: "packages/edit" | "packages/delete") => {
    setSelectedEntity(entity);
    setEndpoint(endpoint);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };

  const headers = [
    { name: 'Package ID', key: 'pk' as keyof Entity },
    { name: 'Name', key: 'name' as keyof Entity },
    { name: 'Size', key: 'size' as keyof Entity },
    { name: 'Costs', key: 'cost' as keyof Entity },
    { name: 'Amount', key: 'amount' as keyof Entity },
    { name: 'Payment Method', key: 'payment_method' as keyof Entity },
    { name: 'Status', key: 'status' as keyof Entity },
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
        <tbody className="font-ptsans" >
          {sortedEntities.map((entity) => (
            <tr key={entity.pk}>
              <td className='p-4'>{entity.pk}</td>
              <td className='p-4'>{entity.name}</td>
              <td className='p-4'>{entity.size}</td>
              <td className='p-4'>{entity.cost}</td>
              <td className='p-4'>{entity.amount}</td>
              <td className='p-4'>{entity.payment_method}</td>
              <td className='p-4'>{entity.status}</td>
              <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "packages/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "packages/delete")}><div className="button-content">
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
  const [packageSizes, setPackageSizes] = useState<PackageSize[]>([]);

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/packages/${searchQuery}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/packages?page=${page}&limit=10`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();
        setEntities(data.results || data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching entities:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPackageSizes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/sizing`);
        if (!response.ok) throw new Error('Failed to fetch package sizes');
        const data = await response.json();
        setPackageSizes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntities();
    fetchPackageSizes();
  }, [page, searchQuery]);

  const fields = [
    { label: "Name", name: "packageName", type: "text" },
    {
      label: "Size",
      name: "packageSize",
      type: "dropdown",
      options: [
        ...packageSizes.map((size) => ({
          name: `${size.size_type}: ${size.length} x ${size.width} x ${size.height} - ${size.weight}kg`,
          value: size.pk,
        })),
        { name: "Custom", value: `Custom` },  // Add the Custom option
      ],
    },
    { label: "Cost", name: "paymentAmount", type: "number" },
    { label: "Amount of Items", name: "amount", type: "number" },
    {
      label: "Payment Method", name: "payment_method", type: "dropdown", options: [
        { name: "Cash", value: "CAS" },
        { name: "Card", value: "CAR" },
        { name: "GCash", value: "GCA" },
      ]
    },
    {
      label: "Status", name: "status", type: "dropdown", options: [
        { name: "Delivered", value: "DEL" },
        { name: "To be Delivered", value: "TDL" },
        { name: "Pending", value: "PEN" },
      ]
    },
  
  ];

  return (
    <>
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
            </Link>
          </div>
          <div className="customborder-active">
            <h2>Manage Packages</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/view-transactions">
              <h2>View Transactions</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>


        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          <SearchBar setSearchQuery={setSearchQuery} />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} searchQuery={searchQuery} fields={fields} />
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
