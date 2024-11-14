import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GenrePage from './pages/genre/GenrePage';
import GenreArtistPage from './pages/genre/GenreArtistPage';
import ArtistPage from './pages/artist/ArtistPage';
import FormGenre from './pages/genre/admin/FormGenre';
import PhotoGenre from './pages/genre/admin/PhotoGenre';
import FormArtist from './pages/artist/admin/FormArtist';
import FormAlbum from './pages/album/FormAlbum';
import PhotoArtist from './pages/artist/admin/PhotoArtist';
import PhotoAlbum from './pages/album/PhotoAlbum';
import FormSong from './pages/song/FormSong';
import FileSong from './pages/song/FileSong';
import ListArtistPage from './pages/artist/admin/ListArtistPage';
import ListAlbumPage from './pages/album/ListAlbumPage';
import ListSongPage from './pages/song/ListSongPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <GenrePage isAdmin={false}/>,
  },
  {
    path: "/genres",
    element: <GenrePage isAdmin={false} />,
  },
  {
    path: "/genres/:genreId",
    element: <GenreArtistPage isAdmin={false}/>
  },
  {
    path: "/artists/:artistId",
    element: <ArtistPage isAdmin={false}/>
  },
  {
    path: "/admin/genres",
    element: <GenrePage isAdmin={true} />,
  },
  {
    path: "/admin/genres/create",
    element: <FormGenre />,
  },{
    path: "/admin/genres/:id",
    element: <FormGenre />,
  },
  {
    path: "/admin/genres/:id/add-photo",
    element: <PhotoGenre/>,
  },
  {
    path: "/admin/artists",
    element: <ListArtistPage/>,
  },
  {
    path: "/admin/artists/create",
    element: <FormArtist/>,
  },
  {
    path: "/admin/artists/:id",
    element: <FormArtist/>,
  },
  {
    path: "/admin/artists/:id/photo",
    element: <PhotoArtist/>,
  },
  {
    path: "/admin/albums",
    element: <ListAlbumPage/>,
  },
  {
    path: "/admin/albums/create",
    element: <FormAlbum/>,
  },
  {
    path: "/admin/albums/:id",
    element: <FormAlbum/>,
  },
  {
    path: "/admin/albums/:id/photo",
    element: <PhotoAlbum/>,
  },
  {
    path: "/admin/songs",
    element: <ListSongPage/>,
  },
  {
    path: "/admin/songs/create",
    element: <FormSong/>,
  },
  {
    path: "/admin/songs/:id",
    element: <FormSong/>,
  },
  {
    path: "/admin/songs/:id/file",
    element: <FileSong/>,
  },
  
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


