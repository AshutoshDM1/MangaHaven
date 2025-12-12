import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileFormFieldsProps {
  firstName: string;
  lastName: string;
  image: string;
  disabled: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

export const ProfileFormFields = ({
  firstName,
  lastName,
  image,
  disabled,
  onFirstNameChange,
  onLastNameChange,
}: ProfileFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          disabled={disabled}
          id="firstName"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          disabled={disabled}
          id="lastName"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Profile Picture URL</Label>
        <Input id="image" value={image} readOnly />
      </div>
    </>
  );
};
