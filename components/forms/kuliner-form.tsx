"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import imageCompression from "browser-image-compression";
import { Progress } from "../ui/progress";

// Zod schema untuk validasi
const kulinerSchema = z.object({
  namaKuliner: z.string().min(1, { message: "Nama kuliner is required" }),
  rating: z.string().min(1, { message: "Rating is required" }),
  ratingHarga: z.string().min(1, { message: "Rating harga is required" }),
  deskripsi: z.string().min(1, { message: "Deskripsi is required" }),
  alamat: z.string().min(1, { message: "Alamat is required" }),
  jamMulai: z.string().min(1, { message: "Jam kerja mulai is required" }),
  jamSelesai: z.string().min(1, { message: "Jam kerja selesai is required" }),
  hariKerja: z.string().min(1, { message: "Hari kerja is required" }),
  linkGmaps: z.string().min(1, { message: "Link GMaps is required" }),
});

type KulinerFormValues = z.infer<typeof kulinerSchema>;

const KulinerForm = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KulinerFormValues>({
    resolver: zodResolver(kulinerSchema), // Validasi zod
  });

  const ErrorLabel = ({ message }: { message?: string }) => {
    return <label className="text-red-500 text-sm">{message}</label>;
  };

  // Fungsi pengiriman form
  const onSubmit = async (data: KulinerFormValues) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("namaKuliner", data.namaKuliner);
    formData.append("rating", data.rating);
    formData.append("ratingHarga", data.ratingHarga);
    formData.append("deskripsi", data.deskripsi);
    formData.append("alamat", data.alamat);
    formData.append("jamMulai", data.jamMulai);
    formData.append("jamSelesai", data.jamSelesai);
    formData.append("hariKerja", data.hariKerja);
    formData.append("linkGmaps", data.linkGmaps);

    // Hanya menambahkan file jika file tersedia
    if (thumbnailFile) {
      formData.append("thumbnailFile", thumbnailFile);
    }

    try {
      const response = await fetch("/api/kuliner", {
        method: "POST",
        body: formData, // Mengirim FormData
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Kuliner created successfully", result);
      } else {
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
          maxSizeMB: 1, // Maksimal ukuran file 1MB
          maxWidthOrHeight: 800, // Ukuran maksimum lebar/tinggi 800px
        });

        setThumbnailFile(compressedFile); // Set file terkompresi
        setThumbnailPreview(URL.createObjectURL(compressedFile)); // Preview gambar
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
          <Input {...register("namaKuliner")} />
          {errors.namaKuliner && (
            <ErrorLabel message={errors.namaKuliner.message} />
          )}
        </div>

        <div>
          <label>Rating</label>
          <Select {...register("rating")}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.rating && <ErrorLabel message={errors.rating.message} />}
        </div>

        <div>
          <label>Rating Harga</label>
          <Select {...register("ratingHarga")}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating harga" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ratingHarga && (
            <ErrorLabel message={errors.ratingHarga.message} />
          )}
        </div>

        <div>
          <label>Deskripsi</label>
          <Textarea {...register("deskripsi")} />
          {errors.deskripsi && (
            <ErrorLabel message={errors.deskripsi.message} />
          )}
        </div>

        <div>
          <label>Alamat</label>
          <Textarea {...register("alamat")} />
          {errors.alamat && <ErrorLabel message={errors.alamat.message} />}
        </div>

        <div>
          <label>Jam Kerja Mulai</label>
          <Input type="time" {...register("jamMulai")} />
          {errors.jamMulai && <ErrorLabel message={errors.jamMulai.message} />}
        </div>

        <div>
          <label>Jam Kerja Selesai</label>
          <Input type="time" {...register("jamSelesai")} />
          {errors.jamSelesai && (
            <ErrorLabel message={errors.jamSelesai.message} />
          )}
        </div>

        <div>
          <label>Hari Kerja</label>
          <Input {...register("hariKerja")} />
          {errors.hariKerja && (
            <ErrorLabel message={errors.hariKerja.message} />
          )}
        </div>

        <div>
          <label>Link GMaps</label>
          <Input {...register("linkGmaps")} />
          {errors.linkGmaps && (
            <ErrorLabel message={errors.linkGmaps.message} />
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
