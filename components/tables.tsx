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

import { BasicModal } from '../components/modal';


export function SimpleTable ({header: headers, rows}){
  
      return ( 
        <>
        <Table variant="striped" colorScheme="red">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
        <Tr>               
            {headers.map( h => <Th>{h}</Th>)}   
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
  
    return ( 
        <>
         
          <Table size="lg" variant="striped" colorScheme="green" >
          <TableCaption placement="top">Famous Swords</TableCaption>
          <Thead>          
            <Tr>               
                {headers.map( h => <Th>{h}</Th>)}   
            </Tr>
            <Tr><Td><BasicModal data={{
            icon: <BiPlus/>,
            iconLabel: 'Create',
            title: "Create new sword", 
            body: <> 
                <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Slasher" />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel>Material</FormLabel>
                <Input placeholder="Steel" />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <Input placeholder="Longsword" />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel>Quality</FormLabel>
                <Input placeholder="Famed 12" />
                </FormControl>
            </>,
            funcToRun: createFunc
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
                <Td><IconButton 
                    m={4}
                    aria-label="Edit" 
                    icon={<BiEdit/>}
                    variant="outline"
                    fontSize="22px"
                    onClick={() => {editFunc(row.id)}}
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