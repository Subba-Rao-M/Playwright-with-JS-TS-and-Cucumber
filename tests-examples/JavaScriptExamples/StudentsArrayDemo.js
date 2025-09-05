const students = [
    { name: "Alice", score: 36 },
    { name: "Bob", score: 42 },
    { name: "Charlie", score: 28 },
    { name: "David", score: 50 },
    { name: "Eve", score: 30 }
  
];

const passed_students = students.filter(student => student.score >= 36);
console.log("Passed Students: ", passed_students);

const uppercase_name = passed_students.map(student => student.name.toUpperCase())
console.log("Passed Students Names in Uppercase: ", uppercase_name);

//total score of passed students
const total_score = passed_students.reduce((total, student) => total + student.score, 0);
console.log("Total Score of Passed Students: ", total_score);