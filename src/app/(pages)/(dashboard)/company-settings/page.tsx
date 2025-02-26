import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/app/ui/tables/searchbar';
import { Loader } from '@/app/components/Loading';
import AdminGrid from '@/app/components/Griddata/AdminGrid';
import Paginator from '@/app/ui/tables/paginator';
import { Suspense } from 'react';

function generateName(entity: FooEntity): string {
  return entity.fname + ' ' + entity.mname + ' ' + entity.lname;
}

export default async function Page(props: {
  searchParams?: Promise <{
    query?: string;
    page?: string;
  }> 
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const [entities, setEntities] = useState<FooEntity[]>([]);
  //const [page, setPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(1);


  const fetchEntities = async (): Promise<{entities: FooEntity[], totalPages: number}> => {
    try {
      const endpoint = query
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/admin/${query}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/users/admin?page=${currentPage}&limit=10`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch entities: ${response.statusText}`);
      }
      const data = await response.json();

      // Check if 'results' exists and is an array
      if (data.results && Array.isArray(data.results)) {
        // Map through the data to add the 'name' property
        const updatedData = data.results.map((entity: FooEntity) => ({
          ...entity,
          name: generateName(entity),
        }));

        return {entities: updatedData, totalPages:data.total_pages};
      } else {
        throw new Error('Expected an array in data.results');
      }
    } catch (error) {
      throw new Error('Error fetching entities');
    }
  };

  const {entities, totalPages} = await fetchEntities();

  return (
    <>

      {/* Header */}
      <div>
        <h1 className='font-bold font-roboto'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline font-source_sans_pro">
          <div className="customborder-active ">
            <h2>Manage Admins</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/manage-foos">
              <h2>Manage FOOs</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/add-vehicle">
              <h2>Add Vehicle</h2>
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          <SearchBar/>
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <Suspense key={query + entities} fallback={<Loader/>}>
              <AdminGrid entities={entities}/>
            </Suspense>
          </div>
        </div>
      
      <Suspense key={totalPages} fallback={<Loader/>}>
        <Paginator totalPages={totalPages} currentPage={currentPage}/>
      </Suspense>
      </div>
    </>
  );
}

