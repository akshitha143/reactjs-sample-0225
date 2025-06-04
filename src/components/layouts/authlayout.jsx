import logo from "../../assets/images/logo.png";

const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A4A8C] px-4">
      <div className="w-full max-w-md text-white relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center opacity-10 z-0 ">
        <img
          src={logo}
          alt="Logo Watermark"
          className="w-[550px] object-contain "
        />
        <h1 className="relative -top-28  lg:text-6xl text-white font-bold" >campus.build</h1>
        <p className="relative -top-20 text-3xl text-white/40 tracking-widest">CAREERS. NOT JOBS</p>
      </div>
    </div>
  );
};

export default AuthLayout;
