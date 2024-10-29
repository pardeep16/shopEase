import React from 'react'
import { Datagrid, ImageField, List, TextField } from 'react-admin'

const ProductList = () => {
  return (
    <List>
        <Datagrid>
            <TextField disabled source='id'/>
            <ImageField source='thumbnail'/>
            <TextField source='name'/>
            <TextField source='brand'/>\
            <TextField source='description'/>
            <TextField source='price'/>
            <TextField source='slug'/>
        </Datagrid>
    </List>
  )
}

export default ProductList