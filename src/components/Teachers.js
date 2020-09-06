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
import Badge from '@material-ui/core/Badge';

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
  btnClass: {
    padding: 5, 
    marginLeft: 5, 
    marginTop: 5
  }
});


const Teachers = ({ forceUpdate, teachers, addTeacher, deleteTeacher, addTeacherClass, deleteTeacherClass, editTeacher }) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [teacherID, setTeacherID] = useState(0);
    const [teacherClass, setTeacherClass] = useState([]);
    const [teacherSection, setTeacherSection] = useState([])
    // const [studentID, setStudentID] = useState(0)

    const [isAdd, setIsAdd] = useState(true)

    // Modal
    const [open, setOpen] = useState(false)
    const openModal = () => { setOpen(true) }
    const closeModal = () => { setOpen(false) }

    // Modal
    const [open2, setOpen2] = useState(false)
    const openModal2 = () => { setOpen2(true) }
    const closeModal2 = () => { setOpen2(false) }

    // Errors
    const [nameError, setNameError] = useState(false)
    const [classError, setClassError] = useState(false)
    const [sectionError, setSectionError] = useState(false)

    const editTeacherInfo = (id, name, teacherClass) => {
      let class_section = teacherClass[0].split(":")
      setIsAdd(false)
      setName(name)
      setTeacherClass(class_section[0])
      setTeacherSection(class_section[1])
      setTeacherID(id)
      openModal()
    }


    const AddTeacherInfo = () => {
      setIsAdd(true)
      setName("")
      setTeacherClass("")
      setTeacherSection("")
      setTeacherID(0)
      openModal()
    }

    return (
        <Container maxWidth="md">
        <Typography variant="h4" style={{marginBottom: 30, paddingTop: 10}}>
            Teachers
        </Typography>
        <Box component="div" style={{float: 'right', marginTop: 5, marginBottom: 10}}>
          <Button variant="contained" color="primary" onClick={AddTeacherInfo}>
            Add Teacher
          </Button>
        </Box>
        <TableContainer component={Paper} >
        <Table className={classes.table} size="small" aria-label="Students table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Teacher ID</TableCell>
              <TableCell>Class & Section</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (

              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell style={{maxWidth: 200}}>
                    {row.class.map((tClass, idx) => {
                        if (idx == 0) {
                          return <Button size="small" className={classes.btnClass} style={{ pointerEvents: 'none' }}
                                  variant="contained" color="primary">
                                      Class {tClass}
                                  </Button>
                        }
                        else {
                        return <Badge  key={row.id} badgeContent={"x"} color="secondary" onClick={() => deleteTeacherClass(row.id, tClass)}>
                                  <Button size="small" className={classes.btnClass}
                                  variant="contained" color="primary">
                                      Class {tClass}
                                  </Button>
                              </Badge>
                        }
                    })}
                </TableCell>
                <TableCell style={{maxWidth: 200}}>
                    <Button size="small" variant="contained" color="primary" className={classes.btnClass} 
                      style={{backgroundColor: '#00994d'}}
                      onClick={() => {
                        setTeacherID(row.id)
                        setTeacherClass("")
                        setTeacherSection("")
                        openModal2()
                      }}>
                        Add Class
                    </Button>
                    <Button size="small" variant="contained" color="primary" className={classes.btnClass}
                      onClick={() => editTeacherInfo(row.id, row.name, row.class)}>
                        Edit
                    </Button>
                    <Button size="small" variant="contained"
                      style={{backgroundColor: 'red', color: '#fff', marginLeft: 10}}
                      onClick={() => deleteTeacher(row.id)} >
                        Delete
                    </Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Teacher details
          </DialogContentText>
          <TextField error={nameError} autoFocus value={name} margin="dense" id="name" label="Name" type="text" fullWidth onChange={ (e) => setName(e.target.value) } />
          <TextField error={classError} value={teacherClass} margin="dense" id="class" label="Class" type="text" fullWidth onChange={(e) => setTeacherClass(e.target.value)}  helperText="(Can be only from 1 - 12 )" />
          <TextField error={sectionError} value={teacherSection} margin="dense" id="section" label="Section" type="text" fullWidth onChange={(e) => setTeacherSection(e.target.value)}  helperText="(Can be only from A - F )"/> 
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => {

              // Validation
              if (name == "") {
                setNameError(true)
                return false
              }
              if (teacherClass == "" || teacherClass > 12 || teacherClass <= 0) {
                setClassError(true)
                return false
              }
              if (teacherSection != "A" && teacherSection != "B" && teacherSection != "C" && teacherSection != "D" && teacherSection != "E" && teacherSection != "F" ) {
                setSectionError(true)
                return false
              }

              setNameError(false)
              setClassError(false)
              setSectionError(false)

            if (isAdd) 
              addTeacher(name, teacherClass, teacherSection)
            else
              editTeacher(teacherID, name, teacherClass, teacherSection)
            closeModal()
          }} color="primary">
            { isAdd ? "Add" : "Edit" }
          </Button>
          <Button variant="contained" onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={closeModal2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Assign Class and Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Class and Section details
          </DialogContentText>
          <TextField error={classError} margin="dense" id="teacher_class" label="Class" type="number" fullWidth onChange={(e) => setTeacherClass(e.target.value)} helperText="(Can be only from 1 - 12 )" />
          <TextField error={sectionError} margin="dense" id="teacher_section" label="Section" type="text" fullWidth onChange={(e) => setTeacherSection(e.target.value)} helperText="(Can be only from A - F)" /> 
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => {

            if (teacherClass == "" || teacherClass > 12 || teacherClass <= 0) {
              setClassError(true)
              return false
            }
            if (teacherSection != "A" && teacherSection != "B" && teacherSection != "C" && teacherSection != "D" && teacherSection != "E" && teacherSection != "F" ) {
              setSectionError(true)
              return false
            }

            setNameError(false)
            setClassError(false)
            setSectionError(false)

            addTeacherClass(teacherID, teacherClass, teacherSection)
            closeModal2()
          }} color="primary">
            Assign
          </Button>
          <Button variant="contained" onClick={closeModal2} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      </Container>
    )
}

export default Teachers