import { useEffect, useState} from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import api from "../../../components/AxiosInterceptor";
import { decodeJwt } from "../../middelwares";

const Recommend = () => {

    const {id} = useParams()

    const [currentCategory,setCurrentCategory] = useState();
    const [activeSection,setActiveSection]=useState('Warm up');
    const [currentUser,setCurrentUser] = useState();
    const [description,setDescription]=useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("dietToken");
    const decoded = token && decodeJwt(token);
    const location = useLocation();
    const userData = location?.state?.userData;
    useEffect(()=>{
        if(id){
            fetchMealData();
            setCurrentUser(userData)
        }
    },[id])
    useEffect(()=>{
        if(currentCategory){
            setDescription(currentCategory?.description)            
        }
    },[currentCategory])
    const fetchMealData = async () => {
        const response = await api.get(`/diet/getMeal`)
        setCurrentCategory(response.data?.filter(res=>res?._id===id)?.[0] ?? {});
    }

    const save = async() => {
        const userData = currentUser;
        if(userData && userData?.email && currentCategory){
            await api.post("/users/addUserDiet",{email:userData?.email,diet:currentCategory})
            // navigate("")    
        }
    }

    const renderTable = () => {
        const currentData = currentCategory;
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
            headers = ['Sr. No.', 'Name', 'Time', 'How to do'];
            fields = ['srNo', 'name', 'time', 'howToDo'];
            break;
          case 'ABS':
            headers = ['Workout Type', 'Exercise', 'Sets', 'Reps', 'Rest', 'How to do'];
            fields = ['workoutType', 'exercise', 'sets', 'reps', 'rest', 'howToDo'];
            break;
          case 'Meal':
            headers = ['Ingredients', 'Protein', 'Fat', 'Carbs', 'Calories', 'Recipe'];
            fields = ['ingredients', 'protein', 'fat', 'carbs', 'calories', 'recipe'];
            break;
          case 'Grocery List':
            headers = ['Sr. No.', 'Ingredients', 'Quantity'];
            fields = ['srNo', 'ingredients', 'quantity'];
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
    
        return (
          <>
            <section style={{ position: "relative" }} className="stretching-table-section">
              <h3>{activeSection} TABLE</h3>
              <table className="stretching-table">
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData && currentData?.categories?.[activeSection]?.map((item, index) => (
                    <tr key={index}>
                      {fields.map((field, idx) => (
                        <td key={idx}>
                          <p>{item?.[field] ?? ""}</p>
                        </td>
                      ))}
                    </tr>

                  ))}
                </tbody>
              </table>
            </section>
            <div className="table-notes mt-5">
              <p>Modify the table content as needed.</p>
            </div>
          </>
        );
      };

    return (
        <div className="dashboard-container">
          <div className="content">
            <header className="content-header">
              <div className="diet-container">
                <h1 className="content-title">DIET /</h1>
                <p>{description}</p>
              </div>
              <div className="content-buttons">
                <button
                  onClick={() => setActiveSection('Warm up')}
                  className={activeSection === 'Warm up' ? 'active-section' : ''}
                >
                  Warm up
                </button>
                <button
                  onClick={() => setActiveSection('Cardio')}
                  className={activeSection === 'Cardio' ? 'active-section' : ''}
                >
                  Cardio
                </button>
                <button
                  onClick={() => setActiveSection('Workout')}
                  className={activeSection === 'Workout' ? 'active-section' : ''}
                >
                  Workout
                </button>
                <button
                  onClick={() => setActiveSection('ABS')}
                  className={activeSection === 'ABS' ? 'active-section' : ''}
                >
                  ABS
                </button>
                <button
                  onClick={() => setActiveSection('Meal')}
                  className={activeSection === 'Meal' ? 'active-section' : ''}
                >
                  Meal
                </button>
                <button
                  onClick={() => setActiveSection('Stack')}
                  className={activeSection === 'Stack' ? 'active-section' : ''}
                >
                  Stack
                </button>
                <button
                  onClick={() => setActiveSection('Grocery List')}
                  className={activeSection === 'Grocery List' ? 'active-section' : ''}
                >
                  Grocery List
                </button>
                <button
                  onClick={() => setActiveSection('Instruction')}
                  className={activeSection === 'Instruction' ? 'active-section' : ''}
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
