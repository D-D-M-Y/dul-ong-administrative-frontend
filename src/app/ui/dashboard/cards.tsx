  export default async function CardWrapper() {
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'total' | 'avgdeltime' | 'ontimerate' | 'successfulrate' | 'fooavailable' | 'fooenroute' | 'fooidling' | 'packagedel' | 'routegen';
  }) {
  
    return (
      <div className="rounded-xl border border-#D9D9D9 bg-white p-2 shadow-sm ">
        <h3 className='ml-3'>{title}</h3>
        <h1 className='font-bold py-8 text-center mb-2'> {value} </h1>
      </div>
    );
  }
  