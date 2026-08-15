import { Text } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import AnimeForm from '@/components/AnimeForm/AnimeForm';
import PageContainer from '@/components/PageContainer';
import { update } from '@/routes/animes';
import type { Anime } from '@/types/animes/anime';
import type { Genres } from '@/types/animes/genre';

type AnimeEditProps = {
    anime: Anime;
    genres: Genres[];
};

export default function AnimeEdit({ genres, anime }: AnimeEditProps) {
    return (
        <PageContainer>
            <Text
                as={'h1'}
                fontSize={'3xl'}
                fontWeight={'bold'}
                mb={18}
                textAlign={'center'}
            >
                アニメ編集
            </Text>

            <Form {...update.form(anime.id)} noValidate>
                {({ processing, errors }) => (
                    <AnimeForm
                        anime={anime}
                        genres={genres}
                        processing={processing}
                        errors={errors}
                        submitLabel="更新"
                    />
                )}
            </Form>
        </PageContainer>
    );
}
