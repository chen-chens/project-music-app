import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData } from "../../reduxToolkit";
import { MinusCircleFilled } from '@ant-design/icons';
import { Avatar, List, Slider } from "antd";
import { 
    PauseCircleFilled, 
    PlayCircleFilled, 
    StepForwardFilled, 
    StepBackwardFilled,
} from '@ant-design/icons';
import React from "react";

const PlayTool = styled.section`
    width: 100%;
    position: fixed;
    padding: 20px;
    bottom: 0;
    left: 0;
    background-color: #313a46;
    border-top: 3px solid var(--success-color);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CurrentPlayingInfo = styled.section`
    flex: 1 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ant-list-item-meta.playBarInfo{
        width: 100%;
    }

    .ant-list-item-meta.playBarInfo .ant-list-item-meta-avatar{
        display: none;
    }
    .ant-list-item-meta.playBarInfo .ant-list-item-meta-content .ant-list-item-meta-title,
    .ant-list-item-meta.playBarInfo .ant-list-item-meta-content .ant-list-item-meta-description{
        color: var(--success-color-100); 
    }
    .ant-list-item-meta.playBarInfo .ant-list-item-meta-content .ant-list-item-meta-title{
        font-size: calc(var(--font-size-base) * 1.2);
    }
    .ant-list-item-meta.playBarInfo .ant-list-item-meta-content .ant-list-item-meta-description{
        font-size: var(--font-size-base);
    }

    @media(min-width: 768px){
        flex-direction: row;

        .ant-list-item-meta.playBarInfo .ant-list-item-meta-avatar{
            display: block;
        }
    }
`;

const PlayController = styled.div`
    flex: 1 0;
    text-align: center;

    .anticon{
        font-size: 2rem;
        color: var(--success-color-100);
        margin: 0 10px;
        cursor: pointer;
        vertical-align: middle;
    }
    .ant-slider{
        width: 100%;
    }
    .ant-slider .ant-slider-mark-text{
        color: var(--success-color-100);
    }
    .ant-slider-track{
        background-color: var(--primary-color);
    }
    .ant-slider-rail{
        background-color: var(--gray-400);
    }
`;

/* PlayBar */
export default function PlayBar(){
    const style = {};
    const dispatch = useDispatch();
    const targetItem = useSelector(currentPlayingData.currentPlayingItem);

    return(
        <PlayTool>
            <CurrentPlayingInfo>
                <MinusCircleFilled 
                    style={{fontSize: "2rem", marginRight: 15, color: "#a4c4bb"}} 
                    onClick={()=> dispatch(currentPlayingActions.stopPlaying())}
                />
                <List.Item.Meta
                    className="playBarInfo"
                    avatar={ <Avatar src={targetItem?.album?.images[2]?.url} shape="square" size={60}/> }
                    title={targetItem?.name}
                    description={targetItem?.artists[0]?.name}
                />
            </CurrentPlayingInfo>

            <PlayController>
                <StepBackwardFilled />
                <PlayCircleFilled />
                <PauseCircleFilled />
                <StepForwardFilled />
                <Slider min={0} max={30} defaultValue={10} marks={{0: "00:00", 30: "00:30"}}/>
            </PlayController>
            <div style={{flex: "1 1"}}>
                <audio src={targetItem?.preview_url} autoPlay></audio>
            </div>
        </PlayTool>  
    )
}





