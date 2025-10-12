import { HeaderLanding } from "@/components/HeaderLanding"

export const Home = () => {
    return (
        <div>
            <HeaderLanding showLogin={true} showRegister={true} showNavItems={true} />
            <main>
                <h1>Welcome to the Home Page</h1>
                <div className="elfsight-app-7ebe1ac2-10c6-4b6c-9b69-6933c2584be5" data-elfsight-app-lazy></div>
            </main>
        </div>
    )
}