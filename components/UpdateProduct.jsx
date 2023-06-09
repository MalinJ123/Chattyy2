import { useState } from "react";
import "./UpdateProduct.css";
import { updateProduct } from "../data/updateProduct.js";
//import { getProducts } from "../data/getProducts.js";

const ToUpdateProduct = () => {
    const [product , setProduct] = useState({
        id:"" ,
        name: "",
        price: "",
        image: "",
        tags: "",
    });

   

    

    async function handleProduct  (e){
        e.preventDefault();
        const changeItem ={
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            tags: product.tags
        }
        console.log("skickar detta till api", changeItem);
        try{
           const result = await updateProduct(changeItem)
           if (result){
            console.log("uppdateringen lyckades");
           }else{
            console.log("något blev fel");
           }

        } catch (error){
            console.log(error.message);
        }
    }



    

    return (
        <section>
            <form onSubmit={handleProduct} className="update-form"> 
            
            <div className="update-form-div">

                
                <div className="update-input-div">
                    <label htmlFor="product-Id">Id: </label>
                    <input id="product-Id" type="number" placeholder="Id" 
                    onChange={(e) => setProduct({...product, id: e.target.value})}/> 

                </div>

                <div className="update-input-div">
                    <label htmlFor="product-name">Produktnamn: </label>
                    <input id="product-name" type="text" placeholder="Name" 
                    onChange={(e) => setProduct({...product, name: e.target.value})}/> 

                </div>
              

                
                <div className="update-input-div">
                    
                    <label htmlFor="price">Produktpris: </label>
                    <input id="price" type="number" placeholder="Price"  
                    onChange={(e) => setProduct ({...product, price : e.target.value})}/> 
                </div >
            

             
                <div className="update-input-div"> 
                    <label htmlFor="tags">Produkttaggar: </label>
                    <input id="tags" type="text" placeholder="bad, kräm" 
                    onChange={(e) => setProduct ({...product, tags : e.target.value})}/> 
                </div>
              
               
                
                <div className="update-input-div">
                    <label htmlFor="image">Produktbild: (url)</label>
                    <input id="image" type="text" placeholder="https://elgiganten.se ..." 
                    onChange={(e) => setProduct({...product , image : e.target.value})}/> 
                    
                </div>
               
                
                <button className="edit-btn" type="submit">Click</button>
                    </div>
             </form>
        </section>
     
    )
}

export default ToUpdateProduct

