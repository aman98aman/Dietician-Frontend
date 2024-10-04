import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dashboard2.css';
import api from "../../../components/AxiosInterceptor.js";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { border } from '@chakra-ui/react';


const tabData = {
  'Warm up': [
    { "id": 1, "name": "MILD WALKING" },
    { "id": 2, "name": "ARM CIRCLE FORWARD" },
    { "id": 3, "name": "ARM CIRCLE BACKWARD" },
    { "id": 4, "name": "SQUATS" },
    { "id": 5, "name": "STAR TOE TOUCHES" },
    { "id": 6, "name": "JUMPING JACKS" },
    { "id": 7, "name": "BODY WEIGHT PUSH UPS" },
    { "id": 8, "name": "CHILD'S POSE" },
    { "id": 9, "name": "COBBLERS STRETCH" },
    { "id": 10, "name": "KNEELING HIP FLEXOR STRETCH (L/R)" },
    { "id": 11, "name": "WALL PECTORAL STRETCH (L/R)" },
    { "id": 12, "name": "LYING FIGURE 4 STRETCH (L/R)" },
    { "id": 13, "name": "SHOULDER CROSS (L/R)" },
    { "id": 14, "name": "OVERHEAD TRICEP STRETCH (L/R)" },
    { "id": 15, "name": "STANDING QUADRICEPS STRETCH (L/R)" },
    { "id": 16, "name": "BACK EXTENSION" }
  ],
  'Cardio': [
    { "id": 1, "name": "Cardio" },
    { "id": 2, "name": "Warm Up" },
    { "id": 3, "name": "Stretching" },
    { "id": 4, "name": "JUMPING JACKS" },
    { "id": 5, "name": "MOUNTAIN CLIMBERS" },
    { "id": 6, "name": "BURPEES" },
    { "id": 7, "name": "SKIER JUMPS" },
    { "id": 8, "name": "RUNNING OR CYCLING (ALTERNATE DAYS)" },
    { "id": 9, "name": "SKIPPING X 5 (EVERYDAY)" },
    { "id": 10, "name": "BODY WEIGHT SQUATS" },
    { "id": 11, "name": "4-COUNT BURPEES" },
    { "id": 12, "name": "SINGLE LEG CRAB BRIDGE" },
    { "id": 13, "name": "SIDE LUNGE TOUCHDOWN" },
    { "id": 14, "name": "KNEE PUSH-UPS" }
  ],
  'Workout': [
    { "id": 1, "name": "Walk" },
    { "id": 2, "name": "Running" },
    { "id": 3, "name": "Skipping" },
    { "id": 4, "name": "HIT Workout (2 min Walking - 1 min Running Sprint)" },
    { "id": 5, "name": "Incline Walking" },
    { "id": 6, "name": "Stationary Bike" },
    { "id": 7, "name": "Cycling" },

    { "id": 1, "name": "Push Ups + Triceps Press Down (Light Weight)" },
    { "id": 2, "name": "DB Incline Press" },
    { "id": 3, "name": "Machine Chest Press or DB Press" },
    { "id": 4, "name": "Machine Pec Fly" },
    { "id": 5, "name": "Cable Cross" },
    { "id": 6, "name": "Tricep Pushdown" },
    { "id": 7, "name": "DB Tricep Extension" },
    { "id": 8, "name": "Feet-Elevated Bench Dips" },
    { "id": 9, "name": "Barbell Bench Press + Skull Crusher" },
    { "id": 10, "name": "Weighted Pushups + Weighted Bench Dips" },
    { "id": 11, "name": "DB Fly + Single Arm Rope Kick Back" },
    { "id": 12, "name": "Decline Dips" },

    { "id": 1, "name": "Rows + DB Curl (Light Weight)" },
    { "id": 2, "name": "Wide Grip Lat Pulldown" },
    { "id": 3, "name": "Under Grip Close Pulldown" },
    { "id": 4, "name": "Single Arm Rows" },
    { "id": 5, "name": "Seated Rows" },
    { "id": 6, "name": "Barbell Curl" },
    { "id": 7, "name": "DB Hammer Curl" },
    { "id": 8, "name": "Reverse Bar Curl" },
    { "id": 9, "name": "Reverse Chin Ups + Cable Curl" },
    { "id": 10, "name": "DB Pull Over + High Angle Curl" },
    { "id": 11, "name": "Close Grip Lat Pulldown" },
    { "id": 12, "name": "Standing Lat Push Down" },
    { "id": 13, "name": "Hyperextension (Weighted) or Deadlift" },
    { "id": 14, "name": "Machine Preacher Curl" },
    { "id": 15, "name": "Cable Concentration Curl" },

    { "id": 1, "name": "Bodyweight Squat + Lunges" },
    { "id": 2, "name": "Barbell Squats (Dead Set)" },
    { "id": 3, "name": "Leg Extension" },
    { "id": 4, "name": "Hamstring Curl" },
    { "id": 5, "name": "Calf Raises" },
    { "id": 6, "name": "DB Front Squat + DB Press" },
    { "id": 7, "name": "DB Split Squat + DB Side Raise (Single Hand)" },
    { "id": 8, "name": "Barbell Hip Thrust" },
    { "id": 9, "name": "Leg Press" },
    { "id": 10, "name": "DB Step Up" },
    { "id": 11, "name": "DB Sumo Squat" },
    { "id": 12, "name": "DB Stiff-Leg Deadlift" },
    { "id": 13, "name": "Seated Calf Raises" },

    { "id": 1, "name": "DB Shoulder Press + Triceps Press Down" },
    { "id": 2, "name": "Barbell Shoulder Press" },
    { "id": 3, "name": "DB Front Raise" },
    { "id": 4, "name": "DB Lateral Raises" },
    { "id": 5, "name": "DB Rear Delt Fly on Machine" },
    { "id": 6, "name": "Shrugs" },
    { "id": 7, "name": "Barbell Upright Rows" },
    { "id": 8, "name": "Cable Rear Delt Fly" },
    { "id": 9, "name": "Rope Upright Row" },

    { "id": 1, "name": "Laying Leg Pull-In" },
    { "id": 2, "name": "Mountain Climber (Each Side)" },
    { "id": 3, "name": "Leg Raises" },
    { "id": 4, "name": "Side Bridges" },
    { "id": 5, "name": "Crunches" },
    { "id": 6, "name": "Rope Crunches (On Knee)" },
    { "id": 7, "name": "Heel Toe Touches" },
    { "id": 8, "name": "Sit Ups" },
    { "id": 9, "name": "V-Crunch" },
    { "id": 10, "name": "Planks" },
    { "id": 11, "name": "Rope Oblique Crunches (On Knee) Each Side" },
    { "id": 12, "name": "High Crunches" },
    { "id": 13, "name": "Flutter Kicks" },
    { "id": 14, "name": "Plank Ups" },
    { "id": 15, "name": "Russian Twist" },
    { "id": 16, "name": "Plank Hip Twists" },
    { "id": 17, "name": "Side Oblique Crunches" }
  ],
  'ABS': [
    { "id": 1, "name": "Laying Leg Pull-In" },
    { "id": 2, "name": "Mountain Climber (Each Side)" },
    { "id": 3, "name": "Leg Raises" },
    { "id": 4, "name": "Side Bridges" },
    { "id": 5, "name": "Crunches" },
    { "id": 6, "name": "Rope Crunches (On Knee)" },
    { "id": 7, "name": "Heel Toe Touches" },
    { "id": 8, "name": "Sit Ups" },
    { "id": 9, "name": "V-Crunch" },
    { "id": 10, "name": "Planks" },
    { "id": 11, "name": "Rope Oblique Crunches (On Knee) Each Side" },
    { "id": 12, "name": "High Crunches" },
    { "id": 13, "name": "Flutter Kicks" },
    { "id": 14, "name": "Plank Ups" },
    { "id": 15, "name": "Russian Twist" },
    { "id": 16, "name": "Plank Hip Twists" },
    { "id": 17, "name": "Side Oblique Crunches" }
  ],
  'Meal': [
    { "id": 1, "name": "Eggs" },
    { "id": 2, "name": "Chicken" },
    { "id": 3, "name": "Zero fat milk" },
    { "id": 4, "name": "Oats" },
    { "id": 5, "name": "Raw quinoa" },
    { "id": 6, "name": "Cinnamon powder" },
    { "id": 7, "name": "Almonds" },
    { "id": 8, "name": "Walnuts" },
    { "id": 9, "name": "Chia seeds" },
    { "id": 10, "name": "Plain Greek yogurt" },
    { "id": 11, "name": "Brown bread" },
    { "id": 12, "name": "Peanuts" },
    { "id": 13, "name": "Kidney beans" },
    { "id": 14, "name": "Black chana" },
    { "id": 15, "name": "Spinach" },
    { "id": 16, "name": "Carrot" },
    { "id": 17, "name": "French beans" },
    { "id": 18, "name": "Broccoli" },
    { "id": 19, "name": "Bell peppers" },
    { "id": 20, "name": "Lettuce" },
    { "id": 21, "name": "Olives" },
    { "id": 22, "name": "Beets" },
    { "id": 23, "name": "Tomato" },
    { "id": 24, "name": "Onion" },
    { "id": 25, "name": "Mushrooms" },
    { "id": 26, "name": "Cucumber" },
    { "id": 27, "name": "Lemon" },
    { "id": 28, "name": "Mint" },
    { "id": 29, "name": "Ginger" },
    { "id": 30, "name": "Mixed berries" },
    { "id": 31, "name": "Banana" },
    { "id": 32, "name": "Apple" },
    { "id": 33, "name": "Orange" },
    { "id": 34, "name": "Kiwi" },
    { "id": 35, "name": "Pineapple" },
    { "id": 36, "name": "Honey" },
    { "id": 37, "name": "Flax seeds" },
    { "id": 38, "name": "Peanut butter" },
    { "id": 39, "name": "Brown rice" },
    { "id": 40, "name": "White chana" },
    { "id": 41, "name": "Olive oil" },
    { "id": 42, "name": "Salt & black pepper" },
    { "id": 43, "name": "Raisins" },
    { "id": 44, "name": "Cabbage" },
    { "id": 45, "name": "Sweet potato" },
    { "id": 46, "name": "Whole grain pasta" },
    { "id": 47, "name": "Coffee" },
    { "id": 48, "name": "Green tea" },
    { "id": 49, "name": "Papaya" },
    { "id": 50, "name": "Watermelon" },
    { "id": 51, "name": "Paneer" },
    { "id": 52, "name": "Whey protein" },
    { "id": 53, "name": "Grapes" },
    { "id": 54, "name": "Zucchini" }
  ]

};





