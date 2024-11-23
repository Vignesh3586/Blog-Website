import { useDispatch } from "react-redux"
import { editPost } from "./postsSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";


const reactionEmoji={
    like: <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{color:"#1877F2",}} />,       
    dislike: <FontAwesomeIcon icon={faThumbsDown} size="lg" style={{color:"#1877F2",}} />,    
    heart: <FontAwesomeIcon icon={faHeart} size="lg" style={{color:"#1877F2",}} /> ,      
}
  

const Reaction=({post})=>{
 const dispatch=useDispatch()   
  console.log(post)
const ReactionButtons=Object.entries(reactionEmoji).map(([key,value])=>
( <div> 
    <button 
    key={key}
   onClick={()=>{
    const newReactions={...post.reactions,[key]:post.reactions[key]+1}
    dispatch(editPost({postId:post._id,reactions:newReactions}))
 }}>
    {value}
</button>
<span>{post.reactions[key]}</span>
</div>)
)
return(
    <div className="reactions">{ReactionButtons}</div>
)

}



export default Reaction