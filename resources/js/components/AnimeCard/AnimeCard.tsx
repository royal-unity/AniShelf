import { Badge, Card, CardBody, CardRoot, Link } from '@chakra-ui/react';
import type { Anime } from '@/types/animes/anime';
import AnimeImage from './AnimeImage';

// コントローラーから渡されるアニメの型
type AnimeCardProps = {
    anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <Link
            href={`animes/${anime.id}`}
            textDecoration={'none'}
            cursor={'pointer'}
        >
            <CardRoot
                key={anime.id}
                mb={4}
                width={'100%'}
                transition="box-shadow 0.2s ease, transform 0.2s ease"
                _hover={{
                    boxShadow: 'lg',
                    transform: 'translateY(-4px)',
                }}
            >
                <AnimeImage
                    animeImagePath={anime.anime_img_path}
                    animeName={anime.name}
                    maxHeightMode="index"
                />
                <CardBody>
                    <Card.Title fontSize={'sm'}>{anime.name}</Card.Title>

                    <Badge mt={4} fontSize="xs" alignSelf="flex-start">
                        {anime.genre.name}
                    </Badge>
                </CardBody>
            </CardRoot>
        </Link>
    );
}
