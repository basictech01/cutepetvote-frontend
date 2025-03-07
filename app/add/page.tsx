"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BlobServiceClient } from "@azure/storage-blob";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Participate() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        petName: "",
        agreeToTerms: false,
        consentToMarketing: false,
    })
    const [petPhoto, setPetPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const fileInputRef = useRef<HTMLInputElement>(null)

    // --- Validation ---
    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // Owner Name
        if (!formData.name.trim()) {
            newErrors.name = "Your name is required"
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        // Phone
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
            newErrors.phone = "Please enter a valid phone number"
        }

        // Pet Name
        if (!formData.petName.trim()) {
            newErrors.petName = "Pet name is required"
        }

        // Pet Photo
        if (!petPhoto) {
            newErrors.petPhoto = "Pet photo is required"
        }

        // Terms & Conditions
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the Terms & Conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // --- Handlers ---
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setPetPhoto(file)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            setPetPhoto(file)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            let url = process.env.NEXT_PUBLIC_BACKEND_URL;
            let campaignId = parseInt(process.env.NEXT_PUBLIC_CAMPAIGN_ID as any, 10);

            let imageUrl = "";

            if (petPhoto) {
                const connectionString = process.env.NEXT_PUBLIC_AZURE_BLOB;
                if (!connectionString) {
                    throw new Error("Azure Blob connection string is missing");
                }

                const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
                const containerName = "photos"
                const containerClient = blobServiceClient.getContainerClient(containerName);
                const blobName = `pet-photos/${Date.now()}-${petPhoto.name}`;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);

                // Upload the file
                await blockBlobClient.uploadData(petPhoto, {
                    blobHTTPHeaders: { blobContentType: petPhoto.type },
                });

                // Get the URL
                imageUrl = blockBlobClient.url;
            }

            // Send form data to backend
            const response = await fetch(`${url}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, campaignId, photo: imageUrl }),
            });

            const data = await response.json();
            if (!data.error) {
                router.push("/success");
            } else {
                toast.error("Error sending data! Try again", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Image upload failed. Try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <Header />

            {/* Container */}
            <div className="mb-16 max-w-xl mx-auto bg-gray-50">
                <div className="bg-white border-b">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white relative overflow-hidden">
                        <div className="text-center w-full">
                            <div className="text-center relative w-full">
                                <Image
                                    src="/placeholder.svg?height=150&width=300"
                                    alt="Pets collage"
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="my-5 mx-auto space-y-5 max-w-[60%]">
                            <div className="flex rounded-full items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-orange-500 flex items-center justify-center text-xs font-bold">
                                    1
                                </div>
                                <p className="ml-2 text-sm">Enter your pet details and photo.</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-orange-500 flex items-center justify-center text-xs font-bold">
                                    2
                                </div>
                                <p className="ml-2 text-sm">Entry completed, good luck!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
                    {/* Owner Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Your Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"
                                } shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            placeholder="e.g. John Doe"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                } shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            placeholder="e.g. john@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"
                                } shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            placeholder="e.g. 1234567890"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>

                    {/* Pet Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="petName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enter Pet Name *
                        </label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            value={formData.petName}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.petName ? "border-red-500" : "border-gray-300"
                                } shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            placeholder="e.g. Fluffy"
                        />
                        {errors.petName && (
                            <p className="mt-1 text-sm text-red-500">{errors.petName}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Have more than 1 pet? Enter up to 4 pets as 1 entry.
                        </p>
                    </div>

                    {/* Pet Photo Upload */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-orange-500 mb-2">
                            HOW TO UPLOAD
                        </h3>
                        <p className="text-sm text-gray-700 mb-4">
                            Upload your images by dragging them into the{" "}
                            <span className="inline-flex items-center justify-center bg-orange-500 text-white rounded-full h-5 w-5 text-xs">
                                +
                            </span>{" "}
                            box below or click to select images from your device. Maximum 4
                            images.
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                            Choose your pet's profile picture by clicking on one of the
                            uploaded images.
                            <br />
                            All photos are subject to review by our team.
                        </p>

                        <div
                            className={`border-2 border-dashed ${errors.petPhoto ? "border-red-500" : "border-gray-300"
                                } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50`}
                            onClick={triggerFileInput}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            {photoPreview ? (
                                <div className="relative h-40 w-40">
                                    <Image
                                        src={photoPreview}
                                        alt="Pet preview"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="flex space-x-8">
                                        <div className="text-gray-300">
                                            <svg
                                                width="64"
                                                height="64"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 5C12 5 12 2 9 2C6 2 6 5 6 5M12 5H6M12 5C12 5 12 2 15 2C18 2 18 5 18 5M12 5H18M18 5C18 5 22 5 22 9C22 13 18 13 18 13M18 13C18 13 18 16 15 16C12 16 12 13 12 13M18 13H12M12 13C12 13 12 16 9 16C6 16 6 13 6 13M12 13H6M6 13C6 13 2 13 2 9C2 5 6 5 6 5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-gray-300">
                                            <svg
                                                width="64"
                                                height="64"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.0002 8C10.0002 9.10457 9.10473 10 8.00016 10C6.89558 10 6.00016 9.10457 6.00016 8C6.00016 6.89543 6.89558 6 8.00016 6C9.10473 6 10.0002 6.89543 10.0002 8Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M7.00016 2H17.0002C19.7616 2 22.0002 4.23858 22.0002 7V17C22.0002 19.7614 19.7616 22 17.0002 22H7.00016C4.23873 22 2.00016 19.7614 2.00016 17V7C2.00016 4.23858 4.23873 2 7.00016 2ZM7.00016 4C5.34331 4 4.00016 5.34315 4.00016 7V17C4.00016 18.6569 5.34331 20 7.00016 20H17.0002C18.657 20 20.0002 18.6569 20.0002 17V7C20.0002 5.34315 18.657 4 17.0002 4H7.00016Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M13.2501 9.5L11.7501 7.5L5.00016 16H19.0002L13.2501 9.5Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-400">
                                        Select a profile picture
                                        <br />
                                        from your uploads
                                    </p>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="petPhoto"
                                name="petPhoto"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {errors.petPhoto && (
                            <p className="mt-1 text-sm text-red-500">{errors.petPhoto}</p>
                        )}
                    </div>

                    {/* Terms & Marketing */}
                    <div className="mb-6 space-y-4">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className={`h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded ${errors.agreeToTerms ? "border-red-500" : ""
                                        }`}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                    Agree to{" "}
                                    <Link href="#" className="text-orange-500 hover:text-orange-700">
                                        T's &amp; C's
                                    </Link>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="consentToMarketing"
                                    name="consentToMarketing"
                                    type="checkbox"
                                    checked={formData.consentToMarketing}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="consentToMarketing" className="font-medium text-gray-700">
                                    Consent to Marketing Messages
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="rounded-full py-2 px-6 border border-transparent shadow-sm text-sm font-medium -md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}


