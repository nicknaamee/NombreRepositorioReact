import React from 'react';
import { render, screen } from '@testing-library/react';
import Navegacion from '../../../components/organisms/Navegacion'; 

describe('Componente Navegacion', () => {

  it('renderiza todos los enlaces con el texto correcto', () => {
    // Montamos el componente
    render(<Navegacion />);
    
    // Verificamos que los textos existan en la pantalla
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Contacto')).toBeTruthy();
    expect(screen.getByText('Otra Pagina')).toBeTruthy();
  });

  it('asigna las rutas (href) correctas a cada enlace', () => {
    render(<Navegacion />);
    
    const enlaceInicio = screen.getByText('Inicio');
    const enlaceContacto = screen.getByText('Contacto');
    const enlaceOtraPagina = screen.getByText('Otra Pagina');

    // Verificamos el atributo href de cada etiqueta <a>
    expect(enlaceInicio.getAttribute('href')).toBe('index.html');
    expect(enlaceContacto.getAttribute('href')).toBe('contacto.html');
    expect(enlaceOtraPagina.getAttribute('href')).toBe('pag2.html');
  });

  it('aplica las clases CSS estructurales al nav y a los enlaces', () => {
    render(<Navegacion />);
    
    const enlaceInicio = screen.getByText('Inicio');
    
    // 1. Verificamos las clases del enlace usando el matcher de jasmine-dom[cite: 9]
    expect(enlaceInicio).toHaveClass('enlace-menu');
    expect(enlaceInicio).toHaveClass('has-text-dark');
    
    // 2. Navegamos hacia el padre <nav> para verificar sus clases
    const navContenedor = enlaceInicio.closest('nav');
    expect(navContenedor).toHaveClass('barra-navegacion');
    expect(navContenedor).toHaveClass('box');
  });

});