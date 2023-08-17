import { IconType } from "react-icons";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Listing, Reservation, User } from "@prisma/client";
import { Range, RangeKeyDict } from "react-date-range";

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

export interface ICounterProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
}

export interface IImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export interface IEmptyProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export interface IListingCardProps {
  data: safeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user?: safeUser | null;
}

export interface IHeartButtonProps {
  user?: safeUser | null;
  listingId: string;
}

export interface IParamsProps {
  listingId: string;
}

export interface IFavoriteHook {
  listingId: string;
  user: safeUser | null | undefined;
}

export type safeListing = Omit<Listing, "createdAt"> & { createdAt: string };

export interface IListHeadProps {
  title: string;
  src: string;
  id: string;
  location: string;
  user?: safeUser | null;
}

export interface IListInfoProps {
  user: safeUser | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  desc: string;
  guest: number;
  room: number;
  bathroom: number;
  loc: string;
}

export interface IListingCategory {
  icon: IconType;
  label: string;
  desc: string;
}

export interface IListingReservation {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disable: boolean;
  disabledDate: Date[];
}

export interface ICalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDate?: Date[];
}

export interface IReservation {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export type SafeReservation = Omit<
  Reservation,
  "startDate" | "endDate" | "createdAt" | "listing"
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
  listing: safeListing;
};

export interface IListClientProps {
  reservation?: SafeReservation[];
  listing: safeListing & { user: safeUser };
  user: safeUser | null;
}

export interface ITripsClient {
  res: SafeReservation[];
  user: safeUser | null;
}

export interface IFavProps {
  user: safeUser | null;
  list: safeListing[];
}

export interface IParamsList {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
