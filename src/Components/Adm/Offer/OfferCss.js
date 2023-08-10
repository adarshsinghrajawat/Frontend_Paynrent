import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'cenetr',
        width: 'auto',
        height: 'auto',
    },

    box: {
        width: '50%',
        height: 300,
        padding: 10,
        borderRadius: 10,
        background: '#fff',
    },

    headingStyle: {
        fontWidth: 24,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    
    center: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        flexDirection: 'row'
    }
})