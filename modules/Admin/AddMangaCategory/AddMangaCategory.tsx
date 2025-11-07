"use client";
import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { apiV2, searchManga, MangaSearchResult } from "@/services/apiv2";
import { toast } from "sonner";
import { Category, Manga } from "@prisma/client";
import { debounce } from "@/modules/Admin/constant/utils";
import { SEARCH_DEBOUNCE_DELAY, CATEGORY_MESSAGES } from "@/modules/Admin/constant/validation";
import { CategoryWithManga } from "@/modules/Admin/types/Admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";


const AddMangaCategory = () => {
  const [name, setName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryWithManga[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isManageMangaDialogOpen, setIsManageMangaDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MangaSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedManga, setSelectedManga] = useState<MangaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const response = await apiV2().get("/manga/add-category-manga");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(CATEGORY_MESSAGES.FETCH_ERROR);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddMangaCategory = async () => {
    if (!name.trim()) {
      toast.error(CATEGORY_MESSAGES.NAME_REQUIRED);
      return;
    }

    setIsLoading(true);
    try {
      await apiV2().post("/manga/add-category-manga", { name });
      toast.success(CATEGORY_MESSAGES.ADD_SUCCESS);
      setName("");
      await fetchCategories();
    } catch (error) {
      toast.error(CATEGORY_MESSAGES.ADD_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchManga(query.trim());
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching manga:", error);
        setSearchResults([]);
        toast.error(CATEGORY_MESSAGES.SEARCH_ERROR);
      } finally {
        setIsSearching(false);
      }
    }, SEARCH_DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedSearch]);

  const handleOpenDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedManga([]);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedManga([]);
  };

  const handleOpenManageMangaDialog = (category: CategoryWithManga) => {
    setSelectedCategory(category);
    setIsManageMangaDialogOpen(true);
  };

  const handleCloseManageMangaDialog = () => {
    setIsManageMangaDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleSelectManga = (manga: MangaSearchResult) => {
    if (!selectedManga.find((m) => m.id === manga.id)) {
      setSelectedManga([...selectedManga, manga]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveManga = (mangaId: number) => {
    setSelectedManga(selectedManga.filter((m) => m.id !== mangaId));
  };

  const handleAddMangaToCategory = async () => {
    if (!selectedCategory || selectedManga.length === 0) {
      toast.error(CATEGORY_MESSAGES.SELECT_MANGA);
      return;
    }
    setIsLoading(true);
    try {
      const mangaIds = selectedManga.map((m) => m.id);

      await apiV2().put("/manga/add-category-manga", {
        categoryId: selectedCategory.id,
        mangaId: mangaIds,
      });

      toast.success(
        CATEGORY_MESSAGES.ADD_MANGA_SUCCESS(selectedManga.length, selectedCategory.name)
      );
      handleCloseDialog();
      await fetchCategories();
    } catch (error) {
      console.error("Error adding manga to category:", error);
      toast.error(CATEGORY_MESSAGES.ADD_MANGA_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMangaFromCategory = async (mangaId: number) => {
    if (!selectedCategory) return;

    setIsLoading(true);
    try {
      await apiV2().delete("/manga/add-category-manga", {
        data: {
          categoryId: (selectedCategory as any).id,
          mangaId: [mangaId],
        }
      });

      toast.success(CATEGORY_MESSAGES.REMOVE_SUCCESS);
      await fetchCategories();
      const updatedCategories = categories.find(cat => cat.id === (selectedCategory as any).id);
      if (updatedCategories) {
        setSelectedCategory(updatedCategories as any);
      }
    } catch (error) {
      console.error("Error removing manga from category:", error);
      toast.error(CATEGORY_MESSAGES.REMOVE_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategoryManga = categories.find(cat => cat.id === (selectedCategory as any)?.id)?.mangas || [];

  return (
    <div className="bg-transparent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">
              Manage Manga Categories
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300">
              Create and manage categories to organize your manga collection
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Category Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name (e.g., Action, Romance, Horror)"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 transition-all duration-200"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleAddMangaCategory}
                disabled={!name.trim() || isLoading}
                className="w-full bg-primary hover:bg-primary/80 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Create Category
              </button>
            </div>

            <div className="bg-transparent border border-primary/20 dark:border-primary/80 rounded-lg p-4">
              <h3 className="text-sm font-medium text-primary dark:text-primary/80 mb-2">
                Tips:
              </h3>
              <ul className="text-sm text-primary dark:text-primary/80 space-y-1">
                <li>
                  • Choose descriptive category names for better organization
                </li>
                <li>• Categories help readers find manga by genre or theme</li>
                <li>• You can assign multiple categories to each manga</li>
                <li>• Use the manage button to view and remove manga from categories</li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  Existing Categories
                </h2>
              </div>
              <div className="p-6">
                {categories.length === 0 ? (
                  <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
                    No categories found. Create your first category above.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Manga Count</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category: CategoryWithManga) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {category.mangas?.length || 0}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleOpenDialog(category as any)}
                                className="bg-primary hover:bg-primary/80 text-white"
                                variant="outline"
                                size="sm"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Manga
                              </Button>
                              {category.mangas?.length > 0 && (
                                <Button
                                  onClick={() => handleOpenManageMangaDialog(category)}
                                  variant="outline"
                                  size="sm"
                                >
                                  Manage ({category.mangas.length})
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Manga to Category</DialogTitle>
            <DialogDescription>
              Search and select manga to add to &ldquo;{(selectedCategory as any)?.name}&rdquo;
              category
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedManga.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">
                  Selected Manga ({selectedManga.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedManga.map((manga) => (
                    <Badge
                      key={manga.id}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1"
                    >
                      {manga.title}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveManga(manga.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="space-y-2">
                <h3 className="font-medium">Search Results</h3>
                {isSearching ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    <p className="mt-2">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.map((manga) => (
                      <div
                        key={manga.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectManga(manga)}
                      >
                        {manga.coverImageUrl && (
                          <Image
                            src={manga.coverImageUrl}
                            alt={manga.title}
                            width={48}
                            height={64}
                            className="w-12 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{manga.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {manga.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {manga.totalChapter} chapters
                            </span>
                            {manga.genres && manga.genres.length > 0 && (
                              <div className="flex gap-1">
                                {manga.genres
                                  .slice(0, 2)
                                  .map((genre, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {genre}
                                    </Badge>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No manga found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : null}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                onClick={handleAddMangaToCategory}
                disabled={selectedManga.length === 0 || isLoading}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  "Add Manga to Category"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isManageMangaDialogOpen} onOpenChange={handleCloseManageMangaDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Category: {(selectedCategory as any)?.name}</DialogTitle>
            <DialogDescription>
              View and manage manga in this category
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {currentCategoryManga.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No manga in this category yet.
              </div>
            ) : (
              <div className="grid gap-4">
                {currentCategoryManga.map((manga) => (
                  <div key={manga.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {manga.coverImageUrl && (
                      <Image
                        src={manga.coverImageUrl}
                        alt={manga.title}
                        width={64}
                        height={80}
                        className="w-16 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{manga.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {manga.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {manga.totalAvailableChapter} chapters
                        </span>
                        {manga.genres && manga.genres.length > 0 && (
                          <div className="flex gap-1">
                            {manga.genres.slice(0, 3).map((genre, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMangaFromCategory((manga as any).id)}
                      disabled={isLoading}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseManageMangaDialog}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMangaCategory;


