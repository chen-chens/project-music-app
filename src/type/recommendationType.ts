export interface RecommendationData{
    seeds: Seeds[];
    tracks: RecommendationTracks[];
}

type SeedsType = "artist" | "track" | "genre";
type AlbumType = "album" | "single" | "compilation";
type DateType = "year" | "month" | "day";
type ReasonType = "market" | "product" | "explicit";


export interface Seeds{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: SeedsType;
}

export interface ExternalUrls{
    spotify: string;
}
export interface LinkedFrom{
    uri: string;
    type: SeedsType;
    id: string;
    href: string;
    external_urls: ExternalUrls;
}

export interface Artists{
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    name?: string;
    type?: string;
    uri?: string;
}

export interface RecommendationTracks extends LinkedFrom{
    album: Album;
    artists: Artists[];  
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    linked_from: LinkedFrom;
    restrictions: {reason: ReasonType};
    name: string;
    preview_url: string;
    track_number: number;
    is_local: boolean;
    is_playable: boolean;

    // data 有的，官網沒註明：可能是 extends
    external_ids: {isrc: string};
    popularity: number;
}

export interface AlbumTracks{
    href: string;
    // items: {}[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface Images{
    url: string;
    height: number;
    width: number;
}

export interface Followers{
    href: string;
    total: number;
}

export interface AlbumArtists extends Artists{
    followers?: Followers;
    genres?: string[];
    images?: Images[];
    popularity?: number;

    // type: Allowed value: "artist"
}

export interface Album{
    album_type: AlbumType;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Images[];
    name: string;
    release_date: string;
    release_date_precision: DateType;
    restrictions?: {reason: ReasonType};
    type: AlbumType; 
    uri: string;
    artists: AlbumArtists[];
    tracks: AlbumTracks;
}