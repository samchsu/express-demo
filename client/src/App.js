import './App.css';
import Button from "react-bootstrap/Button";
import React, {useState, useEffect} from 'react';

function App() {
  let textInput = React.createRef();
  const [apiResponse, setApiResponse] = useState("")
  
  function CallAPI() {
    fetch("http://localhost:8000/demo/users")
          .then(res => res.text())
          .then(res => setApiResponse(res))
          .catch(err => err);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    var url = "http://localhost:8000/demo/users/" + textInput.current.value;
    fetch(url)
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  };

  const handleSubmitAll = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    fetch("http://localhost:8000/demo/users/")
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  };

  const handleCreate = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    fetch("http://localhost:8000/demo/users/total")
    .then(res => res.json())
    .then(res => {
      console.log(res.numOfUsers)
      fetch("http://localhost:8000/demo/users", {
        method: "POST",
        header: {
          'Accept': 'application/json', 
          "Content-Type": "application/json" 
        },
        body: {
          firstName: "Bill",
          lastName: "G.I.",
          age: "24",
          id: res.numOfUsers
        }
      })
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => err);
    })
  };


  function DeleteItem() {
    var url = "http://localhost:8000/demo/users/" + textInput.current.value;
    fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  }

  useEffect(() => {
    CallAPI();
  }, []);

  return (
    <div>
      <input ref={textInput} placeholder="Type a message..." />
      <Button className="icon" onClick={handleSubmit}> Submit </Button>
      <Button className="icon" onClick={handleSubmitAll}> Show All </Button>
      <Button className="icon" onClick={handleCreate}> Create </Button>
      <Button variant="link" className="admin-back-btn" onClick={DeleteItem}>Delete</Button>
        <br/>
          {apiResponse}
      </div>
  );
}

export default App;
