import { Button, Snackbar, Stack, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { DatePicker } from '@mui/x-date-pickers'

function Update() {

  const [name, setname] = useState("")
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")
  const [location, setlocation] = useState("")

  const {id} = useParams()

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() =>{
    axiosInstance.get(`/activities/${id}`)
    .then((res) => {
      setname(res.data.name)
      setstartDate(res.data.startDate)
      setendDate(res.data.endDate)
      setlocation(res.data.location)
    })
  },[])

  const update = ()=>{
    axiosInstance.put("/activities/" + id,{
      name,
      startDate,
      endDate,
      location
    })
    .then((res) =>{
      enqueueSnackbar("Updated!!",{
        variant:"info"
      })
      navigate("/admin/activity")
    })
  }


  return <>
  <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <TextField fullWidth label="Name" variant='outlined' value={name} onChange={(e) => setname(e.target.value)} />
        <TextField fullWidth label="Location" variant='outlined' value={location} onChange={(e) => setlocation(e.target.value)} />
      </Stack>
      <Stack spacing={2} direction={"row"}>
        <DatePicker
          sx={{width:"100%"}}
          label="Start Date"
          onChange={(newValue) => setstartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          sx={{width:"100%"}}
          label="End Date"
          onChange={(newValue) => setendDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
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