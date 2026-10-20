import { getValidToken } from './auth';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000/api';

async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getValidToken();
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
  id: number;
  amount: number;
  measurement: string;
  ingredient_name: string;
}

export interface Recipe {
  id: number;
  owner: number;
  title: string;
  description: string;
  method: string;
  ingredients: Ingredient[];
}

export interface DraftIngredient {
  id?: string | number; // Allows UUIDs for unsubmitted items
  amount: string | number; // Allows fluid text input
  measurement: string;
  ingredient_name: string;
}

export interface DraftRecipe {
  id?: number;
  title: string;
  description: string;
  method: string;
  ingredients: Omit<DraftIngredient, 'id'>[];
}

export interface IngredientValidationError {
  amount?: string[];
  measurement?: string[];
  ingredient_name?: string[];
}

export interface RecipeValidationErrorState {
  title?: string[];
  description?: string[];
  method?: string[];
  ingredients?:
    | {
        [index: string]: IngredientValidationError; // Handles "0", "1", etc.
      }
    | string[]; // Handles top-level list errors like "This list may not be empty"
  non_field_errors?: string[];
}

export async function getRecipe(recipeID: string): Promise<Recipe> {
  const response = await apiFetch(`/recipes/${recipeID}/`);

  if (!response.ok) {
    throw new Error('Could not load recipes');
  }

  return response.json();
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await apiFetch('/recipes/');

  if (!response.ok) {
    throw new Error('Could not load recipes');
  }

  return response.json();
}

export async function createRecipe(recipe: DraftRecipe): Promise<Recipe> {
  const response = await apiFetch('/recipes/', {
    method: 'POST',
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.detail)
      errorData.non_field_errors = [
        `An unexpected error occurred: ${errorData.detail}`,
      ];

    throw errorData;
  }

  return response.json();
}

export async function updateRecipe(recipe: DraftRecipe): Promise<Recipe> {
  const response = await apiFetch(`/recipes/${recipe.id}/`, {
    method: 'PUT',
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Could not update recipe');
  }

  return response.json();
}

export async function deleteRecipe(recipeID: number): Promise<void> {
  const response = await apiFetch(`/recipes/${recipeID}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete recipe');
  }

  return response.json();
}
