import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileAvatarProps {
  image: string;
  firstName: string;
}

export const ProfileAvatar = ({ image, firstName }: ProfileAvatarProps) => {
  return (
    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
      <Avatar className="h-fit w-[10vh] mx-auto object-cover">
        <AvatarImage src={image || 'https://github.com/shadcn.png'} alt={firstName} />
        <AvatarFallback>{firstName.charAt(0) || 'U'}</AvatarFallback>
      </Avatar>
    </div>
  );
};
