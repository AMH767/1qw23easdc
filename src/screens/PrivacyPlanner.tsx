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
      id: Date.now(), // Используем timestamp как временный ID
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
      <h3>{meal.name}</h3>
      <div className="meal-info">
        <span>🍴 {meal.calories} ккал</span>
        <span>💪 {meal.protein}г белка</span>
      </div>
    </div>
  );

  return (
    <div className="meal-planner">
      <h1>План питания для пловцов</h1>
      
      <div className="tabs">
        {Object.keys(mealsData).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab as MealType)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="controls">
        <button 
          className="add-meal-btn"
          onClick={() => setShowAddMealForm(true)}
        >
          + Добавить блюдо
        </button>
      </div>

      {showAddMealForm && (
        <div className="add-meal-form">
          <h3>Добавить новое блюдо</h3>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              value={newMeal.name}
              onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
              placeholder="Название блюда"
            />
          </div>
          <div className="form-group">
            <label>Калории:</label>
            <input
              type="number"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({...newMeal, calories: +e.target.value})}
              placeholder="Калории"
            />
          </div>
          <div className="form-group">
            <label>Белки (г):</label>
            <input
              type="number"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({...newMeal, protein: +e.target.value})}
              placeholder="Белки"
            />
          </div>
          <div className="form-buttons">
            <button onClick={handleAddMeal}>Добавить</button>
            <button onClick={() => setShowAddMealForm(false)}>Отмена</button>
          </div>
        </div>
      )}

      <div className="meal-list">
        {mealsData[activeTab].map(renderMealCard)}
      </div>

      <div className="selected-meals">
        <h2>Ваш выбор:</h2>
        {Object.entries(selectedMeals).map(([time, meal]) => (
          <div key={time} className="selected-meal">
            <strong>{time}:</strong> {meal?.name} ({meal?.calories} ккал)
          </div>
        ))}
        <div className="total-calories">
          Всего калорий: {totalCalories}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPlanner;