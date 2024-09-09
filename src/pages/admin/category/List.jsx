import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

function List() {
  
  const [categories, setcategories] = useState([])

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() =>{
    axiosInstance.get("/categories")
    .then((res) =>{
      setcategories(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const deleteCategory = (id) =>{

    var confirm = window.confirm("Are you sure you want to delete this category?")

    if(confirm){
      axiosInstance.delete(`/categories/${id}`)
      .then((res) =>{
        setcategories(categories.filter((categories) => categories.id != id))
        enqueueSnackbar("Category deleted successfully", {variant: "success"})
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  
  const columns =[
    {
      field: "id",
      headerName:"ID",
      flex : 1
    },
    {
      field: "name",
      headerName:"Name",
      flex : 1
    },
    {
      field: "description",
      headerName:"Description",
      flex : 1
    },
    {
      field: "delete",
      headerName:"Delete",
      flex : 1,
      renderCell :(params) => {
        return <Button onClick={() => deleteCategory(params.row.id)} variant="contained" color="error" >Delete</Button>
      }
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => {
        return <Button onClick={()=> navigate(`/admin/category/update/${params.row.id}`)} variant='contained' color='primary'>Update</Button>
      }
    }
  ]
  return <>
  <Button onClick={()=> navigate("/admin/category/add")} variant='contained' color='primary'>ADD</Button>
  <hr/>
  <DataGrid
    rows={categories}
    columns={columns}
  />
  </>
}

export default List