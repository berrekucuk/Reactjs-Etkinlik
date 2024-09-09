import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminHeader() {

  const navigate = useNavigate()

  return  (
  <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
      <Button onClick={() => navigate("/admin/activity")} color="inherit">Activity</Button>
      <Button onClick={() => navigate("/admin/category")} color="inherit">Category</Button>
    </Toolbar>
  </AppBar>
</Box>
);
}

export default AdminHeader