'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader, MoreHorizontal, ChevronDown } from 'lucide-react';
import { getAllUsers } from '@/services/apiv2';
import { User } from '@/modules/Admin/types/Admin';
import { getInitials } from '@/modules/Admin/constant/utils';
import { USER_MESSAGES } from '@/modules/Admin/constant/validation';
import { deleteUser } from '@/services/apiv2.user';
import { toast } from 'sonner';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!deleting) {
      fetchUsers();
    }
  }, [deleting]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (email: string) => {
    try {
      setDeleting(true);
      const response = await deleteUser(email);
      if (response.success) {
        setUsers(users.filter((user) => user.email !== email));
      }
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="w-full container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" className="bg-transparent cursor-pointer">
          Columns <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading users...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.image || ''} />
                      <AvatarFallback>
                        {getInitials(`${user.firstName || ''} ${user.lastName || ''}`.trim())}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="rotate-90" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Edit User</DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.email)}
                          className="cursor-pointer text-red-500 hover:text-red-400"
                        >
                          {deleting ? (
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            'Delete User'
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
