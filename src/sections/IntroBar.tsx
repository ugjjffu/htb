


import Image from 'next/image';
import React from 'react';

const IntroBar: React.FC = ({
}) => {
    return (
        <div className="col-span-2 min-xs:w-[1156px] max-xs:w-[85%] bg-white rounded-lg shadow-md mx-auto"> {/* Adjusted width/padding for content container */}
            <div id="section13" className="flex-col bg-white text-white text-xl flex items-center min-[920px]:h-[152px]">
                <span className="text-black font-bold w-full">企业商旅</span>
                <div className="flex max-[920px]:flex-col w-full h-full mt-2 max-[920px]:space-y-5">
                    <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #cedcf1ff 0%, #98bff8ff 100%)' }}>
                        <div className="relative flex items-center justify-center p-5">
                            <Image fill alt="image not found" src="/firm1.png" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-black">一站式企业差旅服务</div>
                            <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                                <div className="block mt-1">
                                    一站式企业差旅服务海量差旅产品，全流程服务，智能管控，助企业成本节省高达30%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #f1ebdeff 0%, #f2c68cff 100%)' }}>
                        <div className="relative flex items-center justify-center p-5">
                            <Image fill alt="image not found" src="/firm2.png" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-black">公对公结算</div>
                            <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                                <div className="block mt-1">
                                    15分钟极速开通公司账户、30+20天超长账期，自助对账，统一开票、配送！
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row h-full items-center rounded-[5px] max-[920px]:rounded-[30px]" style={{ background: 'linear-gradient(135deg, #e2f1deff 0%, #b8f694ff 100%)' }}>
                        <div className="relative flex items-center justify-center p-5">
                            <Image fill alt="image not found" src="/firm3.png" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-black">企业方案量身定制</div>
                            <div className="h-10 mt-0" style={{ fontSize: "14px" }}>
                                <div className="block mt-1">
                                    强大的产品技术&服务解决方案 ，支持企业规模在500人以上中大型企业定制
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroBar;