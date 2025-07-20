import React, { useState, useEffect } from 'react';
import { storageService } from '../services/api';
import { format, addDays } from 'date-fns';

const NotificationManager = () => {
  const [reminders, setReminders] = useState(storageService.getReminders());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    workoutType: '',
    time: '09:00',
    days: [],
    enabled: true
  });

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.days.forEach(day => {
      const reminder = {
        title: formData.title,
        workoutType: formData.workoutType,
        time: formData.time,
        day: day,
        enabled: formData.enabled,
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
      };
      storageService.addReminder(reminder);
    });

    setReminders(storageService.getReminders());

    setFormData({
      title: '',
      workoutType: '',
      time: '09:00',
      days: [],
      enabled: true
    });
    setShowForm(false);
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const containerStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };

  const formStyle = {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  };

  const dayButtonStyle = (isSelected) => ({
    padding: '0.5rem 1rem',
    border: isSelected ? '2px solid #007bff' : '2px solid #e9ecef',
    borderRadius: '20px',
    background: isSelected ? '#007bff' : 'white',
    color: isSelected ? 'white' : '#495057',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    margin: '0.25rem'
  });

  const reminderItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    marginBottom: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ color: '#2c3e50', margin: 0 }}>Workout Reminders</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Reminder'}
        </button>
      </div>

      {/* Notification Permissions */}
      {Notification.permission === 'denied' && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
          ⚠️ Notifications are blocked. Please enable them in your browser settings.
        </div>
      )}
      {Notification.permission === 'default' && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
          🔔 Click "Allow" when prompted to enable workout reminder notifications.
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={formStyle}>
          <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Create New Reminder</h4>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Reminder Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Morning Workout"
                  required
                />
              </div>
              <div>
                <label className="form-label">Workout Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.workoutType}
                  onChange={(e) => setFormData({ ...formData, workoutType: e.target.value })}
                  placeholder="e.g., Cardio, Strength"
                  required
                />
              </div>
              <div>
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <label className="form-label">Days of Week</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {daysOfWeek.map(day => (
                <button
                  key={day.value}
                  type="button"
                  style={dayButtonStyle(formData.days.includes(day.value))}
                  onClick={() => handleDayToggle(day.value)}
                >
                  {day.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={formData.days.length === 0}>
                Create Reminder
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Reminders */}
      <div>
        <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Active Reminders</h4>
        {reminders.length === 0 ? (
          <p style={{ color: '#6c757d', textAlign: 'center', padding: '1rem' }}>
            No reminders set. Create one to stay on track!
          </p>
        ) : (
          reminders.map(reminder => (
            <div key={reminder.id} style={reminderItemStyle}>
              <div>
                <h5 style={{ margin: '0 0 0.25rem 0', color: '#2c3e50' }}>{reminder.title}</h5>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                  {reminder.workoutType} • {reminder.time} • {reminder.day}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{
                  background: reminder.enabled ? '#28a745' : '#6c757d',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem'
                }}>
                  {reminder.enabled ? 'Active' : 'Disabled'}
                </span>
                <button
                  onClick={() => {
                    storageService.deleteReminder(reminder.id);
                    setReminders(storageService.getReminders());
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#dc3545'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
