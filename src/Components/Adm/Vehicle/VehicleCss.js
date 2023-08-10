import { makeStyles,} from "@mui/styles";
export const useStyles=makeStyles({
    box:{
        width:'80%',
        height:'auto',
        padding:10,
        borderRadius:10,
        border:"2px solid #ecf0f1",
        boxShadow: "1px 1px 4px 4px #ecf0f1",
        background:'#fff',
      marginLeft:'8%'
     
      },
    headingStyle:{
       fontWidth:24,
       fontWeight:'bold',
       letterSpacing:1,
       paddingTop:5,
       paddingBottom:5

    },

    center:{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        flexDirection:'row'
    }
})