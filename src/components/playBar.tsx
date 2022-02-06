import styled from "styled-components";
import { 
    PauseCircleFilled, 
    PlayCircleFilled, 
    StepForwardFilled, 
    StepBackwardFilled,
    SoundOutlined
} from '@ant-design/icons';
import { ReactNode } from "react";
import { Slider } from "antd";


export const PlayTool = styled.section`
    width: 100%;
    position: fixed;
    padding: 20px;
    bottom: 0;
    left: 0;
    background-color: #6c757d;
    border-top: 3px solid #a4c4bb;
    z-index: 5;
    display: flex;
    align-items: center;
    
    .playItem{
        width: 33.333333%;
        height: 60px;
        text-align: center;
    }
    .playItem:first-child,
    .playItem:last-child{
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .playItem:last-child{
        justify-content: end;

    }
`;


export default function PlayBar(){
    const style = {fontSize: 30, color: "#fff", margin: "0 10px", cursor: "pointer", verticalAlign: "middle"};

    function formatter(value: ReactNode|null) {
        return `${value}%`;
      }

    return(
        <>
            <PlayTool>
                <div className="playItem">
                    現正播放：
                </div>
                <div className="playItem">
                    <StepBackwardFilled style={style}/>
                    <PlayCircleFilled style={style}/>
                    <PauseCircleFilled style={style}/>
                    <StepForwardFilled style={style}/>
                    <Slider min={0} max={100} defaultValue={50} style={{width: "100%", verticalAlign: "top"}}/>

                </div>
                <div className="playItem">
                    <SoundOutlined style={{...style, fontSize: 25}}/>
                    <Slider tipFormatter={formatter} min={0} max={100} defaultValue={50} style={{width: 150, verticalAlign: "top", display: "inline-block"}}/>
                </div>
            </PlayTool>
        </>
    )
}





