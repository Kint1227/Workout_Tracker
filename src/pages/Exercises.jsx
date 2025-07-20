import React, { useState, useEffect } from 'react';
import { exerciseService } from '../services/api';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [targetMuscles, setTargetMuscles] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [selectedBodyPart, selectedTarget, selectedEquipment]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [exercisesData, bodyPartsData, targetMusclesData, equipmentData] = await Promise.all([
        exerciseService.getAllExercises(100),
        exerciseService.getBodyParts(),
        exerciseService.getTargetMuscles(),
        exerciseService.getEquipmentList()
      ]);

      setExercises(exercisesData);
      setBodyParts(bodyPartsData);
      setTargetMuscles(targetMusclesData);
      setEquipmentList(equipmentData);
    } catch (error) {
      console.error('Error loading exercise data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = async () => {
    if (!selectedBodyPart && !selectedTarget && !selectedEquipment) {
      const allExercises = await exerciseService.getAllExercises(100);
      setExercises(allExercises);
      return;
    }

    setLoading(true);
    try {
      let filteredExercises = [];

      if (selectedBodyPart) {
        filteredExercises = await exerciseService.getExercisesByBodyPart(selectedBodyPart);
      } else if (selectedTarget) {
        filteredExercises = await exerciseService.getExercisesByTarget(selectedTarget);
      } else if (selectedEquipment) {
        filteredExercises = await exerciseService.getExercisesByEquipment(selectedEquipment);
      }

      setExercises(filteredExercises);
    } catch (error) {
      console.error('Error filtering exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const filtersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  };

  const exerciseGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  };

  const exerciseCardStyle = {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalContentStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#6c757d'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
          Exercise Database
        </h1>
        <p style={{ color: '#6c757d', margin: 0 }}>
          Discover exercises with detailed instructions and target muscle information
        </p>
      </div>

      {/* Search and Filters */}
      <div style={filtersStyle}>
        <div className="form-group">
          <label className="form-label">Search Exercises</label>
          <input
            type="text"
            className="form-input"
            placeholder="Search by exercise name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Body Part</label>
          <select
            className="form-input"
            value={selectedBodyPart}
            onChange={(e) => {
              setSelectedBodyPart(e.target.value);
              setSelectedTarget('');
              setSelectedEquipment('');
            }}
          >
            <option value="">All Body Parts</option>
            {bodyParts.map(part => (
              <option key={part} value={part}>
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Target Muscle</label>
          <select
            className="form-input"
            value={selectedTarget}
            onChange={(e) => {
              setSelectedTarget(e.target.value);
              setSelectedBodyPart('');
              setSelectedEquipment('');
            }}
          >
            <option value="">All Muscles</option>
            {targetMuscles.map(target => (
              <option key={target} value={target}>
                {target.charAt(0).toUpperCase() + target.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Equipment</label>
          <select
            className="form-input"
            value={selectedEquipment}
            onChange={(e) => {
              setSelectedEquipment(e.target.value);
              setSelectedBodyPart('');
              setSelectedTarget('');
            }}
          >
            <option value="">All Equipment</option>
            {equipmentList.map(equipment => (
              <option key={equipment} value={equipment}>
                {equipment.charAt(0).toUpperCase() + equipment.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSelectedBodyPart('');
              setSelectedTarget('');
              setSelectedEquipment('');
              setSearchTerm('');
            }}
            style={{ width: '100%' }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={loadingStyle}>
          <h3>Loading exercises...</h3>
          <p>Please wait while we fetch the exercise database</p>
        </div>
      )}

      {/* Exercise Grid */}
      {!loading && (
        <>
          <div style={{ marginBottom: '1rem', color: '#6c757d' }}>
            Showing {filteredExercises.length} exercises
          </div>
          
          {filteredExercises.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
              <h3>No exercises found</h3>
              <p>Try adjusting your search criteria or clearing the filters</p>
            </div>
          ) : (
            <div style={exerciseGridStyle}>
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  style={exerciseCardStyle}
                  onClick={() => setSelectedExercise(exercise)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      marginBottom: '0.5rem', 
                      color: '#2c3e50',
                      textTransform: 'capitalize'
                    }}>
                      {exercise.name}
                    </h3>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem'
                      }}>
                        {exercise.bodyPart}
                      </span>
                      <span style={{
                        background: '#28a745',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>
                        {exercise.target}
                      </span>
                    </div>
                    
                    <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
                      Equipment: {exercise.equipment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div style={modalStyle} onClick={() => setSelectedExercise(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6c757d'
              }}
              onClick={() => setSelectedExercise(null)}
            >
              ✕
            </button>
            
            <img
              src={selectedExercise.gifUrl}
              alt={selectedExercise.name}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            
            <h2 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem', 
              color: '#2c3e50',
              textTransform: 'capitalize'
            }}>
              {selectedExercise.name}
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                background: '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                marginRight: '0.5rem'
              }}>
                {selectedExercise.bodyPart}
              </span>
              <span style={{
                background: '#28a745',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                marginRight: '0.5rem'
              }}>
                {selectedExercise.target}
              </span>
              <span style={{
                background: '#6c757d',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                {selectedExercise.equipment}
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2c3e50' }}>
              Instructions:
            </h3>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6', color: '#495057' }}>
              {selectedExercise.instructions?.map((instruction, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  {instruction}
                </li>
              )) || (
                <li>Detailed instructions will be available soon.</li>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;