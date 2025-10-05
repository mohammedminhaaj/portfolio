import {
	Github,
	Instagram,
	Linkedin,
	Loader2,
	Mail,
	RefreshCcw,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import ResumeButton from './ResumeButton';

import { useEffect, useState, type JSX } from 'react';
import type { SocialLink } from '../types';
import {
	ErrorStatus,
	getSocialLinks,
	LoadingStatus,
	SuccessStatus,
	type RequestStatus,
} from '../services/api';
import { childItems, parentContainer } from '../helpers/animation';

const iconMap: Record<string, JSX.Element> = {
	email: <Mail className='size-4 md:size-5 md:stroke-1' />,
	linkedin: <Linkedin className='size-4 md:size-5 md:stroke-1' />,
	github: <Github className='size-4 md:size-5 md:stroke-1' />,
	instagram: <Instagram className='size-4 md:size-5 md:stroke-1' />,
};

type SocialLinksProps = {
	data: SocialLink[] | null;
	error: string | null;
	setRetry: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocialLinks: React.FC<SocialLinksProps> = ({ data, error, setRetry }) => {
	if (!data) {
		return (
			<motion.span
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
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
				exit={{ opacity: 0, y: -20 }}
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
		<motion.div
			initial='hidden'
			animate='visible'
			variants={parentContainer}
			className='flex gap-3 flex-wrap'>
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
		</motion.div>
	);
};

const SocialLinksWrapper: React.FC = () => {
	const [{ data, error, status }, setSocialLinks] = useState<{
		data: SocialLink[] | null;
		error: string | null;
		status: RequestStatus;
	}>({
		data: null,
		error: null,
		status: LoadingStatus,
	});
	const [retry, setRetry] = useState(false);

	const fetchSocialLinks = async () => {
		try {
			setSocialLinks({
				data: null,
				error: null,
				status: LoadingStatus,
			});

			const { documents } = await getSocialLinks();
			setSocialLinks((prev) => ({
				...prev,
				data: documents as unknown as SocialLink[],
				status: SuccessStatus,
			}));
		} catch {
			setSocialLinks({
				data: [],
				error: 'Failed to fetch social links',
				status: ErrorStatus,
			});
		}
	};

	useEffect(() => {
		fetchSocialLinks();
		setRetry(false);
	}, [retry]);

	return (
		<section className='flex items-center justify-start min-h-10 overflow-hidden z-10'>
			<AnimatePresence mode='wait'>
				<SocialLinks
					key={status} // Key to trigger re-mount on status change
					data={data}
					error={error}
					setRetry={setRetry}
				/>
			</AnimatePresence>
		</section>
	);
};

export default SocialLinksWrapper;
