import Footer from '@/components/common/Footer/Footer';
import Navbar from '@/components/common/NavBar/Navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
