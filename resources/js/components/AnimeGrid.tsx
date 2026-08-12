import { SimpleGrid } from '@chakra-ui/react';
import type { Anime } from '@/types/animes/anime';
import AnimeCard from './AnimeCard/AnimeCard';

type AnimeGridProps = {
    animes: Anime[];
};

export default function AnimeGrid({ animes }: AnimeGridProps) {
    return (
        <>
            <SimpleGrid
                width={'100%'}
                columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
                mt={16}
                gap={'30px'}
            >
                {animes.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </SimpleGrid>
        </>
    );
}
