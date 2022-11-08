import '../../components/Buttons/Button.css';
import Header from "../../components/Header/Header";
import user from "../../Images/user.png"
import managerImg from "../../Images/manager.png";
import editImg from "../../Images/edit.png"
import deleteImg from "../../Images/delete.png"
import './Administrador.css'
import { useState, useEffect } from 'react';
import { ModalCreateUser } from "../../components/Modal/Modal"
import { createUser } from "../../api_functions/postUser"
import { getUsers } from '../../api_functions/getUsers';



export const AdminViewUsers = () => {

    const [showModal, setShowModal] = useState(false);

     // Valor inicial de los inputs ""
    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        rol : ""
    });

    const [users, setUsers] = useState([]);

    const addUser = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;
        
        if(name === "" || email === "" || password === "" || rol === ""){
            alert("Complete todos los campos")
        } else {
            createUser(data).then((res) => res)
            .catch((error) => console.log(error))
        }
    }


    useEffect (()=> {
        getUsers(setUsers)
    }, [])

    console.log(users, 'usuarios')

    return (
        <section className="waiter">
            <Header log={managerImg} 
            path2="/admin-orders"
            path3="/admin-products"
            active1= "active" 
            first= "Ver usuarios" 
            second= "Ver pedidos"
            third= "ver productos"
            display= "see"
            />
            <div className='container-btn'>
                <button className='btn-create-user' onClick= {() => setShowModal(true)}>Crear usuario <img className="img-create-user" src={user} alt="user"/></button>
            </div>

            <div className="content-names">
                <div className='user-table'>
                    <table className="">
                        <thead>
                            <tr className="Row-head-table-users">
                                <th >Nombre y Apellido</th>
                                <th >Email</th>
                                <th >Rol</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.map((user, i) => (
                            <tr key={i} >
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.admin === true ? "administrador": "personal" }</td>
                                <td><img className='img' src={editImg} alt="edit"/></td>
                                <td><img className='img' src={deleteImg} alt="delete"/></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="back-blur"></div>
                
            <ModalCreateUser open= {showModal} onClose={() => setShowModal(false)}>
                <div className="form-container">
                    <label> Nombre y Apellido </label>
                    <input type = "text"
                        className="dataInput"
                        id="name"
                        onChange = {(e) => setData({...data, name: e.target.value})}
                    />
                
                    <label> Correo </label>
                    <input  type = "email"
                        className="dataInput"
                        id="email"
                        onChange = {(e) => setData({...data, email: e.target.value})}
                    />

                    <label> Contraseña </label>
                    <input  type = "text"
                        className="dataInput"
                        id="password"
                        onChange = {(e) => setData({...data, password: e.target.value})}
                    />  

                    <label> Rol </label>
                    <select name="select"
                    className="dataInput"
                    id="rol"
                    onChange= {(e) => setData({...data, rol: e.target.value})}
                    >
                        <option>Seleccionar</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Cheff">Cheff</option>
                        <option value="Mesero">Mesero</option>
                    </select>
                    {/* <input  type = "text"
                        className="dataInput"
                        id="rol"
                        onChange = {(e) => setData({...data, rol: e.target.value})}
                    />  */}  

                    <div className="center btn-regis-cancel">
                        <button className="btn-modal" type="submit" onClick = {() => {addUser()}} >Crear usuario</button>
                    </div>
                </div>
                
            </ModalCreateUser>
            
        </section>  
    );
}
  
