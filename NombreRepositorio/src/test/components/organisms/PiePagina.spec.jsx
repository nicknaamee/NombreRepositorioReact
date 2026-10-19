import React from 'react';
import { render, screen } from '@testing-library/react';
import PiePagina from '../../../components/organisms/PiePagina'; // Ajusta la ruta según tu estructura

describe('Componente PiePagina', () => {

  it('renderiza todos los textos correctamente', () => {
    // Montamos el componente en el DOM simulado
    render(<PiePagina />);
    
    // Verificamos el texto del primer párrafo
    expect(screen.getByText('Pie de página')).toBeTruthy();
    
    // Verificamos el texto del segundo párrafo usando una expresión regular 
    expect(screen.getByText(/© 2026 - Todos los derechos reservados/)).toBeTruthy();
    
    // Verificamos el texto dentro de la etiqueta <strong>
    expect(screen.getByText('Subdirección del kizazo')).toBeTruthy();
  });

  it('aplica las clases CSS estructurales al contenedor footer', () => {
    render(<PiePagina />);
    
    // Buscamos un texto interno para escalar hacia el contenedor padre
    const textoInterno = screen.getByText('Pie de página');
    const footerContenedor = textoInterno.closest('footer');
    
    // Verificamos que el contenedor tenga las clases usando jasmine-dom
    expect(footerContenedor).toHaveClass('footer');
    expect(footerContenedor).toHaveClass('has-text-centered');
  });

});