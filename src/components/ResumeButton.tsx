import { motion } from 'motion/react';
import { PUBLIC_BUCKET_ID, storage } from '../services/appwrite';
import { memo } from 'react';

type ResumeButtonProps = {
	text?: string;
	className?: string;
};

const ResumeButton: React.FC<ResumeButtonProps> = ({
	text = 'Download Resume',
	className = 'rounded-full px-4 py-2 bg-white text-slate-900 transition-all duration-500 hover:text-white hover:bg-slate-900 hover:shadow-xl text-sm md:text-base',
}) => {
	const resumeId = 'resume';
	const downloadUrl = storage.getFileDownload(
		PUBLIC_BUCKET_ID, // Public bucket ID
		resumeId // File ID for the resume
	);

	return (
		<motion.a
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.7 }}
			href={downloadUrl}
			target='_blank'
			className={className}>
			{text}
		</motion.a>
	);
};

export default memo(ResumeButton);
