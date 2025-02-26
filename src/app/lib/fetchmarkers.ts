const fetchMarkers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
    if (!response.ok) {
      return [];
    }
    const customerCounts: { [vehicleId: string]: number } = {};
    const data = await response.json();

    if (Object.keys(data).length === 0 && data.constructor === Object) {
      return [];
    }

    return (
      data.map((item: { latitude: string; longitude: string; vehicleid: string }) => {
        const customerNumber = customerCounts[item.vehicleid] || 1;
        customerCounts[item.vehicleid] = customerNumber + 1;
        return {
          coordinates: [parseFloat(item.latitude), parseFloat(item.longitude)],
          finalcolor: parseInt(item.vehicleid) === 1,
          customerNumber,
        };
      })
    );
  };

export default fetchMarkers;