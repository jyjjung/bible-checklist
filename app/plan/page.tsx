"use client";

import { useState, useEffect } from "react";
import { Checkbox, Button, Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const bibleBooks = [
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

export default function BibleReadingPlan() {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [chaptersPerDay, setChaptersPerDay] = useState<number>(4);
  const [startingBook, setStartingBook] = useState<string>("Genesis");
  const [startingChapter, setStartingChapter] = useState<number>(1);
  const [holidayDates, setHolidayDates] = useState<string[]>([]);
  const [newHoliday, setNewHoliday] = useState<string>("");
  const [plan, setPlan] = useState<{ date: string; readings: string[] }[]>([]);
  const [skipWeekdays, setSkipWeekdays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [showFullPlan, setShowFullPlan] = useState<boolean>(false); // Flag to toggle full plan view

  // Initialize state from localStorage or use defaults
  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("bibleReadingPlan") || "{}"
    );
    if (storedData) {
      setStartDate(
        storedData.startDate || new Date().toISOString().split("T")[0]
      );
      setChaptersPerDay(storedData.chaptersPerDay || 4);
      setStartingBook(storedData.startingBook || "Genesis");
      setStartingChapter(storedData.startingChapter || 1);
      setHolidayDates(storedData.holidayDates || []);
      setSkipWeekdays(
        storedData.skipWeekdays || [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]
      );
      setPlan(storedData.plan || []);
    }
  }, []);

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem(
      "bibleReadingPlan",
      JSON.stringify({
        startDate,
        chaptersPerDay,
        startingBook,
        startingChapter,
        holidayDates,
        skipWeekdays,
        plan,
      })
    );
  };

  // Generate the reading plan
  const generatePlan = () => {
    if (!startDate || !chaptersPerDay || !startingBook || !startingChapter) {
      alert("Please fill out all fields!");
      return;
    }

    const generatedPlan = [];
    const currentDate = new Date(startDate);
    let currentBookIndex = bibleBooks.findIndex(
      (book) => book.name === startingBook
    );
    let currentChapter = startingChapter;

    // Store the initial starting point to stop when reached
    const startingPoint = { book: startingBook, chapter: startingChapter };

    while (true) {
      const dailyReadings: string[] = [];

      // Skip holidays
      while (holidayDates.includes(currentDate.toISOString().split("T")[0])) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Skip selected weekdays
      const weekday = currentDate.getDay();
      if (skipWeekdays[weekday]) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      for (let dayChapters = 0; dayChapters < chaptersPerDay; dayChapters++) {
        if (currentBookIndex >= bibleBooks.length) break;

        dailyReadings.push(
          `${bibleBooks[currentBookIndex].name} ${currentChapter}`
        );

        currentChapter++;

        if (currentChapter > bibleBooks[currentBookIndex].chapters) {
          currentChapter = 1;
          currentBookIndex++;
          if (currentBookIndex >= bibleBooks.length) {
            currentBookIndex = 0;
          }
        }

        // Stop when we reach the starting point again
        if (
          bibleBooks[currentBookIndex].name === startingPoint.book &&
          currentChapter === startingPoint.chapter
        ) {
          generatedPlan.push({
            date: currentDate.toISOString().split("T")[0],
            readings: dailyReadings,
          });
          setPlan(generatedPlan);
          saveToLocalStorage(); // Save to localStorage after generating the plan
          return; // Stop after generating the plan
        }
      }

      generatedPlan.push({
        date: currentDate.toISOString().split("T")[0],
        readings: dailyReadings,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  // Add holiday
  const handleHolidayAdd = () => {
    if (newHoliday) {
      const updatedHolidays = [...holidayDates, newHoliday];
      setHolidayDates(updatedHolidays);
      setNewHoliday("");
    }
  };

  // Delete holiday
  const handleHolidayDelete = (holiday: string) => {
    const updatedHolidays = holidayDates.filter((item) => item !== holiday);
    setHolidayDates(updatedHolidays);
  };

  // Handle skip weekday checkbox
  const handleWeekdayChange = (index: number) => {
    const updatedWeekdays = [...skipWeekdays];
    updatedWeekdays[index] = !updatedWeekdays[index];
    setSkipWeekdays(updatedWeekdays);
  };

  // Toggle full plan view
  const toggleFullPlan = () => {
    setShowFullPlan(!showFullPlan);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Bible Reading Plan">
        <Tab key="plan" title="Plan">
          <Card className="border border-gray-300 rounded-md shadow-md">
            <CardBody>
              <h4 className="text-xl font-semibold text-center text-gray-800">
                Your Reading Plan
              </h4>
              <Button
                onClick={generatePlan}
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Generate Plan
              </Button>
              <Button
                onClick={toggleFullPlan}
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                {showFullPlan ? "Today" : "Show Full Plan"}
              </Button>

              <div className="space-y-4 mt-4">
                {plan
                  .filter((day) => showFullPlan || day.date === selectedDate)
                  .map((day, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm"
                    >
                      <h5 className="text-lg font-semibold text-gray-800">
                        {day.date}
                      </h5>
                      <ul className="list-disc pl-6">
                        {day.readings.map((reading, idx) => (
                          <li key={idx} className="text-gray-700">
                            {reading}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="settings" title="Settings">
          <Card className="border border-gray-300 rounded-md shadow-md">
            <CardBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select a Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Settings for starting date, book, chapter, etc */}
                <div>
                  <label className="text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Starting Book</label>
                  <select
                    value={startingBook}
                    onChange={(e) => setStartingBook(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  >
                    {bibleBooks.map((book, index) => (
                      <option key={index} value={book.name}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Starting Chapter</label>
                  <input
                    type="number"
                    value={startingChapter}
                    onChange={(e) =>
                      setStartingChapter(parseInt(e.target.value))
                    }
                    className="w-full p-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Chapters Per Day</label>
                  <input
                    type="number"
                    value={chaptersPerDay}
                    onChange={(e) =>
                      setChaptersPerDay(parseInt(e.target.value))
                    }
                    className="w-full p-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Skip Weekdays */}
              <div className="mt-6">
                <h3 className="text-gray-700">Skip Weekdays</h3>
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      isSelected={skipWeekdays[index]}
                      onChange={() => handleWeekdayChange(index)}
                    >
                      <span className="text-gray-800">{day}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>

              {/* Holidays */}
              <div className="mt-6">
                <label className="block text-sm text-gray-700">
                  Add a Holiday
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={newHoliday}
                    onChange={(e) => setNewHoliday(e.target.value)}
                    className="p-2 rounded bg-gray-100 text-gray-800 border border-gray-300"
                  />
                  <Button
                    onClick={handleHolidayAdd}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                  >
                    Add Holiday
                  </Button>
                </div>
                <div className="mt-4">
                  <table className="w-full table-auto text-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Holiday</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holidayDates.map((holiday, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">{holiday}</td>
                          <td className="px-4 py-2">
                            <Button
                              size="sm"
                              onClick={() => handleHolidayDelete(holiday)}
                              color="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Generate Plan Button */}
              <Button
                onClick={generatePlan}
                className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-700"
                size="sm"
              >
                Generate Plan
              </Button>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
