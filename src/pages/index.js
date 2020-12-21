import React from 'react'
import Lolly from '../component/Lolly'
import { navigate } from "gatsby";
import "../assets/style.css";
import Button from '@material-ui/core/Button';


const Home = () => {

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100vh", justifyContent: "space-around"}}>
            <div style={{textAlign: "center"}}>
                <h1 style={{margin: "10px 0px"}}>Virtual Lollipop</h1>
                <h3>because we all know someone who deserves some sugar.</h3>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{margin: "0px 20px"}}>
                <Lolly fillLollyTop="blue" fillLollyMiddle="red" fillLollyBottom="green" />
                </div>
                <div style={{margin: "0px 20px"}}>
                <Lolly fillLollyTop="blue" fillLollyMiddle="red" fillLollyBottom="green" />
                </div>
                <div style={{margin: "0px 20px"}}>
                <Lolly fillLollyTop="blue" fillLollyMiddle="red" fillLollyBottom="green" />
                </div>
                <div style={{margin: "0px 20px"}}>
                <Lolly fillLollyTop="blue" fillLollyMiddle="red" fillLollyBottom="green" />
                </div>
               
            </div>
            <div>
            <Button variant="contained" color="secondary" size="large" onClick={()=> navigate('/createLolly')}>
                CREATE YOUR OWN LOLLY
            </Button>
            </div>
        </div>
    )
}

export default Home;