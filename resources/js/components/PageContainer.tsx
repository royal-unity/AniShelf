import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

const pageWidths = {
    default: '1000px',
    wide: '1500px',
} as const;

type PageContainerProps = {
    children: ReactNode;
    size?: keyof typeof pageWidths;
};

export default function PageContainer({
    children,
    size = 'default',
}: PageContainerProps) {
    return (
        <Box width={'100%'} maxW={pageWidths[size]} mx={'auto'}>
            {children}
        </Box>
    );
}
