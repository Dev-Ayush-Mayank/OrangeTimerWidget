import { HeaderLanding } from "@/components/HeaderLanding"

export const Home = () => {
    return (
        <div>
            <HeaderLanding showLogin={true} showRegister={true} showNavItems={true} />
            <main>
                <h1>Welcome to the Home Page</h1>
            </main>
        </div>
    )
}