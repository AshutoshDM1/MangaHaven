import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { deleteManga } from '@/services/apiv2';
import { toast } from 'sonner';
import { type Manga } from '../types/Admin';

export const useAdminTable = (
  manga: Manga[],
  setOpenEdit: (open: boolean) => void,
  setOpenView: (open: boolean) => void,
  setMangaData: (mangaData: Manga, isEdit: boolean) => void,
  isEdit: boolean,
  setIsEdit: (isEdit: boolean) => void,
  setOpenDelete: (open: boolean) => void,
  setOpenMangaChapter: (open: boolean) => void
): {
  table: ReturnType<typeof useReactTable<Manga>>;
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  columnVisibility: VisibilityState;
  setColumnVisibility: (visibility: VisibilityState) => void;
  rowSelection: Record<string, boolean>;
  setRowSelection: (selection: Record<string, boolean>) => void;
} => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const createColumns = (): ColumnDef<any>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Manga Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate capitalize text-sm">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "genres",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Genres
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase flex gap-2">
          {(row.getValue("genres") as string[]).map((genre: string, index: number) => {
            const colors = [
              "bg-blue-500 text-white",
              "bg-pink-500 text-white",
              "bg-purple-500 text-white"
            ];
            const colorClass = colors[index % 3];
            
            return (
              <div
                className={`px-2 py-1 rounded-md capitalize cursor-pointer ${colorClass}`}
                key={genre}
              >
                {genre}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      accessorKey: "totalChapter",
      header: () => <div className="text-center">Total Chapters</div>,
      cell: ({ row }) => {
        const total_chapters = parseFloat(row.getValue("totalChapter"));
        return <div className="text-center font-medium">{total_chapters}</div>;
      },
    },
    {
      accessorKey: "totalAvailableChapter",
      header: () => <div className="text-center">Total Released Chapters</div>,
      cell: ({ row }) => {
        const total_released_chapters = parseFloat(
          row.getValue("totalAvailableChapter")
        );
        return (
          <div className="text-center font-medium">{total_released_chapters}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
            >
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(payment.id);
                }}
              >
                Copy Manga ID
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEdit(true);
                  setMangaData(row.original, true);
                }}
              >
                Edit Manga
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                setOpenView(true);
                setMangaData(row.original, false);
              }}
              className="cursor-pointer">
                View Manga
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                setOpenMangaChapter(true);
                setMangaData(row.original, false);
              }}
              className="cursor-pointer">
                View Manga Chapter
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={async (e) => {
                e.stopPropagation();
                const response = await deleteManga(row.original.id.toString());
                if (response && response.status === 200) {
                  toast.success("Manga deleted successfully");
                }
              }}
              className="cursor-pointer text-red-500 hover:text-red-400">
                Delete Manga
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: manga,
    columns: createColumns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    table,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  };
};

