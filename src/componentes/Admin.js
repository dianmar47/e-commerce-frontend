import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';

const Admin = () => {
  
  const navigate = useNavigate();

  useEffect(() =>{
    const autenticarUsuario = async () =>{
      const token = localStorage.getItem('token')
      //console.log(token)
      if(!token){
        navigate("/login");
      }

    }
    autenticarUsuario()
  },[navigate]);//[] se ejecuta solo una vez
  
  
  const [categoria, setCategoria] = useState([]);
  
  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    console.log(response);
    setCategoria(response.categoria);
  }

  useEffect(() => {
    cargarCategorias();
  },[]);


  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Estas seguro de eliminar esta categoria?",
      text: "Una vez eliminado, no podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        e.preventDefault();
        const response = crud.DELETE(`/api/categorias/${idCategoria}`);
        //console.log(response.msg);
        const mensaje = response.msg;
        if(response){
          swal("Tu categoria a sido eliminada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
      } else {
        swal("se cancelo la acción");
      }
    });
   
  }

  const actualizarCategoria = async ( idCategoria) =>{
    
    navigate(`/actualizar-categoria/${idCategoria}`)

  }  

  const crearProductos = async (idCategoria) =>{
    navigate(`/home-productos/${idCategoria}`);
  }


  return (
    <>
      <Header/>
  <div className="md:flex md:min-h-screen">
        <Sidebar/>
    <main className="flex-1">
        <h1 className="inline bg-gradient-to-r from-indigo-200 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
      Lista de categorias
    </h1>
      
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
            <th scope="col" className="py-3 px-6">Imagen</th>
            <th scope="col" className="py-3 px-6">Nombre</th>
            <th scope="col" className="py-3 px-6 ">Id</th>
            <th scope="col" className="py-3 px-6 flex justify-center">Opciones</th>
            
          </tr>
        </thead>    
        <tbody className="bg-white">
          {
            categoria.map(
              item => 
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td><img src={item.imagen} width="150" height="150"></img></td>
                <td>{item.nombre}</td>
                <td>{item._id}</td>
                <td className="py-3 px-6">
                <input 
                type="submit"
                value="Eliminar"
                className="font-medium mb-5 w-full text-blue-600 dark:text-blue-500 py-5 rounded hover:underline hover:bg-white"
               onClick={(e) => borrarCategoria(e, item._id)}
            />
             <input 
                type="submit"
                value="Actualizar"
                className="font-medium mb-5 w-full text-blue-600 dark:text-blue-500 py-5 rounded hover:underline hover:bg-white"
                onClick={(e) => actualizarCategoria(item._id)}
            />
             <input 
                type="submit"
                value="Crear Producto"
                className="font-medium mb-5 w-full text-blue-600 dark:text-blue-500 py-5 rounded hover:underline hover:bg-white"
                onClick={(e) => crearProductos(item._id)}
            />
                </td>
              </tr>
            )
          }

        </tbody>

      </table>
    </div>
  </main>
</div>
    </>
    );
}

export default Admin;