import {
    Box,
    Button,
    Card,
    Link as ChakraLink,
    Checkbox,
    Field,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Form, Head, Link } from '@inertiajs/react';
import { register } from '@/routes';
import { store } from '@/routes/login';

export default function Login() {
    return (
        <>
            <Head title="ログイン" />

            <Card.Root
                borderWidth="1px"
                borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                borderRadius="xl"
                bg={{ base: 'white', _dark: 'gray.900' }}
                boxShadow="sm"
                overflow="hidden"
            >
                <Box h="1" bg="teal.500" />

                <Card.Body p={{ base: '6', sm: '8' }}>
                    <Form {...store.form()} noValidate>
                        {({ processing, errors }) => (
                            <Stack gap="6">
                                <Field.Root invalid={Boolean(errors.email)}>
                                    <Field.Label fontWeight="semibold">
                                        メールアドレス
                                    </Field.Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        size="lg"
                                        borderColor={{
                                            base: 'gray.300',
                                            _dark: 'gray.600',
                                        }}
                                    />
                                    <Field.ErrorText>
                                        {errors.email}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={Boolean(errors.password)}>
                                    <Field.Label fontWeight="semibold">
                                        パスワード
                                    </Field.Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="パスワードを入力"
                                        size="lg"
                                        borderColor={{
                                            base: 'gray.300',
                                            _dark: 'gray.600',
                                        }}
                                    />
                                    <Field.ErrorText>
                                        {errors.password}
                                    </Field.ErrorText>
                                </Field.Root>

                                <Checkbox.Root
                                    name="remember"
                                    value="1"
                                    tabIndex={3}
                                    colorPalette="teal"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>
                                        ログイン状態を保持する
                                    </Checkbox.Label>
                                </Checkbox.Root>

                                <Button
                                    type="submit"
                                    size="lg"
                                    width="full"
                                    mt="1"
                                    tabIndex={4}
                                    loading={processing}
                                    loadingText="ログイン中"
                                    colorPalette="teal"
                                    data-test="login-button"
                                >
                                    ログイン
                                </Button>
                            </Stack>
                        )}
                    </Form>
                </Card.Body>

                <Card.Footer
                    justifyContent="center"
                    borderTopWidth="1px"
                    borderColor={{ base: 'gray.100', _dark: 'gray.800' }}
                    bg={{ base: 'gray.50', _dark: 'gray.950' }}
                    py="4"
                >
                    <Text fontSize="sm" color="fg.muted">
                        アカウントをお持ちでないですか？{' '}
                        <ChakraLink
                            asChild
                            color="teal.600"
                            fontWeight="semibold"
                            textDecoration={'none'}
                        >
                            <Link href={register()} tabIndex={5}>
                                新規登録
                            </Link>
                        </ChakraLink>
                    </Text>
                </Card.Footer>
            </Card.Root>
        </>
    );
}

Login.layout = {
    title: 'ログイン',
};
