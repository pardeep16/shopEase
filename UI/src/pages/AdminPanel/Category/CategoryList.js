import React from "react";
import { ArrayField, Datagrid, List, TextField } from "react-admin";

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
        <TextField disabled source="id" />
        <TextField source="name" />
        <TextField source="code" />
        <TextField source="description" />
        {/* <ArrayField source="categoryType">
            
          <TextField disabled source="id" />
          <TextField source="name" />
          <TextField source="code" />
          <TextField source="description" />
          
        </ArrayField> */}
      </Datagrid>
    </List>
  );
};

export default CategoryList;
