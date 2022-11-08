import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import chefImg from "../../Images/chef.png";
import CardChef from "../../components/Orders/CardChefOrder";
import getOrders from "../../api_functions/getOrders";
import { updateOrder } from "../../api_functions/updateOrder";

export const ChefView = () => {

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        getOrders(setOrders);
    }, [])
    
    const handleUpdate = async(orders, order, id, text) =>{
        const newOrders = [...orders]
        const response = await updateOrder(order, id, text)
        if(response){
            setOrders(newOrders)
        }
    }    
    
    const filteredByStatus = orders.filter((item) => item.status === "pending");

    // let theTime = 0;
    // const createTimer = () => {
    //     const t = document.getElementById("watch")
                  
    //         let minutes = Math.floor(theTime / 60);
    //         let seconds = theTime - (minutes * 60);
    //         /*Si los segundos son menores a 10
    //         nos aseguramos que quede en formato 0:00*/
    //         if (seconds < 10) {
    //             seconds = '0' + seconds;
    //         }

    //     const textTimer = minutes + ':' + seconds;
    //     t.innerHTML = textTimer;
    //     theTime++;
        
    //     return t
    // }
    
    // // eslint-disable-next-line no-unused-vars
    // let timeInterval = 0;
    // const startCounter = () => {
    //     timeInterval = setInterval(() => {
    //         createTimer()
    //     }, 600);
    
    // }

    // const stopCounter = () => {
    //     clearInterval(timeInterval);
    // }

    return(
        <section className="waiter">
            <Header log={chefImg} />
            <div className="content-order">
            
                {filteredByStatus.map((order,i) => (
                <CardChef 
                key={i} 
                id={order._id}
                dateEntry={order.dateEntry} 
                client={order.client} 
                products={order.products}
                theStatus={order.status}
                update={() => handleUpdate(orders, order, order.id, "delivering")} 
                 />
                ))}
            </div>
            <div className="back-blur"></div>
        </section>

    )
}