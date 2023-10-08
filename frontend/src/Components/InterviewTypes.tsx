import { Link, Navigate } from "react-router-dom";



export const InterviewTypes  = () => {

  return <div style={{display:"grid" ,gridTemplateColumns:"repeat(2,1fr)" ,margin:"40px" , padding:"40px"}}>

    
    <div style={{boxShadow:" rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px ", width:"500px" ,padding:"40px",}}>
    <h1 style={{textAlign:"justify" ,fontWeight:"bold",fontSize:"40px"}}>MERN</h1>
    <p style={{textAlign:"justify"}}>Prepare for technical interviews with real-world coding challenges. Our AI-powered platform generates coding questions from top tech companies and evaluates your solutions, providing detailed feedback to help you succeed in your coding interviews.</p>
    <div style={{display:"flex" ,marginTop:"20px"}}>
      <img src="HTML.png" alt="" style={{width:"40px" ,height:"40px"}} />
      <img src="Javascript.png" alt="" style={{width:"40px" ,height:"40px"}} />
      <img src="React.png" alt="" style={{width:"40px" ,height:"40px"}} />
      <img src="Node.png" alt="" style={{width:"40px" ,height:"40px"}} />
    </div>
    <Link to={"/interview/mern?tectStack=mern"}>
    <button style={{display :"Block",backgroundColor:"#4CAF50" , margin:"20px auto" , color:" white" , padding:"8px" ,borderRadius:"10px"}} >Start Interview</button>
    </Link>
  </div>
{/* DSAaaaaaaaaa */}

  <div style={{boxShadow:" rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px ", width:"500px" ,padding:"40px"}}>
    <h1 style={{textAlign:"justify" ,fontWeight:"bold",fontSize:"40px"}}>DSA Round</h1>
    <p style={{textAlign:"justify"}}>Master data structures and algorithms with our DSA interview scenarios. Practice solving complex problems and algorithms commonly asked in technical interviews. Our AI ensures that you receive personalized feedback to enhance your problem-solving skills.</p>
  
    <p style={{fontWeight:"bold"}}>Array | Matrix | Stack | Queue...</p>
  
    <button style={{display :"Block",backgroundColor:"#4CAF50" , margin:"20px auto" , color:" white" , padding:"8px" ,borderRadius:"10px"}} >Start Interview</button>
  </div>

{/* Simpleeeeeeeeeee */}


  <div style={{boxShadow:" rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px ", width:"500px" ,padding:"40px",marginTop:"40px" }}>
    <h1 style={{textAlign:"justify" ,fontWeight:"bold",fontSize:"40px"}}>Behavioral Round</h1>
    <p style={{textAlign:"justify"}}>Excel in HR and behavioral interviews with our realistic scenarios. Prepare for questions related to teamwork, leadership, and situational judgment. Receive constructive feedback on your responses to confidently handle the behavioral aspect of job interviews.</p>
   
    <p style={{fontWeight:"bold"}}>Latest HR Questions</p>
    
    <button style={{display :"Block",backgroundColor:"#4CAF50" , margin:"20px auto" , color:" white" , padding:"8px" ,borderRadius:"10px" ,}} >Start Interview</button>
  </div>
  </div>
}




