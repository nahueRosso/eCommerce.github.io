import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore , collection, getDocs ,doc ,getDoc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"



const appenIn = document.getElementById("appenIn")

const cartListById = document.getElementById("cartListById")

const buyCart = document.getElementById("idPSubmit")

const cartList = document.getElementById("cartListById")

const firebaseConfig = {
  apiKey: "AIzaSyAu5JWHWrnGya_9gauXiOGuSHJCTr80dlk",
  authDomain: "infinitymelody-616cf.firebaseapp.com",
  projectId: "infinitymelody-616cf",
  storageBucket: "infinitymelody-616cf.appspot.com",
  messagingSenderId: "933048738245",
  appId: "1:933048738245:web:df2b5779995d1f37c1abac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
    
export const getProducts = async () =>{
  

  const querySnapshot = await getDocs(collection( db , "products" ));

    querySnapshot.forEach((doc) => {
    
    let card1 = document.createElement("div")

    card1.classList.add("cardContainer")

    card1.style.padding = "1em";
    
    card1.innerHTML =  cardBuilder( doc.id,doc.data().url,doc.data().brand,doc.data().model,doc.data().price,doc.data().string,doc.data().type);
    
    appenIn.append(card1) ;


}); 
  addEvent();
}

const duplicate = (arr, val) => {
  return arr.some(x => val === x);
}

const addEvent = () => {

  const buyButtons = document.querySelectorAll(".addToCart")
          
          buyButtons.forEach(buyBtn =>{
          
                  buyBtn.addEventListener("click",(e) =>  {
                          getProduct(e.target.id)
                  })
          })
}

let add = 0; let multi = 0; let x = 1; let array = [];let y = 0;

export const getProduct = async (id) =>{

    const docRef = doc(db, "products",`${id}`);
    
    const docSnap = await getDoc(docRef);

    let card2 = document.createElement("div");
    
     if (duplicate(array,docSnap.id)) {
      
      let idToRemove = array.find( x => x == docSnap.id );

      let positionArray = array.indexOf(idToRemove);
  
      x = parseInt(cartList.childNodes[positionArray].lastChild.lastChild.lastChild.textContent) + 1; 
          
      cartList.removeChild(cartList.childNodes[positionArray]);
     
      array.splice(positionArray,1);

      card2.classList.add("cartBox");

      card2.getAttribute("id",docSnap.id)
      
      card2.innerHTML = sidebarBuilder(docSnap.data().url, docSnap.data().brand, docSnap.data().model, docSnap.data().price, x , y); 

      cartListById.append(card2);

    } else {

      card2.classList.add("cartBox");

      card2.getAttribute("id",docSnap.id)
      
      card2.innerHTML = sidebarBuilder(docSnap.data().url, docSnap.data().brand, docSnap.data().model, docSnap.data().price,1,y); 

      y = y + 1;

      cartListById.append(card2);

      multi = docSnap.id;

    }

     array.push(docSnap.id);

    add = add + docSnap.data().price;
    
    buyCart.textContent = `Total : $ ${add}`;
    
    addEventDelte();
 
  };

  const addEventDelte = () => {

    const btnCross = document.querySelectorAll(".btnCross")
            
              btnCross.forEach(buyBtn =>{
            
                    buyBtn.addEventListener("click",(e) =>  {
                      
       let number1 = parseInt(document.getElementById(e.target.id).parentNode.parentNode.previousSibling.lastChild.lastChild.textContent);
      
       let multi1  = parseInt(document.getElementById(e.target.id).parentNode.parentNode.lastChild.lastChild.textContent);
      
       add = add-(number1*multi1)
       
       buyCart.textContent = `Total : $ ${add}`;
       
       cartList.removeChild(document.getElementById(e.target.id).parentElement.parentElement.parentElement);                  
          
                      
        
      })  
    })
  }

idBtnSubmit.addEventListener('click', () => { 
        
        console.log(cartList);  
        add = 0;
        buyCart.textContent="Total : $ 0";
        cartList.innerHTML="";

        // location.reload();
      });