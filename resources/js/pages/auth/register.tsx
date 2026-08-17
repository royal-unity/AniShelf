import {
    Box,
    Button,
    Card,
    Link as ChakraLink,
    Field,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Form, Head, Link as InertiaLink } from '@inertiajs/react';
import { login } from '@/routes';
import { store } from '@/routes/register';
export default function Register() {
    return (
        <>
            <Head title="新規登録" />
            <Card.Root
                borderWidth={'1px'}
                borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                borderRadius={'xl'}
                bg={{ base: 'white', _dark: 'gray.900' }}
                boxShadow={'sm'}
                overflow={'hidden'}
            >
                <Box h={1} bg={'teal.500'}></Box>

                <Card.Body p={{ base: '6', sm: '8' }}>
                    <Form {...store.form()} noValidate>
                        {({ processing, errors }) => (
                            <VStack gap={6}>
                                <Field.Root
                                    required
                                    invalid={Boolean(errors.name)}
                                >
                                    <Field.Label fontWeight={'semibold'}>
                                        ユーザー名
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="name"
                                        name="name"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        placeholder="user"
                                        size="lg"
                                        borderColor={{
                                            base: 'gray.300',
                                            _dark: 'gray.600',
                                        }}
                                    />
                                    <Field.ErrorText>
                                        {errors.name}
                                    </Field.ErrorText>
                                </Field.Root>
                                <Field.Root
                                    required
                                    invalid={Boolean(errors.email)}
                                >
                                    <Field.Label fontWeight={'semibold'}>
                                        メールアドレス
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        tabIndex={1}
                                        autoComplete="name"
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
                                <Field.Root
                                    required
                                    invalid={Boolean(errors.password)}
                                >
                                    <Field.Label fontWeight={'semibold'}>
                                        パスワード
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={1}
                                        autoComplete="password"
                                        placeholder="password"
                                        size="lg"
                                        borderColor={{
                                            base: 'gray.300',
                                            _dark: 'gray.600',
                                        }}
                                    />
                                    <Field.HelperText>
                                        12文字以上
                                        <br />
                                        大文字・小文字・数字・記号を含めてください
                                    </Field.HelperText>
                                    <Field.ErrorText>
                                        {errors.password}
                                    </Field.ErrorText>
                                </Field.Root>
                                <Field.Root
                                    required
                                    invalid={Boolean(
                                        errors.password_confirmation,
                                    )}
                                >
                                    <Field.Label fontWeight={'semibold'}>
                                        パスワード再入力
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        required
                                        tabIndex={1}
                                        autoComplete="password_confirmation"
                                        placeholder="password"
                                        size="lg"
                                        borderColor={{
                                            base: 'gray.300',
                                            _dark: 'gray.600',
                                        }}
                                    />
                                    <Field.ErrorText>
                                        {errors.password_confirmation}
                                    </Field.ErrorText>
                                </Field.Root>
                                <Button
                                    type="submit"
                                    size="lg"
                                    width="full"
                                    mt="1"
                                    tabIndex={4}
                                    loading={processing}
                                    loadingText="登録中"
                                    colorPalette="teal"
                                    data-test="login-button"
                                >
                                    新規登録
                                </Button>
                            </VStack>
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
                        アカウントをお持ちですか？{' '}
                        <ChakraLink
                            asChild
                            color="teal.600"
                            fontWeight="semibold"
                            textDecoration={'none'}
                        >
                            <InertiaLink href={login()} tabIndex={5}>
                                ログイン
                            </InertiaLink>
                        </ChakraLink>
                    </Text>
                </Card.Footer>
            </Card.Root>
        </>
    );
}

Register.layout = {
    title: '新規登録',
};
