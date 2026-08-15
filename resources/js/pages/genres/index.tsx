import {
    Badge,
    Box,
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Portal,
    Stack,
    Table,
    Text,
    VStack,
} from '@chakra-ui/react';
import { router, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { destroy, store, update } from '@/routes/genres';
import type { Genres } from '@/types/animes/genre';

// コントローラーから渡されるアニメの型
type GenreIndexProps = {
    genres: Genres[];
};

export default function GenresIndex({ genres }: GenreIndexProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<Genres | null>(null);

    const genreForm = useForm({ name: '' });

    const openCreateDialog = () => {
        setSelectedGenre(null);
        genreForm.setData('name', '');
        genreForm.clearErrors();
        setIsFormOpen(true);
    };

    const openEditDialog = (genre: Genres) => {
        setSelectedGenre(genre);
        genreForm.setData('name', genre.name);
        genreForm.clearErrors();
        setIsFormOpen(true);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = {
            preserveScroll: 'errors' as const,
            onSuccess: () => setIsFormOpen(false),
        };

        if (selectedGenre) {
            genreForm.put(update(selectedGenre.id).url, options);

            return;
        }

        genreForm.post(store().url, options);
    };

    const handleDelete = (genre: Genres) => {
        router.delete(destroy(genre.id).url);
    };

    return (
        <PageContainer>
            <VStack w="100%" gap={{ base: 6, md: 8 }} align="stretch">
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align={{ base: 'stretch', sm: 'center' }}
                    gap={4}
                >
                    <Box>
                        <Text
                            as="h1"
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="bold"
                            letterSpacing="tight"
                        >
                            ジャンル一覧
                        </Text>
                        <Text mt={1} color="fg.muted" fontSize="sm">
                            アニメに設定するジャンルを管理します
                        </Text>
                    </Box>
                    <Button
                        colorPalette="black"
                        onClick={openCreateDialog}
                        alignSelf={{ base: 'stretch', sm: 'center' }}
                    >
                        ジャンルを登録
                    </Button>
                </Stack>

                {genres.length ? (
                    <Box
                        borderWidth="1px"
                        borderColor="border"
                        borderRadius="xl"
                        overflowX="auto"
                        bg="bg.panel"
                        shadow="sm"
                    >
                        <Table.Root size={{ base: 'sm', md: 'lg' }} interactive>
                            <Table.Header>
                                <Table.Row bg="bg.muted">
                                    <Table.ColumnHeader
                                        py={4}
                                        fontWeight="bold"
                                        w={{ base: '45%', md: '60%' }}
                                    >
                                        ジャンル名
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        py={4}
                                        fontWeight="bold"
                                        textAlign="center"
                                        w={{ base: '20%', md: '20%' }}
                                    >
                                        登録件数
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        py={4}
                                        textAlign="center"
                                        fontWeight="bold"
                                        w={{ base: '35%', md: '20%' }}
                                    >
                                        操作
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {genres.map((genre) => (
                                    <Table.Row key={genre.id}>
                                        <Table.Cell py={4} fontWeight="medium">
                                            {genre.name}
                                        </Table.Cell>
                                        <Table.Cell py={4} textAlign="center">
                                            <Badge
                                                colorPalette="blue"
                                                variant="subtle"
                                                size="lg"
                                                minW="2.5em"
                                                justifyContent="center"
                                                borderRadius="full"
                                            >
                                                {genre.animes_count}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell py={4}>
                                            <Stack
                                                gap={2}
                                                justify="center"
                                                direction={{
                                                    base: 'column',
                                                    md: 'row',
                                                }}
                                                ml="auto"
                                            >
                                                <Button
                                                    size="sm"
                                                    colorPalette="blue"
                                                    variant="subtle"
                                                    w={{
                                                        base: '100%',
                                                        md: 'auto',
                                                    }}
                                                    onClick={() =>
                                                        openEditDialog(genre)
                                                    }
                                                >
                                                    編集
                                                </Button>

                                                <Dialog.Root
                                                    role="alertdialog"
                                                    placement={'center'}
                                                    closeOnInteractOutside={
                                                        true
                                                    }
                                                >
                                                    <Dialog.Trigger asChild>
                                                        <Button
                                                            size="sm"
                                                            colorPalette="red"
                                                            variant="subtle"
                                                            w={{
                                                                base: '100%',
                                                                md: 'auto',
                                                            }}
                                                        >
                                                            削除
                                                        </Button>
                                                    </Dialog.Trigger>

                                                    <Portal>
                                                        <Dialog.Backdrop />

                                                        <Dialog.Positioner>
                                                            <Dialog.Content
                                                                borderRadius="xl"
                                                                mx={4}
                                                            >
                                                                <Dialog.Header>
                                                                    <Dialog.Title
                                                                        fontSize="xl"
                                                                        fontWeight="bold"
                                                                    >
                                                                        ジャンルを削除しますか？
                                                                    </Dialog.Title>
                                                                </Dialog.Header>

                                                                <Dialog.Body>
                                                                    <Box
                                                                        p={4}
                                                                        bg="red.subtle"
                                                                        borderRadius="lg"
                                                                    >
                                                                        <Text fontWeight="medium">
                                                                            「
                                                                            {
                                                                                genre.name
                                                                            }
                                                                            」を削除します。
                                                                        </Text>
                                                                        <Text
                                                                            mt={
                                                                                1
                                                                            }
                                                                            color="fg.muted"
                                                                            fontSize="sm"
                                                                        >
                                                                            この操作は取り消せません。
                                                                        </Text>
                                                                    </Box>
                                                                </Dialog.Body>

                                                                <Dialog.Footer
                                                                    gap={3}
                                                                >
                                                                    <Dialog.ActionTrigger
                                                                        asChild
                                                                    >
                                                                        <Button variant="outline">
                                                                            キャンセル
                                                                        </Button>
                                                                    </Dialog.ActionTrigger>

                                                                    <Button
                                                                        colorPalette="red"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                genre,
                                                                            )
                                                                        }
                                                                    >
                                                                        削除する
                                                                    </Button>
                                                                </Dialog.Footer>

                                                                <Dialog.CloseTrigger />
                                                            </Dialog.Content>
                                                        </Dialog.Positioner>
                                                    </Portal>
                                                </Dialog.Root>
                                            </Stack>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                ) : (
                    <Text>ジャンルが登録されていません</Text>
                )}
            </VStack>

            {/* アニメ登録・更新のダイアログ */}
            <Dialog.Root
                open={isFormOpen}
                onOpenChange={({ open }) => setIsFormOpen(open)}
                placement={'center'}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content borderRadius="xl" mx={4}>
                            <form onSubmit={handleSubmit} noValidate>
                                <Dialog.Header>
                                    <Dialog.Title
                                        fontSize="xl"
                                        fontWeight="bold"
                                    >
                                        {selectedGenre
                                            ? 'ジャンル編集'
                                            : 'ジャンル登録'}
                                    </Dialog.Title>
                                    <Text mt={1} color="fg.muted" fontSize="sm">
                                        {selectedGenre
                                            ? 'ジャンル名を変更します'
                                            : '新しいジャンルを追加します'}
                                    </Text>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Field.Root
                                        required
                                        invalid={Boolean(genreForm.errors.name)}
                                    >
                                        <Field.Label>
                                            ジャンル名
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <Input
                                            name="name"
                                            value={genreForm.data.name}
                                            onChange={(event) =>
                                                genreForm.setData(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="例：アクション"
                                            autoFocus
                                            size="lg"
                                        />

                                        <Field.ErrorText>
                                            {genreForm.errors.name}
                                        </Field.ErrorText>
                                        <Field.HelperText>
                                            255文字以内で入力してください
                                        </Field.HelperText>
                                    </Field.Root>
                                </Dialog.Body>
                                <Dialog.Footer gap={3}>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline" w={'6em'}>
                                            キャンセル
                                        </Button>
                                    </Dialog.ActionTrigger>
                                    <Button
                                        type="submit"
                                        colorPalette="blue"
                                        loading={genreForm.processing}
                                        w={'6em'}
                                    >
                                        {selectedGenre ? '更新' : '登録'}
                                    </Button>
                                </Dialog.Footer>
                            </form>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </PageContainer>
    );
}
