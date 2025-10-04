import { motion } from 'motion/react';
import { nanoid } from 'nanoid';
import { PUBLIC_BUCKET_ID, storage } from '../services/appwrite';
import SocialLinksWrapper from '../components/SocialLinks';
import { parentContainer, childItems } from '../helpers/animation';

const heroText = "Hey, I'm Mohammed Minhaaj.";
const fileId = '68314971003d384737c1';
const heroImageUrl = storage.getFileView(
	PUBLIC_BUCKET_ID, // Public bucket ID
	fileId // File ID
);

const HeroSection: React.FC = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col h-screen justify-end-safe md:justify-center-safe relative p-10 md:p-20 w-full overflow-hidden group text-white gap-5'>
			<motion.img
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				loading='lazy'
				src={heroImageUrl}
				alt='Hero Image'
				className='absolute inset-0 object-cover h-full w-full -z-10 transition-all duration-500 group-hover:scale-105 brightness-60'
			/>
			<h1 className='title w-full lg:w-1/2 uppercase'>
				<span className='sr-only'>{heroText}</span>
				<motion.span
					initial='hidden'
					animate='visible'
					variants={parentContainer}
					aria-hidden
					className='flex flex-wrap space-x-4'>
					{heroText.split(' ').map((text) => (
						<motion.span variants={childItems} key={nanoid()}>
							{text}
						</motion.span>
					))}
				</motion.span>
			</h1>
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.9 }}
				className='text-sm md:text-base'>
				I build smart, scalable web apps that do more than just work —
				they wow. From sleek UIs to powerful APIs, I make ideas happen.
			</motion.h2>
			<SocialLinksWrapper />
		</motion.section>
	);
};
export default HeroSection;
