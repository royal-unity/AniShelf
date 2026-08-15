import {
    Box,
    Button,
    createListCollection,
    Field,
    HStack,
    Input,
    Portal,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import AnimeGrid from '@/components/AnimeGrid';
import PageContainer from '@/components/PageContainer';
import type { PaginationLink } from '@/components/Pagination';
import Pagination from '@/components/Pagination';
import { create, index } from '@/routes/animes';
import type { Anime } from '@/types/animes/anime';
import type { Genres } from '@/types/animes/genre';

// コントローラーから渡されるアニメの型
type AnimePageProps = {
    genres: Genres[];
    animes: {
        data: Anime[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
    searchKeyword: string;
    selectedGenre: string;
};

export default function AnimesIndex({
    genres,
    animes,
    searchKeyword,
    selectedGenre,
}: AnimePageProps) {
    const { auth } = usePage().props;
    const searchForm = useForm({
        keyword: searchKeyword ?? '',
        genre_id: selectedGenre ?? '',
    });

    // ジャンルのコレクションを作成
    const genreCollection = createListCollection({
        items: [
            { label: '全て', value: '0' },
            ...genres.map((genre) => ({
                label: genre.name,
                value: String(genre.id),
            })),
        ],
    });

    const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        searchForm.get('/animes', { preserveState: true });
    };

    return (
        <PageContainer size="wide">
            <form onSubmit={handleSearch}>
                {/* アニメ検索入力欄 */}
                <Stack
                    gap={4}
                    width="100%"
                    alignSelf="flex-start"
                    justify={'space-between'}
                    direction={{ base: 'column-reverse', md: 'row' }}
                >
                    <Stack
                        flex={1}
                        gap={6}
                        direction={{ base: 'column', md: 'row' }}
                    >
                        <Field.Root
                            invalid={Boolean(searchForm.errors.keyword)}
                            minW={0}
                            maxW={{ md: '300px' }}
                        >
                            <Input
                                width={'100%'}
                                placeholder="検索したいアニメタイトルを入力"
                                value={searchForm.data.keyword}
                                onChange={(e) =>
                                    searchForm.setData(
                                        'keyword',
                                        e.target.value,
                                    )
                                }
                            />
                            <Field.ErrorText>
                                {searchForm.errors.keyword}
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root
                            width={{ base: '100%', md: '300px' }}
                            flexShrink={0}
                            invalid={Boolean(searchForm.errors.genre_id)}
                        >
                            <Select.Root
                                name="genre_id"
                                collection={genreCollection}
                                value={
                                    searchForm.data.genre_id
                                        ? [String(searchForm.data.genre_id)]
                                        : [String(0)]
                                }
                                onValueChange={(details) => {
                                    searchForm.setData(
                                        'genre_id',
                                        details.value[0] === '0'
                                            ? ''
                                            : details.value[0],
                                    );
                                }}
                                defaultValue={['0']}
                                width={'100%'}
                            >
                                <Select.HiddenSelect />
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="ジャンルを選択してください" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {genreCollection.items.map(
                                                (genre) => (
                                                    <Select.Item
                                                        item={genre}
                                                        key={genre.value}
                                                    >
                                                        {genre.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ),
                                            )}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                            <Field.ErrorText>
                                {searchForm.errors.genre_id}
                            </Field.ErrorText>
                        </Field.Root>
                        <HStack gap={6} justify={'flex-end'}>
                            <Button flexShrink={1} type="submit" px={10}>
                                検索
                            </Button>

                            <Link href={index()}>リセット</Link>
                        </HStack>
                    </Stack>
                    {auth.user?.is_admin && (
                        <Button
                            asChild
                            alignSelf="flex-end"
                            mb={{ base: 5, md: 0 }}
                        >
                            <Link href={create()}>アニメを登録</Link>
                        </Button>
                    )}
                </Stack>
            </form>

            {/* アニメ一覧表示部分 */}
            {animes.data.length === 0 ? (
                <Text mt={16}>該当するアニメがありません</Text>
            ) : (
                <>
                    <Box width={'100%'} minH={{ base: 'auto', lg: '600px' }}>
                        <AnimeGrid animes={animes.data} />
                    </Box>

                    {/* ページネーション作成 */}
                    <Pagination links={animes.links} />
                </>
            )}
        </PageContainer>
    );
}
