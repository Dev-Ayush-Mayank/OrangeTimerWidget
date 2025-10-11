import { Tilt } from "../../components/motion-primitives/tilt";

export const TiltCard = () => {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: "12px",
          marginBottom: "20px",
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 cursor-pointer hover:shadow-lg hover:shadow-zinc-950/10 dark:hover:shadow-zinc-50/10 transition-shadow duration-300'
      >
        <img
          src='https://images.prismic.io/bankpager-01/aOUyD55xUNkB1ska_download-2-.jpeg?auto=format,compress'
          alt='upgrade rocket'
          className='h-48 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50'></h1>
          <p className='text-zinc-700 dark:text-zinc-400'>
            Diwali super sale - up to 60% off all plans!
          </p>
        </div>
      </div>
    </Tilt>
  );
};
