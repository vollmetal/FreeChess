import { Card, Typography } from "@mui/material"




const MainPage = () => {

    return (
        <Card display='flex' sx={{ flexDirection: 'column', margin: '30px', height: '100%' }}>
            <Typography>
                Welcome to teh Free Chess app!
            </Typography>

            <Typography>
                Click on the Games button to see and join game lobbies or make your own game if you're logged in!
            </Typography>
        </Card>

    )
}

export default MainPage