import AboutMeSection from './layout/AboutMeSection';
import ExperienceSection from './layout/ExperienceSection';
import HeroSection from './layout/HeroSection';
import NavigationBar from './layout/NavigationBar';
import { ThemeProvider } from './store/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			{/* <NavigationBar /> */}
			<HeroSection />
			<AboutMeSection />
			<ExperienceSection />
		</ThemeProvider>
	);
}

export default App;
