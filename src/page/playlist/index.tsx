import { useParams } from "react-router"



export default function Playlist(){
    const params = useParams();
    console.log("🚀 ~ file: index.tsx ~ line 7 ~ Playlist ~ params", params)


    return(
        <>Playlist</>
    )
}