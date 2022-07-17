import {useState} from 'react'; 
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert")
  }

  return (
    <>
      <h1>CRUD App with MERN</h1>
        <form className="row">
          <div className="mb-3 mx-5 col-lg-3 col-md-3 col-12">
            <label for="exampleInputName" className="form-label">
              Food Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="NameHelp"
              onChange={(e) => {
                setFoodName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 col-lg-3 col-md-3 col-12">
            <label for="exampleInputNumber" className="form-label">
              Days Since you Ate it: 
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputNumber"
              onChange={(e) => {
                setDays(e.target.value);
              }}
            />
          </div>
        </form>
        <button type="submit" onClick={addToList} className="btn btn-primary mx-5">Add to List</button>
    </>
  );
}

export default App;
