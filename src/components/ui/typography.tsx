import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "leading-relaxed [&:not(:first-child)]:mt-6",
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      muted: "text-muted-foreground leading-relaxed [&:not(:first-child)]:mt-6",
      bold: "font-bold",
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

export const Paragraph = ({
  className,
  variant,
  size,
  ...props
}: TypographyProps) => {
  return (
    <p
      className={cn(typographyVariants({ variant, size, className }))}
      {...props}
    />
  );
};
