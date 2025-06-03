const campos = [
  { id: 'nombre', validar: v => v.trim().length <= 6 || !v.includes(' ') ? 'Debe tener más de 6 letras y un espacio.' : '' },
  { id: 'email', validar: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Email inválido.' },
  { id: 'contrasena', validar: v => v.length < 8 || !/\d/.test(v) || !/[a-zA-Z]/.test(v) ? 'Debe tener 8+ caracteres con letras y números.' : '' },
  { id: 'repetir-contrasena', validar: v => v !== document.getElementById('contrasena').value ? 'No coincide con la contraseña.' : '' },
  { id: 'edad', validar: v => parseInt(v) >= 18 ? '' : 'Debe ser mayor o igual a 18.' },
  { id: 'telefono', validar: v => /^\d{7,}$/.test(v) ? '' : 'Al menos 7 dígitos, sin símbolos.' },
  { id: 'direccion', validar: v => v.length < 5 || !/\d/.test(v) || !/[a-zA-Z]/.test(v) || !v.includes(' ') ? 'Debe tener letras, números y un espacio.' : '' },
  { id: 'ciudad', validar: v => v.trim().length < 3 ? 'Mínimo 3 caracteres.' : '' },
  { id: 'codigo-postal', validar: v => v.trim().length < 3 ? 'Mínimo 3 caracteres.' : '' },
  { id: 'dni', validar: v => /^\d{7,8}$/.test(v) ? '' : 'Debe tener 7 u 8 dígitos.' },
];

document.getElementById('btn-suscribirse').onclick = () => {
  document.getElementById('modal-suscripcion').classList.add('show');
};

document.querySelector('.cerrar').onclick = () => {
  document.getElementById('modal-suscripcion').classList.remove('show');
};

document.getElementById('nombre').addEventListener('input', e => {
  const nombre = e.target.value.trim();
  document.getElementById('titulo-dinamico').textContent = nombre
    ? `HOLA ${nombre.toUpperCase()}`
    : 'Suscribite a RsTimes';
});

campos.forEach(({ id, validar }) => {
  const el = document.getElementById(id);
  el.addEventListener('blur', () => {
    const error = validar(el.value);
    document.getElementById(`error-${id}`).textContent = error;
  });
  el.addEventListener('focus', () => {
    document.getElementById(`error-${id}`).textContent = '';
  });
});

document.getElementById('form-suscripcion').addEventListener('submit', e => {
  e.preventDefault();
  let errores = [];

  campos.forEach(({ id, validar }) => {
    const val = document.getElementById(id).value;
    const error = validar(val);
    document.getElementById(`error-${id}`).textContent = error;
    if (error) errores.push(`${id}: ${error}`);
  });

  if (errores.length > 0) {
    alert("Errores:\n" + errores.join("\n"));
  } else {
    const datos = Object.fromEntries(
      campos.map(({ id }) => [id, document.getElementById(id).value])
    );
    alert("Datos enviados:\n" + JSON.stringify(datos, null, 2));
    document.getElementById('modal-suscripcion').classList.remove('show');
    e.target.reset();
  }
});
