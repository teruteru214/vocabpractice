import { Button } from "@/components/Ui/Button";
import { Input } from "@/components/Ui/Input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Ui/Select";
import TextCard from "@/pages/components/TextCard";
import ai from "@/public/ai.webp";
import type { TextProps, TextsProps } from "@/types/text";
import Image from "next/image";
import { useState } from "react";

const FilterTexts = ({ texts = [] }: TextsProps) => {
	const [filter, setFilter] = useState<string>("");
	const [filteredTexts, setFilteredTexts] =
		useState<TextProps["text"][]>(texts);
	const [translation, setTranslation] = useState<"ja" | "en">("ja");

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setFilter(value);

		const filtered = texts.filter((text) =>
			text.words.some((word) => word.toLowerCase().includes(value)),
		);
		setFilteredTexts(filtered);
	};

	const handleTranslationChange = (value: "ja" | "en") => {
		setTranslation(value);
	};

	return (
		<search>
			<div className="flex space-x-2">
				<Input
					placeholder="英単語で絞り込めます"
					value={filter}
					onChange={handleFilterChange}
				/>
				<Select defaultValue="ja" onValueChange={handleTranslationChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a language" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="ja">和訳</SelectItem>
							<SelectItem value="en">英訳</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{filteredTexts.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
					{filteredTexts.map(
						(text) =>
							text && (
								<TextCard key={text.id} text={text} translation={translation} />
							),
					)}
				</div>
			) : (
				<div className="my-28">
					<div className="flex justify-center">
						<Image src={ai} alt="ai" height={300} />
					</div>
					<p className="text-gray-400 text-center mt-2">
						英文が作成されていません・・
						<br />
						AIと一緒に英文を作成しましょう！
					</p>
					<Button
						className="flex justify-center text-2xl mt-4 mx-auto"
						size="lg"
					>
						英文を作成する
					</Button>
				</div>
			)}
		</search>
	);
};

export default FilterTexts;
