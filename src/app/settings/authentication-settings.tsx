import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AuthenticationSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-medium leading-none">Welcome to Instant Mode!</p>
          <p className="text-muted-foreground">
            Explore the app&apos;s features with no sign-in required.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
