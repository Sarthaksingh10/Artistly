import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeModeButton from "./ThemeModeButton";
/* header or navbar component to place inside layout */
export default function Header() {
  return (
    <header className="border-b px-8 py-5">
      <div className="flex justify-between items-center w-full mx-auto">
        <Logo />
        <ThemeModeButton />
        <Navigation />
      </div>
    </header>
  );
}
