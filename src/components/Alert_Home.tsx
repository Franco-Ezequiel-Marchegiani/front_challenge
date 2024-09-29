import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

const AlertHome: React.FC = () => {
    
    return (
        <Alert status='warning' variant='left-accent' textAlign={'left'}>
            <AlertIcon sx={{margin: '10px'}}/>
            <Box>
                <AlertTitle>
                    Happy Hour
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    16:00 - 17:00 hs MEX
                </AlertDescription>
            </Box>
        </Alert>
  );
}

export default AlertHome;