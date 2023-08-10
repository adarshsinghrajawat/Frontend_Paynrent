import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    box:
    {
        width: '50%',
        height: 250,
        padding: 10,
        borderRadius: 10,
        border: "2px solid #ecf0f1",
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