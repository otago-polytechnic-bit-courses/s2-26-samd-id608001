## Task 1
```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet("FitTrack"));
```


```bash
npx tsx src/index.ts

Hello, 42

npx tsc        

src/index.ts:5:19 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

5 console.log(greet(42));
                    ~~


Found 1 error in src/index.ts:5
```

## Task 2

```typescript
function getFitTrackInfo(): string {
    let largestStudio: string = 34;
    let totalStudios: number = 2;
    let suburbs: string[] = ["Dunedin Central", "St Kilda"];

    return `FitTrack info: largest Studio: ${largestStudio}, total Studios: ${totalStudios}, suburbs: ${suburbs}`
}

console.log(getFitTrackInfo());

```

```bash
npx tsc
src/index.ts:2:9 - error TS2322: Type 'number' is not assignable to type 'string'.

2     let largestStudio: string = 34;
          ~~~~~~~~~~~~~


Found 1 error in src/index.ts:2
```

## Task 3
```typescript
interface Studio {
  id: number;
  name: string;
  suburb: string;
  city: string;
  acceptingMembers: string;
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
```

As you can see above the type for acceptingMembers is a string and not a boolean. This could mean that all studios are not accepting members as "true" does not === true.

## Task 4
```typescript
type MembershipStatus = "active" | "paused" | "cancelled";

function describeStatus(status: MembershipStatus): string {
  if (status === "active") return "Currently a member";
  if (status === "paused") return "Membership paused";
  return "No longer a member";
}

console.log(describeStatus("not a status"));
```

```bash
npx tsc             
src/index.ts:9:28 - error TS2345: Argument of type '"not a status"' is not assignable to parameter of type 'MembershipStatus'.

9 console.log(describeStatus("not a status"));
                             ~~~~~~~~~~~~~~


Found 1 error in src/index.ts:9
```

## Task 5
```typescript
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
```

## Task 6

```typescript
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
```

My models are already in line there was no change needed