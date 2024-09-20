import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import imageCompression from "browser-image-compression";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Progress } from "../ui/progress";

// Zod schema untuk validasi
const newsSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  publicationDate: z
    .string()
    .min(1, { message: "Publication date is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type NewsFormValues = z.infer<typeof newsSchema>;

const NewsForm = () => {
  const newButtonId = "new-button";
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema), // Validasi zod
  });

  const ErrorLabel = ({ message }: { message?: string }) => {
    return <label className="text-red-500 text-sm">{message}</label>;
  };

  // Mengambil kategori
  const fetchCategories = () => {
    axios
      .get("/api/category")
      .then((res) =>
        setCategories(
          [...res.data].concat({
            id: newButtonId,
            name: "Tambah Kategori Baru",
          })
        )
      )
      .catch((error) => console.error("Error fetching categories", error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Set tanggal yang dipilih ke dalam useForm setiap kali date berubah
  useEffect(() => {
    if (date) {
      setValue("publicationDate", format(date, "yyyy-MM-dd"));
    }
  }, [date, setValue]);

  // Fungsi pengiriman form
  const onSubmit = async (data: NewsFormValues) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("publicationDate", data.publicationDate);

    // Hanya menambahkan file jika file tersedia
    if (thumbnailFile) {
      formData.append("thumbnailFile", thumbnailFile);
    }

    if (bannerFile) {
      formData.append("bannerFile", bannerFile);
    }

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData, // Mengirim FormData
      });

      const result = await response.json();
      if (response.ok) {
        console.log("News created successfully", result);
      } else {
        console.error("Failed to create news", result);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setUploading(false);
    }
  };

  // Fungsi untuk mengompresi gambar dan menyetelnya
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Maksimal ukuran file 1MB
          maxWidthOrHeight: 800, // Ukuran maksimum lebar/tinggi 800px
        });

        setFile(compressedFile); // Set file terkompresi
        setPreview(URL.createObjectURL(compressedFile)); // Preview gambar
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  return (
    <>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <Progress
            className={!isLoadingCategory ? "invisible" : ""}
            indeterminate={true}
          />
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Kategori</AlertDialogTitle>
            <AlertDialogDescription>
              Isi data berikut, setelah itu tekan tombol tambah untuk
              menambahkan data kategori.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nama kategori"
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoadingCategory}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoadingCategory}
              onClick={async (e) => {
                e.preventDefault();
                setIsLoadingCategory(true);
                try {
                  const response = await axios.post("/api/category", {
                    name: newCategoryName,
                  });
                  console.log("Category created: ", response.data);
                  setNewCategoryName("");
                  fetchCategories();
                } catch (error) {
                  console.error("Error creating category:", error);
                } finally {
                  setIsLoadingCategory(false);
                  setIsAlertOpen(false);
                }
              }}
            >
              Tambah Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
          <label>Title</label>
          <Input {...register("title")} />
          {errors.title && <ErrorLabel message={errors.title.message} />}
        </div>

        <div>
          <label>Publication Date</label>
          <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={() => setIsOpen(!isOpen)}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.publicationDate && (
            <ErrorLabel message={errors.publicationDate.message} />
          )}
        </div>

        <div>
          <label>Category</label>
          <Select onValueChange={(value) => setValue("categoryId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="overflow-y-auto max-h-56">
              {categories.map((category) =>
                category.id === newButtonId ? (
                  <Button
                    key={newButtonId}
                    onClick={() => setIsAlertOpen(true)}
                    variant="outline"
                    className="w-full flex justify-center items-center"
                  >
                    {category.name}
                    <Plus />
                  </Button>
                ) : (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex justify-center items-center gap-2">
                      <span className="w-full">{category.name}</span>
                    </div>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <ErrorLabel message={errors.categoryId.message} />
          )}
        </div>

        <div className="w-fit">
          <label>Thumbnail</label>
          <Input
            type="file"
            onChange={(event) =>
              handleFileChange(event, setThumbnailFile, setThumbnailPreview)
            }
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="w-fit">
          <label>Banner</label>
          <Input
            type="file"
            onChange={(event) =>
              handleFileChange(event, setBannerFile, setBannerPreview)
            }
          />
          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div>
          <label>Content</label>
          <Textarea {...register("content")} />
          {errors.content && <ErrorLabel message={errors.content.message} />}
        </div>

        <div className={uploading ? "" : "invisible"}>
          <p>Uploading</p>
          <Progress indeterminate={true} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default NewsForm;
