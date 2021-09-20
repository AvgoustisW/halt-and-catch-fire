
import { Box, Text } from "@chakra-ui/react"

import { useEffect } from "react";
export default function Footer() {

  let userHasScrolled = false;


  useEffect( () => {

    window.onscroll = function (e)
    {
        userHasScrolled = true;
    }

  })

  return (
   <footer>
      <Box pr={50} style={{      
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignContent: 'center',
    }}>
      {userHasScrolled  && <Text fontSize="md" my={2} onClick={() => window.scrollTo(0,0)}>AvgoustisW</Text>}
      </Box>
     
   </footer>
  )
}