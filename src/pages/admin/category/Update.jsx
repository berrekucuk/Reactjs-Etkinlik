import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { Button, Stack, TextField } from '@mui/material'

function Update() {
  
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")

  const {id} = useParams()

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    axiosInstance.get(`/categories/${id}`)
    .then((res) => {
      setname(res.data.name)
      setdescription(res.data.description)
    })
  },[])

  const update = () => {
    axiosInstance.put("/categories/" + id,{
      name,
      description
    })
    .then((res)=>{
      enqueueSnackbar("Updated!!",{
        variant:"info"
      })
      navigate("/admin/category")
    })
  }
  
  return <>
  <h1>UPDATE CATEGORY FORM</h1>
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
        onClick={update}
      >UPDATE</Button>
    </Stack>
  </Stack>
  </>
}

export default Update