export const parentContainer = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export const childItems = {
	hidden: {
		y: 30,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'tween',
		},
	},
};
