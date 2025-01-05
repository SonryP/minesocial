import { UserMenu } from "./UserMenu";
import { UserMenuProps } from "/@/types/userMenu";
import { useLocale } from "./Locale";

export function Header({ username, avatarUrl }: UserMenuProps) {
    const locale = useLocale("timeline");

    return (
        <header className="fixed top-0 left-0 right-0 bg-black shadow-sm z-10">
            <div className="absolute inset-0 bg-block-grass-side opacity-40 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-gray/50 to-white mix-blend-overlay z-0"></div>
            <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center h-12">
                <h1 className="text-2xl font-bold text-white dark:text-white">{locale.timelineHeader}</h1>
                <UserMenu username={username!} avatarUrl={avatarUrl} />
            </div>
        </header>
    )
}