import {
    Badge,
    Box,
    createListCollection,
    HStack,
    Icon,
    Link,
    Portal,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { HiArrowSmLeft, HiExternalLink } from 'react-icons/hi';
import { toast } from 'sonner';
import AnimeImage from '@/components/AnimeCard/AnimeImage';
import PageContainer from '@/components/PageContainer';
import type { Anime } from '@/types/animes/anime';

type WatchingStatus = {
    label: string;
    value: string;
};

type AnimeProp = {
    anime: Anime;
    currentWatchingStatus: string | null;
    watchingStatuses: WatchingStatus[];
};

export default function AnimeShow({
    anime,
    currentWatchingStatus,
    watchingStatuses,
}: AnimeProp) {
    // SelectのchakraUI用のコレクションを作成
    const statusCollection = createListCollection({
        items: watchingStatuses,
    });

    const [statusError, setStatusError] = useState<string | null>(null);

    // 視聴状況を送信
    const handleUpdate = (selectedValue: number) => {
        router.put(
            `/animes/${anime.id}/watchingStatus`,
            {
                selectedValue,
            },
            {
                onSuccess: () => {
                    const label = watchingStatuses.find(
                        (status) => Number(status.value) === selectedValue,
                    )?.label;
                    toast.success(`視聴状態を「${label}」に変更しました`);
                },
                onError: (errors) => {
                    toast.error('視聴状態を変更できませんでした');
                    setStatusError(errors.selectedValue);
                },
            },
        );
    };

    const { auth } = usePage().props;

    return (
        <>
            <Head title={anime.name} />

            <PageContainer>
                <Link
                    href="/"
                    mb={15}
                    textDecoration={'none'}
                    cursor={'pointer'}
                >
                    <Icon size={'xl'}>
                        <HiArrowSmLeft />
                    </Icon>
                    <Text fontSize={'sm'}>一覧へ戻る</Text>
                </Link>
                <HStack gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
                    <AnimeImage
                        animeImagePath={anime.anime_img_path}
                        animeName={anime.name}
                    />
                    <VStack
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        alignSelf="flex-start"
                        width={{ base: '100%', lg: 'auto' }}
                        flex={{ lg: 1 }}
                    >
                        <Box>
                            {anime.is_current_season && (
                                <Badge
                                    colorPalette="purple"
                                    fontSize={'lg'}
                                    p={2}
                                >
                                    現在放送中
                                </Badge>
                            )}
                            <Text
                                as={'h1'}
                                fontSize={'3xl'}
                                fontWeight={'bold'}
                            >
                                {anime.name}
                            </Text>
                            <Badge mt={2} fontSize="xs" alignSelf="flex-start">
                                {anime.genre.name}
                            </Badge>
                        </Box>
                        <Link
                            my={5}
                            href={anime.official_site_url}
                            textDecoration={'none'}
                            _hover={{ color: 'blue.600' }}
                        >
                            公式サイト
                            <HiExternalLink />
                        </Link>
                        {auth.user && (
                            <Box width={{ base: '100%', sm: '320px' }}>
                                <Select.Root
                                    collection={statusCollection}
                                    size="sm"
                                    width={{ base: '100%', sm: '320px' }}
                                    defaultValue={
                                        currentWatchingStatus
                                            ? [currentWatchingStatus]
                                            : []
                                    }
                                    onValueChange={(details) =>
                                        handleUpdate(Number(details.value[0]))
                                    }
                                >
                                    <Select.HiddenSelect />
                                    <Select.Label>視聴状況</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="視聴状況を選択してください" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {statusCollection.items.map(
                                                    (status) => (
                                                        <Select.Item
                                                            item={status}
                                                            key={status.value}
                                                        >
                                                            {status.label}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ),
                                                )}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>

                                {statusError && (
                                    <Text
                                        color={'red.500'}
                                        fontSize={'sm'}
                                        mt={2}
                                    >
                                        {statusError}
                                    </Text>
                                )}
                            </Box>
                        )}
                    </VStack>
                </HStack>
                <Box>
                    <Text mt={10} fontSize={'xl'} fontWeight={'bold'}>
                        概要
                    </Text>
                    <Box background={'bg.subtle'} mt={6} p={4} rounded={'xl'}>
                        <Text>{anime.description}</Text>
                    </Box>
                </Box>
            </PageContainer>
        </>
    );
}
