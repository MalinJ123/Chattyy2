// import { useState } from "react";
// import "./Addproduct.css";
// import { addProduct } from "../data/addProduct.js";


// const AddProduct = () => {

//     const [product , setProduct] = useState({
//         name: "",
//         price: "",
//         image: "",
//         tags: "",
//     })

//     async function handleproduct(e) {
//         e.preventDefault();
//         const newProduct = {
//             name: product.name,
//             price: product.price,
//             image: product.image,
//             tags: product.tags,
//         }
//         console.log('skickar till api',newProduct);
//         try {
//         const result = await addProduct(newProduct);
//         if (result){
//             console.log("addProduct lyckades");
//            }else{
//             console.log("något blev fel");
//            }
//         } catch (error) {
//             console.log(error.message);
//         }
//     }



//     return (
//         <div className="addproduct-div"> 

//             <form onSubmit={handleproduct} className="addproduct-form">

            

      
//             <div>
//                 <label htmlFor="name"> Produktnamn:
//                 </label>    
//                     <input id="name" type="text"  placeholder="name" 
//                    onChange={(e) => setProduct({...product , name: e.target.value})}/>    
//             </div>  

//             <div>
//                 <label htmlFor="price"> Produktpris:
//                 </label>    
//                     <input id="price" type="number"  placeholder="Price" 
//                     onChange={(e) => setProduct({...product , price: e.target.value})} />    
//             </div>  

//             <div>
//                 <label htmlFor="image"> Produktbild: 
//                 </label>    
//                     <input id="image" type="text"  placeholder="image" 
//                     onChange={(e) => setProduct({...product , image: e.target.value})} />    
//             </div>  

//             <div>
//                 <label htmlFor="tags"> Produkttaggar:
//                 </label>    
//                     <input id="tags" type="text"  placeholder="tags" 
//                     onChange={(e) => setProduct({...product , tags: e.target.value})} />    
//             </div>  

//             <button className="add-btn" type="submit" >Lägg till produkt</button>
//             </form>
                    
//         </div>
//     )


// }





// export default AddProduct;