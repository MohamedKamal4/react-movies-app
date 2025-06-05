import Cast from "../componads/cast/cast";
import Head from "../componads/head-section/head";
import NowPlaying from "../componads/nowplaying/nowplaying";
import Popular from "../componads/popular/popular";
import AiringToday from "../componads/series-componds/airingtoday/airingtoday";
import PopularSeries from "../componads/series-componds/popularseries/popularseries";
import TopRateSeries from "../componads/series-componds/top-rating/top-rating";


import TopRate from "../componads/toprate/top-rate";
import Trend from "../componads/trend/trend";



export default function MasterHomePage() {

    return (
        <>
            <Head />
            <AiringToday />
            <TopRateSeries />
            <PopularSeries />
            <Trend />
            <NowPlaying />
            <TopRate />
            <Popular />
            <Cast />
        </>
    )
}