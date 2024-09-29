import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import api from "../../../components/AxiosInterceptor";
import { decodeJwt } from "../../middelwares";
import { toast, ToastContainer } from "react-toastify"

const Recommend = () => {

  const { id } = useParams()

  const [currentCategory, setCurrentCategory] = useState();
  const [activeSection, setActiveSection] = useState('Warm up');
  const [currentUser, setCurrentUser] = useState();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("dietToken");
  const decoded = token && decodeJwt(token);
  const location = useLocation();
  const userData = location?.state?.userData;
  useEffect(() => {
    if (id) {
      fetchMealData();
      setCurrentUser(userData)
    }
  }, [id])
  useEffect(() => {
    if (currentCategory) {
      setDescription(currentCategory?.description)
    }
  }, [currentCategory])
  const fetchMealData = async () => {
    const response = await api.get(`/diet/getMeal`)
    setCurrentCategory(response.data?.filter(res => res?._id === id)?.[0] ?? {});
  }

  const save = async () => {
    const userData = currentUser;
    if (userData && userData?.email && currentCategory) {
      await api.post("/users/addUserDiet", { email: userData?.email, diet: currentCategory })
      toast.success("Recommended successfully")
      // navigate("")    
    }
  }

  const renderTable = () => {
    const currentData = currentCategory;
    let headers = [];
    let fields = [];
    let heading = [];

    switch (activeSection) {
      case 'Warm up':
        heading = ['Total body stretching']
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'Cardio':
        heading = ['Total body stretching']
        headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
        fields = ['srNo', 'name', 'time', 'howToDo'];
        break;
      case 'Workout':
        heading = ['MONDAY - CHEST & TRICEPS (HEAVY WORKOUT)', 'TUESDAY - LEGS  (HEAVY WORKOUT)', 'WEDNESDAY - CARDIO', 'WEDNESDAY - BACK & BICEPS  (HEAVY WORKOUT)', 'THURSDAY - SHOULDER & TRAPS  (HEAVY WORKOUT)', 'FRIDAY - ARMS  (HEAVY WORKOUT)']
        headers = ['Workout Type', 'Name', 'Sets', 'Reps', 'Rest', 'How to do'];
        fields = ['workoutType', 'name', 'sets', 'reps', 'rest', 'howToDo'];
        break;
      case 'ABS':
        heading = ['MONDAY - CORE', 'TUESDAY - OBLIQUES', 'WEDNESDAY - CORE DAY', 'THURSDAY - OBLIQUES', 'FRIDAY - CORE']
        headers = ['Workout Type', 'Name', 'Sets', 'Reps', 'Rest', 'How to do'];
        fields = ['workoutType', 'name', 'sets', 'reps', 'rest', 'howToDo'];
        break;
      case 'Meal':
        heading = ['MEAL 1 - OATS SMOTHIE (BREAKFAST)', 'MEAL 2 - GREEK YOGURT/CURD', 'MEAL 2 - EGG OMLETE & BREAD TOAST', 'MEAL 3 - CHICKEN VEGGIES', 'MEAL 4 - QUINOA SMOTHIE', 'PRE WOKOUT', 'DURING WOKOUT', 'POST WOKOUT', 'MEAL 5 - CHICKEN BIRYANI (DINNER)', 'MEAL 6 - MILK']
        headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Fiber', 'Quantity'];
        fields = ['name', 'protein', 'fat', 'carbs', 'calories', 'calories', 'quantity'];
        break;
      case 'Grocery List':
        heading = ['List']
        headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Fibre', 'Quantity'];
        fields = ['ingredients', 'protein', 'fat', 'carbs', 'calories', 'fibre', 'quantity'];
        break;
      case 'Instruction':
        heading = ['INSTRUCTIONS']
        headers = ['Col1', 'Col2', 'Col3'];
        fields = ['col1', 'col2', 'col3'];
        break;
      case 'Stack':
        heading = ['SUPPLEMENT STACK']
        headers = ['Sr. No.', 'Supplements', 'QT/Serving', 'Serving'];
        fields = ['srNo', 'supplements', 'qtServing', 'serving'];
        break;
      default:
        break;
    }

    return (
      <>
        <section style={{ position: "relative" }} className="stretching-table-section">
          <h3>{activeSection} TABLE</h3>

          {heading.map((day, dayIndex) => {
            const dayData = currentCategory?.categories?.[activeSection]?.[day] ?? []; // Adjust to fetch day-specific data

            return ( // Add return here
              <div key={dayIndex} style={{ marginBottom: "20px" }}>
                <h4>{day}</h4>

                <table className="stretching-table">
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {dayData.length > 0 ? ( // Check if there is any data for the day
                      dayData.map((item, index) => (
                        <tr key={index}>
                          {fields.map((field, idx) => (
                            <td key={idx}>
                              <p>{item?.[field] ?? ""}</p>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={fields.length}>No data available for {day}</td> {/* Empty state if no data */}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}

          {/* <table className="stretching-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData && currentData?.categories?.[activeSection].[day]?.map((item, index) => (
                <tr key={index}>
                  {fields.map((field, idx) => (
                    <td key={idx}>
                      <p>{item?.[field] ?? ""}</p>
                    </td>
                  ))}
                </tr>

              ))}
            </tbody>
          </table> */}


        </section>
        <div className="table-notes mt-5">
          <p>Modify the table content as needed.</p>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="content">
        <header className="content-header">
          <div className="diet-container">
            <h1 className="content-title">DIET /</h1>
            <p>{description}</p>
          </div>
          <div className="content-buttons">
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
          {decoded?.userData?.isAdmin && <button className="save-button" onClick={save}>Recommend</button>}
        </header>
        {renderTable()}
      </div>
    </div>
  );
}

export default Recommend;
