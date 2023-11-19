import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";

export const AuthenticationSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Paragraph>Welcome to Instant Mode!</Paragraph>
          <Paragraph variant="muted" size="sm">
            Explore the app&apos;s features with no sign-in required.
          </Paragraph>
        </div>
      </CardContent>
    </Card>
  );
};
