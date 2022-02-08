import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData } from "../../reduxToolkit";
import { MinusCircleFilled } from '@ant-design/icons';


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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px){
        flex-direction: row;
    }
`;


export default function PlayBar(){
    const dispatch = useDispatch();
    const targetItem = useSelector(currentPlayingData.currentPlayingItem);

    return(
        <PlayTool>
            <section className="currentPlaying">
                <MinusCircleFilled 
                    style={{fontSize: "2rem", marginRight: 15, color: "#a4c4bb"}} 
                    onClick={()=> dispatch(currentPlayingActions.stopPlaying())}
                />
                <div className="thumbnail">
                    <img src={targetItem?.album?.images[2]?.url} alt={targetItem?.name}/>
                </div>
                <div className="txt">
                    <h2 className="mainTitle">{targetItem?.name}</h2>
                    <h3 className="description">{targetItem?.artists[0]?.name}</h3>
                </div>
            </section>
            <audio src={targetItem?.preview_url} controls autoPlay></audio>
        </PlayTool>  
    )
}





