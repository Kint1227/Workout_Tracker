import axios from 'axios';

// ExerciseDB API configuration
const EXERCISEDB_API_KEY = '0edcf11b33mshc1d461e492fd801p1ddcd3jsn69279ab0b19e'; // Replace with your actual API key
const EXERCISEDB_BASE_URL = 'https://exercisedb.p.rapidapi.com';

// Nutritionix API configuration
const NUTRITIONIX_APP_ID = 'd47db847'; // Replace with your actual app ID
const NUTRITIONIX_API_KEY = '7c896f98536ea8c4e08a28f09423126e'; // Replace with your actual API key
const NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';

// ExerciseDB API instance
const exerciseAPI = axios.create({
  baseURL: EXERCISEDB_BASE_URL,
  headers: {
    'X-RapidAPI-Key': EXERCISEDB_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
});

// Nutritionix API instance
const nutritionAPI = axios.create({
  baseURL: NUTRITIONIX_BASE_URL,
  headers: {
    'x-app-id': NUTRITIONIX_APP_ID,
    'x-app-key': NUTRITIONIX_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Exercise API functions
export const exerciseService = {
  // Get all exercises
  getAllExercises: async (limit = 50, offset = 0) => {
    try {
      const response = await exerciseAPI.get(`/exercises?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      // Return mock data if API fails
      return getMockExercises();
    }
  },

  // Get exercises by body part
  getExercisesByBodyPart: async (bodyPart) => {
    try {
      const response = await exerciseAPI.get(`/exercises/bodyPart/${bodyPart}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by body part:', error);
      return getMockExercisesByBodyPart(bodyPart);
    }
  },

  // Get exercises by target muscle
  getExercisesByTarget: async (target) => {
    try {
      const response = await exerciseAPI.get(`/exercises/target/${target}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by target:', error);
      return getMockExercisesByTarget(target);
    }
  },

  // Get exercises by equipment
  getExercisesByEquipment: async (equipment) => {
    try {
      const response = await exerciseAPI.get(`/exercises/equipment/${equipment}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises by equipment:', error);
      return getMockExercisesByEquipment(equipment);
    }
  },

  // Get body parts list
  getBodyParts: async () => {
    try {
      const response = await exerciseAPI.get('/exercises/bodyPartList');
      return response.data;
    } catch (error) {
      console.error('Error fetching body parts:', error);
      return ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
    }
  },

  // Get target muscles list
  getTargetMuscles: async () => {
    try {
      const response = await exerciseAPI.get('/exercises/targetList');
      return response.data;
    } catch (error) {
      console.error('Error fetching target muscles:', error);
      return ['abductors', 'abs', 'adductors', 'biceps', 'calves', 'cardiovascular system', 'delts', 'forearms', 'glutes', 'hamstrings', 'lats', 'levator scapulae', 'pectorals', 'quads', 'serratus anterior', 'spine', 'traps', 'triceps', 'upper back'];
    }
  },

  // Get equipment list
  getEquipmentList: async () => {
    try {
      const response = await exerciseAPI.get('/exercises/equipmentList');
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment list:', error);
      return ['assisted', 'band', 'barbell', 'body weight', 'bosu ball', 'cable', 'dumbbell', 'elliptical machine', 'ez barbell', 'hammer', 'kettlebell', 'leverage machine', 'medicine ball', 'olympic barbell', 'resistance band', 'roller', 'rope', 'skierg machine', 'sled machine', 'smith machine', 'stability ball', 'stationary bike', 'stepmill machine', 'tire', 'trap bar', 'upper body ergometer', 'weighted', 'wheel roller'];
    }
  }
};

// Nutrition API functions
export const nutritionService = {
  // Search for foods
  searchFoods: async (query) => {
    try {
      const response = await nutritionAPI.post('/search/instant', {
        query: query
      });
      return response.data;
    } catch (error) {
      console.error('Error searching foods:', error);
      return getMockFoodSearch(query);
    }
  },

  // Get nutrition facts for foods
  getNutritionFacts: async (foods) => {
    try {
      const response = await nutritionAPI.post('/natural/nutrients', {
        query: foods
      });
      return response.data;
    } catch (error) {
      console.error('Error getting nutrition facts:', error);
      return getMockNutritionFacts(foods);
    }
  },

  // Get exercise calories burned
  getExerciseCalories: async (exercises) => {
    try {
      const response = await nutritionAPI.post('/natural/exercise', {
        query: exercises
      });
      return response.data;
    } catch (error) {
      console.error('Error getting exercise calories:', error);
      return getMockExerciseCalories(exercises);
    }
  }
};

// Mock data functions (fallback when API is not available)
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
        'Start in a plank position with your hands slightly wider than shoulder-width apart.',
        'Lower your body until your chest nearly touches the floor.',
        'Push yourself back up to the starting position.',
        'Repeat for the desired number of repetitions.'
      ]
    },
    {
      id: '2',
      name: 'Squats',
      bodyPart: 'upper legs',
      target: 'quads',
      equipment: 'body weight',
      gifUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Stand with feet shoulder-width apart.',
        'Lower your body as if sitting back into a chair.',
        'Keep your chest up and knees behind your toes.',
        'Return to standing position and repeat.'
      ]
    },
    {
      id: '3',
      name: 'Deadlifts',
      bodyPart: 'back',
      target: 'glutes',
      equipment: 'barbell',
      gifUrl: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Stand with feet hip-width apart, barbell over mid-foot.',
        'Bend at hips and knees to grip the bar.',
        'Keep your back straight and lift the bar by extending hips and knees.',
        'Lower the bar back to the ground with control.'
      ]
    }
  ];
}

