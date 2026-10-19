import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioSugerencias from '../../../components/organisms/FormularioSugerencias';

describe('Componente FormularioSugerencias', () => {

  it('renderiza el título, la etiqueta y el botón de enviar', () => {
    render(<FormularioSugerencias />);
    
    // Verificamos que los elementos visuales base existan en el DOM
    expect(screen.getByText('Buzón de sugerencias')).toBeTruthy();
    expect(screen.getByText('Aquí escribe tu sugerencia:')).toBeTruthy();
    expect(screen.getByText('Enviar')).toBeTruthy();
  });

  it('muestra el mensaje de error si se intenta enviar vacío', () => {
    render(<FormularioSugerencias />);
    const botonEnviar = screen.getByText('Enviar');
    
    // Simulamos el clic con el estado inicial vacío
    fireEvent.click(botonEnviar);

    // Verificamos que el mensaje de error exista y su estilo cambie a block
    const mensajeError = screen.getByText('Error: introducir texto válido');
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.style.display).toBe('block');
  });

  it('oculta el mensaje de error al escribir y enviar un texto', () => {
    render(<FormularioSugerencias />);
    const botonEnviar = screen.getByText('Enviar');
    const inputTexto = screen.getByRole('textbox'); // Capturamos el input por su rol HTML

    // 1. Forzamos el error primero
    fireEvent.click(botonEnviar);
    expect(screen.getByText('Error: introducir texto válido').style.display).toBe('block');

    // 2. Simulamos la escritura de una sugerencia[cite: 9]
    fireEvent.change(inputTexto, { target: { value: 'Mejorar los colores del sitio' } });
    
    // 3. Volvemos a enviar
    fireEvent.click(botonEnviar);

    // Verificamos que el error se haya ocultado (display: 'none')
    expect(screen.getByText('Error: introducir texto válido').style.display).toBe('none');
  });

  it('actualiza el estado del texto correctamente al escribir', () => {
    render(<FormularioSugerencias />);
    const inputTexto = screen.getByRole('textbox');

    // Simulamos el evento onChange de tu CampoFormulario
    fireEvent.change(inputTexto, { target: { value: 'Nueva sugerencia de prueba' } });
    
    // Verificamos que el value refleje el cambio
    expect(inputTexto.value).toBe('Nueva sugerencia de prueba');
  });

});