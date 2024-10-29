import React from 'react'
import { ArrayInput, BooleanInput, Edit, ImageField, ImageInput, NumberInput, required, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import { colorSelector } from '../../components/Filters/ColorsFilter'
import { sizeSelector } from './CreateProduct'

const EditProduct = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput label="Name" source='name'/>
            <TextInput label="Description" source='description'/>
            <TextInput label="Price" source='price' type='number'/>
            <TextInput label="Brand" source='brand'/>

            <ImageField source='thumbnail' src='thumbnail'/>
            <ImageInput source="thumbnail" label={'Select Thumbnail'}>
              <ImageField source="src" title="title" />
            </ImageInput>


            <ArrayInput source='variants' label={'Edit Variants'}>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable/>
                <SelectInput source='size' choices={sizeSelector}/>
                <NumberInput source='stockQuantity'/>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResources'>
              <SimpleFormIterator inline>
              <TextInput source='name' validate={[required()]}/>
              <ImageField source='url' src='url'/>
              <ImageInput source='url' label={'Product Image'}>
              <ImageField source="src" title="title" />
              </ImageInput>
              <SelectInput source='type' choices={["image"]}/>
              <BooleanInput source='isPrimary'/>
              </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Edit>
  )
}

export default EditProduct