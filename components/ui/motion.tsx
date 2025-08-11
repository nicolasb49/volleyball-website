"use client";
import { motion, type HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

export const MotionDiv = motion.div;

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type StaggerProps = HTMLMotionProps<'div'>;
export const Stagger: React.FC<StaggerProps> = ({ children, className, ...rest }) => (
	<motion.div
		variants={containerVariants}
		initial="hidden"
		whileInView="show"
		viewport={{ once: true, margin: '-80px' }}
		className={className}
		{...rest}
	>{children}</motion.div>
);

type FadeInProps = HTMLMotionProps<'div'>;
export const FadeIn: React.FC<FadeInProps> = ({ children, className, ...rest }) => (
	<motion.div
		variants={fadeVariants}
		transition={{ type: 'spring', stiffness: 120, damping: 16 }}
		className={className}
		{...rest}
	>{children}</motion.div>
);

export { motion };
