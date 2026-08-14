import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { Head, router, usePage } from '@inertiajs/react';
import AnimeGrid from '@/components/AnimeGrid';
import PageContainer from '@/components/PageContainer';
import type { PaginationLink } from '@/components/Pagination';
import Pagination from '@/components/Pagination';
import type { Anime } from '@/types/animes/anime';

type WatchingStatus = {
    label: string;
    value: number;
    count: number;
};

type UserWatchingAnime = {
    id: number;
    user_id: number;
    anime_id: number;
    status: number;
    anime: Anime;
};

type MypageProps = {
    currentStatus: number;
    userWatchingAnimes: {
        data: UserWatchingAnime[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
    watchingStatuses: WatchingStatus[];
};

export default function MypageIndex({
    currentStatus,
    userWatchingAnimes,
    watchingStatuses,
}: MypageProps) {
    const { auth } = usePage().props;

    const handleDisplayAnimes = (value: number) => {
        router.get(
            '/mypage',
            { status: value },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="マイページ" />
            <PageContainer size="wide">
                <HStack>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>
                        {auth.user.name}
                    </Text>
                </HStack>
                <VStack>
                    <HStack
                        width={'100%'}
                        justifyContent={'flex-start'}
                        mt={6}
                        gap={4}
                    >
                        {watchingStatuses.map((status) => (
                            <Button
                                key={status.value}
                                flex={1}
                                maxW={'8em'}
                                h={{ base: 'auto', sm: '40px' }}
                                py={{ base: 2, sm: 0 }}
                                flexDirection={{ base: 'column', sm: 'row' }}
                                variant={
                                    currentStatus === status.value
                                        ? 'solid'
                                        : 'outline'
                                }
                                onClick={() =>
                                    handleDisplayAnimes(Number(status.value))
                                }
                            >
                                <Text>{status.label}</Text>
                                <Text
                                    minW={'24px'}
                                    h={'24px'}
                                    px={1}
                                    flexShrink={0}
                                    color={'black'}
                                    bg={'gray.300'}
                                    rounded={'full'}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {status.count}
                                </Text>
                            </Button>
                        ))}
                    </HStack>
                    {userWatchingAnimes.data.length === 0 ? (
                        <Text mt={16} width={'100%'} textAlign={'left'}>
                            該当するアニメがありません
                        </Text>
                    ) : (
                        <>
                            <Box
                                w={'100%'}
                                minH={{ base: 'auto', lg: '600px' }}
                            >
                                <AnimeGrid
                                    animes={userWatchingAnimes.data.map(
                                        (watchingAnime) => watchingAnime.anime,
                                    )}
                                />
                            </Box>
                            <Pagination links={userWatchingAnimes.links} />
                        </>
                    )}
                </VStack>
            </PageContainer>
        </>
    );
}
