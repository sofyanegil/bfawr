import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterInput } from '../components';
import LocaleContext from '../context/LocaleContext';
import { register } from '../utils/network-data';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === 'id' ? 'Isi Form untuk mendaftarkan akun' : 'Fill the form to register account.'}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'} <Link to="/">Login {locale === 'id' ? ' di sini' : 'here'}</Link>
      </p>
    </section>
  );
}
