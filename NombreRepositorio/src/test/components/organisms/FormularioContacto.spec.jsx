import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioContacto from '../../../components/organisms/FormularioContacto';

describe('Componente FormularioContacto', () => {

  it('renderiza todos los campos del formulario y el botón', () => {
    render(<FormularioContacto />);
    
    // Verificamos que los inputs se renderizan buscando sus placeholders
    expect(screen.getByPlaceholderText('Ej: Nombre Apellido')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ej: correo@ejemplo.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ej: Consulta sobre el curso')).toBeTruthy();
    expect(screen.getByPlaceholderText('LoreipsumLoreipsumLoreipsumLoreipsum')).toBeTruthy();
    
    // Verificamos el botón
    expect(screen.getByText('Enviar Mensaje')).toBeTruthy();
  });

  it('muestra mensajes de error cuando se envía el formulario vacío', () => {
    render(<FormularioContacto />);
    const botonEnviar = screen.getByText('Enviar Mensaje');
    
    // Simulamos el clic de enviar con el formulario vacío
    fireEvent.click(botonEnviar);

    // Verificamos que aparezcan todos los errores de validación
    expect(screen.getByText('Por favor, ingresa tu nombre completo.')).toBeTruthy();
    expect(screen.getByText('Por favor, ingresa tu correo electrónico.')).toBeTruthy();
    expect(screen.getByText('Por favor, ingresa un asunto.')).toBeTruthy();
    expect(screen.getByText('Por favor, ingresa tu mensaje.')).toBeTruthy();
  });

  it('muestra un error específico si el correo no tiene un formato válido (sin @)', () => {
    render(<FormularioContacto />);
    const inputEmail = screen.getByPlaceholderText('Ej: correo@ejemplo.com');
    const botonEnviar = screen.getByText('Enviar Mensaje');

    // Escribimos un correo incorrecto
    fireEvent.change(inputEmail, { target: { value: 'correoinvalido.com' } });
    fireEvent.click(botonEnviar);

    // Verificamos la regla de validación del `.includes('@')`
    expect(screen.getByText('Por favor, ingresa un correo válido.')).toBeTruthy();
  });

  it('limpia los campos del formulario al enviar datos válidos exitosamente', () => {
    render(<FormularioContacto />);

    // Seleccionamos los inputs
    const inputNombre = screen.getByPlaceholderText('Ej: Nombre Apellido');
    const inputEmail = screen.getByPlaceholderText('Ej: correo@ejemplo.com');
    const inputAsunto = screen.getByPlaceholderText('Ej: Consulta sobre ..');
    const inputMensaje = screen.getByPlaceholderText('LoreipsumLoreipsumLoreipsumLoreipsum');
    const botonEnviar = screen.getByText('Enviar Mensaje');

    // Llenamos todos los campos correctamente
    fireEvent.change(inputNombre, { target: { value: 'Juan Perez' } });
    fireEvent.change(inputEmail, { target: { value: 'juan@ejemplo.com' } });
    fireEvent.change(inputAsunto, { target: { value: 'Consulta del curso' } });
    fireEvent.change(inputMensaje, { target: { value: 'Hola, tengo una consulta.' } });

    // Enviamos el formulario
    fireEvent.click(botonEnviar);

    // Según la lógica de tu componente (setDatos(vacio)), si no hay errores los campos se vacían
    expect(inputNombre.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputAsunto.value).toBe('');
    expect(inputMensaje.value).toBe('');
  });

});