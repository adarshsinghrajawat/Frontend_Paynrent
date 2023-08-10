import { makeStyles } from "@mui/styles";
import { Flexbox } from "@mui/system";
export const useStyles = makeStyles({

    box:
    {
        width: '80%',
        height: 300,
        padding: 10,
        borderRadius: 10,
        border: "2px solid black",
        background: '#ffff',
        marginTop: '3%',
        marginLeft: '8%',
    },

    headingStyle:
    {
        fontWidth: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },

    center:
    {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        flexDirection : 'row'
    },

    dialogBox:
    {
        display:'flex',
        flexDirection: 'row',
        height: 300,
        width: '20%',
       


    }
});