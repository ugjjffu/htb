import AntdRegistry from '@/app/antd-registry';
import { ConfigProvider } from 'antd';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={{ }} >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
