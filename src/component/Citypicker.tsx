import { Dropdown, InputNumber, Space } from 'antd';

const TicketSelectorOverlay = () => (
  <section style={{ padding: 10, background: '#fff', border: '1px solid #d9d9d9', borderRadius: 6 }}>
    <Space direction="vertical" style={{ width: '100%' }}>
      
      {/* Adult Ticket Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Adult Ticket:</span>
        <InputNumber min={0} defaultValue={0} style={{ width: 90 }} />
      </div>

      {/* Child Ticket Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Child Ticket:</span>
        <InputNumber min={0} defaultValue={0} style={{ width: 90 }} />
      </div>
      
      {/* Oldman Ticket Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Senior Ticket:</span>
        <InputNumber min={0} defaultValue={0} style={{ width: 90 }} />
      </div>

    </Space>
  </section>
);

export default TicketSelectorOverlay;