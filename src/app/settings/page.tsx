import { AuthenticationSettings } from "./authentication-settings";
import { NotificationSettings } from "./notification-settings";
import { ThemeSettings } from "./theme-settings";

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-8 lg:px-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Settings
      </h1>
      <div className="flex flex-col gap-10 max-w-md">
        <AuthenticationSettings />
        <NotificationSettings />
        <ThemeSettings />
      </div>
    </main>
  );
}
