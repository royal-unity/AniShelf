import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export function AppChakraProvider({ children }: Props) {
    return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
