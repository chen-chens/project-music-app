import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { DetailList } from "../layouts";

interface DetailsProps{
    data?: SpotifyApi.RecommendationsFromSeedsResponse;
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
                >
                    <Meta title={item.artists[0].name} description={item.name} />
                </Card>
            ))}
        </DetailList>
    )
}


