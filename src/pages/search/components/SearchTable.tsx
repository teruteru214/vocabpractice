import { Button } from "@/components/Ui/Button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/Ui/Table";
import reading from "@/public/reading.webp";
import type { TextProps } from "@/types/text";
import { IconFileTextAi } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchTable = ({ texts = [] }: TextProps) => {
	const router = useRouter();

	if (texts.length === 0) {
		return (
			<div className="h-screen flex flex-col justify-center items-center space-y-4">
				<div className="flex justify-center">
					<Image src={reading} alt="No results" height={150} />
				</div>
				<p className="text-center">英単語をまとめて文章にして覚えよう！</p>
				<div className="flex justify-center">
					<Link href="/user/create">
						<Button className="mt-4" size="lg">
							<IconFileTextAi className="h-6 w-6 mr-2" />
							例文を生成する
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-3/4 sm:w-2/3">Words</TableHead>
					<TableHead className="hidden sm:table-cell">Level</TableHead>
					<TableHead className="hidden sm:table-cell">Theme</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{texts.map((text) => (
					<TableRow
						key={text.id}
						onClick={() => router.push(`/texts/${text.id}`)}
						className="cursor-pointer hover:bg-gray-100"
					>
						<TableCell className="max-w-[18rem] truncate">
							{text?.words.map((word) => `#${word}`).join(" ")}
						</TableCell>
						<TableCell className="hidden sm:table-cell">{text.level}</TableCell>
						<TableCell className="hidden sm:table-cell">{text.theme}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default SearchTable;
