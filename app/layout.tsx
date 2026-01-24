import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'GrowZen | 禅生定，定生慧',
    template: '%s | GrowZen',
  },
  description: 'Buddhist wisdom following lunar cycles. Where meditation blooms into wisdom.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
