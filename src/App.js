import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import { 
  Switch, 
  BrowserRouter as  Router, 
  Route,
} from 'react-router-dom'

import Main from './components/Main'
import Students from './components/Students'
import Teachers from './components/Teachers'

import Topbar from './components/Topbar'

function App() {
  let [students, setStudents] = useState([])
  let [teachers, setTeachers] = useState([])

  let [forceUpdate, setForceUpdate] = useState(0) // A nasty workaround


  const addStudent = (name, rollno, _class, section) => {
    const student = {
      "id": Math.round(Math.random() * 1000),
      "name": name,
      "rollno": rollno,
      "class": _class,
      "section": section,
    }
    setStudents([...students, student])
  }

  const addTeacher = (name, _class, section) => {
    let teacher_class = _class + ":" + section
    const teacher = {
      "id": Math.round(Math.random() * 1000 + 1221),
      "name": name,
      "class": [teacher_class],
    }
    setTeachers([...teachers, teacher])
  }

  const addTeacherClass = (id, _class, section) => {
    let teacher_class = _class + ":" + section
    let teachersArr = teachers;
    teachersArr.map(teacher => {
      if (teacher.id == id) {
        teacher['class'].push(teacher_class)
      }
    })

    setTeachers(teachers)
  }

  const deleteTeacherClass = (id, _class) => {
    let teachersArr = teachers;
    teachersArr.map(teacher => {
      if (teacher.id == id) {
        teacher['class'] = teacher['class'].filter(_tclass => _tclass !== _class)
      }
    })

    setTeachers(teachersArr)
    setForceUpdate(++forceUpdate)
  }

  const deleteStudent = (rollno) => {
    let result = students.filter(student => rollno !== student.rollno)
    setStudents(result)
  }

  const deleteTeacher = (id) => {
    let result = teachers.filter(teacher => id !== teacher.id)
    setTeachers(result)
  }

  const editStudent = (id, name, rollno, _class, section) => {
    let studentsArr = students;
    studentsArr.map(student => {
      if (student.id == id) {
        student.name = name;
        student.rollno = rollno;
        student.class =  _class;
        student.section = section;
      }
    })

    setStudents(students)
  }

  const editTeacher = (id, name, _class, section) => {
    let teachersArr = teachers;
    teachersArr.map(teacher => {
      if (teacher.id == id) {
        teacher.name = name;
        teacher['class'][0] = _class + ":" + section;
      }
    })

    setTeachers(teachers)
  }

  return (
    <Router>
    <Topbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main students={students.length} teachers={teachers.length} />
          </Route>
          <Route path="/students">
            <Students students={students} addStudent={addStudent} 
              deleteStudent={deleteStudent} editStudent={editStudent} />
          </Route>
          <Route path="/teachers">
            <Teachers forceUpdate={forceUpdate} teachers={teachers} addTeacher={addTeacher} editTeacher={editTeacher}
              deleteTeacher={deleteTeacher} addTeacherClass={addTeacherClass} deleteTeacherClass={deleteTeacherClass} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
