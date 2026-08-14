import AnimeForm from '@/components/AnimeForm/AnimeForm';
import PageContainer from '@/components/PageContainer';
import { store } from '@/routes/animes';
import { Genres } from '@/types/animes/genre';
import { Text } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';

type AnimeCreateProps = {
    genres: Genres[];
};

export default function AnimeCreate({ genres }: AnimeCreateProps) {
    return (
        <PageContainer>
            <Text
                as={'h1'}
                fontSize={'3xl'}
                fontWeight={'bold'}
                mb={18}
                textAlign={'center'}
            >
                アニメ登録
            </Text>

            <Form {...store.form()} noValidate>
                {({ processing, errors }) => (
                    <AnimeForm
                        genres={genres}
                        processing={processing}
                        errors={errors}
                        submitLabel="登録"
                    />
                )}
            </Form>
        </PageContainer>
    );
}
