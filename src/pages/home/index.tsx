import React from 'react'
import { Card } from "antd";
import { DESCRIPTIONS } from './constants'
import './index.less'

const Home: React.FC = () => {

    return (
        <div className='home-container'>
            <h2>WangYu-admin使用说明</h2>
            <ul className='home-content'>
                {DESCRIPTIONS.map(({ text }) => (
                    <li className='home-content-item'>
                        <span>{text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
