import React, { ReactNode, useEffect, useState } from 'react'
import { Link,  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  NumberInput,
  NumberInputField, } from '@chakra-ui/react'
import {
  Container,
  Box,
  P,
  VStack,
  HStack,
  H1,
  H2,
  Form,
  Button,
} from '@northlight/ui'
import { palette } from '@northlight/tokens'
import { ExcelDropzone, ExcelRow } from './excel-dropzone.jsx'
import scores from './scores.js'
import users from './users.js'
import calculateHighestScorers from './helpers/calculateHighestScorers.js'
import Data from './types.js'


interface ExternalLinkProps {
  href: string,
  children: ReactNode,
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => <Link href={href} isExternal sx={ {color: palette.blue['500'], textDecoration: 'underline'} }>{ children }</Link>

export default function App () {
  const [allScores, setAllScores] = useState<{name: string; score: number}[]>([])
  const [highestScores, setHighestScores] = useState<Data[]>([])
  const [hoveredName, setHoveredName] = useState<Data>()
  const [name,setName] = useState<string>('')
  const [score,setScore] = useState<number>(0)
  function handleSheetData (data: ExcelRow[]) {
    setAllScores(data)
  }
 

  useEffect( () => {
    const allUserScores = scores.map((s) => {
      const user = users.find(u => u._id === s.userId);
      return  {name: user!.name ,score:s.score} ;
    });
    setAllScores(allUserScores)
  },[])

  
  useEffect( () => {
   
    setHighestScores(calculateHighestScorers(allScores))
  },[allScores, setAllScores])


console.log(allScores,'scores')
console.log(highestScores,'high scores')

  return (
    <Container maxW="6xl" padding="4">
      <H1 marginBottom="4" >Mediatool exercise</H1>
      <HStack spacing={10} align="flex-start">
        <ExcelDropzone
          onSheetDrop={ handleSheetData }
          label="Import excel file here"
        />
        <VStack align="left">
          <Box>
          
          <TableContainer maxWidth={1000} >

  <Table variant='simple'>
    <TableCaption>Score table</TableCaption>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Score</Th>
      </Tr>
    </Thead>
    <Tbody>
      
        {highestScores?.map((us,i) => (
          <Tr key={i} onMouseEnter={() => setHoveredName(us)}
          onMouseLeave={() => setHoveredName(undefined)}>
            <Td>
            {us.name}
            </Td> 
            <Td >
            { hoveredName === us ? us.score.join(', ') : us.score.slice(0,1)}
            </Td>
          </Tr>
        ))
        }
     
    
    </Tbody>
  </Table>
  <Form initialValues={[]}  onSubmit={() => setAllScores([...allScores, {name, score}])}>
        <Input size={'xs'} onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter name'>
        </Input>
        <NumberInput >
          <NumberInputField  onChange={(e) => setScore(Number(e.target.value))} value={score} placeholder='Enter score'>
            
          </NumberInputField>
        </NumberInput>
        <Button type='submit'>
          Add data
        </Button>
  </Form>

</TableContainer>
          </Box>
          <Box>
            <H2>Initial site</H2>
            <P>
              Drop the excel file scores.xlsx that you will find
              in this repo in the area to the left and watch the log output in the console.
              We hope this is enough to get you started with the import.
            </P>
          </Box>
          <Box>
            <H2>Styling and Northlight</H2>
            <P>
              Styling is optional for this task and not a requirement. The styling for this app is using
              our own library Northligth which in turn is based on Chakra UI. 
              You <i>may</i> use it to give some style to the application but again, it is entierly optional.
            </P>
            <P>
              Checkout <ExternalLink href="https://chakra-ui.com/">Chackra UI</ExternalLink> for
              layout components such 
              as <ExternalLink href="https://chakra-ui.com/docs/components/box">Box</ExternalLink>
              , <ExternalLink href="https://chakra-ui.com/docs/components/stack">Stack</ExternalLink>
              , <ExternalLink href="https://chakra-ui.com/docs/components/grid">Grid</ExternalLink>
              , <ExternalLink href="https://chakra-ui.com/docs/components/flex">Flex</ExternalLink> and others.
            </P>
            <P>
              Checkout <ExternalLink href="https://northlight.dev/">Northlight</ExternalLink> for
              some of our components.
            </P>
          </Box>
        </VStack>
      </HStack>
    </Container>
  ) 
}
