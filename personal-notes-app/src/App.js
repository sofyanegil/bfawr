import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Navigation } from './components';
import { HomePage, ArchivesNotePage, AddNotePage, DetailNotePage, LoginPage, RegisterPage, NotFoundPage } from './pages';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { LocaleProvider } from './context/LocaleContext';
import { ThemeProvider } from './context/ThemeContext';

function NotesApp() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const toggleLocale = () => {
    setLocale((prevState) => {
      const newLocale = prevState === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  React.useEffect(() => {
    async function init() {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthedUser(data);
      }
      setInitializing(false);
    }

    init();
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (initializing) {
    return null;
  }

  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={themeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
            </h1>
            {authedUser ? <Navigation logout={onLogout} name={authedUser.name} /> : ''}
          </header>
          <main>
            {authedUser ? (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/:id" element={<DetailNotePage />} />
                <Route path="/archives" element={<ArchivesNotePage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            )}
          </main>
          <footer>
            <p>Sofyan Egi Lesmana &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default NotesApp;
