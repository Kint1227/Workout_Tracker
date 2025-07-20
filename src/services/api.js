import axios from 'axios';

const EXERCISEDB_API_KEY = import.meta.env.VITE_EXERCISEDB_KEY || '';
const EXERCISEDB_BASE_URL = 'https://exercisedb.p.rapidapi.com';

const NUTRITIONIX_APP_ID = import.meta.env.VITE_NUTRITIONIX_APP_ID || '';
const NUTRITIONIX_API_KEY = import.meta.env.VITE_NUTRITIONIX_API_KEY || '';
const NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';

const exerciseAPI = axios.create({
  baseURL: EXERCISEDB_BASE_URL,
  headers: {
    'X-RapidAPI-Key': EXERCISEDB_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
});

const nutritionAPI = axios.create({
  baseURL: NUTRITIONIX_BASE_URL,
  headers: {
    'x-app-id': NUTRITIONIX_APP_ID,
    'x-app-key': NUTRITIONIX_API_KEY,
    'Content-Type': 'application/json'
  }
});

export const exerciseService = {
  getAllExercises: async (limit = 50, offset = 0) => {
    try {
      const response = await exerciseAPI.get(`/exercises?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return getMockExercises();
    }
  },

  getExercisesByBodyPart: async (bodyPart) => {
    try {
      const response = await exerciseAPI.get(`/exercises/bodyPart/${bodyPart}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by body part:', error);
      return getMockExercises().filter(ex => ex.bodyPart === bodyPart);
    }
  },

  getExercisesByTarget: async (target) => {
    try {
      const response = await exerciseAPI.get(`/exercises/target/${target}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by target:', error);
      return getMockExercises().filter(ex => ex.target === target);
    }
  },

  getExercisesByEquipment: async (equipment) => {
    try {
      const response = await exerciseAPI.get(`/exercises/equipment/${equipment}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by equipment:', error);
      return getMockExercises().filter(ex => ex.equipment === equipment);
    }
  },

  getBodyParts: () => getList('/exercises/bodyPartList', DEFAULT_BODY_PARTS),
  getTargetMuscles: () => getList('/exercises/targetList', DEFAULT_TARGETS),
  getEquipmentList: () => getList('/exercises/equipmentList', DEFAULT_EQUIPMENT)
};

async function getList(endpoint, fallback) {
  try {
    const { data } = await exerciseAPI.get(endpoint);
    return data;
  } catch (err) {
    console.error(`ExerciseDB → list ${endpoint} failed`, err);
    return fallback;
  }
}

export const nutritionService = {
  searchFoods: async (query) => {
    try {
      const response = await nutritionAPI.post('/search/instant', { query });
      return response.data;
    } catch (error) {
      console.error('Error searching foods:', error);
      return getMockFoodSearch(query);
    }
  },

  getNutritionFacts: async (query) => {
    try {
      const response = await nutritionAPI.post('/natural/nutrients', { query });
      return response.data;
    } catch (error) {
      console.error('Error getting nutrition facts:', error);
      return getMockNutritionFacts(query);
    }
  },

  getExerciseCalories: async (query) => {
    try {
      const response = await nutritionAPI.post('/natural/exercise', { query });
      return response.data;
    } catch (error) {
      console.error('Error getting exercise calories:', error);
      return getMockExerciseCalories(query);
    }
  }
};

const read = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const nextId = () => Date.now();

export const storageService = {
  getWorkouts: () => read('fittrack-workouts'),

  addWorkout: (workout) => {
    const workouts = read('fittrack-workouts');
    const newWorkout = { id: nextId(), ...workout, createdAt: new Date().toISOString() };
    write('fittrack-workouts', [...workouts, newWorkout]);
    return newWorkout;
  },

  updateWorkout: (id, updates) => mutate('fittrack-workouts', id, updates),
  deleteWorkout: (id) => remove('fittrack-workouts', id),

  getGoals: () => read('fittrack-goals'),

  addGoal: (goal) => {
    const goals = read('fittrack-goals');
    const newGoal = { id: nextId(), ...goal, createdAt: new Date().toISOString(), progress: 0 };
    write('fittrack-goals', [...goals, newGoal]);
    return newGoal;
  },

  updateGoal: (id, updates) => mutate('fittrack-goals', id, updates),
  deleteGoal: (id) => remove('fittrack-goals', id),

  getReminders: () => read('fittrack-reminders'),

  addReminder: (reminder) => {
    const reminders = read('fittrack-reminders');
    const newReminder = { id: nextId(), ...reminder, createdAt: new Date().toISOString() };
    write('fittrack-reminders', [...reminders, newReminder]);
    return newReminder;
  },

  deleteReminder: (id) => remove('fittrack-reminders', id)
};

function mutate(key, id, updates) {
  const items = read(key);
  const idx = items.findIndex(item => item.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  write(key, items);
  return items[idx];
}

function remove(key, id) {
  const items = read(key).filter(item => item.id !== id);
  write(key, items);
  return items;
}

function getMockExercises() {
  return [
    {
      id: '1',
      name: 'Push-ups',
      bodyPart: 'chest',
      target: 'pectorals',
      equipment: 'body weight',
      gifUrl: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Start in a plank position with hands slightly wider than shoulders.',
        'Lower until chest nearly touches floor.',
        'Push back to start.'
      ]
    }
  ];
}

function getMockFoodSearch(query) {
  return {
    common: [
      { food_name: 'apple', serving_unit: 'medium', serving_qty: 1 },
      { food_name: 'banana', serving_unit: 'medium', serving_qty: 1 }
    ],
    branded: [],
    query
  };
}

function getMockNutritionFacts(query) {
  return {
    foods: [
      { food_name: 'apple', nf_calories: 95, serving_qty: 1, serving_unit: 'medium' }
    ],
    query
  };
}

function getMockExerciseCalories(query) {
  return {
    exercises: [
      { user_input: 'running', duration_min: 30, nf_calories: 294 }
    ],
    query
  };
}

const DEFAULT_BODY_PARTS = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
const DEFAULT_TARGETS = ['abs', 'biceps', 'calves', 'glutes', 'hamstrings', 'lats', 'pectorals', 'quads', 'triceps'];
const DEFAULT_EQUIPMENT = ['body weight', 'barbell', 'dumbbell', 'kettlebell'];
