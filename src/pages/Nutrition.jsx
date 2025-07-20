import React, { useState } from 'react';
import { nutritionService } from '../services/api';

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [exerciseCalories, setExerciseCalories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('food');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [exerciseQuery, setExerciseQuery] = useState('');

  const searchFoods = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const results = await nutritionService.searchFoods(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNutritionFacts = async (foodQuery) => {
    setLoading(true);
    try {
      const nutrition = await nutritionService.getNutritionFacts(foodQuery);
      setNutritionData(nutrition);
    } catch (error) {
      console.error('Error getting nutrition facts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExerciseCalories = async () => {
    if (!exerciseQuery.trim()) return;
    
    setLoading(true);
    try {
      const calories = await nutritionService.getExerciseCalories(exerciseQuery);
      setExerciseCalories(calories);
    } catch (error) {
      console.error('Error getting exercise calories:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToSelectedFoods = (food) => {
    if (!selectedFoods.find(f => f.food_name === food.food_name)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const removeFromSelectedFoods = (foodName) => {
    setSelectedFoods(selectedFoods.filter(f => f.food_name !== foodName));
  };

  const analyzeSelectedFoods = () => {
    if (selectedFoods.length === 0) return;
    
    const foodQuery = selectedFoods.map(food => 
      `${food.serving_qty} ${food.serving_unit} ${food.food_name}`
    ).join(', ');
    
    getNutritionFacts(foodQuery);
  };

  const pageStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const tabsStyle = {
    display: 'flex',
    marginBottom: '2rem',
    borderBottom: '2px solid #e9ecef'
  };

  const tabStyle = (isActive) => ({
    padding: '1rem 2rem',
    background: 'none',
    border: 'none',
    borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
    color: isActive ? '#007bff' : '#6c757d',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  });

  const searchSectionStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const resultsSectionStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const foodGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const foodCardStyle = {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const nutritionCardStyle = {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
          Nutrition Tracker
        </h1>
        <p style={{ color: '#6c757d', margin: 0 }}>
          Track your food intake and exercise calories with detailed nutritional information
        </p>
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button
          style={tabStyle(activeTab === 'food')}
          onClick={() => setActiveTab('food')}
        >
          Food Nutrition
        </button>
        <button
          style={tabStyle(activeTab === 'exercise')}
          onClick={() => setActiveTab('exercise')}
        >
          Exercise Calories
        </button>
      </div>

      {/* Food Nutrition Tab */}
      {activeTab === 'food' && (
        <>
          {/* Food Search */}
          <div style={searchSectionStyle}>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Search Foods</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search for foods (e.g., apple, chicken breast, rice)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchFoods()}
                style={{ flex: 1 }}
              />
              <button 
                className="btn btn-primary"
                onClick={searchFoods}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {/* Selected Foods */}
            {selectedFoods.length > 0 && (
              <div>
                <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Selected Foods:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {selectedFoods.map((food, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {food.serving_qty} {food.serving_unit} {food.food_name}
                      <button
                        onClick={() => removeFromSelectedFoods(food.food_name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={analyzeSelectedFoods}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Get Nutrition Facts'}
                </button>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchResults && (
            <div style={resultsSectionStyle}>
              <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Search Results</h3>
              
              {searchResults.common && searchResults.common.length > 0 && (
                <>
                  <h4 style={{ color: '#495057', marginBottom: '1rem' }}>Common Foods:</h4>
                  <div style={foodGridStyle}>
                    {searchResults.common.map((food, index) => (
                      <div
                        key={index}
                        style={foodCardStyle}
                        onClick={() => addToSelectedFoods(food)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#007bff';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e9ecef';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {food.photo && (
                          <img
                            src={food.photo.thumb}
                            alt={food.food_name}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                              marginBottom: '0.5rem'
                            }}
                          />
                        )}
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', textTransform: 'capitalize' }}>
                          {food.food_name}
                        </h5>
                        <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                          {food.serving_qty} {food.serving_unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Nutrition Facts */}
          {nutritionData && (
            <div style={resultsSectionStyle}>
              <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Nutrition Facts</h3>
              
              {nutritionData.foods && nutritionData.foods.map((food, index) => (
                <div key={index} style={nutritionCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    {food.photo && (
                      <img
                        src={food.photo.thumb}
                        alt={food.food_name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '1rem'
                        }}
                      />
                    )}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', textTransform: 'capitalize' }}>
                        {food.food_name}
                      </h4>
                      <p style={{ margin: 0, color: '#6c757d' }}>
                        {food.serving_qty} {food.serving_unit} ({food.serving_weight_grams}g)
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <h5 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Calories & Macros</h5>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Calories:</strong> {food.nf_calories}
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Protein:</strong> {food.nf_protein}g
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Carbs:</strong> {food.nf_total_carbohydrate}g
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Fat:</strong> {food.nf_total_fat}g
                      </p>
                    </div>
                    
                    <div>
                      <h5 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Additional Info</h5>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Fiber:</strong> {food.nf_dietary_fiber}g
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Sugar:</strong> {food.nf_sugars}g
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Sodium:</strong> {food.nf_sodium}mg
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Cholesterol:</strong> {food.nf_cholesterol}mg
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Exercise Calories Tab */}
      {activeTab === 'exercise' && (
        <>
          <div style={searchSectionStyle}>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Calculate Exercise Calories</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Describe your exercise (e.g., ran 3 miles, lifted weights for 45 minutes)"
                value={exerciseQuery}
                onChange={(e) => setExerciseQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && getExerciseCalories()}
                style={{ flex: 1 }}
              />
              <button 
                className="btn btn-primary"
                onClick={getExerciseCalories}
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate'}
              </button>
            </div>
            
            <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
              <p><strong>Examples:</strong></p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>ran 5 miles</li>
                <li>lifted weights for 1 hour</li>
                <li>walked for 30 minutes</li>
                <li>swam 1000 meters</li>
              </ul>
            </div>
          </div>

          {/* Exercise Results */}
          {exerciseCalories && (
            <div style={resultsSectionStyle}>
              <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Calories Burned</h3>
              
              {exerciseCalories.exercises && exerciseCalories.exercises.map((exercise, index) => (
                <div key={index} style={nutritionCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    {exercise.photo && (
                      <img
                        src={exercise.photo.thumb}
                        alt="Exercise"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '1rem'
                        }}
                      />
                    )}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', textTransform: 'capitalize' }}>
                        {exercise.user_input}
                      </h4>
                      <p style={{ margin: 0, color: '#6c757d' }}>
                        Duration: {exercise.duration_min} minutes
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <h5 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Calories Burned</h5>
                      <p style={{ 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        color: '#dc3545', 
                        margin: '0.5rem 0' 
                      }}>
                        {exercise.nf_calories}
                      </p>
                      <p style={{ margin: 0, color: '#6c757d' }}>calories</p>
                    </div>
                    
                    <div>
                      <h5 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Exercise Details</h5>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>MET Value:</strong> {exercise.met}
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Duration:</strong> {exercise.duration_min} minutes
                      </p>
                      <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                        <strong>Calories/min:</strong> {(exercise.nf_calories / exercise.duration_min).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nutrition;