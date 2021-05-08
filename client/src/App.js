import './App.css';
import Button from "react-bootstrap/Button";
import React, {useState, useEffect, useRef} from 'react';

function App() {
  let textInput = React.createRef();
  const [apiResponse, setApiResponse] = useState("")
  const firstName = useRef(null);
  const lastName = useRef(null);
  const age = useRef(null);
  const id = useRef(null);

  
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
      console.log(firstName.current.value);
      console.log(lastName.current.value);
      console.log(age.current.value);
      var integerId = parseInt(res.numOfUsers);
      integerId += 1;
      fetch("http://localhost:8000/demo/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          "firstname": firstName.current.value,
          "lastname": lastName.current.value,
          "age": age.current.value,
          "id": integerId,
        })
      })
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => err);
    })
  };

  const handleEdit = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    var url = "http://localhost:8000/demo/users/" + id.current.value;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "firstname": firstName.current.value,
        "lastname": lastName.current.value,
        "age": age.current.value,
        "id": id.current.value
      })
    })
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
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
      <br/>
          <b> Search for Pre-existing User: </b>
        <br/>
      <input ref={textInput} placeholder="Search for User by ID..." />
      <Button className="icon" onClick={handleSubmit}> Submit </Button>
      <Button variant="link" className="admin-back-btn" onClick={DeleteItem}>Delete User</Button>
      <Button className="icon" onClick={handleSubmitAll}> Show All </Button>
      <br/>
      <form onSubmit = {handleCreate}>
        <label>
          <br/>
          <b> Create New User: </b>
          <br/>
          First Name:
          <input type="text" placeholder="Enter First Name..." name="firstname" ref={firstName}/>
          Last Name:
          <input type="text" placeholder="Enter Last Name..." name="lastname" ref={lastName}/>
          Age:
          <input type="text" placeholder="Enter Age..." name="age" ref={age}/>
        </label>
        <button>Submit</button>
      </form>
      <form onSubmit = {handleEdit}>
        <label >
          <br/>
          <b> Edit Pre-existing User: </b>
          <br/>
          First Name:
          <input type="text" placeholder="Enter First Name..." name="firstname" ref={firstName}/>
          Last Name:
          <input type="text" placeholder="Enter Last Name..." name="lastname" ref={lastName}/>
          Age:
          <input type="text" placeholder="Enter Age..." name="age" ref={age}/>
          Id:
          <input type="text" placeholder="Enter ID..." name="id" ref={id}/>
        </label>
        <button>Submit</button>
      </form>
        <br/>
        <b> Pre-existing Users: </b>
          <br/>
          {apiResponse}
      </div>
  );
}

export default App;
