import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { DetailList } from "../layouts";

interface DetailsProps{
    data?: SpotifyApi.RecommendationsFromSeedsResponse;
    genresKey: string;
    setTargetItem: React.Dispatch<React.SetStateAction<SpotifyApi.TrackObjectFull | undefined>>;
}


export default function Details(props: DetailsProps){

    return(
        <DetailList>
            {props.data?.tracks.map(item => (
                <Card
                    key={item.id}
                    hoverable
                    style={{ width: 240, margin: 15 }}
                    cover={<img alt={item.name} src={item.album.images[0].url} />}
                    onClick={()=>  props.setTargetItem(item)}
                >
                    <Meta title={item.name} description={item.artists[0].name} />
                </Card>
            ))}
        </DetailList>
    )
}


