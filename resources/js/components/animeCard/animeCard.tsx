import {
    Badge,
    Box,
    Card,
    CardBody,
    CardRoot,
    HStack,
    Image,
} from '@chakra-ui/react';
import type { Anime } from '@/types/animes/anime';

// コントローラーから渡されるアニメの型
type AnimeCardProps = {
    anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <CardRoot key={anime.id} mb={4} width={'100%'}>
            {anime.anime_img_path ? (
                <Image
                    src={`/storage/${anime.anime_img_path}`}
                    alt={anime.name}
                    width={'100%'}
                    height={'150px'}
                    objectFit={'cover'}
                />
            ) : (
                <Box
                    width={'100%'}
                    height={'150px'}
                    backgroundColor={'gray.300'}
                    color={'gray.500'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    fontSize={'lg'}
                >
                    No Image
                </Box>
            )}
            <CardBody>
                <Card.Title>{anime.name}</Card.Title>
                <HStack mt={4}>
                    <Badge>{anime.genre.name}</Badge>
                </HStack>
            </CardBody>
        </CardRoot>
    );
}
