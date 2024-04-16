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
    type: 'total' | 'avgdeltime' | 'ontimerate' | 'successfulrate';
  }) {
  
    return (
      <div className="rounded-xl bg-white p-2 shadow-sm">
        <p className={`font-source-sans-pro ml-3`} style={{ fontSize: 24}}>{title}</p>
        <h1 className={`font-roboto font-bold text-[64px] py-8 text-center mb-2`}> {value} </h1>
      </div>
    );
  }
  