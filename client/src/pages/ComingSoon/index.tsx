
import Lottie from 'lottie-react';
import animationData from '../../assets/lotties/earth.json'

const ComingSoon = () => {


  return (
    <main className="p-20 lg:p-20 flex w-full h-screen items-center justify-center">
    
      <div className='w-full lg:w-3/6'>
        <div className='text-xl font-bold'>Our website in under construction</div>
        <br></br>
        <div className='text-3xl font-bold'>
          Something Big update is coming by our team. Wait! We are launching
          soon with amazing updates!
        </div>
        <br></br>
        <div className='text-xl font-bold'>BigBang Team</div>
      </div>

      <Lottie className='hidden lg:block w-3/6 ' animationData={animationData}/>

    </main>
  );
};

export default ComingSoon;
