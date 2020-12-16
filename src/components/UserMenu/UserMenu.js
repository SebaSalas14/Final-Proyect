import { useState, useContext, useEffect } from 'react'
import {FaBell,FaHeart} from 'react-icons/fa'
import './UserMenu.css'
import {Link} from 'react-router-dom'
import Dropdown from './../Dropdown/Dropdown'
import authContext from '../../context/auth/authContext'
import clientAxios from '../../config/Axios'


const UserMenu = ({user, dayHour}) =>{
    const [favourites, setFavourites] = useState([])
    
    const {logout } = useContext(authContext)
    let color="";
    let tema="";
    // const [color,setColor]=useState('');
    // const [tema,setTema]=useState('');
    if(dayHour>=7 && dayHour<19)
    {  
        color='color1';
        tema='claro';
        // setColor('color1');
        // setTema('claro');
    }else
    {
        color='color4';
        tema='oscuro';
        // setColor('color4');
        // setTema('oscuro');
    }
    const userName =  user.name
    const arrayName=userName.split(" ");
    const firstInitial= arrayName[0].substr(0,1).toUpperCase();
    const secInitialPos=arrayName.length -1
    const secondInitial = arrayName[secInitialPos].substr(0,1).toUpperCase();
    useEffect ( () => {
        const getFavs = async () => {
            const response = await clientAxios.get(`/users/${user._id}/favs`);
            setFavourites(response.data);
        }
        getFavs();
    }, [user.favs] )
    return(
        <div className="usermenu-container align-items-center">
            <div className="initials-container">
                <div className={`usermenu-initials-${tema} ${color}`}>
                {firstInitial}{secondInitial}
                </div>
                <div className={`initials-content-${tema}`}>
                    <Link to="" className={`initials-link-${tema} ${color}`}>Profile</Link>
                    <Link to="" className={`initials-link-${tema} ${color}`}>Suscription</Link>
                    <p onClick={logout} className={`initials-link-${tema} ${color}`}>Log out</p>
                </div>
            </div>
            <div className="initials-container">
                <div>
                    <FaBell className={`usermenu-link-${tema} ${color}`} size={25}/>
                </div>
                <div className={`initials-content-${tema} big-container text-light`}>
                    No hay notificaciones
                </div>
            </div>
            <div className="initials-container">
                <div>
                    <FaHeart className={`usermenu-link-${tema} ${color}`} size={25}/>
                </div>
                <div className={`initials-content-${tema} big-container text-light`}>
                    {
                    favourites.length === 0 
                    ? (<p>There aren´t favourites courses</p>)
                : (favourites.map((favourite, index) => (
                    <Link to={`/courses/detail/${favourite._id}`} >
                    <div key={index}>
                        <img className="cardsFavs" src={favourite.image} alt={favourite.name}/>
                            <p className="nameFavs">{favourite.name}</p>
                    </div>
                    </Link>
                )))

                }
                </div>
            </div>
        </div>
    )
}
export default UserMenu