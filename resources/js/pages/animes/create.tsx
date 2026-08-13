import {
    Button,
    Checkbox,
    createListCollection,
    Field,
    FileUpload,
    Float,
    HStack,
    Input,
    Portal,
    Select,
    Text,
    Textarea,
    useFileUploadContext,
    VStack,
} from '@chakra-ui/react';
import { Form, Link } from '@inertiajs/react';
import PageContainer from '@/components/PageContainer';
import { index, store } from '@/routes/animes';

type Genres = {
    id: number;
    name: string;
};

type AnimeCreateProps = {
    genres: Genres[];
};

export default function AnimeCreate({ genres }: AnimeCreateProps) {
    // ジャンルのコレクションを作成
    const genreCollection = createListCollection({
        items: genres.map((genre) => ({
            label: genre.name,
            value: String(genre.id),
        })),
    });

    // 画像プレビュー
    const FileUploadList = () => {
        const fileUpload = useFileUploadContext();
        const file = fileUpload.acceptedFiles[0];

        if (!file) {
            return null;
        }

        return (
            <FileUpload.ItemGroup>
                <FileUpload.Item width="100%" height="200px" p="2" file={file}>
                    <FileUpload.ItemPreviewImage
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        borderRadius="md"
                    />

                    <Float placement="top-end">
                        <FileUpload.ItemDeleteTrigger
                            boxSize="5"
                            layerStyle="fill.solid"
                        />
                    </Float>
                </FileUpload.Item>
            </FileUpload.ItemGroup>
        );
    };

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
                    <>
                        {' '}
                        <VStack maxW={'600px'} mx={'auto'} gap={6}>
                            <Field.Root
                                invalid={Boolean(errors.anime_img_path)}
                            >
                                <Field.Label fontWeight={'semibold'}>
                                    アニメ画像
                                </Field.Label>
                                <FileUpload.Root
                                    accept=" image/jpg,image/jpeg,image/png"
                                    maxFiles={1}
                                >
                                    <FileUpload.HiddenInput name="anime_img_path" />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            画像を選択
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUploadList />
                                </FileUpload.Root>
                                <Field.HelperText>
                                    対応拡張子 : jpg jpeg png
                                </Field.HelperText>
                                <Field.ErrorText>
                                    {errors.anime_img_path}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root required invalid={Boolean(errors.name)}>
                                <Field.Label fontWeight={'semibold'}>
                                    タイトル
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="アニメタイトル"
                                    size="lg"
                                    borderColor={{
                                        base: 'gray.300',
                                        _dark: 'gray.600',
                                    }}
                                />
                                <Field.ErrorText>{errors.name}</Field.ErrorText>
                                <Field.HelperText>最大255文字</Field.HelperText>
                            </Field.Root>
                            <Field.Root
                                invalid={Boolean(errors.official_site_url)}
                            >
                                <Field.Label fontWeight={'semibold'}>
                                    公式サイトURL
                                </Field.Label>
                                <Input
                                    type="text"
                                    name="official_site_url"
                                    required
                                    tabIndex={1}
                                    autoComplete="official_site_url"
                                    placeholder="https://sample.com"
                                    size="lg"
                                    borderColor={{
                                        base: 'gray.300',
                                        _dark: 'gray.600',
                                    }}
                                />
                                <Field.ErrorText>
                                    {errors.official_site_url}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={Boolean(errors.description)}>
                                <Field.Label fontWeight={'semibold'}>
                                    概要
                                </Field.Label>
                                <Textarea
                                    name="description"
                                    placeholder="アニメの説明"
                                />
                                <Field.ErrorText>
                                    {errors.description}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root
                                required
                                invalid={Boolean(errors.genre_id)}
                            >
                                <Field.Label fontWeight={'semibold'}>
                                    ジャンル
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Select.Root
                                    name="genre_id"
                                    collection={genreCollection}
                                    size="sm"
                                    width="320px"
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="ジャンルを選択してください" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {genreCollection.items.map(
                                                    (genre) => (
                                                        <Select.Item
                                                            item={genre}
                                                            key={genre.value}
                                                        >
                                                            {genre.label}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ),
                                                )}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                                <Field.ErrorText>
                                    {errors.genre_id}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root
                                required
                                invalid={Boolean(errors.is_current_season)}
                            >
                                <Checkbox.Root
                                    name="is_current_season"
                                    value="1"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>現在放送中</Checkbox.Label>
                                </Checkbox.Root>

                                <Field.ErrorText>
                                    {errors.is_current_season}
                                </Field.ErrorText>
                            </Field.Root>

                            <HStack gap={10}>
                                <Button type="submit" loading={processing}>
                                    登録する
                                </Button>

                                <Link href={index()}>
                                    <Button type="button">キャンセル</Button>
                                </Link>
                            </HStack>
                        </VStack>
                    </>
                )}
            </Form>
        </PageContainer>
    );
}
