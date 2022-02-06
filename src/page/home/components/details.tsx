import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import { DetailList } from "../layouts";

interface DetailsProps{
    data?: SpotifyApi.RecommendationsFromSeedsResponse;
    genresKey: string;

}


export default function Details(props: DetailsProps){

    return(
        <DetailList>
            {props.data?.tracks.map(item => (
                // <Link to={`${props.genresKey}/playlist/${item.id}`} key={item.id}>
                
                    <Card
                        key={item.id}
                        hoverable
                        style={{ width: 240, margin: 15 }}
                        cover={<img alt={item.name} src={item.album.images[0].url} />}
                        onClick={()=> {
                            console.log("click!")
                        }}
                    >
                        <Meta title={item.name} description={item.artists[0].name} />
                    </Card>
                
                // </Link>
            ))}
        </DetailList>
    )
}


