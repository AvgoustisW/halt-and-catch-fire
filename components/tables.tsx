import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    IconButton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select
  } from "@chakra-ui/react"


import { BiTrash, BiEdit, BiPlus } from 'react-icons/bi';

import { BasicIconModal } from '../components/modal';
import {useState} from 'react';

export function SimpleTable ({header: headers, rows}){
  
      return ( 
        <>
        <Table variant="striped" colorScheme="red">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
        <Tr>               
            {headers.map( h => <Th key={h}>{h}</Th>)}   
        </Tr>
        </Thead>
        <Tbody>
        {rows.map( row => 
            <Tr key={row}>
                { row.map(r => <Td key={r}>{r}</Td>)}
            </Tr>
        )}         
        
        </Tbody>
        <Tfoot>
        </Tfoot>
    </Table>
    </>
    )
}

export function EditableTable ({headers, rows, createFunc, editFunc, deleteFunc}){
  
    const [name, setName] = useState('')
    const [material, setMaterial] = useState('')
    const [type, setType] = useState('')
    const [quality, setQuality] = useState('')

    const { materials, types, qualities } =  selectionData();

    const resetToOriginal = (
        () => {
        setName('');
        setMaterial('Steel');
        setType('Longsword');
        setQuality('Strong 50');
        }
    )

    const resetAll = (
        () => {
        setName('');
        setMaterial('');
        setType('');
        setQuality('');
        }
    )

    const setEditingSword = (name, material, type, quality) => {
        setName(name);
        setMaterial(material);
        setType(type);
        setQuality(quality);
    }


    const handleName = setValue => e => setValue(e.target.value)
    const handleType = setValue => e => {setValue(e.target.value) }
    const handleQuality = setValue => e => setValue(e.target.value)
    const handleMaterial = setValue => e => setValue(e.target.value)

    const formBody = <> 
     <FormControl mb={4} mt={4}>
        <FormLabel>Name</FormLabel>
        <Input 
            placeholder="Slasher" 
            variant="flushed" 
            mb={3} 
            type="text" 
            value={name}
            onChange={handleName(setName)}
            isRequired={true}
        />
    </FormControl>
    <FormControl mb={4} mt={4}>
        <FormLabel>Material</FormLabel>
        <Select variant ="flushed" onChange={handleMaterial(setMaterial)}>
            {materials.map( mat => <option selected={mat === material} value={mat}>{mat}</option>)}
        </Select>
    </FormControl>
    <FormControl mb={4} mt={4}>
        <FormLabel>Type</FormLabel>
        <Select  variant ="flushed" onChange={handleType(setType)}>
            {types.map( tp => <option selected={tp === type} value={tp}>{tp}</option>)}
        </Select>
    </FormControl>
    <FormControl mb={4} mt={4}>
        <FormLabel>Quality</FormLabel>
        <Select  variant ="flushed" onChange={handleQuality(setQuality)}>
            {qualities.map( q => <option selected={q === quality} value={q}>{q}</option>)}
        </Select>
    </FormControl>
    
</>
    return ( 
        <>
         
          <Table size="sm" variant="striped" colorScheme="green" >
          <TableCaption placement="top">Famous Swords</TableCaption>
          <Thead>          
            <Tr>               
                {headers.map( h => <Th key={h}>{h}</Th>)}   
            </Tr>
            <Tr><Td><BasicIconModal data={{
            icon: <BiPlus/>,
            iconLabel: 'Create',
            buttonVariant: 'outline',
            title: "Create new sword", 
            body: formBody,
            initFunc: () => resetToOriginal(),
            funcToRun: () => {  resetToOriginal(); createFunc(name, material, type, quality) }
         }}
        />
                </Td></Tr>
          </Thead>
          <Tbody>
            
          {rows.map( row => { 
              return ( <Tr key={row.id}>
                <Td>{row.name}</Td>
                <Td>{row.material}</Td>
                <Td>{row.type}</Td>
                <Td>{row.quality}</Td>               
                <Td>
                    <BasicIconModal data={{
                        buttonVariant: 'ghost',
                        icon: <BiEdit/>,
                        iconLabel: 'Edit',
                        title: "Edit sword", 
                        body: formBody,
                        initFunc: () => setEditingSword(row.name,row.material,row.type,row.quality),
                        funcToRun: () => {editFunc(row.id, name, material, type, quality) }
                    }}
                    />
                    <IconButton 
                    ml={5}
                    aria-label="Delete" 
                    icon={<BiTrash/>}
                    variant="ghost"
                    fontSize="22px"
                    onClick={() => {deleteFunc(row.id)}}
                    />  
                </Td>
                
              </Tr>
              )
            }
          )}         
         
          </Tbody>
          <Tfoot>
          </Tfoot>
    </Table>
    </>
    )
}


const selectionData = () => {
    const materials = [ "Steel","Iron","Reinforced Steel","Glass","Obsidian",   "Blessed Steel"];
    const types = [ "Longsword","Shortsword","Greatsword","Dagger","Warglaive","Axe","Spear"];
    const qualities = [ "Strong 50","Rare 24","Famed 12","Wicked 4"];
    return { materials, types, qualities } ;
}