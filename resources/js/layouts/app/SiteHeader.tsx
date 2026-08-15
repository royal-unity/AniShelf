import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { login, logout, register } from '@/routes';
import { create } from '@/routes/animes';
import { index as genreIndex } from '@/routes/genres';
import { index as mypageIndex } from '@/routes/mypage';
import {
    Badge,
    Box,
    Button,
    Link as ChakraLink,
    CloseButton,
    Drawer,
    HStack,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link as InertiaLink, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

export default function SiteHeader() {
    const { auth } = usePage().props;

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const [open, setOpen] = useState(false);

    const closeDrawer = () => {
        setOpen(false);
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
                <HStack gap={7}>
                    <ChakraLink
                        fontSize="xl"
                        color={'white'}
                        fontWeight="bold"
                        textDecoration={'none'}
                        href="/"
                    >
                        AniShelf
                    </ChakraLink>
                    {auth.user?.is_admin && (
                        <>
                            <HStack
                                display={{ sm: 'none', md: 'flex' }}
                                color={'white'}
                                gap={4}
                            >
                                <InertiaLink href={create()}>
                                    アニメ登録
                                </InertiaLink>
                                <InertiaLink href={genreIndex()}>
                                    ジャンル一覧
                                </InertiaLink>
                            </HStack>
                        </>
                    )}
                </HStack>
                <HStack
                    gap={5}
                    justify={'space-between'}
                    display={{ base: 'none', md: 'flex' }}
                >
                    {auth.user ? (
                        <>
                            <Text color={'white'}>
                                {auth.user.name}
                                {auth.user.is_admin && (
                                    <Badge ms={2}>管理者</Badge>
                                )}
                            </Text>
                            <ChakraLink
                                asChild
                                color={'white'}
                                textDecoration={'none'}
                            >
                                <InertiaLink href={mypageIndex()}>
                                    マイページ
                                </InertiaLink>
                            </ChakraLink>
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
                <HStack display={{ base: 'flex', md: 'none' }}>
                    {auth.user ? (
                        <>
                            <Drawer.Root
                                open={open}
                                onOpenChange={(e) => setOpen(e.open)}
                            >
                                <Drawer.Trigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        bg={'white'}
                                    >
                                        <HiMenu />
                                    </Button>
                                </Drawer.Trigger>
                                <Portal>
                                    <Drawer.Backdrop />
                                    <Drawer.Positioner>
                                        <Drawer.Content width={'60%'}>
                                            <Drawer.Header>
                                                <Text
                                                    fontSize={'xl'}
                                                    fontWeight={'bold'}
                                                >
                                                    {auth.user.name}
                                                </Text>
                                            </Drawer.Header>
                                            <Drawer.Body>
                                                <VStack
                                                    alignItems={'self-start'}
                                                    gap={5}
                                                >
                                                    <InertiaLink
                                                        onClick={closeDrawer}
                                                        href={mypageIndex()}
                                                    >
                                                        マイページ
                                                    </InertiaLink>
                                                    <InertiaLink
                                                        onClick={closeDrawer}
                                                        href={create()}
                                                    >
                                                        アニメ登録
                                                    </InertiaLink>
                                                    <InertiaLink
                                                        onClick={closeDrawer}
                                                        href={genreIndex()}
                                                    >
                                                        ジャンル一覧
                                                    </InertiaLink>
                                                    <InertiaLink
                                                        className="cursor-pointer"
                                                        href={logout()}
                                                        as="button"
                                                        onClick={handleLogout}
                                                        data-test="logout-button"
                                                    >
                                                        <Text
                                                            mt={10}
                                                            color={'red.500'}
                                                        >
                                                            ログアウト
                                                        </Text>
                                                    </InertiaLink>
                                                </VStack>
                                            </Drawer.Body>
                                            <Drawer.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Drawer.CloseTrigger>
                                        </Drawer.Content>
                                    </Drawer.Positioner>
                                </Portal>
                            </Drawer.Root>
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
