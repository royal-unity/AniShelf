import { Box, Link as ChakraLink, HStack } from '@chakra-ui/react';
import { Link as InertiaLink } from '@inertiajs/react';
import { login, register } from '@/routes';

export default function SiteHeader() {
    return (
        <Box
            as={'header'}
            width={'100%'}
            borderBottomWidth={'1px'}
            backgroundColor={'black'}
            py={3}
        >
            <HStack
                maxWidth={'1500px'}
                marginX={'auto'}
                justify={'space-between'}
            >
                <ChakraLink
                    fontSize="xl"
                    color={'white'}
                    fontWeight="bold"
                    textDecoration={'none'}
                    href="/"
                >
                    AniShelf
                </ChakraLink>
                <HStack gap={5}>
                    <ChakraLink asChild color={'white'}>
                        <InertiaLink href={login()}>ログイン</InertiaLink>
                    </ChakraLink>
                    <ChakraLink asChild color={'white'}>
                        <InertiaLink href={register()}>新規登録</InertiaLink>
                    </ChakraLink>
                </HStack>
            </HStack>
        </Box>
    );
}
