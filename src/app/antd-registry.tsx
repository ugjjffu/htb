
'use client'; // must be the very first line
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import type { ReactNode } from 'react';

const cache = createCache();

export default function AntdRegistry({ children }: { children: ReactNode }) {
  // Inject styles during SSR
  useServerInsertedHTML(() => {
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  // Wrap children with StyleProvider so Antd writes styles into our cache
  return (
    <StyleProvider cache={cache} hashPriority="high">
      {children}
    </StyleProvider>
  );
}
