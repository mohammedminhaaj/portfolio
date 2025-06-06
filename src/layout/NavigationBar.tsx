import Logo from '../components/Logo';

const NavigationBar: React.FC = () => {
	return (
		<header className='px-5 md:px-10 py-5'>
			<nav className='flex justify-between items-center'>
				<Logo />
				<section className='flex items-center space-x-5'>
					<ul className='space-x-5 hidden md:flex w-full md:justify-center'>
						<li>
							<a href='/'>Home</a>
						</li>
						<li>
							<a href='/about'>About</a>
						</li>
						<li>
							<a href='/contact'>Contact</a>
						</li>
					</ul>
					<a
						className='rounded-full px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-500 text-sm md:text-base'
						href='#contact'>
						Contact
					</a>
				</section>
			</nav>
		</header>
	);
};

export default NavigationBar;
