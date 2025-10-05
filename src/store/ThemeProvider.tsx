import { createContext, useContext, useState } from 'react';

type ThemeContextProps = {
	toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
	toggleDarkMode: () => {},
});

export const ThemeProvider = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => setDarkMode((prev) => !prev);

	return (
		<ThemeContext.Provider value={{ toggleDarkMode }}>
			<main
				data-theme={darkMode ? 'dark' : ''}
				className='dark:bg-black transition-colors duration-500 dark:text-white'>
				{children}
			</main>
		</ThemeContext.Provider>
	);
};

export const useThemeContext: () => ThemeContextProps = () =>
	useContext(ThemeContext);
