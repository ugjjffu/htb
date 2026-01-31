import React from 'react';
import style from "@/css/LoadingAnimation.module.css"
const HorizontalPair: React.FC = () => {
    return (
        <section className={`w-full h-8 p-1 flex flex-row justify-center items-center`}>
            <div className={`w-10 h-full ${style.pulsing_box}`}>
            </div>
            <div className={`h-full ml-3 w-80 ${style.pulsing_box}`}>
            </div>
        </section>
    );
};

export default HorizontalPair;