import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

function List() {
  
  const [activities, setactivities] = useState([])

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() =>{
    axiosInstance.get("/activities")
    .then((res)=> {
      setactivities(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const deleteActivity = (id) => {

    var confirm = window.confirm("Are you sure you want to delete this activity?")

    if (confirm) {
      axiosInstance
        .delete(`/activities/${id}`)
        .then((res) => {
          setactivities(activities.filter((activity) => activity.id !== id))
          enqueueSnackbar("Activity deleted successfully", {variant: "success"})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const columns = [
    {
      field : "id",
      headerName : "ID",
      flex : 1
    },
    {
      field : "name",
      headerName : "Name",
      flex : 1
    },
    {
      field : "startDate",
      headerName : "Start Date",
      flex : 1
    },
    {
      field : "endDate",
      headerName : "End Date",
      flex : 1
    },
    {
      field : "location",
      headerName : "Location",
      flex : 1
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => {
        return <Button onClick={() => deleteActivity(params.row.id)} variant="contained" color="error">Delete</Button>
      }
    },
    {
      field : "update",
      headerName: "Update",
      flex: 1,
      renderCell : (params) => {
        return <Button onClick={() => navigate(`/admin/activity/update/${params.row.id}`)} variant='contained' color='primary'>Update</Button>
      }
    }
  ]
  
  return <>
  <Button onClick={()=> navigate("/admin/activity/add")} variant='contained' color='primary'>ADD</Button>
  <hr/>
  <DataGrid
   rows={activities}
   columns={columns} 
  />
  
  </>
}

export default List