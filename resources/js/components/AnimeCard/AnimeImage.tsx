import { Box, Image } from '@chakra-ui/react';

type animeImageProp = {
    animeImagePath: string | null;
    animeName: string;
};

export default function AnimeImage({
    animeImagePath,
    animeName,
}: animeImageProp) {
    return (
        <>
            {animeImagePath ? (
                <Image
                    src={`/storage/${animeImagePath}`}
                    alt={animeName}
                    width={'100%'}
                    maxW={'600px'}
                    height={'100%'}
                    minH={'150px'}
                    objectFit={'cover'}
                />
            ) : (
                <Box
                    width={'100%'}
                    maxW={'600px'}
                    height={'100%'}
                    minH={'150px'}
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
        </>
    );
}
