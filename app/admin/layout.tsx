import AdminLayout from '@/modules/Admin/AdminLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (<AdminLayout>{children}</AdminLayout>);
};

export default Layout;
