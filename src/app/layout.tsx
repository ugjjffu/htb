import AntdRegistry from '@/app/antd-registry';
import { ConfigProvider } from 'antd';
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bgUrl = '/bg-rc.jpg';   // 与背景图地址保持一致

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href={bgUrl} fetchPriority="high" />
        <meta name="description" content="即刻预订全球机票、火车票、巴士票，一站式比价、座位任选、支持支付宝/微信/信用卡，出票快、改签灵活。Book worldwide flights, trains & buses in one place. Compare fares, pick seats, pay with Alipay/WeChat/PayPal, instant confirmation and free changes.">
        </meta>
        <title>ticket booker</title>
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={{}}>
            {children}
            <Analytics />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}/*  */