import React, { useState } from 'react';
import './MealPlanner.css';

type Meal = {
  id: number;
  name: string;
  calories: number;
  protein: number;
};

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

type MealsData = {
  [key in MealType]: Meal[];
};

type SelectedMeals = {
  [key in MealType]?: Meal;
};

const initialMealsData: MealsData = {
  breakfast: [
    { id: 1, name: 'Овсянка с бананом и орехами', calories: 350, protein: 15 },
    { id: 2, name: 'Омлет с овощами', calories: 400, protein: 25 },
    { id: 3, name: 'Гречневая каша с яйцом', calories: 380, protein: 20 },
  ],
  lunch: [
    { id: 4, name: 'Гриль-курица с киноа', calories: 450, protein: 35 },
    { id: 5, name: 'Лосось на пару с брокколи', calories: 500, protein: 40 },
    { id: 6, name: 'Индейка с булгуром', calories: 420, protein: 38 },
  ],
  dinner: [
    { id: 7, name: 'Творог с ягодами', calories: 300, protein: 25 },
    { id: 8, name: 'Рыбные котлеты с овощами', calories: 350, protein: 30 },
    { id: 9, name: 'Куриный салат', calories: 280, protein: 22 },
  ],
  snacks: [
    { id: 10, name: 'Протеиновый коктейль', calories: 200, protein: 25 },
    { id: 11, name: 'Йогурт с орехами', calories: 150, protein: 10 },
    { id: 12, name: 'Энергетические батончики', calories: 180, protein: 8 },
  ],
};

const PrivacyPlanner = () => {
  const [mealsData, setMealsData] = useState<MealsData>(initialMealsData);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({});
  const [activeTab, setActiveTab] = useState<MealType>('breakfast');
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [newMeal, setNewMeal] = useState<Omit<Meal, 'id'>>({ 
    name: '', 
    calories: 0, 
    protein: 0 
  });

  const handleMealSelect = (meal: Meal) => {
    const newSelection = { ...selectedMeals, [activeTab]: meal };
    setSelectedMeals(newSelection);
    updateTotalCalories(newSelection);
  };

  const updateTotalCalories = (meals: SelectedMeals) => {
    const total = Object.values(meals).reduce(
      (sum, meal) => sum + (meal?.calories || 0),
      0
    );
    setTotalCalories(total);
  };

  const handleAddMeal = () => {
    if (!newMeal.name.trim()) return;
    
    const mealToAdd = {
      ...newMeal,
      id: Date.now(),
    };

    setMealsData(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], mealToAdd]
    }));

    setNewMeal({ name: '', calories: 0, protein: 0 });
    setShowAddMealForm(false);
  };

  const renderMealCard = (meal: Meal) => (
    <div
      key={meal.id}
      className={`meal-card ${
        selectedMeals[activeTab]?.id === meal.id ? 'selected' : ''
      }`}
      onClick={() => handleMealSelect(meal)}
    >
      <div className="meal-card-header">
        <h3>{meal.name}</h3>
        <div className="meal-card-badge">
          {selectedMeals[activeTab]?.id === meal.id && '✓'}
        </div>
      </div>
      <div className="meal-info">
        <div className="info-item">
          <span className="icon">🔥</span>
          <span>{meal.calories} ккал</span>
        </div>
        <div className="info-item">
          <span className="icon">💪</span>
          <span>{meal.protein}г белка</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="meal-planner">
      <header className="header">
        <h1>🏊 План питания для пловцов</h1>
        <div className="total-calories-box">
          <span>Всего калорий:</span>
          <div className="total-value">{totalCalories}</div>
        </div>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          {Object.keys(mealsData).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as MealType)}
            >
              <span className="tab-icon">
                {tab === 'breakfast' && '☀️'}
                {tab === 'lunch' && '🌞'}
                {tab === 'dinner' && '🌙'}
                {tab === 'snacks' && '🍎'}
              </span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="content-container">
        <div className="meal-list">
          {mealsData[activeTab].map(renderMealCard)}
          <button 
            className="add-meal-card"
            onClick={() => setShowAddMealForm(true)}
          >
            + Добавить блюдо
          </button>
        </div>

        <div className="selected-meals">
          <h2 className="selected-title">Ваш выбор:</h2>
          <div className="selected-list">
            {Object.entries(selectedMeals).map(([time, meal]) => (
              <div key={time} className="selected-item">
                <span className="meal-time">{time}:</span>
                <span className="meal-name">{meal?.name}</span>
                <span className="meal-calories">{meal?.calories} ккал</span>
              </div>
            ))}
            {Object.keys(selectedMeals).length === 0 && (
              <div className="empty-state">
                🍽️ Выберите блюда из списка
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddMealForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Добавить новое блюдо</h3>
            <div className="form-group">
              <input
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                placeholder="Название блюда"
                className="input-field"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: +e.target.value})}
                  placeholder="Калории"
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: +e.target.value})}
                  placeholder="Белки (г)"
                  className="input-field"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddMealForm(false)}
              >
                Отмена
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddMeal}
                disabled={!newMeal.name.trim()}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPlanner;