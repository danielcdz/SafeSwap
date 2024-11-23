"use client";

import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarProvider,
	SidebarTrigger,
} from "@/app/components/ui/sidebar";
import { Slider } from "@/app/components/ui/slider";
import { Menu as HamIcon, Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface Product {
	id: number;
import {
	Menu as HamIcon,
	MessageSquareMore,
	Search,
	ShoppingCart,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ImageCarousel from "../components/ui/image-carrousel";

interface Product {
	id: number;
	images: { src: string; alt: string }[];
	name: string;
	price: number;
	category: string;
}

interface SidebarComponentProps {
	priceRange: [number, number];
	setPriceRange: Dispatch<SetStateAction<[number, number]>>;
	selectedCategories: string[];
	handleCategoryChange: (category: string) => void;
}

interface HeaderComponentProps {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
}

interface ProductListProps {
	products: Product[];
}

const products: Product[] = [
	{ id: 1, name: "Laptop Pro", price: 1299, category: "Electronics" },
	{ id: 2, name: "Smartphone X", price: 699, category: "Electronics" },
	{ id: 3, name: "Ergonomic Chair", price: 299, category: "Furniture" },
	{ id: 4, name: "Coffee Maker", price: 89, category: "Appliances" },
	{ id: 5, name: "Running Shoes", price: 129, category: "Sports" },
	{ id: 6, name: "Wireless Earbuds", price: 159, category: "Electronics" },
	{
		id: 1,
		name: "MacBook Pro 14",
		price: 1299,
		category: "Electronics",
		images: [
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
			{ src: "/images/macbook-pro-14.webp", alt: "MacBook Pro 14" },
		],
	},
	{
		id: 2,
		name: "Samsung Galaxy S24 FE",
		price: 699,
		category: "Electronics",
		images: [
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
			{
				src: "/images/samsung-galaxy-s24-fe.webp",
				alt: "Samsung Galaxy S24 FE",
			},
		],
	},
	{
		id: 3,
		name: "Ergonomic Chair",
		price: 299,
		category: "Furniture",
		images: [
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
			{ src: "/images/ergonomic-chair.jpg", alt: "Ergonomic Chair" },
		],
	},
	{
		id: 4,
		name: "Coffee Maker",
		price: 89,
		category: "Appliances",
		images: [
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
			{ src: "/images/coffee-maker.webp", alt: "Coffee Maker" },
		],
	},
	{
		id: 5,
		name: "Running Shoes",
		price: 129,
		category: "Sports",
		images: [
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
			{ src: "/images/running-shoes.jpg", alt: "Running Shoes" },
		],
	},
	{
		id: 6,
		name: "Wireless Earbuds",
		price: 159,
		category: "Electronics",
		images: [
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
			{ src: "/images/wireless-earbuds.jpg", alt: "Wireless Earbuds" },
		],
	},
];

export default function Marketplace() {
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	const filteredProducts = products.filter(
		(product) =>
			(searchTerm === "" ||
				product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(selectedCategories.length === 0 ||
				selectedCategories.includes(product.category)) &&
			product.price >= priceRange[0] &&
			product.price <= priceRange[1],
	);

	return (
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden">
				<SidebarComponent
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					selectedCategories={selectedCategories}
					handleCategoryChange={handleCategoryChange}
				/>
				<div className="flex-1 overflow-auto">
					<HeaderComponent
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<ProductList products={filteredProducts} />
				</div>
			</div>
		</SidebarProvider>
	);
}

function SidebarComponent({
	priceRange,
	setPriceRange,
	selectedCategories,
	handleCategoryChange,
}: SidebarComponentProps) {
	const handleSliderChange = (value: number[]) => {
		if (value.length === 2) {
			setPriceRange([value[0], value[1]]);
		}
	};
	return (
		<Sidebar>
			<SidebarHeader className="p-6 border-b">
				<h2 className="text-xl font-semibold">Filters</h2>
			</SidebarHeader>
			<SidebarContent className="p-6">
				<div className="space-y-8">
					<div>
						<h3 className="mb-2 text-lg font-medium">Price range</h3>
						<Slider
							min={0}
							max={1500}
							step={10}
							value={priceRange}
							onValueChange={handleSliderChange}
							onValueChange={(value) =>
								setPriceRange(value as [number, number])
							}
							className="mb-3"
						/>
						<div className="flex justify-between text-lg">
							<span>${priceRange[0]}</span>
							<span>${priceRange[1]}</span>
						</div>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-medium">Categories</h3>
						<div className="space-y-3">
							{["Electronics", "Furniture", "Appliances", "Sports"].map(
								(category) => (
									<div key={category} className="flex items-center">
										<Checkbox
											id={category}
											checked={selectedCategories.includes(category)}
											onCheckedChange={() => handleCategoryChange(category)}
										/>
										<label htmlFor={category} className="ml-3 text-lg">
											{category}
										</label>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}

function HeaderComponent({ searchTerm, setSearchTerm }: HeaderComponentProps) {
	return (
		<header className="flex items-center justify-between p-6 border-b">
			<SidebarTrigger>
				<Button variant="outline" size="icon">
					<HamIcon className="h-6 w-6" />
					<span className="sr-only">Toggle Sidebar</span>
				</Button>
			</SidebarTrigger>
			<div className="flex items-center text-2xl space-x-3">
			<div className="flex items-center text-2xl space-x-3 w-full md:w-auto">
				<Input
					type="search"
					placeholder="Search products..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-[16rem] h-[3rem]"
					className="w-full h-[3rem] md:w-[16rem]"
				/>
				<Button size="icon" variant="ghost">
					<Search className="h-5 w-5" />
					<span className="sr-only">Search</span>
				</Button>
			</div>
		</header>
	);
}

function ProductList({ products }: ProductListProps) {
	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-8">Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{products?.map((product) => (
					<Card key={product.id} className="p-6">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
			<div className="flex flex-wrap justify-center gap-8">
				{products?.map((product) => (
					<Card key={product.id}>
						<CardHeader>
							<ImageCarousel images={product.images} />
							<CardTitle className="text-xl font-medium">
								{product.name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-lg text-gray-500">{product.category}</p>
						</CardContent>
						<CardFooter className="flex justify-between items-center">
							<span className="text-2xl font-bold">${product.price}</span>
							<Button className="text-[16px] py-2 px-4">Add to Cart</Button>
						<CardFooter className="flex justify-between gap-2 items-center flex-wrap">
							<span className="text-3xl font-bold">${product.price}</span>
							<div className="flex flex-col m-auto">
								<Button className="mb-4">
									<ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									Add to Cart
								</Button>
								<Button className="text-[16px] !bg-[#F5F5F5] !text-black border border-[#D1D1D1] px-4 py-2 flex items-center gap-2 hover:bg-[#E0E0E0] hover:border-[#B3B3B3]">
									<MessageSquareMore /> Chat with Seller
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
