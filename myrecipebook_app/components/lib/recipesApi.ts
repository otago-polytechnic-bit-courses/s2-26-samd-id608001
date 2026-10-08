const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000/api';

async function apiFetch(
  token: string,
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = fetch(`${BASE_URL}${path}`, { ...options, headers });

  return response;
}

export interface Ingredient {
  id: string | number; //TODO fix frontend using text vs backend using number
  amount: string | number; //TODO fix frontend using text vs backend using number
  measurement: string;
  name: string;
}

export interface Recipe {
  id: number;
  owner: number;
  title: string;
  description: string;
  method: string;
  ingredients: Ingredient[];
}

export async function getRecipe(
  token: string,
  recipeID: number,
): Promise<Recipe> {
  const response = await apiFetch(token, `/recipes/${recipeID}`);

  if (!response.ok) {
    throw new Error('Could not load recipes');
  }

  return response.json();
}

export async function getRecipes(token: string): Promise<Recipe[]> {
  const response = await apiFetch(token, '/recipes/');

  if (!response.ok) {
    throw new Error('Could not load recipes');
  }

  return response.json();
}

export async function createRecipe(
  token: string,
  recipe: Omit<Recipe, 'id'>,
): Promise<Recipe> {
  const response = await apiFetch(token, '/recipes/', {
    method: 'POST',
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Could not create recipe');
  }

  return response.json();
}

export async function updateRecipe(
  token: string,
  recipe: Recipe,
): Promise<Recipe> {
  const response = await apiFetch(token, `/recipes/${recipe.id}`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Could not update recipe');
  }

  return response.json();
}

export async function deleteRecipe(
  token: string,
  recipeID: number,
): Promise<void> {
  const response = await apiFetch(token, `/recipes/${recipeID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete recipe');
  }

  return response.json();
}
