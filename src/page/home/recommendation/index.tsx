import { Card, Tabs, Typography} from "antd";
import Meta from "antd/lib/card/Meta";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertNotification from "../../../components/alertNotifacation";
import { Container } from "../../../components/container";
import { ThemeContext } from "../../../theme";
import { currentPlayingActions, currentUserData } from "../../../reduxToolkit";
import { spotifyApi, checkStatusCode } from "../../../service";
import { Genres } from "../../../type/genrees";
import { DetailList } from "./detailList";
import { useTranslation } from "react-i18next";


export default function Recommendation(){
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const token = useSelector(currentUserData.token);
    const { t: globalT } = useTranslation('global');
    const { t: genresT } = useTranslation('genres');
    const [ recommendationList, setRecommendationList ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    const [ genresKey, setGenresKey ] = useState<string>(Genres.NEW_RELEASE);
    const [ loading, setLoading ] = useState(false);

    const categoryTags = [
        {
            key: Genres.NEW_RELEASE,
            title: genresT("newRelease"),
        },
        {
            key: Genres.MOVIE,
            title: genresT("movies"),
        },
        {
            key: Genres.RNB,
            title: genresT("rnb"),
        },
        {
            key: Genres.HIP_HOP,
            title: genresT("hipHop"),
        },
        {
            key: Genres.ROCK,
            title: genresT("rock"),
        },
        {
            key: Genres.STUDY,
            title: genresT("study"),
        },
        {
            key: Genres.WORK_OUT,
            title: genresT("workOut"),
        },
    ];

    useEffect(()=> {
        if(token){
            setLoading(true);
            spotifyApi().setAccessToken(token);
            spotifyApi().getRecommendations({ seed_genres: genresKey })
            .then(res => {
                const dataWithPreviewUrl = res.tracks.filter(item => item.preview_url !== null) as SpotifyApi.TrackObjectFull[];
                setRecommendationList(dataWithPreviewUrl);
            }).catch(err => {
                console.log("api getRecommendations err: ",err);
                checkStatusCode(err.status, dispatch);

                AlertNotification({
                    type: "error",
                    title: globalT("failToGetData")
                })
            }).finally(() => setLoading(false))
        }
    }, [token, genresKey])
    
    return(
        <Container theme={theme}>
            <Typography.Title level={3}>{globalT('greeting')}</Typography.Title>
            <Tabs onChange={(key: string)=> setGenresKey(key)}>
                {categoryTags.map(tag => (
                    <Tabs.TabPane tab={tag.title} key={tag.key}>
                        <DetailList>
                            {recommendationList?.map(item => (
                                <Card
                                    loading={loading}
                                    key={item.id}
                                    hoverable
                                    cover={loading ? null : <img alt={item.name} src={item.album.images[0].url} />}
                                    onClick={()=>  {
                                        dispatch(currentPlayingActions.showPlayBar());
                                        dispatch(currentPlayingActions.recordPlayingData(item));
                                        dispatch(currentPlayingActions.recordPlayingList(recommendationList));
                                    }}
                                >
                                    <Meta title={item.name} description={item.artists[0].name} />
                                </Card>
                            ))}
                        </DetailList>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </Container>
    )
}