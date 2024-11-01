"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import imageCompression from "browser-image-compression";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Zod schema untuk validasi
const kulinerSchema = z.object({
  name: z.string().min(1, { message: "Nama kuliner is required" }),
  qualityRating: z.string().min(1, { message: "Rating is required" }),
  priceRating: z.string().min(1, { message: "Rating harga is required" }),
  description: z.string().min(1, { message: "Deskripsi is required" }),
  address: z.string().min(1, { message: "Alamat is required" }),
  workingHoursStart: z
    .string()
    .min(1, { message: "Jam kerja mulai is required" }),
  workingHoursStop: z
    .string()
    .min(1, { message: "Jam kerja selesai is required" }),
  workingDays: z.string().min(1, { message: "Hari kerja is required" }),
  gmapsLink: z.string().min(1, { message: "Link GMaps is required" }),
});

type KulinerFormValues = z.infer<typeof kulinerSchema>;

const KulinerForm = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KulinerFormValues>({
    resolver: zodResolver(kulinerSchema),
  });

  const ErrorLabel = ({ message }: { message?: string }) => {
    return <label className="text-red-500 text-sm">{message}</label>;
  };

  // Fungsi pengiriman form
  const onSubmit = async (data: KulinerFormValues) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("qualityRating", data.qualityRating);
    formData.append("priceRating", data.priceRating);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("workingHoursStart", data.workingHoursStart);
    formData.append("workingHoursStop", data.workingHoursStop);
    formData.append("workingDays", data.workingDays);
    formData.append("gmapsLink", data.gmapsLink);

    // Hanya menambahkan file jika file tersedia
    if (thumbnailFile) {
      formData.append("images", thumbnailFile); // Perbaikan nama field
    }

    try {
      const response = await fetch("/api/kuliner", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Sukses ",
          description: "Sukses menambahkan data",
        });
        console.log("Kuliner created successfully", result);
        router.push("/dashboard/kuliner");
      } else {
        toast({
          variant: "destructive",
          title: "Gagal",
          description: "Data tidak dapat ditambahkan",
        });
        console.error("Failed to create kuliner", result);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setUploading(false);
    }
  };

  // Fungsi untuk mengompresi gambar dan menyetelnya
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
        });

        setThumbnailFile(compressedFile);
        setThumbnailPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="w-fit">
          <label>Gambar Kuliner</label>
          <Input type="file" onChange={handleFileChange} />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <div>
          <label>Nama Kuliner</label>
          <Input {...register("name")} />
          {errors.name && <ErrorLabel message={errors.name.message} />}
        </div>

        <div>
          <label>Rating</label>
          <RadioGroup className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index + 1} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={(index + 1).toString()}
                  id={`qualityRating-${index + 1}`}
                  {...register("qualityRating")}
                />
                <label htmlFor={`qualityRating-${index + 1}`}>
                  {index + 1}
                </label>
              </div>
            ))}
          </RadioGroup>
          {errors.qualityRating && (
            <ErrorLabel message={errors.qualityRating.message} />
          )}
        </div>

        <div>
          <label>Rating Harga</label>
          <RadioGroup className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index + 1} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={(index + 1).toString()}
                  id={`priceRating-${index + 1}`}
                  {...register("priceRating")}
                />
                <label htmlFor={`priceRating-${index + 1}`}>{index + 1}</label>
              </div>
            ))}
          </RadioGroup>
          {errors.priceRating && (
            <ErrorLabel message={errors.priceRating.message} />
          )}
        </div>

        <div>
          <label>Deskripsi</label>
          <Textarea {...register("description")} />
          {errors.description && (
            <ErrorLabel message={errors.description.message} />
          )}
        </div>

        <div>
          <label>Alamat</label>
          <Textarea {...register("address")} />
          {errors.address && <ErrorLabel message={errors.address.message} />}
        </div>

        <div>
          <label>Jam Kerja Mulai</label>
          <Input type="time" {...register("workingHoursStart")} />
          {errors.workingHoursStart && (
            <ErrorLabel message={errors.workingHoursStart.message} />
          )}
        </div>

        <div>
          <label>Jam Kerja Selesai</label>
          <Input type="time" {...register("workingHoursStop")} />
          {errors.workingHoursStop && (
            <ErrorLabel message={errors.workingHoursStop.message} />
          )}
        </div>

        <div>
          <label>Hari Kerja</label>
          <Input {...register("workingDays")} />
          {errors.workingDays && (
            <ErrorLabel message={errors.workingDays.message} />
          )}
        </div>

        <div>
          <label>Link GMaps</label>
          <Input {...register("gmapsLink")} />
          {errors.gmapsLink && (
            <ErrorLabel message={errors.gmapsLink.message} />
          )}
        </div>

        <div className={uploading ? "" : "invisible"}>
          <p>Uploading</p>
          <Progress indeterminate={true} />
        </div>

        <Button type="submit">Kirim</Button>
      </form>
    </>
  );
};

export default KulinerForm;
