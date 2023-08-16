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

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & { createdAt: string; updatedAt: string; emailVerified: string | null };
export interface INavbarProps {
  currentUser?: safeUser | null;
}

export interface IUserMenuProps {
  user?: safeUser | null;
}

export interface ICategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export interface ICategoryInputProps extends ICategoryProps {
  onClick: (value: string) => void;
}

export type CountrySelectValue = {
  value: string;
  flag: string;
  latling: number[];
  label: string;
  region: string;
};

export interface ICountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export interface IMapProps {
  center?: number[];
}
