import {
	Github,
	Instagram,
	Linkedin,
	Loader2,
	Mail,
	Phone,
	RefreshCcw,
} from 'lucide-react';
import { motion } from 'motion/react';
import ResumeButton from './ResumeButton';

import { useEffect, useState, type JSX } from 'react';
import type { SocialLink } from '../types';
import { getSocialLinks } from '../services/api';
import { childItems, parentContainer } from '../helpers/animation';

const iconMap: Record<string, JSX.Element> = {
	email: <Mail className='size-4 md:size-5 md:stroke-1' />,
	linkedin: <Linkedin className='size-4 md:size-5 md:stroke-1' />,
	github: <Github className='size-4 md:size-5 md:stroke-1' />,
	instagram: <Instagram className='size-4 md:size-5 md:stroke-1' />,
};

const SocialLinks: React.FC = () => {
	const [{ data, error }, setSocialLinks] = useState<{
		data: SocialLink[] | null;
		error: string | null;
	}>({
		data: null,
		error: null,
	});
	const [retry, setRetry] = useState(false);

	const fetchSocialLinks = async () => {
		try {
			setSocialLinks({
				data: null,
				error: null,
			});

			const { documents } = await getSocialLinks();
			setSocialLinks((prev) => ({
				...prev,
				data: documents as unknown as SocialLink[],
			}));
		} catch {
			setSocialLinks({
				data: [],
				error: 'Failed to fetch social links',
			});
		}
	};

	useEffect(() => {
		fetchSocialLinks();
		setRetry(false);
	}, [retry]);

	if (!data) {
		return (
			<motion.span
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<Loader2 className='animate-spin size-4 text-white' />
			</motion.span>
		);
	}

	if (error) {
		return (
			<motion.div
				className='text-xs rounded-full text-red-500 bg-white w-fit px-2.5 py-1.5 flex space-x-2 items-center-safe'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<p>{error}</p>
				<button
					type='button'
					title='Retry fetching social links'
					onClick={() => setRetry((prev) => !prev)}
					aria-label='Retry fetching social links'
					className='cursor-pointer rounded-full shadow-md p-1.5 text-slate-900'>
					<RefreshCcw className='size-3 stroke-1' />
				</button>
			</motion.div>
		);
	}

	return (
		<motion.section
			initial='hidden'
			animate='visible'
			variants={parentContainer}
			className='flex gap-3 flex-wrap overflow-hidden'>
			{data.map((link) => {
				const icon = iconMap[link.name];
				return (
					<motion.a
						variants={childItems}
						key={link.name}
						href={link.url}
						target='_blank'
						className='rounded-full p-2.5 transition-all duration-500 hover:bg-white hover:text-slate-900 hover:shadow-xl'>
						{icon}
					</motion.a>
				);
			})}

			<ResumeButton />
		</motion.section>
	);
};

export default SocialLinks;
