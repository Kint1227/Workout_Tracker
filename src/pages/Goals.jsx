import React, { useState } from "react";
import { storageService } from "../services/api";
import { format, parseISO, differenceInDays } from "date-fns";

const Goals = () => {
  const [goals, setGoals] = useState(storageService.getGoals());
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    target: "",
    unit: "",
    targetDate: "",
    progress: 0,
  });

  const goalTypes = [
    { value: "weight_loss", label: "Weight Loss", unit: "lbs" },
    { value: "weight_gain", label: "Weight Gain", unit: "lbs" },
    {
      value: "workout_frequency",
      label: "Workout Frequency",
      unit: "workouts/week",
    },
    { value: "distance", label: "Distance Goal", unit: "miles" },
    { value: "strength", label: "Strength Goal", unit: "lbs" },
    { value: "endurance", label: "Endurance Goal", unit: "minutes" },
    { value: "custom", label: "Custom Goal", unit: "units" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      ...formData,
      target: parseFloat(formData.target),
      progress: parseFloat(formData.progress) || 0,
    };

    if (editingGoal) {
      storageService.updateGoal(editingGoal.id, goalData);
      setGoals(storageService.getGoals());
    } else {
      storageService.addGoal(goalData);
      setGoals(storageService.getGoals());
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "",
      target: "",
      unit: "",
      targetDate: "",
      progress: 0,
    });
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEdit = (goal) => {
    setFormData({
      title: goal.title,
      description: goal.description || "",
      type: goal.type,
      target: goal.target.toString(),
      unit: goal.unit,
      targetDate: goal.targetDate,
      progress: goal.progress.toString(),
    });
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleTypeChange = (type) => {
    const selectedType = goalTypes.find((t) => t.value === type);
    setFormData({
      ...formData,
      type,
      unit: selectedType ? selectedType.unit : "",
    });
  };

  const deleteGoal = (id) => {
    storageService.deleteGoal(id);
    setGoals(storageService.getGoals());
  };

  const getProgressPercentage = (progress, target) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate) => {
    return differenceInDays(parseISO(targetDate), new Date());
  };

  const pageStyle = {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const formStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  };

  const goalsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "1.5rem",
  };

  const goalCardStyle = {
    background: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  const progressBarStyle = {
    width: "100%",
    height: "12px",
    background: "#e9ecef",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "1rem",
  };

  const progressFillStyle = (percentage) => ({
    height: "100%",
    background:
      percentage >= 100 ? "#28a745" : percentage >= 75 ? "#ffc107" : "#007bff",
    width: `${percentage}%`,
    transition: "width 0.3s ease",
  });

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#2c3e50" }}>
            Goals
          </h1>
          <p style={{ color: "#6c757d", margin: 0 }}>
            Set and track your fitness objectives
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Goal"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={formStyle}>
          <h3 style={{ marginBottom: "1.5rem", color: "#2c3e50" }}>
            {editingGoal ? "Edit Goal" : "Add New Goal"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Goal Type</label>
                <select
                  className="form-input"
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  {goalTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Value</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={formData.target}
                  onChange={(e) =>
                    setFormData({ ...formData, target: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Unit</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.targetDate}
                  onChange={(e) =>
                    setFormData({ ...formData, targetDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Progress</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your goal and motivation..."
              />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit" className="btn btn-primary">
                {editingGoal ? "Update Goal" : "Add Goal"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6c757d" }}>
          <h3>No goals set yet</h3>
          <p>Create your first fitness goal to start tracking your progress!</p>
        </div>
      ) : (
        <div style={goalsGridStyle}>
          {goals
            .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
            .map((goal) => {
              const progressPercentage = getProgressPercentage(
                goal.progress,
                goal.target
              );
              const daysRemaining = getDaysRemaining(goal.targetDate);
              const isCompleted = progressPercentage >= 100;
              const isOverdue = daysRemaining < 0 && !isCompleted;

              return (
                <div key={goal.id} style={goalCardStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                        {goal.title}
                      </h3>
                      <span
                        style={{
                          background: isCompleted
                            ? "#28a745"
                            : isOverdue
                            ? "#dc3545"
                            : "#007bff",
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "15px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {goalTypes.find((t) => t.value === goal.type)?.label ||
                          goal.type}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleEdit(goal)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1.2rem",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1.2rem",
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {goal.description && (
                    <p
                      style={{
                        color: "#6c757d",
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                        fontStyle: "italic",
                      }}
                    >
                      {goal.description}
                    </p>
                  )}

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#495057", fontWeight: "600" }}>
                        Progress: {goal.progress} / {goal.target} {goal.unit}
                      </span>
                      <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div style={progressBarStyle}>
                      <div style={progressFillStyle(progressPercentage)}></div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0.25rem 0",
                          color: "#495057",
                          fontSize: "0.9rem",
                        }}
                      >
                        📅 Target:{" "}
                        {format(parseISO(goal.targetDate), "MMM dd, yyyy")}
                      </p>
                      <p
                        style={{
                          margin: "0.25rem 0",
                          color: isOverdue
                            ? "#dc3545"
                            : daysRemaining <= 7
                            ? "#ffc107"
                            : "#495057",
                          fontSize: "0.9rem",
                          fontWeight:
                            isOverdue || daysRemaining <= 7 ? "600" : "normal",
                        }}
                      >
                        {isCompleted
                          ? "🎉 Goal Achieved!"
                          : isOverdue
                          ? `⚠️ ${Math.abs(daysRemaining)} days overdue`
                          : daysRemaining === 0
                          ? "🔥 Due today!"
                          : `⏰ ${daysRemaining} days remaining`}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => {
                        const newProgress = prompt(
                          `Update progress for "${goal.title}" (current: ${goal.progress} ${goal.unit}):`
                        );
                        if (newProgress !== null && !isNaN(newProgress)) {
                          storageService.updateGoal(goal.id, {
                            ...goal,
                            progress: parseFloat(newProgress),
                          });
                          setGoals(storageService.getGoals());
                        }
                      }}
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                    >
                      Update Progress
                    </button>
                    {isCompleted && (
                      <span
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#28a745",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        ✅ Complete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Goals;
