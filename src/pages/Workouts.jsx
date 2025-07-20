import React, { useState } from 'react';
import { storageService } from '../services/api';
import { format, parseISO } from 'date-fns';

const Workouts = () => {
  const [workouts, setWorkouts] = useState(storageService.getWorkouts());
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    calories: '',
    notes: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    exercises: []
  });

  const categories = [
    'Strength Training',
    'Cardio',
    'Flexibility',
    'Sports',
    'Yoga',
    'Pilates',
    'HIIT',
    'CrossFit'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutData = {
      ...formData,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories) || 0,
      completed: false
    };

    if (editingWorkout) {
      storageService.updateWorkout(editingWorkout.id, workoutData);
      setWorkouts(storageService.getWorkouts());
    } else {
      storageService.addWorkout(workoutData);
      setWorkouts(storageService.getWorkouts());
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      duration: '',
      calories: '',
      notes: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      exercises: []
    });
    setShowForm(false);
    setEditingWorkout(null);
  };

  const handleEdit = (workout) => {
    setFormData({
      name: workout.name,
      category: workout.category,
      duration: workout.duration.toString(),
      calories: workout.calories?.toString() || '',
      notes: workout.notes || '',
      date: workout.date,
      exercises: workout.exercises || []
    });
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const toggleComplete = (workout) => {
    storageService.updateWorkout(workout.id, { ...workout, completed: !workout.completed });
    setWorkouts(storageService.getWorkouts());
  };

  const deleteWorkout = (id) => {
    storageService.deleteWorkout(id);
    setWorkouts(storageService.getWorkouts());
  };

  const filteredWorkouts =
    selectedCategory === 'All'
      ? workouts
      : workouts.filter((workout) => workout.category === selectedCategory);

  const pageStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const filterStyle = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  };

  const filterButtonStyle = (isActive) => ({
    padding: '0.5rem 1rem',
    border: isActive ? '2px solid #007bff' : '2px solid #e9ecef',
    borderRadius: '20px',
    background: isActive ? '#007bff' : 'white',
    color: isActive ? 'white' : '#495057',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  });

  const workoutGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  };

  const workoutCardStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  };

  const formStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
            Workouts
          </h1>
          <p style={{ color: '#6c757d', margin: 0 }}>
            Track and manage your fitness activities
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Workout'}
        </button>
      </div>

      {showForm && (
        <div style={formStyle}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            {editingWorkout ? 'Edit Workout' : 'Add New Workout'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}
            >
              <div className="form-group">
                <label className="form-label">Workout Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Calories Burned</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes about your workout..."
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                {editingWorkout ? 'Update Workout' : 'Add Workout'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={filterStyle}>
        <button
          style={filterButtonStyle(selectedCategory === 'All')}
          onClick={() => setSelectedCategory('All')}
        >
          All ({workouts.length})
        </button>
        {categories.map((category) => {
          const count = workouts.filter((w) => w.category === category).length;
          return (
            <button
              key={category}
              style={filterButtonStyle(selectedCategory === category)}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {filteredWorkouts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
          <h3>No workouts found</h3>
          <p>Start tracking your fitness journey by adding your first workout!</p>
        </div>
      ) : (
        <div style={workoutGridStyle}>
          {filteredWorkouts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((workout) => (
              <div key={workout.id} style={workoutCardStyle}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{workout.name}</h3>
                    <span
                      style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {workout.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(workout)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteWorkout(workout.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                    📅 {format(parseISO(workout.date), 'MMM dd, yyyy')}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                    ⏱️ {workout.duration} minutes
                  </p>
                  {workout.calories > 0 && (
                    <p style={{ margin: '0.25rem 0', color: '#495057' }}>
                      🔥 {workout.calories} calories
                    </p>
                  )}
                </div>

                {workout.notes && (
                  <p
                    style={{
                      color: '#6c757d',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      fontStyle: 'italic'
                    }}
                  >
                    "{workout.notes}"
                  </p>
                )}

                <button
                  onClick={() => toggleComplete(workout)}
                  className={workout.completed ? 'btn btn-secondary' : 'btn btn-outline'}
                  style={{ width: '100%' }}
                >
                  {workout.completed ? '✅ Completed' : '⏳ Mark Complete'}
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
