import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Student = ({ students, addStudent, deleteStudent, editStudent }) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [rollno, setRollNo] = useState(0);
    const [studentClass, setClass] = useState('');
    const [section, setSection] = useState('')
    const [studentID, setStudentID] = useState(0)

    const [isAdd, setIsAdd] = useState(true)

    // Modal
    const [open, setOpen] = useState(false)
    const openModal = () => { setOpen(true) }
    const closeModal = () => { setOpen(false) }

    // Errors
    const [nameError, setNameError] = useState(false)
    const [rollNoError, setRollNoError] = useState(false)
    const [classError, setClassError] = useState(false)
    const [sectionError, setSectionError] = useState(false)


    const editStudentInfo = (id, name, rollno, studentClass, section) => {
      setIsAdd(false)
      setName(name)
      setRollNo(rollno)
      setClass(studentClass)
      setSection(section)
      setStudentID(id)
      openModal()
    }

    const addStudentInfo = () => {
      setIsAdd(true)
      setName('')
      setRollNo(0)
      setClass('')
      setSection('')
      openModal()
    }


    return (
        <Container maxWidth="md">
        <Typography variant="h4" style={{marginBottom: 30, paddingTop: 10}}>
            Students
        </Typography>
        <Box component="div" style={{float: 'right', marginTop: 5, marginBottom: 10}}>
          <Button variant="contained" color="primary" onClick={addStudentInfo}>
            Add Student
          </Button>
        </Box>
        <TableContainer component={Paper} >
        <Table className={classes.table} size="small" aria-label="Students table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (

              <TableRow>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.rollno}</TableCell>
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" 
                      onClick={() => editStudentInfo(row.id, row.name, row.rollno, row.class, row.section)}>
                        Edit
                    </Button>
                    <Button variant="contained"
                      onClick={() => deleteStudent(row.rollno)} 
                      style={{backgroundColor: 'red', color: '#fff', marginLeft: 10}}>
                        Delete
                    </Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Student details
          </DialogContentText>
          <TextField error={nameError} autoFocus value={name} margin="dense" id="name" label="Name" type="text" fullWidth onChange={ (e) => setName(e.target.value) } />
          <TextField error={rollNoError} value={rollno} margin="dense" id="rollno" label="Roll Number" type="number" fullWidth onChange={(e) => setRollNo(e.target.value)} />
          <TextField error={classError} value={studentClass} margin="dense" id="class" label="Class" type="number" fullWidth onChange={(e) => setClass(e.target.value)} helperText="(Can be only from 1 - 12 )"/>
          <TextField error={sectionError} value={section} margin="dense" id="section" label="Section" type="text" fullWidth onChange={(e) => setSection(e.target.value)} helperText="(Can be only from A - F)" />
        </DialogContent>
        <DialogActions>

          <Button variant="contained" onClick={() => {
              // Validation
              if (name == "") {
                setNameError(true)
                return false
              }
              if (rollno == 0) {
                setRollNoError(true)
                return false
              }
              if (studentClass == "" || studentClass > 12 || studentClass <= 0) {
                setClassError(true)
                return false
              }
              if (section != "A" && section != "B" && section != "C" && section != "D" && section != "E" && section != "F" ) {
                setSectionError(true)
                return false
              }

              setNameError(false)
              setRollNoError(false)
              setClassError(false)
              setSectionError(false)
              
            if (isAdd) 
              addStudent(name, rollno, studentClass, section)
            else
              editStudent(studentID, name, rollno, studentClass, section)
            closeModal()
          }} color="primary">
            { isAdd ? "Add" : "Edit" }
          </Button>
          <Button variant="contained" onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    )
}

export default Student