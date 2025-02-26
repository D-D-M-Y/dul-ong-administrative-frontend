const fetchRoutes = async (): Promise<PolylineData> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`);
    if (!response.ok) {
      return Promise.resolve([]);
    }
    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return Promise.resolve([]);
    }
    const convertedData = data.reduce((acc: any[], item: any) => {
      const finalcolor = parseInt(item.vehicleid) === 1 ? 'purple' : 'lime';
      (acc[item.vehicleid] = acc[item.vehicleid] || []).push({
        lat: item.latitude,
        lng: item.longitude,
        finalcolor,
      });
      return acc;
    }, {});

    return (Object.values(convertedData));
  };

export default fetchRoutes;