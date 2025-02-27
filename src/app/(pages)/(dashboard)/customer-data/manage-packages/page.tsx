import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/app/ui/tables/searchbar';
import PackageGrid from '@/app/components/Griddata/PackageGrid';
import Paginator from '@/app/ui/tables/paginator';



export default async function Page(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const [packageSizes, setPackageSizes] = useState<PackageSize[]>([]);

  const fetchEntities = async (): Promise<{entities: PackageEntity[], totalPages: number}> => {
    try {
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/packages/${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/packages?page=${currentPage}&limit=10`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch entities: ${response.statusText}`);
      }
      const data = await response.json();
      
      return {entities:data.results, totalPages: data.total_pages}
    } catch (error) {
      throw new Error(`Error fetching entities`);
    }
  };

  const fetchPackageSizes = async (): Promise<PackageSize[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/sizing`);
      if (!response.ok) throw new Error('Failed to fetch package sizes');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Cannot find package sizes')
    }
  };

    const {entities, totalPages} = await fetchEntities();
    const packageSizes = await fetchPackageSizes();

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
  ];

  return (
    <>

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
          <SearchBar/>
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <PackageGrid entities={entities} fields={fields} />
          </div>
        </div>
        <Paginator totalPages={totalPages} currentPage={currentPage}/>
      </div>
    </>
  );
}
