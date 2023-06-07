import { ReactNode } from 'react';
import './button.css';

interface ButtonProps {
  /**
   * the color schema
   */
  mode?: 'default' | 'pink' | 'inactive' | 'stroke' | 'pinkStroke';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Optional click handler
   */
  onClick?: () => void;

   /**
   * The content of the button
   */
  children?: ReactNode;

   /**
   * Optional set disabled
   */
  disabled?: boolean;

  /**
   * Render as link
   */
  link?: boolean;

}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  mode = 'default',
  size = 'medium',
  disabled = false,
  children = null,
  link = false,
  ...props
}: ButtonProps) => {
  const type = link ? 'link' : 'button'
  return (
    <button
      type="button"
      disabled={disabled}
      className={
        [
          `wave-${type}`, 
          `wave-${type}--${size}`, 
          `wave-${type}--${mode}`].join(' ')}
      {...props}
    >

      {children}
    </button>
  );
};
