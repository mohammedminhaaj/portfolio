import { PUBLIC_BUCKET_ID, storage } from '../services/appwrite';
import { motion } from 'motion/react';
import { childItems, parentContainer } from '../helpers/animation';
import { useThemeContext } from '../store/ThemeProvider';

const firstBentoImageId = '68e0dcd9002161fd3a23';
const secondBentoImageId = '68e159810004a5293b26';

const firstBentoImageUrl = storage.getFileView(
	PUBLIC_BUCKET_ID,
	firstBentoImageId
);
const secondBentoImageUrl = storage.getFileView(
	PUBLIC_BUCKET_ID,
	secondBentoImageId
);

const AboutMeSection: React.FC = () => {
	const { toggleDarkMode } = useThemeContext();
	const totalYears = new Date().getFullYear() - 2019;
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen p-10 md:p-20 gap-5 w-full flex flex-col justify-center-safe'>
			<h1 className='title'>About Me.</h1>
			<motion.div
				initial='hidden'
				whileInView='visible'
				variants={parentContainer}
				className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 md:gap-10 items-center-safe'>
				<motion.p
					variants={childItems}
					className='font-extralight text-slate-500 dark:text-white transition-colors duration-500 text-xl md:text-3xl'>
					I'm a full-stack developer with{' '}
					<span className='text-2xl md:text-4xl font-extrabold text-slate-600 dark:text-white transition-colors duration-500'>
						{totalYears}+
					</span>{' '}
					years of code-bending, bug-squashing, and API-whispering
					under my belt.
				</motion.p>
				<motion.picture
					variants={childItems}
					className='relative min-h-40 md:min-h-[40dvh] rounded-2xl overflow-hidden group'>
					<img
						loading='lazy'
						src={firstBentoImageUrl}
						alt='Bento 1'
						className='absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-all duration-500'
					/>
				</motion.picture>
				<motion.picture
					variants={childItems}
					className='hidden md:block relative min-h-40 md:min-h-[40dvh] rounded-2xl overflow-hidden group'>
					<img
						loading='lazy'
						src={secondBentoImageUrl}
						alt='Bento 2'
						className='absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-all duration-500'
					/>
				</motion.picture>
				<motion.p
					variants={childItems}
					className='font-extralight text-slate-500 dark:text-white transition-colors duration-500 text-xl md:text-3xl'>
					I like clean code,{' '}
					<button
						title='Dark mode'
						type='button'
						className='underline cursor-pointer underline-offset-4'
						onClick={toggleDarkMode}>
						dark mode
					</button>
					{''}, and error messages that make sense. I dislike merge
					conflicts, inline styles, and people who don't use version
					control.
				</motion.p>
			</motion.div>
		</motion.section>
	);
};
export default AboutMeSection;
