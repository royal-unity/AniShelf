import { Box, Text } from '@chakra-ui/react';

export default function SiteFooter() {
    return (
        <Box
            as="footer"
            width="100%"
            borderTopWidth="1px"
            py={3}
            backgroundColor={'black'}
            textAlign="center"
        >
            <Text color="white">© 2026 AniShelf</Text>
        </Box>
    );
}
