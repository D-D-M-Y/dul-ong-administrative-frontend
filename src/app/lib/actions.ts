'use server';

const generateRoute = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`);
    if (!response.ok) {
      throw new Error("Error in generating route");
    }
  };

export default generateRoute;