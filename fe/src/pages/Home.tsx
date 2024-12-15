import { Link } from 'react-router-dom';
import logo from "../../public/logo.png"

const Home = () => {


  return (
    <div className='w-full h-screen flex flex-col justify-between'>
      <div className='relative w-full overflow-hidden h-[80%] bg-red-50'>
        <img
          className='w-full h-full object-cover scale-125 object-top'
          src="https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="not showing"
        />

        <div className='absolute py-10 px-7 top-0 left-0 bg-gradient-to-b from-black/20 via-transparent to-transparent w-full h-full'>
        <img className='w-24 scale-150' src={logo} alt="not showign" />

        </div>
      </div>

      <div className='w-full h-[20%] flex flex-col justify-around px-2 py-3'>
        <h1 className='text-[2.1rem] font-bold '>Get started with drAn</h1>

        <Link className='flex w-[95%] mx-auto py-3 text-lg items-center justify-center text-white bg-black rounded-lg' to="/register">
          Continue
        </Link>
      </div>
    </div>
  );

  
};

export default Home;
