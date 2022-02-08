import styled from "styled-components";
import { useEffect, useState } from "react";
import AlertNotification from "./alertNotifacation";


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
    justify-content: space-between;
`;

interface CurrentInfoType{
    id: string;
    imgSrc: string;
    singer: string;
    song: string;
}

interface PlayBarProps{
    targetItem?: SpotifyApi.TrackObjectFull;
}

export default function PlayBar(props: PlayBarProps){
    const style = {fontSize: 30, color: "#fff", margin: "0 10px", cursor: "pointer", verticalAlign: "middle"};
    const [ previewMp3Url, setPreviewMp3Url ] = useState("");
    const [ currentInfo, setCurrentInfo ] = useState<CurrentInfoType>({id: "", imgSrc: "", singer: "", song: ""});

    useEffect(()=> {
        if(props.targetItem?.preview_url){
            setPreviewMp3Url(props.targetItem.preview_url);
            setCurrentInfo({
                id: props.targetItem.id,
                imgSrc: props.targetItem.album.images[2].url,
                singer: props.targetItem.artists[0].name,
                song: props.targetItem.name,
            })
        }else{
            AlertNotification({
                type: "warning",
                title: "沒有參考音源！"
            })
        }
    }, [props.targetItem])

    return(
        <PlayTool>
            <section className="currentPlaying">
                <div className="thumbnail">
                    <img src={currentInfo.imgSrc} alt={currentInfo.song}/>
                </div>
                <div className="txt">
                    <h2 className="mainTitle">{currentInfo.song}</h2>
                    <h3 className="description">{currentInfo.singer}</h3>
                </div>
            </section>
            <audio src={previewMp3Url} controls autoPlay></audio>

        </PlayTool>
    )
}





