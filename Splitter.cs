using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;

public class Splitter {
    public static void Run() {
        string dir = @"C:\Users\Admin\.gemini\antigravity\scratch\on-tap-sinh-12\";
        string dbPath = dir + "database.js";
        string content = File.ReadAllText(dbPath, Encoding.UTF8);

        // Fix line 504 `);` to `];` if needed
        content = content.Replace("    { id: \"b5_83\", lesson: 5, type: \"short_answer\", question: \"Câu 83. Hình bên dưới mô tả một số giai đoạn (các giai đoạn được đánh số thứ tự từ 1 đến 5) trong công nghệ DNA tái tổ hợp. Trong các giai đoạn trên, giai đoạn số mấy là giai đoạn biến nạp DNA tái tổ hợp vào tế bào nhận?\", acceptableAnswers: [\"4\"], explanation: \"Giai đoạn số 4 là biến nạp DNA tái tổ hợp vào tế bào nhận.\" }\r\n);",
                                  "    { id: \"b5_83\", lesson: 5, type: \"short_answer\", question: \"Câu 83. Hình bên dưới mô tả một số giai đoạn (các giai đoạn được đánh số thứ tự từ 1 đến 5) trong công nghệ DNA tái tổ hợp. Trong các giai đoạn trên, giai đoạn số mấy là giai đoạn biến nạp DNA tái tổ hợp vào tế bào nhận?\", acceptableAnswers: [\"4\"], explanation: \"Giai đoạn số 4 là biến nạp DNA tái tổ hợp vào tế bào nhận.\" }\r\n];");
        File.WriteAllText(dbPath, content, Encoding.UTF8);

        // Find all question starts across entire file:
        var pattern = new Regex(@"(?m)^\s*\{(?:\s*id:\s*""b(?<lesson>\d+)_(?<num>\d+)""|\r?\n\s*id:\s*""b(?<lesson>\d+)_(?<num>\d+)"")");
        var matches = pattern.Matches(content);

        Console.WriteLine(string.Format("Total question matches across database.js: {0}", matches.Count));

        var lessonBlocks = new Dictionary<int, List<string>>();
        for (int i = 1; i <= 5; i++) lessonBlocks[i] = new List<string>();

        for (int i = 0; i < matches.Count; i++) {
            int qStart = matches[i].Index;
            int qEnd;
            if (i < matches.Count - 1) {
                qEnd = matches[i + 1].Index;
            } else {
                // Find closing brace of last question
                qEnd = content.IndexOf("];\r\n\r\n// Thông tin", qStart);
                if (qEnd < 0) qEnd = content.IndexOf("];\n\n// Thông tin", qStart);
                if (qEnd < 0) qEnd = content.IndexOf(");\r\n\r\n// Thông tin", qStart);
                if (qEnd < 0) qEnd = content.IndexOf(");\n\n// Thông tin", qStart);
                if (qEnd < 0) qEnd = content.Length;
            }

            string qText = content.Substring(qStart, qEnd - qStart).Trim();
            // remove trailing comma, push parentheses, or semicolons if present at the end
            while (qText.EndsWith(",") || qText.EndsWith(");") || qText.EndsWith("];") || qText.EndsWith(";")) {
                if (qText.EndsWith(",")) qText = qText.Substring(0, qText.Length - 1).Trim();
                else if (qText.EndsWith(");")) qText = qText.Substring(0, qText.Length - 2).Trim();
                else if (qText.EndsWith("];")) qText = qText.Substring(0, qText.Length - 2).Trim();
                else if (qText.EndsWith(";")) qText = qText.Substring(0, qText.Length - 1).Trim();
            }

            int lessonNum = int.Parse(matches[i].Groups["lesson"].Value);
            lessonBlocks[lessonNum].Add(qText);
        }

        for (int l = 1; l <= 5; l++) {
            Console.WriteLine(string.Format("Bài {0} count: {1}", l, lessonBlocks[l].Count));
            var sb = new StringBuilder();
            sb.AppendLine(string.Format("// BÀI {0} - TỔNG CỘNG: {1} CÂU HỎI (CHUẨN ĐỀ CƯƠNG & ĐÁP ÁN)", l, lessonBlocks[l].Count));
            sb.AppendLine(string.Format("window.DATA_B{0} = [", l));
            for (int j = 0; j < lessonBlocks[l].Count; j++) {
                sb.Append("  " + lessonBlocks[l][j]);
                if (j < lessonBlocks[l].Count - 1) sb.AppendLine(",");
                else sb.AppendLine();
            }
            sb.AppendLine("];");
            File.WriteAllText(dir + string.Format("data_lesson{0}.js", l), sb.ToString(), Encoding.UTF8);
        }

        Console.WriteLine("All 5 data_lesson files generated perfectly!");
    }
}
