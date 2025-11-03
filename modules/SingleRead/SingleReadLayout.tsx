import Footer from '@/components/common/Footer/Footer';
import Navbar from '@/components/common/NavBar/Navbar';

const SingleReadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar /> 
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
};

export default SingleReadLayout;
