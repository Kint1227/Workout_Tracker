import React from 'react';
import { storageService } from '../services/api';
import { format, isToday, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import NotificationManager from '../components/NotificationManager';

const Dashboard = () => {
  const workouts = storageService.getWorkouts();
  const goals = storageService.getGoals();
  
  const todaysWorkouts = workouts.filter(workout => 
    isToday(parseISO(workout.date))
  );
  
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weeklyStats = workouts.filter(workout => {
    const workoutDate = parseISO(workout.date);
    return workoutDate >= weekAgo && workoutDate <= now;
  });
  
  const completedGoals = goals.filter(goal => goal.progress >= goal.target);
  
  const dashboardStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  };

  const statCardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };

  const sectionStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const workoutItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const goalItemStyle = {
    padding: '1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    background: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  };

  const progressFillStyle = (progress, target) => ({
    height: '100%',
    background: progress >= target ? '#28a745' : '#007bff',
    width: `${Math.min((progress / target) * 100, 100)}%`,
    transition: 'width 0.3s ease'
  });

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          Welcome back! Here's your fitness overview.
        </p>
      </div>

      {/* Stats Overview */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={{ ...statNumberStyle, color: '#007bff' }}>
            {todaysWorkouts.length}
          </div>
          <p style={{ color: '#6c757d', margin: 0 }}>Today's Workouts</p>
        </div>
        
        <div style={statCardStyle}>
          <div style={{ ...statNumberStyle, color: '#28a745' }}>
            {weeklyStats.length}
          </div>
          <p style={{ color: '#6c757d', margin: 0 }}>This Week</p>
        </div>
        
        <div style={statCardStyle}>
          <div style={{ ...statNumberStyle, color: '#dc3545' }}>
            {workouts.length}
          </div>
          <p style={{ color: '#6c757d', margin: 0 }}>Total Workouts</p>
        </div>
        
        <div style={statCardStyle}>
          <div style={{ ...statNumberStyle, color: '#6f42c1' }}>
            {completedGoals.length}
          </div>
          <p style={{ color: '#6c757d', margin: 0 }}>Goals Achieved</p>
        </div>
      </div>

      {/* Today's Workouts */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>Today's Workouts</h2>
          <Link to="/workouts" className="btn btn-primary">Add Workout</Link>
        </div>
        
        {todaysWorkouts.length === 0 ? (
          <p style={{ color: '#6c757d', textAlign: 'center', padding: '2rem' }}>
            No workouts scheduled for today. <Link to="/workouts">Add one now!</Link>
          </p>
        ) : (
          todaysWorkouts.map(workout => (
            <div key={workout.id} style={workoutItemStyle}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                  {workout.name}
                </h4>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                  {workout.category} • {workout.duration} minutes
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  background: workout.completed ? '#28a745' : '#ffc107',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.8rem'
                }}>
                  {workout.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Active Goals */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>Active Goals</h2>
          <Link to="/goals" className="btn btn-secondary">Manage Goals</Link>
        </div>
        
        {goals.length === 0 ? (
          <p style={{ color: '#6c757d', textAlign: 'center', padding: '2rem' }}>
            No goals set yet. <Link to="/goals">Create your first goal!</Link>
          </p>
        ) : (
          goals.slice(0, 3).map(goal => (
            <div key={goal.id} style={goalItemStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: '#2c3e50' }}>{goal.title}</h4>
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  {goal.progress} / {goal.target} {goal.unit}
                </span>
              </div>
              <div style={progressBarStyle}>
                <div style={progressFillStyle(goal.progress, goal.target)}></div>
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.8rem' }}>
                Target: {format(parseISO(goal.targetDate), 'MMM dd, yyyy')}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link to="/workouts" className="btn btn-primary" style={{ textAlign: 'center', padding: '1rem' }}>
            📝 Log Workout
          </Link>
          <Link to="/goals" className="btn btn-secondary" style={{ textAlign: 'center', padding: '1rem' }}>
            🎯 Set Goal
          </Link>
          <Link to="/progress" className="btn btn-outline" style={{ textAlign: 'center', padding: '1rem' }}>
            📊 View Progress
          </Link>
        </div>
      </div>

      {/* Notification Manager */}
      <NotificationManager />
    </div>
  );
};

export default Dashboard;