import Navbar from '@/components/common/NavBar/Navbar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