function getMockExercisesByBodyPart(bodyPart) {
  const exercises = getMockExercises();
  return exercises.filter(exercise => exercise.bodyPart === bodyPart);
}

function getMockExercisesByTarget(target) {
  const exercises = getMockExercises();
  return exercises.filter(exercise => exercise.target === target);
}

function getMockExercisesByEquipment(equipment) {
  const exercises = getMockExercises();
  return exercises.filter(exercise => exercise.equipment === equipment);
}

function getMockFoodSearch(query) {
  return {
    common: [
      {
        food_name: 'apple',
        serving_unit: 'medium',
        tag_name: 'apple',
        serving_qty: 1,
        common_type: null,
        tag_id: 1,
        photo: {
          thumb: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      },
      {
        food_name: 'banana',
        serving_unit: 'medium',
        tag_name: 'banana',
        serving_qty: 1,
        common_type: null,
        tag_id: 2,
        photo: {
          thumb: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      }
    ],
    branded: []
  };
}

function getMockNutritionFacts(foods) {
  return {
    foods: [
      {
        food_name: 'apple',
        brand_name: null,
        serving_qty: 1,
        serving_unit: 'medium',
        serving_weight_grams: 182,
        nf_calories: 95,
        nf_total_fat: 0.31,
        nf_saturated_fat: 0.05,
        nf_cholesterol: 0,
        nf_sodium: 1.82,
        nf_total_carbohydrate: 25.13,
        nf_dietary_fiber: 4.37,
        nf_sugars: 18.91,
        nf_protein: 0.47,
        photo: {
          thumb: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      }
    ]
  };
}

function getMockExerciseCalories(exercises) {
  return {
    exercises: [
      {
        tag_id: 1,
        user_input: 'running',
        duration_min: 30,
        met: 9.8,
        nf_calories: 294,
        photo: {
          thumb: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      }
    ]
  };
}

// Local storage utilities
export const storageService = {
  // Workouts
  getWorkouts: () => {
    const workouts = localStorage.getItem('fittrack-workouts');
    return workouts ? JSON.parse(workouts) : [];
  },

  saveWorkouts: (workouts) => {
    localStorage.setItem('fittrack-workouts', JSON.stringify(workouts));
  },

  addWorkout: (workout) => {
    const workouts = storageService.getWorkouts();
    const newWorkout = {
      id: Date.now(),
      ...workout,
      createdAt: new Date().toISOString()
    };
    workouts.push(newWorkout);
    storageService.saveWorkouts(workouts);
    return newWorkout;
  },

  updateWorkout: (id, updates) => {
    const workouts = storageService.getWorkouts();
    const index = workouts.findIndex(w => w.id === id);
    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...updates };
      storageService.saveWorkouts(workouts);
      return workouts[index];
    }
    return null;
  },

  deleteWorkout: (id) => {
    const workouts = storageService.getWorkouts();
    const filtered = workouts.filter(w => w.id !== id);
    storageService.saveWorkouts(filtered);
    return filtered;
  },

  // Goals
  getGoals: () => {
    const goals = localStorage.getItem('fittrack-goals');
    return goals ? JSON.parse(goals) : [];
  },

  saveGoals: (goals) => {
    localStorage.setItem('fittrack-goals', JSON.stringify(goals));
  },

  addGoal: (goal) => {
    const goals = storageService.getGoals();
    const newGoal = {
      id: Date.now(),
      ...goal,
      createdAt: new Date().toISOString(),
      progress: 0
    };
    goals.push(newGoal);
    storageService.saveGoals(goals);
    return newGoal;
  },

  updateGoal: (id, updates) => {
    const goals = storageService.getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates };
      storageService.saveGoals(goals);
      return goals[index];
    }
    return null;
  },

  deleteGoal: (id) => {
    const goals = storageService.getGoals();
    const filtered = goals.filter(g => g.id !== id);
    storageService.saveGoals(filtered);
    return filtered;
  },

  // Reminders
  getReminders: () => {
    const reminders = localStorage.getItem('fittrack-reminders');
    return reminders ? JSON.parse(reminders) : [];
  },

  saveReminders: (reminders) => {
    localStorage.setItem('fittrack-reminders', JSON.stringify(reminders));
  },

  addReminder: (reminder) => {
    const reminders = storageService.getReminders();
    const newReminder = {
      id: Date.now(),
      ...reminder,
      createdAt: new Date().toISOString()
    };
    reminders.push(newReminder);
    storageService.saveReminders(reminders);
    return newReminder;
  },

  deleteReminder: (id) => {
    const reminders = storageService.getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    storageService.saveReminders(filtered);
    return filtered;
  }
};