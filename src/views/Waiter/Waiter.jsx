import React, {useState, useEffect} from "react";
import { MenuButton } from "../../components/Buttons/Button";
import { CardMenu } from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import getProducts from "../../api_functions/getProducts";
import trashCan from "../../Images/delete.png"
import './Waiter.css';
import '../../components/Buttons/Button.css';
import postOrders from "../../api_functions/postOrders";
import waiterImage from "../../Images/waiter.png";
import { Modal, ErrorModal } from "../../components/Modal/Modal";

export const WaiterView = () => {
    const uId = localStorage.getItem("userId");
    console.log(uId);
    // const navigate = useNavigate();
    
    const [menu, setMenu] = useState("breakfast");
    // menu primero vale breakfast y setMenu se actualiza al dar click xej: drinks
    const [products, setProducts] = useState([]);
    const [arrayOfOrder, setArrayOfOrder] = useState([]);

    const [bg1, setBg1] = useState("active");  
    const [bg2, setBg2] = useState("");
    const [bg3, setBg3] = useState("active");
    const [bg4, setBg4] = useState("");
    const [bg5, setBg5] = useState("");
    const [show, setShow] = useState("")       
    const [client, setClient] = useState("");
    const [table, setTable] = useState("");

    const [rightModal, setRightModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        getProducts(setProducts) 
    }, [])

    const filteredProducts = (typeMenu) => {  // typeMenu es un string xej 'dinner'
        const typeProducts = products.filter((prod) => { //product es el [{},{},...] de productos de la data
            return prod.type === typeMenu 
        })
            
        const cards = typeProducts.map((type, i)=> { // este es el objProd unico filtrado x tipo
        //typeProducts es el array de obj
            return (<CardMenu 
                key = {i} 
                id = {type.id}
                name = {type.name} // type es el prod
                image = {type.image} 
                price = {`S/. ${type.price}`} 
                adding = {() => addProduct(type)}
                substracting = {() => subsProduct(type)}  
            />)
        })
        return cards;
    
    }
 
    // productos unicos según id (no repetidos)
    const uniqueProduct = (id) => {
        const unique = arrayOfOrder.find((obj) => obj.id === id);
        /* console.log(unique, 'unico') */
    return unique;
    };

    // función del boton +
    const addProduct = (type) => {
        console.log(type , 'tipo')
      if (uniqueProduct(type.id)) {
        const addQtyPrice = arrayOfOrder.map((order) => {
            if (order.id === type.id) {
              const newOrder = order;
              newOrder.qty += 1;
              newOrder.price = type.price * newOrder.qty;
            }
            return order;
          })
        setArrayOfOrder(addQtyPrice);
    } else setArrayOfOrder([...arrayOfOrder, { ...type, qty: 1 }]);
    };

    // función del boton -
    const subsProduct = (type) => {
        if(uniqueProduct(type.id)){
          const susQtyPrice = arrayOfOrder.map((order) => {
            if(order.id === type.id){ // order existe , type viene cuando doy click (-)
                const newOrder = order;
                if(newOrder.qty > 1){
                    newOrder.qty -= 1;
                    newOrder.price = type.price * newOrder.qty;
                }
            }
            return order;
        })
        setArrayOfOrder(susQtyPrice);
        }
    }
    /* console.log(arrayOfOrder, 'arrayorder'); */

    let total = 0    
    arrayOfOrder.map((item) => {
        total += item.price
        return total; 
    })

    const removeProduct = (obj)=> {
        const arrayWhithoutProduct = arrayOfOrder.filter((item)=> item.id !== obj.id )
        setArrayOfOrder(arrayWhithoutProduct)
    }
    /* console.log(arrayOfOrder, 'array inicial');
    console.log(client);
    console.log(table);
   */

    const clientOrder = {
        id: "",
        userId: uId,
        client: client,
        table: table,
        products: arrayOfOrder.map(prod => {
            const product = {
                name: prod.name,
                price: prod.price,
                qty: prod.qty
            }
            return product;
        })
    };

    return (
        <section className="waiter">
            <Header path2="/orders" display="hide" active1="active" first="Menú" second="Ver pedidos" log={waiterImage} />
            <div className="content-waiter">
                <div className="container-menu">
                    <nav className="nav-menu">
                        <MenuButton 
                        title='Desayuno'
                        bg= {bg1}
                        whenClick = {()=>{
                            setMenu("breakfast")
                            setBg1("active")
                            setBg2("")
                            setShow("") 
                            }}/>
                        <MenuButton 
                        title='Almuerzo y Cena' 
                        bg= {bg2}
                        whenClick = {()=>{
                            setMenu("dinner")
                            setBg1("")
                            setBg2("active")
                            setBg3("active")
                            setBg4("")
                            setBg5("")
                            setShow("show")
                            }} />
                    </nav>
                    <div id= "containerMenu" className="container-card-menu">
                        <nav className={`nav-option-menu ${show}`}>
                            <MenuButton 
                            title='Hamburguesa'
                            bg= {bg3} 
                            whenClick= {()=>{
                                setMenu("dinner")
                                setBg3("active")
                                setBg4("")
                                setBg5("")
                                }}/>  {/* función onClick */}
                            <MenuButton 
                            title='Extras'
                            bg= {bg4} 
                            whenClick = {()=>{
                                setMenu("other")
                                setBg3("")
                                setBg4("active")
                                setBg5("")
                            }} />
                            <MenuButton 
                            title='Bebidas'
                            bg= {bg5} 
                            whenClick = {()=>{
                                setMenu("drinks")
                                setBg3("")
                                setBg4("")
                                setBg5("active")
                                }} />
                        </nav>
                        {filteredProducts(menu)}
                    </div>
                </div>
                <div className="container-menu">
                    <div className="nav-menu">
                        <div className="info-user-order">
                            <label htmlFor="client">Cliente</label>
                            <input type="text" value={client} className="client" onChange={(e)=>setClient(e.target.value)}/>
                        </div>
                        <div className="info-user-order">
                            <label htmlFor="table">Mesa</label>
                            <select name="table" id="table" className="client" onChange={(e)=>setTable(e.target.value)}>
                                <option value="one">1</option>
                                <option value="two">2</option>
                                <option value="three">3</option>
                                <option value="four">4</option>
                                <option value="five">5</option>
                                <option value="six">6</option>
                                <option value="seven">7</option>
                                <option value="eigth">8</option>
                                <option value="nine">9</option>
                                <option value="ten">10</option>
                            </select>
                            {/* <input type="text" value={table} className="client" onChange={(e)=>setTable(e.target.value)}/> */}
                        </div>
                    </div>
                    <div className="container-orders mg-top">
                        <div className="overflow">
                            <table id="container-table">
                                <tbody>
                                    <tr>
                                        <th>ÍTEM</th>
                                        <th>CANT</th>
                                        <th>PRECIO</th>
                                        <th></th>
                                    </tr>                            
                              
                                    {arrayOfOrder.map((order, i) => (
                                        <tr key={i}>
                                            <td>{order.name}</td>
                                            <td>{order.qty}</td>
                                            <td>{`S/. ${order.price}`}</td>
                                            <td>
                                                <button className="btn-delete"  onClick={()=>removeProduct(order)}>
                                                <img className="img-trash" src={trashCan} alt="trash can" />
                                                </button>
                                            </td>
                                        </tr>))}
                                </tbody> 
                            </table>
                        </div>
                      
                        <Modal/>
                        <div className="container-total-sell">
                            <div className="total-sell">
                                <h3>TOTAL:</h3>
                                <p>{`S/. ${total}`}</p>
                            </div>
                            <MenuButton title='Enviar orden' bg="bg-orange" whenClick={()=> {
                                client !== "" && arrayOfOrder.length > 0 ? 
                                postOrders(clientOrder) && setRightModal(true)
                                : setErrorModal(true)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>    
            <div className="back-blur"></div>
            <Modal open={rightModal} 
            onClose={() => {
                setRightModal(false);
                setArrayOfOrder([]);
                setClient("")
            }} 
            message="Pedido enviado a cocina correctamente" />
            <ErrorModal error={errorModal} 
            onClose={() => setErrorModal(false)} 
            message="Por favor, complete todos los campos" />         
        </section>
    );
}