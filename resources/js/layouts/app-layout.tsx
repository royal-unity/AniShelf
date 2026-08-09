import SiteLayout from './app/SiteLayout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <SiteLayout>{children}</SiteLayout>;
}
