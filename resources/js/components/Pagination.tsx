import { Button, HStack, Link } from '@chakra-ui/react';

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: PaginationLink[];
};

export default function Pagination({ links }: PaginationProps) {
    return (
        <HStack mt={3} justify={'center'}>
            {links.map((link, index) => (
                <Button
                    key={index}
                    asChild
                    disabled={link.url === null}
                    variant={link.active ? 'solid' : 'outline'}
                >
                    {/* linkのurlによってボタンの表示を変える */}
                    {link.url ? (
                        <Link href={link.url}>
                            {index === 0
                                ? '前へ'
                                : index === links.length - 1
                                  ? '次へ'
                                  : link.label}
                        </Link>
                    ) : (
                        <span>{index === 0 ? '前へ' : '次へ'}</span>
                    )}
                </Button>
            ))}
        </HStack>
    );
}
