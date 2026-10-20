import React from 'react';
import {useState} from 'react';
import CampoFormulario from '../molecules/CampoFormulario.jsx';
import Boton from '../atoms/Boton.jsx';
import Modal from './Modal.jsx';
const vacio={nombre:'',email:'',asunto:'',mensaje:''};
export default function FormularioContacto(){
 const [datos,setDatos]=useState(vacio),[errores,setErrores]=useState({}),[abierto,setAbierto]=useState(false);
 function enviar(e){e.preventDefault();const err={};if(!datos.nombre.trim())err.nombre='Por favor, ingresa tu nombre completo.';if(!datos.email.trim())err.email='Por favor, ingresa tu correo electrónico.';else if(!datos.email.trim().includes('@'))err.email='Por favor, ingresa un correo válido.';if(!datos.asunto.trim())err.asunto='Por favor, ingresa un asunto.';if(!datos.mensaje.trim())err.mensaje='Por favor, ingresa tu mensaje.';setErrores(err);if(Object.keys(err).length===0){setDatos(vacio);setAbierto(true);}}
 const campos=[{id:'nombre',etiqueta:'Nombre Completo:',placeholder:'Ej: Nombre Apellido',autoComplete:'name',type:'text'},{id:'email',etiqueta:'Correo Electrónico:',placeholder:'Ej: correo@ejemplo.com',autoComplete:'email',type:'email'},{id:'asunto',etiqueta:'Asunto:',placeholder:'Ej: Consulta sobre el curso',autoComplete:'off',type:'text'},{id:'mensaje',etiqueta:'Mensaje:',placeholder:'LoreipsumLoreipsumLoreipsumLoreipsum',multilinea:true,rows:4}];
 return <><form id="formContacto" noValidate onSubmit={enviar}>{campos.map(c=><CampoFormulario key={c.id} {...c} errorId={'error'+c.id[0].toUpperCase()+c.id.slice(1)} error={errores[c.id]} value={datos[c.id]} onChange={e=>setDatos({...datos,[c.id]:e.target.value})}/>)}<div className="field"><div className="control"><Boton type="submit" className="borde-curvo is-fullwidth">Enviar Mensaje</Boton></div></div><p className="has-text-success has-text-weight-bold mt-3" id="mensajeExito" style={{display:'none'}}/></form><Modal tipo="contacto" abierto={abierto} cerrar={()=>setAbierto(false)}/></>;
}