export const initialData = {
  // 'Warm up': [{ srNo: '1', name: "CHILD'S POSE", time: '1.00', howToDo: 'Breathe deeply' }],
  // 'Workout': [{ workoutType: 'Cardio', exercise: 'JUMPING JACKS', sets: '3', reps: '15', rest: '30 sec', howToDo: 'Jump with feet wide, arms overhead.' }],
  // 'ABS': [{ workoutType: 'Core', exercise: 'PLANK', sets: '3', reps: '60 sec', rest: '30 sec', howToDo: 'Hold body in a straight line.' }],
  // 'Meal': [{ ingredients: 'Chicken Breast', protein: '31g', fat: '3.6g', carbs: '0g', calories: '165', recipe: 'Grill the chicken.' }],
  // 'Grocery List': [{ srNo: '1', ingredients: 'Milk', quantity: '2 Liters' }],
  // 'Instruction': [{ col1: '', col2: '', col3: '' }],
  // 'Stack': [{ srNo: '1', supplements: 'Whey Protein', qtServing: '1 Scoop', serving: '25g Protein' }],
};

function Dashboard2({ onEdit, currentCategory }) {
  const [description, setDescription] = useState("");
  const [activeSection, setActiveSection] = useState('Warm up');
  const [sectionData, setSectionData] = useState(initialData);
  const [items, setItems] = useState(tabData[activeSection ? activeSection : null]);

  const nutritionData = {
    "Eggs": { calories: 68, fiber: 0, protein: 6.3, carbs: 0.6, fat: 4.8 },
    "Chicken": { calories: 2.39, fiber: 0, protein: 0.27, carbs: 0, fat: 0.13 },
    "Zero fat milk": { calories: 172, fiber: 0, protein: 17.5, carbs: 24.5, fat: 0.2 },
    "Oats": { calories: 3.89, fiber: 0.1, protein: 0.07, carbs: 0.67, fat: 0.07 },
    "Raw quinoa": { calories: 3.68, fiber: 0.1, protein: 0.12, carbs: 0.64, fat: 0.06 },
    "Cinnamon powder": { calories: 2.47, fiber: 1.2, protein: 0.04, carbs: 0.81, fat: 0.12 },
    "Almonds": { calories: 5.76, fiber: 0.12, protein: 0.21, carbs: 0.22, fat: 0.49 },
    "Walnuts": { calories: 6.54, fiber: 0.07, protein: 0.15, carbs: 0.14, fat: 0.65 },
    "Chia seeds": { calories: 4.86, fiber: 0.34, protein: 0.17, carbs: 0.42, fat: 0.31 },
    "Plain Greek yogurt": { calories: 0.59, fiber: 0, protein: 0.1, carbs: 0.04, fat: 0.04 },
    "Brown bread": { calories: 2.47, fiber: 0.1, protein: 0.09, carbs: 0.47, fat: 0.02 },
    "Peanuts": { calories: 5.67, fiber: 0.09, protein: 0.25, carbs: 0.16, fat: 0.49 },
    "Kidney beans": { calories: 3.33, fiber: 0.08, protein: 0.24, carbs: 0.6, fat: 0.12 },
    "Black chana": { calories: 3.64, fiber: 0.1, protein: 0.19, carbs: 0.61, fat: 0.12 },
    "Spinach": { calories: 0.23, fiber: 0.1, protein: 0.03, carbs: 0.04, fat: 0.05 },
    "Carrot": { calories: 0.41, fiber: 0.03, protein: 0.01, carbs: 0.1, fat: 0.02 },
    "French beans": { calories: 0.31, fiber: 0.03, protein: 0.02, carbs: 0.07, fat: 0.02 },
    "Broccoli": { calories: 0.34, fiber: 0.03, protein: 0.03, carbs: 0.07, fat: 0.03 },
    "Bell peppers": { calories: 0.2, fiber: 0.01, protein: 0.01, carbs: 0.05, fat: 0.02 },
    "Lettuce": { calories: 0.15, fiber: 0.01, protein: 0.01, carbs: 0.03, fat: 0.01 },
    "Olives": { calories: 1.15, fiber: 0.03, protein: 0.03, carbs: 0.06, fat: 0.11 },
    "Beets": { calories: 0.43, fiber: 0.02, protein: 0.01, carbs: 0.1, fat: 0.02 },
    "Tomato": { calories: 0.18, fiber: 0.01, protein: 0.01, carbs: 0.04, fat: 0.02 },
    "Onion": { calories: 0.4, fiber: 0.01, protein: 0.01, carbs: 0.09, fat: 0.02 },
    "Mushrooms": { calories: 0.22, fiber: 0.01, protein: 0.03, carbs: 0.03, fat: 0.03 },
    "Cucumber": { calories: 0.16, fiber: 0.01, protein: 0.01, carbs: 0.04, fat: 0.01 },
    "Lemon": { calories: 0.29, fiber: 0.03, protein: 0.01, carbs: 0.09, fat: 0.01 },
    "Mint": { calories: 0.44, fiber: 0.08, protein: 0.03, carbs: 0.09, fat: 0.02 },
    "Ginger": { calories: 0.8, fiber: 0.2, protein: 0.02, carbs: 0.18, fat: 0.06 },
    "Mixed berries": { calories: 0.57, fiber: 0.03, protein: 0.01, carbs: 0.14, fat: 0.03 },
    "Banana": { calories: 105, fiber: 3.1, protein: 1.3, carbs: 27, fat: 0.3 },
    "Apple": { calories: 95, fiber: 4.4, protein: 0.5, carbs: 25, fat: 0.3 },
    "Orange": { calories: 62, fiber: 3.1, protein: 1.2, carbs: 15.4, fat: 0.2 },
    "Kiwi": { calories: 42, fiber: 2.1, protein: 0.8, carbs: 10.1, fat: 0.4 },
    "Pineapple": { calories: 452, fiber: 13, protein: 4.9, carbs: 119, fat: 1.1 },
    "Honey": { calories: 3.04, fiber: 0, protein: 0.01, carbs: 0.82, fat: 0 },
    "Flax seeds": { calories: 5.34, fiber: 0.27, protein: 0.19, carbs: 0.29, fat: 0.42 },
    "Peanut butter": { calories: 5.88, fiber: 0.06, protein: 0.25, carbs: 0.2, fat: 0.5 },
    "Brown rice": { calories: 3.65, fiber: 0.03, protein: 0.07, carbs: 0.77, fat: 0.03 },
    "White chana": { calories: 3.64, fiber: 0.1, protein: 0.19, carbs: 0.61, fat: 0.06 },
    "Olive oil": { calories: 4000, fiber: 0, protein: 0, carbs: 0, fat: 100 },
    "Salt & black pepper": { calories: 0, fiber: 0, protein: 0, carbs: 0, fat: 0 },
    "Raisins": { calories: 2.99, fiber: 0.03, protein: 0.03, carbs: 0.79, fat: 0.03 },
    "Cabbage": { calories: 0.25, fiber: 0.01, protein: 0.01, carbs: 0.06, fat: 0.01 },
    "Sweet potato": { calories: 0.86, fiber: 0.02, protein: 0.02, carbs: 0.2, fat: 0.02 },
    "Whole grain pasta": { calories: 3.57, fiber: 0.1, protein: 0.13, carbs: 0.74, fat: 0.06 },
    "Coffee": { calories: 2, fiber: 0, protein: 0.2, carbs: 0, fat: 0.01 },
    "Green tea": { calories: 0, fiber: 0, protein: 0, carbs: 0, fat: 0 },
    "Papaya": { calories: 59, fiber: 2.7, protein: 0.9, carbs: 15, fat: 0.4 },
    "Watermelon": { calories: 86, fiber: 0.6, protein: 1.7, carbs: 22, fat: 0.2 },
    "Paneer": { calories: 2.57, fiber: 0, protein: 0.18, carbs: 0.04, fat: 0.2 },
    "Whey protein": { calories: 4, fiber: 0, protein: 0.8, carbs: 0.3, fat: 0.1 },
    "Grapes": { calories: 0.69, fiber: 0.01, protein: 0.01, carbs: 0.18, fat: 0.01 },
    "Zucchini": { calories: 0.17, fiber: 0.01, protein: 0.01, carbs: 0.03, fat: 0.01 }
  };


  const handleQuantityChange = (index, value) => {
    const item = sectionData[activeSection][index];

    const quantity = parseFloat(value) || 1;
    console.log("Quantiity", item)

    if (item.name) {
      const nutrientInfo = nutritionData[item.name];
      console.log('value', (nutrientInfo.calories * quantity).toFixed(2))

      if (nutrientInfo) {
        handleTableDataChange(index, 'calories', (nutrientInfo.calories * quantity).toFixed(2));
        handleTableDataChange(index, 'fiber', (nutrientInfo.fiber * quantity).toFixed(2));
        handleTableDataChange(index, 'protein', (nutrientInfo.protein * quantity).toFixed(2));
        handleTableDataChange(index, 'carbs', (nutrientInfo.carbs * quantity).toFixed(2));
        handleTableDataChange(index, 'fat', (nutrientInfo.fat * quantity).toFixed(2));
      }
    }

    handleTableDataChange(index, 'quantity', value);
  };



  const handleSubtitleChange = (e) => {
    setDescription(e.target.value ?? "");
  };

  useEffect(() => {
    setDescription(currentCategory?.description ?? "");
    setSectionData(currentCategory?.categories ?? []);
  }, [currentCategory]);

  const handleTableDataChange = (index, field, value) => {
    const updatedData = [...sectionData[activeSection]];
    updatedData[index][field] = value;

    setSectionData({
      ...sectionData,
      [activeSection]: updatedData
    });
    console.log("updatedData", sectionData)
  };

  useEffect(() => {
    setItems(tabData[activeSection ? activeSection : null])
  }, [activeSection]);

  useEffect(() => {
    onEdit({ categories: sectionData });
  }, [sectionData]);

  useEffect(() => {
    onEdit({ description: description });
  }, [description]);

  const save = async () => {
    if (currentCategory && currentCategory?._id) {
      await api.patch(`/diet/editMeal/${currentCategory?._id}`, { ...currentCategory });
    }
  };

  const addNewRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])];
    newChange?.push({});
    setSectionData({ ...sectionData, [activeSection]: newChange });
  };

  const removeRow = () => {
    let newChange = [...(sectionData?.[activeSection] ?? [])];
    newChange?.pop();
    setSectionData({ ...sectionData, [activeSection]: newChange });
  };

  const renderTable = () => {
    const currentData = sectionData[activeSection] ?? [];
    console.log('current', currentData)
    let headers = [];
    let fields = [];

    switch (activeSection) {
      case 'Warm up':
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'Cardio':
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'Workout':
        headers = ['Workout Type', 'Name', 'Sets', 'Reps', 'Rest', 'How to do'];
        fields = ['workoutType', 'name', 'sets', 'reps', 'rest', 'howToDo'];
        break;
      case 'ABS':
        headers = ['Workout Type', 'Name', 'Sets', 'Reps', 'Rest', 'How to do'];
        fields = ['workoutType', 'name', 'sets', 'reps', 'rest', 'howToDo'];
        break;
      case 'Meal':
        headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Fiber', 'Quantity'];
        fields = ['name', 'protein', 'fat', 'carbs', 'calories', 'calories', 'quantity'];
        break;
      case 'Grocery List':
        headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Fibre', 'Quantity'];
        fields = ['ingredients', 'protein', 'fat', 'carbs', 'calories', 'fibre', 'quantity'];
        break;
      case 'Instruction':
        headers = ['Col1', 'Col2', 'Col3'];
        fields = ['col1', 'col2', 'col3'];
        break;
      case 'Stack':
        headers = ['Sr. No.', 'Supplements', 'QT/Serving', 'Serving'];
        fields = ['srNo', 'supplements', 'qtServing', 'serving'];
        break;
      default:
        break;
    }


    const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results. 
      console.log("string", string, "Result", results)
    }

    const handleOnHover = (result) => {
      // the item hovered
      console.log("onHover", result)
    }

    const handleOnSelect = (value, index, field) => {
      // the item selected
      console.log("--------field", field)
      if (activeSection === "Meal") {
        console.log("active--------------------------", activeSection)
        console.log("currentdata--------------------------", currentData[field])
        const ingredientName = value.name;
        const nutrientInfo = nutritionData[ingredientName];

        if (nutrientInfo) {
          handleTableDataChange(index, 'calories', nutrientInfo.calories);
          handleTableDataChange(index, 'fiber', nutrientInfo.fiber);
          handleTableDataChange(index, 'protein', nutrientInfo.protein);
          handleTableDataChange(index, 'carbs', nutrientInfo.carbs);
          handleTableDataChange(index, 'fat', nutrientInfo.fat);
        }

        handleTableDataChange(index, field, ingredientName);
        return
      }

      console.log("onSelect", value, index, field)

      handleTableDataChange(index, field, value.name)
    }

    const handleOnFocus = () => {
      console.log('Focused')
    }




    const formatResult = (item) => {
      return (
        <>
          <div>
            <span style={{ display: 'block', textAlign: 'left', fontSize: "14px" }}>{item.name}</span>
          </div>
        </>
      )
    }


    return (
      <>
        <section style={{ position: "relative" }} className="stretching-table-section">
          <h3>{activeSection} TABLE</h3>
          <table className="stretching-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={header === "Sr. No." ? { maxWidth: "20px" } : {}}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {currentData.map((item, index) => {
                const calculatedZIndex = 200 - index;
                return (
                  <tr key={index}>
                    {fields.map((field, idx) => (
                      < td key={idx} style={field === "srNo" ? { maxWidth: "30px" } : field === "name" ? { } : { maxWidth: "0px" }} >
                        {
                          field === "name" ? (
                            <ReactSearchAutocomplete
                              items={items}
                              onSearch={handleOnSearch}
                              onHover={handleOnHover}
                              onSelect={(value) => handleOnSelect(value, index, field)}
                              onFocus={handleOnFocus}
                              formatResult={formatResult}
                              showIcon={false}
                              className='autocomplete'
                              inputSearchString={item?.[field] ?? ""}
                              showClear={false}
                              styling={{
                                borderRadius: "2px",
                                boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 4px 0px 2px",
                                width: "100%",
                                padding: "0px",
                                margin: "0px",
                                // outline: "none",
                                border: "0px",
                                display: "block",
                                flexShrink: "0",
                                zIndex: calculatedZIndex
                              }}
                            />
                          ) : field === 'quantity' ? (
                            <input
                              type="number"
                              value={item?.[field]}
                              onChange={(e) => handleQuantityChange(index, e.target.value)}
                              style={{ width: '100%' }}
                            />
                          ) : field === 'protein' || 'fat' || 'carbs' || 'calories' || 'calories' ? (
                            <input
                              type="text"
                              value={item?.[field] || ''}
                              onChange={(e) => handleTableDataChange(index, field, e.target.value)}
                              style={{ width: '100%' }}
                            />
                          ) : (
                            <input
                              type="text"
                              value={item?.[field] ?? field === "srNo" ? `${index + 1}` : null}
                              onChange={(e) => handleTableDataChange(index, field, e.target.value)}
                              style={field === "srNo" ? { maxWidth: "20px" } : { width: '100%' }}
                            />
                          )
                        }

                      </td>
                    )
                    )}
                  </tr>
                )
              })}
            </tbody>
            <img src="/minus.png" style={{ width: "24px", position: "absolute", bottom: -10, left: -10 }} onClick={removeRow} />
            <img src="/plus.png" style={{ width: "24px", position: "absolute", bottom: -10, right: -10 }} onClick={addNewRow} />
          </table>

        </section >
        <div className="table-notes mt-5">
          <p>Modify the table content as needed.</p>
        </div>
      </>
    );
  };
  console.log(activeSection)

  return (
    <div className="dashboard-container">
      <div className="content">
        <header className="content-header">
          <div className="diet-container">
            <div className='content-title-container'>
              <h1 className="content-title">DIET /</h1>
              <input
                type="text"
                className="diet-input"
                value={description}
                onChange={handleSubtitleChange}
              />
            </div>

          </div>

          <div className="content-buttons flex flex-wrap ">
            <button
              onClick={() => setActiveSection('Warm up')}
              className={activeSection === 'Warm up' ? 'active-section' : 'tab'}
            >
              Warm up
            </button>
            <button
              onClick={() => setActiveSection('Cardio')}
              className={activeSection === 'Cardio' ? 'active-section' : 'tab'}
            >
              Cardio
            </button>
            <button
              onClick={() => setActiveSection('Workout')}
              className={activeSection === 'Workout' ? 'active-section' : 'tab'}
            >
              Workout
            </button>
            <button
              onClick={() => setActiveSection('ABS')}
              className={activeSection === 'ABS' ? 'active-section' : 'tab'}
            >
              ABS
            </button>
            <button
              onClick={() => setActiveSection('Meal')}
              className={activeSection === 'Meal' ? 'active-section' : 'tab'}
            >
              Meal
            </button>
            <button
              onClick={() => setActiveSection('Stack')}
              className={activeSection === 'Stack' ? 'active-section' : 'tab'}
            >
              Stack
            </button>
            <button
              onClick={() => setActiveSection('Grocery List')}
              className={activeSection === 'Grocery List' ? 'active-section' : 'tab'}
            >
              Grocery List
            </button>
            <button
              onClick={() => setActiveSection('Instruction')}
              className={activeSection === 'Instruction' ? 'active-section' : 'tab'}
            >
              Instruction
            </button>
          </div>
          <button className="save-button" onClick={save}>SAVE</button>
        </header>
        {renderTable()}
      </div>
    </div>
  );
}

Dashboard2.propTypes = {
  onEdit: PropTypes.func.isRequired,
  currentCategory: PropTypes.object
};

export default Dashboard2;
