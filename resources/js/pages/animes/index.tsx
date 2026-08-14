import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { Link, router, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import AnimeGrid from '@/components/AnimeGrid';
import PageContainer from '@/components/PageContainer';
import type { PaginationLink } from '@/components/Pagination';
import Pagination from '@/components/Pagination';
import { create } from '@/routes/animes';
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
    const { auth } = usePage().props;

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
                    alignSelf="flex-start"
                    justify={'space-between'}
                >
                    <HStack flex={1} gap={6}>
                        <Input
                            flex={1}
                            minW={0}
                            maxW={'300px'}
                            placeholder="検索したいアニメタイトルを入力"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <Button flexShrink={0} type="submit" px={10}>
                            検索
                        </Button>
                    </HStack>
                    {auth.user?.is_admin && (
                        <Link href={create()}>
                            <Button>アニメを登録</Button>
                        </Link>
                    )}
                </HStack>
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
