import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import AnimeGrid from '@/components/AnimeGrid';
import PageContainer from '@/components/PageContainer';
import type { PaginationLink } from '@/components/Pagination';
import Pagination from '@/components/Pagination';
import type { Anime } from '@/types/animes/anime';

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
        <PageContainer size="wide">
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
                    <Box minH={{ base: 'auto', lg: '600px' }}>
                        <AnimeGrid animes={animes.data} />
                    </Box>

                    {/* ページネーション作成 */}
                    <Pagination links={animes.links} />
                </>
            )}
        </PageContainer>
    );
}
