interface Studio {
  id: number;
  name: string;
  suburb: string;
  city: string;
  acceptingMembers: boolean;
  createdAt: string;
}

type StudioId = number;

interface StudioClass {
  readonly id: number;
  studio: StudioId;
  name: string;
  capacity: number;
  duration?: number;
}

interface Paginated<T> {
    results: T[];
    count: number
}

const studioResponse: Paginated<Studio> = {
  results: [
            {
            id: 1,
            name: "CityFit",
            suburb: "Dunedin Central",
            city: "Dunedin",
            acceptingMembers: true,
            createdAt: "2026-01-01",
        },
    ],
  count: 20,
};

const studioClassResponse: Paginated<StudioClass> = {
  results: [
            {
            id: 1,
            studio: 1,
            name: "CityFit",
            capacity: 20,
            duration: 200,
        },
    ],
  count: 10,
};


async function fetchStudios(): Promise<Studio[]> {
  const response = await fetch("http://127.0.0.1:8000/api/studios/");
  const raw: unknown = await response.json();
  return raw as Studio[]; // an assertion: you are telling TypeScript to trust you here
}

async function fetchStudioClasses(): Promise<StudioClass[]> {
  const response = await fetch("http://127.0.0.1:8000/api/classes/");
  const raw: unknown = await response.json();
  return raw as StudioClass[];
}

console.log(fetchStudios());
console.log(fetchStudioClasses());