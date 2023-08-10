import { makeStyles,} from "@mui/styles";
export const useStyles=makeStyles({
    box:{
        width:'50%',
        height:'auto',
        padding:10,
        borderRadius:10,
        border:"2px solid #ecf0f1",
        boxShadow: "1px 1px 4px 4px #ecf0f1",
        background:'#fff',
        marginTop:'3%',
        marginLeft:"20%",
      },
    headingStyle:{
       fontWidth:24,
       fontWeight:'bold',
       letterSpacing:1,
  
       paddingBottom:5

    },

    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
})