// src/test/components/organisms/Encabezado.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Encabezado from '../../../components/organisms/Encabezado';

describe('Encabezado Component', () => {

  it('renderiza el título pasado por props correctamente', () => {
    render(<Encabezado titulo="Bienvenidos a mi App" />);
    
    // Buscamos el elemento por su texto
    const titulo = screen.getByText('Bienvenidos a mi App');
    expect(titulo).toBeTruthy(); 
  });

  it('renderiza el título por defecto si no se le pasan props', () => {
    render(<Encabezado />);
    const tituloPorDefecto = screen.getByText('Título');
    expect(tituloPorDefecto).toBeTruthy();
  });

  it('aplica las clases CSS correspondientes definidas en el proyecto', () => {
    render(<Encabezado titulo="Test de Estilos" />);
    
    const h1Element = screen.getByText('Test de Estilos');
    expect(h1Element).toHaveClass('title');
    
    // 2. Verificamos que el contenedor <header> tenga tu clase "header" del CSS
    const headerContainer = h1Element.closest('header');
    expect(headerContainer).toHaveClass('header');
  });

});