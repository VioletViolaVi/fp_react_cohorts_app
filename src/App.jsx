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
        // [{...}, {...}, {...}]
        console.log("HERE ==> ", data.students);
        setStudents(data.students);
      })
      .catch((err) => console.log(err));
  }, []); // makes app re-run once

  const handleInput = (e) => {
    setCohort(e.target.value);
  };

  return (
    <div className="App">
      {students.map((student) => {
        return <p key={student.name}>{student.name}</p>;
      })}

      <form action="#" method="get">
        <input
          onChange={handleInput}
          type="text"
          name="studentName"
          id="studentName"
        />
        <input type="button" value="Submit" />
      </form>
    </div>
  );
}

export default App;
