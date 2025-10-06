import { HeaderLanding } from "@/components/HeaderLanding";

export const ErrorPage = () => {
  return (
    <div className="bg-white h-screen">
        <HeaderLanding showLogin={true} showNavItems={true} showRegister={true} />
        <h1 className="text-5xl font-bold text-center pt-56 text-black font-Grotesk">404</h1>
        <h1 className="text-3xl font-bold text-center pt-3 text-black font-Grotesk">Page Not Found</h1>
        <p className="text-center text-black font-Grotesk">Sorry, the page you are looking for does not exist.</p>
     </div>
  );
};
