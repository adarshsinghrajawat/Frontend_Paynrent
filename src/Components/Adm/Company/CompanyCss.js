import { makeStyles } from "@mui/styles";
import { FlexboxProps } from "@mui/system";

export const useStyles = makeStyles({

    box:
    {
        width: '50%',
        height: 325,
        padding: 10,
        borderRadius: 10,
        border: "2px solid black",
        background: '#ffff',
        marginTop: '3%',
        marginLeft: '20%',
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
    }
});