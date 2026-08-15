export interface Studio {
  id: number;
  name: string;
  suburb: string;
  city: string;
}

export async function getStudios(): Promise<Studio[]> {
  const response = await fetch("http://127.0.0.1:8000/api/studios/");
  return response.json();
}

export async function getStudio(id: string): Promise<Studio> {
  const response = await fetch(`http://127.0.0.1:8000/api/studios/${id}/`);
  return response.json();
}