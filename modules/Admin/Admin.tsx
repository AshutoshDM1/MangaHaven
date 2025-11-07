'use client';
import Section from '@/components/common/Section/Section';
import HorizontalGraph from './components/HorizontalGraph';
import VerticalGraph from './components/VerticalGraph';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminDialogs } from './hooks/useAdminDialogs';
import { useAdminManga } from './hooks/useAdminManga';
import { useAdminTable } from './hooks/useAdminTable';
import MangaDetail from './components/MangaDetail';
import EditManga from './components/EditManga';
import ViewMagna from './components/ViewMagna';
import ViewMangaChapter from './components/ViewMangaChapter';
import { Manga } from './types/Admin';

export default function Admin() {
  const {
    openEdit,
    setOpenEdit,
    openView,
    setOpenView,
    openDelete,
    setOpenDelete,
    openMangaChapter,
    setOpenMangaChapter,
  } = useAdminDialogs();

  const {
    loading,
    manga,
    isEdit,
    setIsEdit,
    mangaData,
    setMangaData,
  } = useAdminManga(openDelete, openEdit, openView);

  const { table } = useAdminTable(
    manga,
    setOpenEdit,
    setOpenView,
    setMangaData,
    isEdit,
    setIsEdit,
    setOpenDelete,
    setOpenMangaChapter
  );

  return (
    <>
    <EditManga open={openEdit} setOpen={setOpenEdit} mangaData={mangaData as unknown as Manga} />
    <ViewMagna open={openView} setOpen={setOpenView} mangaData={mangaData as unknown as Manga} />
    <ViewMangaChapter open={openMangaChapter} setOpen={setOpenMangaChapter} mangaData={mangaData as unknown as Manga} />
      <Section className="w-full flex flex-col items-center justify-center">
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
                  .filter((column: any) => column.getCanHide())
                  .map((column: any) => {
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
          <MangaDetail table={table} loading={loading} />
        </div>
        <div className="w-full px-10 flex gap-2 flex-col xl:flex-row">
          <VerticalGraph />
          <HorizontalGraph />
        </div>
      </Section>
    </>
  );
}
