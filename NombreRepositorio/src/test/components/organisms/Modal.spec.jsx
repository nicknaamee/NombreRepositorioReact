import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/organisms/Modal'; 

describe('Componente Modal', () => {

  it('no asigna la clase is-active cuando la prop abierto es falsa', () => {
    // Renderizamos el modal cerrado
    render(<Modal abierto={false} cerrar={() => {}} />);
    
    // Obtenemos el contenedor principal usando su rol ARIA definido en tu código
    const modalContainer = screen.getByRole('dialog', { hidden: true }); // hidden: true es necesario porque no está visible
    
    // Verificamos que no tenga la clase is-active usando jasmine-dom
    expect(modalContainer.classList.contains('is-active')).toBeFalse();
  });

  it('renderiza la variante por defecto (sugerencia) correctamente', () => {
    render(<Modal abierto={true} cerrar={() => {}} />);
    
    // Verificamos el título y el texto para sugerencias
    expect(screen.getByText('¡Sugerencia enviada!')).toBeTruthy();
    expect(screen.getByText('Tu mensaje ha sido enviado al basurero con éxito.')).toBeTruthy();
    
    // Verificamos que ahora sí tenga la clase activa
    const modalContainer = screen.getByRole('dialog');
    expect(modalContainer).toHaveClass('is-active');
  });

  it('renderiza la variante de advertencia correctamente', () => {
    render(<Modal tipo="advertencia" abierto={true} cerrar={() => {}} />);
    
    expect(screen.getByText('¡Oye!')).toBeTruthy();
    expect(screen.getByText('¿Qué estás escribiendo? Sé amable con tus compañeros.')).toBeTruthy();
  });

  it('renderiza la variante de contacto correctamente', () => {
    render(<Modal tipo="contacto" abierto={true} cerrar={() => {}} />);
    
    expect(screen.getByText('¡Formulario enviado!')).toBeTruthy();
    expect(screen.getByText('Pronto nos pondremos en contacto.')).toBeTruthy();
  });

  it('ejecuta la función cerrar al hacer clic en el botón Entendido', () => {
    // Creamos un espía de Jasmine para simular la función cerrar, tal como en tu documento
    const mockCerrar = jasmine.createSpy('cerrar');
    render(<Modal abierto={true} cerrar={mockCerrar} />);
    
    const botonCerrar = screen.getByText('Entendido');
    fireEvent.click(botonCerrar); // Simulamos el clic
    
    // Verificamos que el espía fue llamado
    expect(mockCerrar).toHaveBeenCalled();
  });

  it('ejecuta la función cerrar al presionar la tecla Escape', () => {
    const mockCerrar = jasmine.createSpy('cerrar');
    render(<Modal abierto={true} cerrar={mockCerrar} />);
    
    // Simulamos el evento de teclado global que configuraste en tu useEffect
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(mockCerrar).toHaveBeenCalled();
  });

});