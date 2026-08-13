import { Image } from '@chakra-ui/react';

type animeImageProp = {
    animeImagePath: string | null;
    animeName: string;
    maxHeightMode: keyof typeof pagImageHeights;
};

const pagImageHeights = {
    index: '150px',
    show: '338px',
} as const;

export default function AnimeImage({
    animeImagePath,
    animeName,
    maxHeightMode,
}: animeImageProp) {
    return (
        <>
            <Image
                src={
                    animeImagePath
                        ? `/storage/${animeImagePath}`
                        : '/images/noImage.png'
                }
                alt={animeName}
                width={'100%'}
                maxW={'600px'}
                height={'100%'}
                maxH={pagImageHeights[maxHeightMode]}
                objectFit={'cover'}
            />
        </>
    );
}
