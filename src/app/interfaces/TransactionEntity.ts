interface TransactionEntity {
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