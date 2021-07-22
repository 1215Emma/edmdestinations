import React, { useContext, useState } from 'react'
import { FetchBoth } from '../api/SpotifyApi'
import { artistBanner, artistBannerTopTracks } from '../api/artistBanner'
const SearchBarContext = React.createContext()
const SetSearchBarContext = React.createContext()
const ArtistSearchContext = React.createContext()
const ResultsContext = React.createContext()
const ArtistBannerContext = React.createContext()
const ArtistBannerTracksContext = React.createContext()
const HideArtistBannerContext = React.createContext()
const SetHideArtistBannerContext = React.createContext()


export const useSearchBar = () => {
    return useContext(SearchBarContext)
}
export const useSetSearchBar = () => {
    return useContext(SetSearchBarContext)
}
export const useArtistSearch = () => {
    return useContext(ArtistSearchContext)
}
export const useResults = () => {
    return useContext(ResultsContext)
}
export const useArtistBanner = () => {
    return useContext(ArtistBannerContext)
}
export const useArtistBannerTracks = () => {
    return useContext(ArtistBannerTracksContext)
}
export const useSetHideArtistBanner = () => {
    return useContext(SetHideArtistBannerContext)
}
export const useHideArtistBanner = () => {
    return useContext(HideArtistBannerContext)
}
export const SearchBarProvider = ({ children }) => {
    const [search, setSearch] = useState('')
    const [allResults, setAllResults] = useState([])
    const [mainArtistBanner, setMainArtistBanner] = useState([])
    const [mainArtistBannerTracks, setMainArtistBannerTracks] = useState([])
    const [hideArtistBanner, setHideArtistBanner] = useState(true)

    const topArtistSearch = (e) => {
        FetchBoth(e).then(results => {
        setAllResults(results)
        })
        artistBanner(e).then(results => {
            setMainArtistBanner([results])
            artistBannerTopTracks(results).then(results => {
            setMainArtistBannerTracks(results)
            })
        })
    }
    const settingSearch = (e) => {
        setSearch(e)
    }
    const HideArtistBanner = (e) => {
        setHideArtistBanner(e)
    }
    return (
        <SearchBarContext.Provider value={search}>
            <SetSearchBarContext.Provider value={settingSearch}>
                <ArtistSearchContext.Provider value={topArtistSearch}>
                    <ResultsContext.Provider value={allResults}>
                        <ArtistBannerContext.Provider value={mainArtistBanner}>
                            <ArtistBannerTracksContext.Provider value={mainArtistBannerTracks}>
                                <HideArtistBannerContext.Provider value={hideArtistBanner}>
                                    <SetHideArtistBannerContext.Provider value={HideArtistBanner}>
                                        {children}
                                    </SetHideArtistBannerContext.Provider>
                                </HideArtistBannerContext.Provider>
                            </ArtistBannerTracksContext.Provider>
                        </ArtistBannerContext.Provider>
                    </ResultsContext.Provider>
                </ArtistSearchContext.Provider>
            </SetSearchBarContext.Provider>
        </SearchBarContext.Provider>
    )
}