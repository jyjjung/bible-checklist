"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import ProgressBar from "@/components/ProgressBar";

const bibleBooks = [
  // Old Testament
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },

  // New Testament
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
];

interface Chapter {
  id: number;
  name: string;
  completed: boolean;
  completionDate: string | null;
}

interface Book {
  name: string;
  chapters: Chapter[];
}

export default function ChecklistPage() {
  const [books, setBooks] = useState<Book[]>(
    bibleBooks.map((book) => ({
      ...book,
      chapters: Array.from({ length: book.chapters }, (_, i) => ({
        id: i + 1,
        name: `${book.name} ${i + 1}`,
        completed: false,
        completionDate: null,
      })),
    }))
  );

  useEffect(() => {
    const savedCompletionStates = localStorage.getItem("bibleCompletionStates");
    if (savedCompletionStates) {
      setBooks(JSON.parse(savedCompletionStates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bibleCompletionStates", JSON.stringify(books));
  }, [books]);

  const toggleCompletion = (bookName: string, chapterId: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.name === bookName
          ? {
              ...book,
              chapters: book.chapters.map((chapter) =>
                chapter.id === chapterId
                  ? {
                      ...chapter,
                      completed: !chapter.completed,
                      completionDate: !chapter.completed
                        ? new Date().toLocaleDateString()
                        : null,
                    }
                  : chapter
              ),
            }
          : book
      )
    );
  };

  const resetProgress = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset your progress?"
    );
    if (isConfirmed) {
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          chapters: book.chapters.map((chapter) => ({
            ...chapter,
            completed: false,
            completionDate: null,
          })),
        }))
      );
    }
  };

  const markBookAsDone = (bookName: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.name === bookName
          ? {
              ...book,
              chapters: book.chapters.map((chapter) => ({
                ...chapter,
                completed: true,
                completionDate: new Date().toLocaleDateString(),
              })),
            }
          : book
      )
    );
  };

  const markBookAsNotDone = (bookName: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.name === bookName
          ? {
              ...book,
              chapters: book.chapters.map((chapter) => ({
                ...chapter,
                completed: false,
                completionDate: null,
              })),
            }
          : book
      )
    );
  };

  const completedCount = books
    .map((book) => book.chapters.filter((chapter) => chapter.completed).length)
    .reduce((acc, count) => acc + count, 0);
  const totalCount = books
    .map((book) => book.chapters.length)
    .reduce((acc, count) => acc + count, 0);

  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bible Checklist</h1>
      <ProgressBar completed={progress} total={100} />

      <Button color="danger" onClick={resetProgress} className="mb-4">
        Reset Progress
      </Button>

      <Accordion isCompact variant="bordered">
        {books.map((book) => (
          <AccordionItem key={book.name} title={book.name}>
            <div className="mb-4 flex gap-2">
              <Button
                color="primary"
                size="sm"
                onClick={() => markBookAsDone(book.name)}
              >
                Mark All Chapters as Done
              </Button>
              <Button
                color="secondary"
                size="sm"
                onClick={() => markBookAsNotDone(book.name)}
              >
                Mark All Chapters as Not Done
              </Button>
            </div>
            <Table aria-label={`${book.name} chapters`}>
              <TableHeader>
                <TableColumn>Chapter Number</TableColumn>
                <TableColumn>Completed</TableColumn>
                <TableColumn>Completion Date</TableColumn>
              </TableHeader>
              <TableBody>
                {book.chapters.map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell>{chapter.id}</TableCell>
                    <TableCell>
                      <Checkbox
                        isSelected={chapter.completed}
                        onChange={() => toggleCompletion(book.name, chapter.id)}
                      />
                    </TableCell>
                    <TableCell>{chapter.completionDate || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
