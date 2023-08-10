import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    mainContainer: {
        background: '#dfe4ea',
        padding: 5,
        marginTop: 30,
        width: '110%',
        borderRadius: 10
    },

    subContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 18,
    },

    heading: {
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: 600,
        color: "#384150",
    },

    text: {
        fontSize: 12,
        color: "#0EBABA",
        fontFamily: "Poppins",
        marginTop: 4,
        cursor: "pointer",
    },

    box: {
       
        borderTopRightRadius: 4,
        marginTop: 24,
    },

    filterOptionHeader: {
        fontFamily: "Poppins",
        fontSize: 16,
        color: "#000",
        fontWeight: 600,
        padding: "10px 15px 13px 0",
        clear: "both",
        paddingLeft: 18,
    },

    items: {
        paddingLeft: 18,
        fontFamily: "Poppins",        
    }
})
