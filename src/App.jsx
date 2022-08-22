import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { name: "Raven" },
    { name: "Chelsea" }
  ]);
  const [cohort, setCohort] = useState("bhatia");
  const [inputValue, setInputValue] = useState("");

  // to fetch data from github api
  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohort}/roster.json`
    )
      .then((res) => res.json())
      .then((data) => {
        // data.students ==> [{...}, {...}, {...}]
        setStudents(data.students);
      })
      .catch((err) => console.log(err));
  }, [cohort]); // makes app re-run once

  const handleInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCohort(inputValue);
  };

  return (
    <div className="App">
      <h1>
        {cohort.slice(0, 1).toUpperCase() + cohort.slice(1).toLowerCase()}
      </h1>
      {students.map((student) => {
        return <p key={student.name}>{student.name}</p>;
      })}

      <form onSubmit={handleSubmit} action="#" method="get">
        <input onChange={handleInput} type="text" value={inputValue} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
