import { motion } from 'motion/react';

const Logo: React.FC = () => {
	return (
		<motion.h3
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='text-xl md:text-2xl font-bold'>
			m<span className='hidden md:inline'>ohammed</span>
			<span className='text-slate-500'>
				m<span className='hidden md:inline'>inhaaj</span>.
			</span>
		</motion.h3>
	);
};

export default Logo;
