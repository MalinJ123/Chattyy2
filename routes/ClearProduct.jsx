
import {clearProduct} from '../data/clearProduct.js'

const DeleteProduct = (props) =>{

    function handleOnClick(){
      clearProduct(props.product)
    }




    return(
        
        <button onClick={handleOnClick}>Delete</button>
      
    )
}

export default DeleteProduct