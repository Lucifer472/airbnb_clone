import { IconType } from "react-icons";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { User } from "@prisma/client";

export interface IContainerProps {
  children: React.ReactNode;
}

export interface IMenuItemProps {
  onClick: () => void;
  label: string;
}

export interface IModalsProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondryAction?: () => void;
  secondryLabel?: string;
}

export interface IBtnProps {
  label: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export interface IRegisterModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface ILoginModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface IHeading {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export interface IInputs {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface INavbarProps {
  currentUser?: User | null;
}

export interface IUserMenuProps {
  user?: User | null;
}
