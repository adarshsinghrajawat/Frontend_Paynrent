import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        background: "rgb(241, 241, 241)",
        height: "100%",
    },

    subContainerFirst: {
        flex: "65%",
        paddingLeft: 10,
        paddingRight: 10,
    },

    subContainerSecond: {
        flex: "35%",
        paddingLeft: 10,
        paddingRight: 10,
    },

    card: {
        backgroundColor: "#f1f1f1!important",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        wordWrap: "break-word",
    },

    cardBody: {
        padding: "1.25rem",
        display: "flex",
    },

    cardFirst: {
        textAlign: "center",
        borderRight: "0px dotted rgb(217, 217, 217)",
        width: "35%",
    },

    cardFirstHeading: {
        textAlign: "center",
        paddingRight: 24,
    },

    cardFirstImage: {
        width: 220,
        verticalAlign: "middle",
        borderStyle: "none",
        paddingRight: 10,
    },

    cardSecond: {
        textAlign: "center",
        width: "65%",
    },

    carDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    subCarDetails: {
        marginRight: 20,
    },

    carDetailsText: {
        fontFamily: "roboto,sans-serif",
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.58,
        textAlign: "left",
        color: "#656565",
    },
})
