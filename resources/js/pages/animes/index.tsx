import { Box, Button, HStack, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Link, router } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import AnimeCard from '@/components/animeCard/animeCard';
import type { Anime } from '@/types/animes/anime';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

// コントローラーから渡されるアニメの型
type AnimePageProps = {
    animes: {
        data: Anime[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
    searchKeyword: string;
};

export default function AnimesIndex({ animes, searchKeyword }: AnimePageProps) {
    const [keyword, setKeyword] = useState(searchKeyword);

    const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get('/animes', { keyword: keyword }, { preserveState: true });
    };

    return (
        <Box p="8" maxW={'1500px'} width={'100%'} mx={'auto'}>
            <form onSubmit={handleSearch}>
                {/* アニメ検索入力欄 */}
                <HStack
                    gap={4}
                    width="100%"
                    maxW="500px"
                    alignSelf="flex-start"
                >
                    <Input
                        flex={1}
                        minW={0}
                        placeholder="検索したいアニメタイトルを入力"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button flexShrink={0} type="submit">
                        検索
                    </Button>
                </HStack>
            </form>

            {/* アニメ一覧表示部分 */}
            {animes.data.length === 0 ? (
                <Text mt={16}>該当するアニメがありません</Text>
            ) : (
                <>
                    <Box minH={{ base: 'auto', lg: '700px' }}>
                        <SimpleGrid
                            width={'100%'}
                            columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
                            mt={16}
                            gap={'30px'}
                        >
                            {animes.data.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} />
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* ページネーション作成 */}
                    <HStack mt={3} justify={'center'}>
                        {animes.links.map((link, index) => (
                            <Button
                                key={index}
                                asChild
                                disabled={link.url === null}
                                variant={link.active ? 'solid' : 'outline'}
                            >
                                {/* linkのurlによってボタンの表示を変える */}
                                {link.url ? (
                                    <Link href={link.url}>
                                        {index === 0
                                            ? '前へ'
                                            : index === animes.links.length - 1
                                              ? '次へ'
                                              : link.label}
                                    </Link>
                                ) : (
                                    <span>{index === 0 ? '前へ' : '次へ'}</span>
                                )}
                            </Button>
                        ))}
                    </HStack>
                </>
            )}
        </Box>
    );
}
