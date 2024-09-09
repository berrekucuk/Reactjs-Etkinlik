import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { Button, Stack, TextField } from '@mui/material'

function Add() {
  
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  const add = () => {
    axiosInstance.post("/categories",{
      name: name,
      description: description
    })
    .then((res) =>{
      navigate("/admin/category")
      enqueueSnackbar("Category added successfully", {variant:"success"})
    })
  }

  return <>
  <h1>ADD CATEGORY FORM</h1>
  <hr/>
  <Stack spacing={2}>
    <Stack spacing={2} direction={"row"}>
      <TextField fullWidth label="Name" variant='outlined' value={name} onChange={(e) =>setname(e.target.value)} />
    </Stack>
    <Stack spacing={2} direction={"row"}>
      <TextField fullWidth label="Description" variant='outlined' value={description} onChange={(e) =>setdescription(e.target.value)} />
    </Stack>
    <Stack>
      <Button
        variant='contained'
        color='primary'
        onClick={add}
      >ADD</Button>
    </Stack>
  </Stack>
  </>
}

export default Add