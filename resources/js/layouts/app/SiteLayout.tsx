import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

type SiteLayoutProps = {
    children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <SiteHeader />

            <Box
                as="main"
                flex="1"
                p="8"
                maxW={'1500px'}
                width={'100%'}
                mx={'auto'}
            >
                {children}
            </Box>

            <SiteFooter />
        </Box>
    );
}
