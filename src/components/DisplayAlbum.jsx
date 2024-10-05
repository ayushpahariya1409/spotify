import React, { useContext } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, songsData, assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const { spotify_logo, clock_icon } = assets;

const DisplayAlbum = () => {
    const { id } = useParams();
    
    // Find the album based on the id from the URL params
    const albumData = albumsData.find(album => album.id === parseInt(id));

    // Filter the songs specific to the album by albumId
    const filteredSongs = songsData.filter(song => song.albumId === parseInt(id));

    // If the album is not found, display a message
    const {playWithId} = useContext(PlayerContext)
    if (!albumData) {
        return <p>Album not found</p>;
    }

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumData.image} alt={albumData.name} />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={spotify_logo} alt="Spotify Logo" />
                        <b>Spotify</b>
                        • 4,125,551 likes
                        • <b>{filteredSongs.length} songs,</b> about 2 hr 30 min
                    </p>
                </div>
            </div>
            
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={clock_icon} alt="Clock Icon" />
            </div>
            <hr />
            {
                songsData.map((item, index) => (
                    <div onClick={() => playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item.image} alt={item.name} />
                            {item.name}
                        </p>
                        <p className='text-[15px]'>{albumData.name}</p>
                        <p className='text-[15px] hidden sm:block'>{item.dateAdded}</p> {/* Date Added */}
                        <p className='text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
        </>
    );
}

export default DisplayAlbum;
