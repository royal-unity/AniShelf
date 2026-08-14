import {
    Badge,
    Box,
    Button,
    Link as ChakraLink,
    createListCollection,
    Dialog,
    HStack,
    Icon,
    Portal,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head, Link as InertiaLink, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { HiArrowSmLeft, HiExternalLink } from 'react-icons/hi';
import AnimeImage from '@/components/AnimeCard/AnimeImage';
import PageContainer from '@/components/PageContainer';
import { destroy, edit } from '@/routes/animes';
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
                onError: (errors) => {
                    setStatusError(errors.selectedValue);
                },
            },
        );
    };

    // アニメ削除処理
    const handleDelete = () => {
        router.delete(destroy(anime.id).url);
    };

    const { auth } = usePage().props;

    return (
        <>
            <Head title={anime.name} />

            <PageContainer>
                <ChakraLink
                    href="/"
                    mb={15}
                    textDecoration={'none'}
                    cursor={'pointer'}
                >
                    <Icon size={'xl'}>
                        <HiArrowSmLeft />
                    </Icon>
                    <Text fontSize={'sm'}>一覧へ戻る</Text>
                </ChakraLink>
                <HStack gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
                    <AnimeImage
                        animeImagePath={anime.anime_img_path}
                        animeName={anime.name}
                        maxHeightMode="show"
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
                        {anime.official_site_url && (
                            <ChakraLink
                                my={5}
                                href={anime.official_site_url}
                                textDecoration={'none'}
                                _hover={{ color: 'blue.600' }}
                            >
                                公式サイト
                                <HiExternalLink />
                            </ChakraLink>
                        )}
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
                        {auth.user?.is_admin && (
                            <HStack mt={10} gap={4}>
                                <InertiaLink href={edit(anime.id)}>
                                    <Button size={'sm'} colorPalette={'blue'}>
                                        編集
                                    </Button>
                                </InertiaLink>

                                <Dialog.Root role="alertdialog">
                                    <Dialog.Trigger asChild>
                                        <Button size="sm" colorPalette="red">
                                            削除
                                        </Button>
                                    </Dialog.Trigger>

                                    <Portal>
                                        <Dialog.Backdrop />

                                        <Dialog.Positioner>
                                            <Dialog.Content>
                                                <Dialog.Header>
                                                    <Dialog.Title>
                                                        アニメを削除しますか？
                                                    </Dialog.Title>
                                                </Dialog.Header>

                                                <Dialog.Body>
                                                    <Text>
                                                        「{anime.name}
                                                        」を削除します。
                                                        この操作は取り消せません。
                                                    </Text>
                                                </Dialog.Body>

                                                <Dialog.Footer>
                                                    <Dialog.ActionTrigger
                                                        asChild
                                                    >
                                                        <Button variant="outline">
                                                            キャンセル
                                                        </Button>
                                                    </Dialog.ActionTrigger>

                                                    <Button
                                                        colorPalette="red"
                                                        onClick={handleDelete}
                                                    >
                                                        削除する
                                                    </Button>
                                                </Dialog.Footer>

                                                <Dialog.CloseTrigger />
                                            </Dialog.Content>
                                        </Dialog.Positioner>
                                    </Portal>
                                </Dialog.Root>
                            </HStack>
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
