import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SessionViewModel from '../viewModel/SessionViewModel';

const sessionOptions: string[] = ['Sign in','Sign up'];
const session = new SessionViewModel();

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border:0,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SessionModal(props: any) {

  //Open/Close modal Hook
  const [open, setOpen] = useState(props.logged ? false : true);

  useEffect(() => {
    if(props.logged) setOpen(false);
    else setOpen(true);
  }, [props.logged]);

  //Sign in/out option Hook
  const [option, setOption] = useState(sessionOptions[0]);
  
  const handleOption = () => {
    if (option===sessionOptions[0])  setOption(sessionOptions[1]);
    else setOption(sessionOptions[0]);
  };
  
  //Form Hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault ( );
    var errorMessage: string = '';
    if(option === sessionOptions[0]){
      await session.signIn(formData.email, formData.password)
      .catch((error) => {
        errorMessage = error.message;
        //USAR
      });
      props.handleLoggedState();
    }else{
      await session.signUp(formData.email, formData.password)
      .catch((error) => {
        errorMessage = error.message;
        //USAR
      });
      props.handleLoggedState();
    }
    setFormData({
      email: '',
      password: '',
      repeatPassword: '',
    });
  };

  return (
    <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {option}
          </Typography>
          <Box
          id='modal-modal-description'
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
           >
            <div>
              <TextField
                required
                id="standard-email-input-required"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                autoComplete="current-email"
                variant="standard"
              />
              <TextField
                required
                id="standard-password-input-required"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
              {option===sessionOptions[0] ? 
                <></> : 
                <TextField
                required
                id="standard-password-input-required"
                label="Confirm Password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                variant="standard"
                />
              }
            </div>
            <div>
              <Box
              component="span"
              m={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {option}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOption}
                >
                  {option===sessionOptions[0] ? sessionOptions[1] : sessionOptions[0]}
                </Button>
              </Box>
            </div>
          </Box>
      </Box>
    </Modal>
  );
}
