import { Box, Link as ChakraLink, HStack, Text } from '@chakra-ui/react';
import { Link as InertiaLink, router, usePage } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { login, logout, register } from '@/routes';

export default function SiteHeader() {
    const { auth } = usePage().props;

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <Box
            as={'header'}
            width={'100%'}
            borderBottomWidth={'1px'}
            backgroundColor={'black'}
            p={3}
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
                <HStack gap={5} justify={'space-between'}>
                    {auth.user ? (
                        <>
                            <Text color={'white'}>{auth.user.name}</Text>
                            <InertiaLink
                                className="cursor-pointer"
                                href={logout()}
                                as="button"
                                onClick={handleLogout}
                                data-test="logout-button"
                            >
                                <Text color={'white'}>ログアウト</Text>
                            </InertiaLink>
                        </>
                    ) : (
                        <>
                            <ChakraLink asChild color={'white'}>
                                <InertiaLink href={login()}>
                                    ログイン
                                </InertiaLink>
                            </ChakraLink>
                            <ChakraLink asChild color={'white'}>
                                <InertiaLink href={register()}>
                                    新規登録
                                </InertiaLink>
                            </ChakraLink>
                        </>
                    )}
                </HStack>
            </HStack>
        </Box>
    );
}
