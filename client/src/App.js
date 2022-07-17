import { useEffect, useState } from "react";
import Axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/view").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) =>{
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName
    })
  }

  const deleteFood = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
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
      <button
        type="submit"
        onClick={addToList}
        className="btn btn-primary mx-5">
        Add to List
      </button>
      <h2 className="mx-5 my-5">Food List</h2>
      <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Food Name</th>
                  <th scope="col">Days Since you Ate it</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
      </table>
      {foodList.map((val, key) => {
        return (
          <>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>{val.foodName}</td>
                  <td>{val.daySinceIAte}</td>
                  <td>
                    <input type="text" placeholder="add new food name " onChange={(e) => setNewFoodName(e.target.value)}/>
                    <button className="btn btn-primary" onClick={() => updateFood(val._id)}>Update</button></td>
                  <td><button className="btn btn-danger" onClick={() => deleteFood(val._id)}>Delete</button></td>
                </tr>
              </tbody>
            </table>
          </>
        );
      })}
    </>
  );
}

export default App;
