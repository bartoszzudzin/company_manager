import React, {useState} from 'react';
import logoH from '../images/Logo_transparent.png';
import '../styles/Dashboard.css';

const TopBar = (props) =>{
    const date = new Date();

    const [day, setDay] = useState(() => {
        if(date.getDay()<=9){
            return ""+date.getDate();
        }else{
            return date.getDate();
        }
    });
    const [month, setMonth] = useState(() =>{
        if(date.getMonth()<=9){
            return ""+(1+date.getMonth());
        }else{
            return date.getMonth();
        }
    });
    const [year, setYear] = useState(date.getFullYear());

    return(
        <div className='topBar'>
            <div className='logoFlex'>
                <img className='logoH' src={logoH} alt="logo" />
            </div>
            <div className='title'>
                {props.title}
            </div>
            <div className='dateTime'>
                <p>{day}.{month}.<strong>{year}</strong></p>
                <p id='user'>Logged as <strong>{props.userName}</strong></p>
            </div>
        </div>
    )
}

export default TopBar;