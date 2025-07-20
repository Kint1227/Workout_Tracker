import React, { useState, useMemo } from 'react';
import { storageService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const Progress = () => {
  const workouts = storageService.getWorkouts();
  const goals = storageService.getGoals();
  const [timeRange, setTimeRange] = useState('30'); // days
  const [selectedMetric, setSelectedMetric] = useState('workouts');

  const timeRangeOptions = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' },
    { value: '365', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'workouts', label: 'Workout Count' },
    { value: 'duration', label: 'Duration (minutes)' },
    { value: 'calories', label: 'Calories Burned' }
  ];

  // Calculate date range
  const endDate = new Date();
  const startDate = subDays(endDate, parseInt(timeRange));

  // Filter workouts by date range
  const filteredWorkouts = workouts.filter(workout => {
    const workoutDate = parseISO(workout.date);
    return workoutDate >= startDate && workoutDate <= endDate;
  });

  // Prepare chart data
  const chartData = useMemo(() => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(day => {
      const dayWorkouts = filteredWorkouts.filter(workout => 
        format(parseISO(workout.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      );
      
      let value = 0;
      switch (selectedMetric) {
        case 'workouts':
          value = dayWorkouts.length;
          break;
        case 'duration':
          value = dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
          break;
        case 'calories':
          value = dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
          break;
      }
      
      return {
        date: format(day, 'MMM dd'),
        value,
        fullDate: format(day, 'yyyy-MM-dd')
      };
    });
  }, [filteredWorkouts, startDate, endDate, selectedMetric]);

  // Category distribution data
  const categoryData = useMemo(() => {
    const categoryCount = {};
    filteredWorkouts.forEach(workout => {
      categoryCount[workout.category] = (categoryCount[workout.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count
    }));
  }, [filteredWorkouts]);

  // Weekly comparison data
  const weeklyData = useMemo(() => {
    const weeks = [];
    let currentDate = endDate;
    
    for (let i = 0; i < 4; i++) {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      
      const weekWorkouts = workouts.filter(workout => {
        const workoutDate = parseISO(workout.date);
        return workoutDate >= weekStart && workoutDate <= weekEnd;
      });
      
      weeks.unshift({
        week: `Week ${i + 1}`,
        workouts: weekWorkouts.length,
        duration: weekWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
        calories: weekWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0)
      });
      
      currentDate = subDays(weekStart, 1);
    }
    
    return weeks;
  }, [workouts, endDate]);

  // Statistics
  const stats = useMemo(() => {
    const totalWorkouts = filteredWorkouts.length;
    const totalDuration = filteredWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalCalories = filteredWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    const completedWorkouts = filteredWorkouts.filter(w => w.completed).length;
    const completionRate = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;
    
    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      avgDuration,
      completionRate
    };
  }, [filteredWorkouts]);

  const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14', '#6c757d'];

  const pageStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const statCardStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const chartContainerStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
          Progress Analytics
        </h1>
        <p style={{ color: '#6c757d', margin: 0 }}>
          Visualize your fitness journey and track improvements
        </p>
      </div>

      {/* Controls */}
      <div style={controlsStyle}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#495057' }}>
            Time Range
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#495057' }}>
            Metric
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h3 style={{ fontSize: '2rem', color: '#007bff', margin: '0 0 0.5rem 0' }}>
            {stats.totalWorkouts}
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>Total Workouts</p>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={{ fontSize: '2rem', color: '#28a745', margin: '0 0 0.5rem 0' }}>
            {Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>Total Duration</p>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={{ fontSize: '2rem', color: '#dc3545', margin: '0 0 0.5rem 0' }}>
            {stats.totalCalories.toLocaleString()}
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>Calories Burned</p>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={{ fontSize: '2rem', color: '#ffc107', margin: '0 0 0.5rem 0' }}>
            {stats.avgDuration}min
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>Avg Duration</p>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={{ fontSize: '2rem', color: '#6f42c1', margin: '0 0 0.5rem 0' }}>
            {stats.completionRate}%
          </h3>
          <p style={{ color: '#6c757d', margin: 0 }}>Completion Rate</p>
        </div>
      </div>

      {/* Main Progress Chart */}
      <div style={chartContainerStyle}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
          {metricOptions.find(m => m.value === selectedMetric)?.label} Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#007bff" 
              strokeWidth={3}
              dot={{ fill: '#007bff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Comparison */}
      <div style={chartContainerStyle}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
          Weekly Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="workouts" fill="#007bff" name="Workouts" />
            <Bar dataKey="duration" fill="#28a745" name="Duration (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      {categoryData.length > 0 && (
        <div style={chartContainerStyle}>
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
            Workout Categories Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Goals Progress */}
      {goals.length > 0 && (
        <div style={chartContainerStyle}>
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
            Goals Progress
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {goals.map(goal => {
              const progressPercentage = Math.min((goal.progress / goal.target) * 100, 100);
              return (
                <div key={goal.id} style={{ 
                  padding: '1rem',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: '#2c3e50' }}>{goal.title}</h4>
                    <span style={{ color: '#6c757d' }}>
                      {goal.progress} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e9ecef',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: progressPercentage >= 100 ? '#28a745' : '#007bff',
                      width: `${progressPercentage}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
                    {progressPercentage.toFixed(1)}% complete
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;