import { Collapse } from 'antd';
import React from 'react';

const { Panel } = Collapse;

const text = `
  A simple collapsible panel,
  When you click the header, the content (and the arrow)
  toggles up or down.
`;

const CollapsibleExample = () => (
  <Collapse
    // You can set the border, style, etc.
    defaultActiveKey={['1']} 
    // This prop allows you to change the icon
    // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} 
  >
    <Panel header="Click to Expand/Collapse" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="Another Panel" key="2">
      <p>More content here.</p>
    </Panel>
  </Collapse>
);

export default CollapsibleExample;