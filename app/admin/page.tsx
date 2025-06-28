"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Loader,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, CartesianGrid, Cell, ResponsiveContainer, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip } from "@/components/ui/chart";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getManga } from "@/services/api";
import EditManga from "@/components/Admin/EditManga";
import ViewMagna from "@/components/Admin/ViewMagna";
import { deleteManga, getAllManga, getMangaChapter } from "@/services/apiv2";
import { toast } from "sonner";
import { MangaChapter } from "@prisma/client";
import ViewMangaChapter from "@/components/Admin/ViewMangaChapter";

export type Manga = {
  id: number;
  title: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
  coverImageUrl: string;
  categoryId?: number | null;
};

const createColumns = (
  setOpenEdit: (open: boolean) => void,
  setOpenView: (open: boolean) => void,
  setMangaData: (mangaData: Manga , isEdit: boolean) => void, 
  isEdit: boolean,
  setIsEdit: (isEdit: boolean) => void,
  setOpenDelete: (open: boolean) => void,
  setOpenMangaChapter: (open: boolean) => void
): ColumnDef<any>[] => [
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
                setMangaData(row.original , true);
              }}
            >
              Edit Manga
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              setOpenView(true);
              setMangaData(row.original , false);
            }}
            className="cursor-pointer">
              View Manga
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              setOpenMangaChapter(true);
              setMangaData(row.original , false);
            }}
            className="cursor-pointer">
              View Manga Chapter
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick={async (e) => {
              e.stopPropagation();
              const response = await deleteManga(row.original.id);
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

export default function AdminPage() {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openMangaChapter, setOpenMangaChapter] = useState<boolean>(false);
  useEffect(() => {
    const fetchManga = async () => {
      const data = await getAllManga();
      setManga(data);
      setLoading(false);
    };
    fetchManga();
  }, [ openDelete , openEdit , openView ]);
  const [loading, setLoading] = React.useState(true);
  const [manga, setManga] = React.useState<Manga[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [mangaData, setMangaData] = React.useState<Manga>({
    id: 0,
    title: "",
    description: "",
    genres: [],
    totalChapter: 0,
    totalAvailableChapter: 0,
    coverImageUrl: "",
    categoryId: 0,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: manga,
    columns: createColumns(setOpenEdit, setOpenView, setMangaData , isEdit , setIsEdit , setOpenDelete , setOpenMangaChapter ),
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
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
  ];

  const chartConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <>
      <EditManga open={openEdit} setOpen={setOpenEdit} mangaData={mangaData as unknown as Manga} />
      <ViewMagna open={openView} setOpen={setOpenView} mangaData={mangaData as unknown as Manga} />
      <ViewMangaChapter open={openMangaChapter} setOpen={setOpenMangaChapter} mangaData={mangaData as unknown as Manga} />
      <div className="w-full flex flex-col items-center justify-center">
        {/* <h1 className="text-xl font-bold text-center">Manga Admin Panel</h1> */}
        <div className="w-full px-10">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter manga..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-transparent text-white placeholder:text-zinc-400"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto bg-transparent text-white placeholder:text-zinc-400">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <>
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      </>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table className="min-h-[41vh]">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={createColumns(setOpenEdit, setOpenView, setMangaData , isEdit , setIsEdit , setOpenDelete , setOpenMangaChapter).length}
                      className="h-24 text-center bg-[#0D0D0D]"
                    >
                      <span className="flex items-center justify-center">
                        <Loader className="animate-spin h-5 w-5 text-zinc-100 self-center" />{" "}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={createColumns(setOpenEdit, setOpenView, setMangaData , isEdit , setIsEdit , setOpenDelete , setOpenMangaChapter).length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4 pb-1">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full px-10 flex gap-2 flex-col xl:flex-row">
          <div className="w-full xl:w-1/2  py-1">
            <Card className="bg-transparent">
              <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                  <CardTitle>Manga Views</CardTitle>
                  <CardDescription>
                    Showing total views for the last 30 days
                  </CardDescription>
                </div>
                <div className="flex">
                  {["desktop", "mobile"].map((key) => {
                    const chart = key as keyof typeof chartConfig;
                    return (
                      <button
                        key={chart}
                        data-active={activeChart === chart}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(chart)}
                      >
                        <span className="text-xs text-muted-foreground">
                          {chartConfig[chart].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                          {total[key as keyof typeof total].toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                          }}
                        />
                      }
                    />
                    <Bar
                      dataKey={activeChart}
                      fill={`var(--color-${activeChart})`}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="w-full xl:w-1/2 h-full py-1">
            <Card className="bg-transparent h-full p-2">
              <CardHeader>
                <CardTitle>Most Watched Manga</CardTitle>
                <CardDescription>
                  Top 5 manga by total views this month
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:p-2">
                <ChartContainer
                  config={{
                    views: {
                      label: "Total Views",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={[
                      { manga: "One Piece", views: 15420 },
                      { manga: "Naruto", views: 12350 },
                      { manga: "Demon Slayer", views: 11200 },
                      { manga: "Jujutsu Kaisen", views: 10800 },
                      { manga: "Attack on Titan", views: 9650 },
                    ]}
                    layout="vertical"
                    margin={{
                      left: 12,
                      right: 20,
                      top: 12,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis 
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="manga"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={110}
                      fontSize={14}
                      fontWeight={600}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[200px]"
                          labelFormatter={(value) => `${value}`}
                          formatter={(value) => [`${value.toLocaleString()} views`, "Total Views"]}
                        />
                      }
                    />
                    <Bar
                      dataKey="views"
                      radius={[0, 4, 4, 0]}
                    >
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#ec4899" />
                      <Cell fill="#eab308" />
                      <Cell fill="#22c55e" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f97316" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#06b6d4" />
                      <Cell fill="#a855f7" />
                      <Cell fill="#10b981" />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

