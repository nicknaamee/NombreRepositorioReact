import React from 'react';
import PlantillaPagina from '../templates/PlantillaPagina.jsx';
import Presentacion from '../organisms/Presentacion.jsx';
import FormularioSugerencias from '../organisms/FormularioSugerencias.jsx';
export default function Inicio() { return (<PlantillaPagina><main className="main"><Presentacion/><FormularioSugerencias/></main><a href="buzonsugerencias.html" className="button is-danger is-light boton-flotante" title="Ver basurero">🗑️</a></PlantillaPagina>); }
