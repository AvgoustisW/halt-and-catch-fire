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
    Input
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
    const handleType = setValue => e => setValue(e.target.value)
    const handleQuality = setValue => e => setValue(e.target.value)
    const handleMaterial = setValue => e => setValue(e.target.value)

    const formBody = <> 
    <FormControl>
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
    <FormControl>
        <FormLabel>Material</FormLabel>
        <Input 
            placeholder="Iron" 
            variant="flushed" 
            mb={3} 
            type="text" 
            value={material}
            onChange={handleMaterial(setMaterial)}
            isRequired={true}
        />
    </FormControl>
    <FormControl>
        <FormLabel>Type</FormLabel>
        <Input 
            placeholder="longsword" 
            variant="flushed" 
            mb={3} 
            type="text" 
            value={type}
            onChange={handleType(setType)}
            isRequired={true}
        />
    </FormControl>
    <FormControl>
        <FormLabel>Quality</FormLabel>
        <Input 
            placeholder="Famed 12" 
            variant="flushed" 
            mb={3} 
            type="text" 
            value={quality}
            onChange={handleQuality(setQuality)}
            isRequired={true}
        />
    </FormControl>
    
</>
    return ( 
        <>
         
          <Table size="md" variant="striped" colorScheme="green" >
          <TableCaption placement="top">Famous Swords</TableCaption>
          <Thead>          
            <Tr>               
                {headers.map( h => <Th key={h}>{h}</Th>)}   
            </Tr>
            <Tr><Td><BasicIconModal data={{
            icon: <BiPlus/>,
            iconLabel: 'Create',
            title: "Create new sword", 
            body: formBody,
            initFunc: () => resetAll(),
            funcToRun: () => {  resetAll(); createFunc(name, material, type, quality) }
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
                        icon: <BiEdit/>,
                        iconLabel: 'Edit',
                        title: "Edit sword", 
                        body: formBody,
                        initFunc: () => setEditingSword(row.name,row.material,row.type,row.quality),
                        funcToRun: () => {editFunc(row.id, name, material, type, quality) }
                    }}
                    />
                </Td>
                <Td><IconButton 
                    m={4}
                    aria-label="Delete" 
                    icon={<BiTrash/>}
                    variant="outline"
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