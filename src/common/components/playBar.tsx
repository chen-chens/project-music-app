import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData } from "../../reduxToolkit";
import { MinusCircleFilled, MinusCircleOutlined, SoundOutlined } from '@ant-design/icons';
import { Avatar, List, Slider } from "antd";
import { 
    PauseCircleFilled, 
    PlayCircleFilled, 
    StepForwardFilled, 
    StepBackwardFilled,
} from '@ant-design/icons';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import AlertNotification from "./alertNotifacation";
import moment from "moment";

const PlayTool = styled.section`
    width: 100%;
    position: fixed;
    padding: 20px;
    bottom: 0;
    left: 0;
    background-color: var(--gray-800);
    border-top: 3px solid var(--success-color);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const CurrentPlayingInfo = styled.section`
    width: 100%;
    flex: 1 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .playBarInfo.ant-list-item-meta .ant-list-item-meta-avatar{
        display: none;
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-title,
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-description{
        color: var(--success-color-100); 
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-title{
        font-size: calc(var(--font-size-base) * 1.2);
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-description{
        font-size: var(--font-size-base);
    }

    @media(min-width: 768px){
        .playBarInfo.ant-list-item-meta .ant-list-item-meta-avatar{
            display: block;
        }
    }
`;

const PlayController = styled.div`
    flex: 1 0;
    text-align: right;

    .anticon{
        font-size: 2rem;
        color: var(--success-color-100);
        margin: 0 10px;
        cursor: pointer;
        vertical-align: middle;
        display: none;
    }
    .anticon.anticon-pause-circle,
    .anticon.anticon-play-circle{
        display: inline-block;
    }
    .ant-slider{
        display: none;
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

    @media(min-width: 768px){
        text-align: center;

        .anticon{
            display: inline-block;
        }
        .ant-slider{
            display: block;
            width: 90%;
            margin: auto;
            margin-top: 1rem;
        }
    }
`;

const AudioContainer = styled.div`
    .anticon{
        font-size: 2rem;
        color: var(--success-color-100);
        margin: 0 10px;
        cursor: pointer;
        vertical-align: middle;
        display: none;
    }
    .ant-slider{
        display: none;
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

    @media(min-width: 768px){
        flex: 1 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .anticon{
            display: inline-block;
        }
        .ant-slider{
            display: inline-block;
            width: 150px;            
        }
    }
`;

export default function PlayBar(){
    const dispatch = useDispatch();
    const targetItem = useSelector(currentPlayingData.currentPlayingItem);
    const targetPlayList= useSelector(currentPlayingData.currentPlayingList);
    const audio = useMemo(() => new Audio(""), []); // create once
    const ref = useRef(audio);

    const [ isPaused, setIsPaused ] = useState(false);
    const [ duration, setDuration ] = useState("00:00"); // 紀錄歌曲長度
    const [ currentTime, setCurrentTime ] = useState(0); // 紀錄歌曲長度
    const [ volume, setVolume ] = useState(100); 

    useEffect(() => { // audio.addEventListener
        ref.current.addEventListener('timeupdate', () => setCurrentTime(ref.current.currentTime));
        ref.current.addEventListener('ended', () => nextAudio());
        return () => pauseAudio(); // 登出，暫停播放
    }, [])

    useEffect(() => { // change song & play
        ref.current.src = targetItem?.preview_url||"";
        if(isPaused){
            toggleAudio();
        }else{
            palyAudio();
            setVolume(ref.current.volume * 100);
        }
    }, [targetItem])

    useEffect(() => {
        if(isPaused){
            pauseAudio();
        }else{
            palyAudio();
        }
    }, [isPaused])

    const toggleAudio = () => setIsPaused(!isPaused);

    const pauseAudio = () => {
        ref.current.pause();
    }

    const palyAudio = () => {
        ref.current.play()
        .then(res => {
            setDuration(moment(ref.current.duration*1000).format("mm:ss"));
        }).catch(err => {
            console.log("audio err: ", err);
            AlertNotification({
                type: "error",
                title: "播放器有問題，請稍後再試！"
            })
        }) 
    }

    const preAudio = () => {
        const findCurrentIndex = targetPlayList.findIndex(item => item.id === targetItem?.id);
        dispatch(currentPlayingActions.recordPlayingData(targetPlayList[findCurrentIndex-1]));
    }

    const nextAudio = () => {
        const findCurrentIndex = targetPlayList.findIndex(item => item.id === targetItem?.id);
        dispatch(currentPlayingActions.recordPlayingData(targetPlayList[findCurrentIndex+1]));
    }

    const handleVolumeChange = (vol: number) => {
        ref.current.volume = vol / 100;
        setVolume(vol);
    }


    return(
        <PlayTool>
            <CurrentPlayingInfo>
                <MinusCircleOutlined
                    style={{fontSize: "1.7rem", marginRight: 15, color: "#fa5c7c"}} 
                    onClick={()=> dispatch(currentPlayingActions.closePlayBar())}
                />
                <List.Item.Meta
                    className="playBarInfo"
                    avatar={ <Avatar src={targetItem?.album?.images[2]?.url} shape="square" size={60}/> }
                    title={targetItem?.name}
                    description={targetItem?.artists[0]?.name}
                />
            </CurrentPlayingInfo>

            <PlayController>
                <StepBackwardFilled onClick={preAudio}/>
                {   isPaused 
                    ? <PlayCircleFilled onClick={toggleAudio}/> 
                    : <PauseCircleFilled onClick={toggleAudio}/>
                }
                <StepForwardFilled onClick={nextAudio}/>
                <Slider 
                    min={0} 
                    max={30} 
                    step={0.000001}
                    defaultValue={0} 
                    value={currentTime} 
                    marks={{0: "00:00", 30: duration}}
                    tooltipVisible={false}
                />
            </PlayController>

            <AudioContainer>
                <SoundOutlined />
                <Slider
                    min={0} max={100} step={10} value={volume}
                    tipFormatter={(val) => `${val}%`} 
                    onChange={(vol: number) => handleVolumeChange(vol)}/>
            </AudioContainer>
        </PlayTool>  
    )
}





