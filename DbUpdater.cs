using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

public class DbUpdater {
    public static void Run() {
        string path = @"C:\Users\Admin\.gemini\antigravity\scratch\on-tap-sinh-12\database.js";
        string content = File.ReadAllText(path, Encoding.UTF8);

        // b2_49
        content = Regex.Replace(content, @"(id:\s*""b2_49""[\s\S]*?question:\s*"")[^""]*""", 
            @"$1Câu 49. Hình sau đây mô tả tóm tắt mấy cơ chế di truyền?""");

        // b3_27
        string q3_27 = "Câu 27. Hình bên mô tả hoạt động của operon lac ở vi khuẩn E. coli trong môi trường nuôi cấy. Phân tích hình hãy cho biết những phát biểu nào sau đây đúng?\\nI. Vi khuẩn đang được nuôi cấy trong môi trường có đường lactose.\\nII. X là protein ức chế, Y là allolactose.\\nIII. E1, E2, E3 lần lượt là enzyme β-galactosidase, enzyme permease và enzyme transacetylase.\\nIV. Operon lac của vi khuẩn E. coli đang ở trạng thái hoạt động.";
        content = Regex.Replace(content, @"(id:\s*""b3_27""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q3_27 + "\"");

        // b3_30
        string q3_30 = "Câu 30. Các trình tự của một operon ở vi khuẩn E. coli nằm trong đoạn NST được kí hiệu từ A đến E. Để xác định các trình tự của operon này, người ta sử dụng 5 trường hợp đột biến mất đoạn như hình bên (các đường gạch chéo biểu hiện đoạn bị mất). Kết quả thu được trường hợp 4 và 5 có các gene cấu trúc luôn được phiên mã; trường hợp 2 và 3 có các gene cấu trúc luôn không được phiên mã; trường hợp 1 chưa xác định được mức biểu hiện của các gene cấu trúc trong operon. Trong các phát biểu sau, phát biểu nào về trình tự operon trên là đúng?";
        content = Regex.Replace(content, @"(id:\s*""b3_30""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q3_30 + "\"");

        // b3_39
        string ctx3_39 = "Câu 39. Một học sinh sau khi quan sát hình (a) và hình (b) thể hiện cơ chế hoạt động của operon lac ở 2 chủng E.coli bình thường và đột biến dưới đây. Các nhận định sau là đúng hay sai về cơ chế hoạt động của operon lac ở 2 chủng E.coli dạng bình thường và dạng đột biến?";
        content = Regex.Replace(content, @"(id:\s*""b3_39""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx3_39 + "\"");

        // b3_40
        string ctx3_40 = "Câu 40. Khi nghiên cứu về hoạt động của operon lac ở 3 chủng vi khuẩn E.coli, người ta thu được kết quả như bảng sau:\\n• Chủng 1: Có lactose (+), Không lactose (-)\\n• Chủng 2: Có lactose (+), Không lactose (+)\\n• Chủng 3: Protein điều hòa (-/-), mRNA gene cấu trúc (+/+)\\n[(+): sản phẩm được tạo ra; (-): sản phẩm không được tạo ra hoặc tạo ra không đáng kể]\\nTừ các kết quả trong bảng trên, các kết luận sau đây là đúng hay sai?";
        content = Regex.Replace(content, @"(id:\s*""b3_40""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx3_40 + "\"");

        // b3_43
        string ctx3_43 = "Câu 43. Hình bên cho thấy kết quả xác định mức biểu hiện (qua phiên mã và dịch mã) của gene Z mã hóa enzyme β-galactosidase ở chủng E. coli kiểu dại, sinh trưởng trong môi trường tối thiểu ban đầu không có lactose và bổ sung một lượng nhất định lactose vào phút thứ 3. Các đường đồ thị (1), (2) biểu thị sản phẩm của gene Z (lượng enzyme β-galactosidase hoặc lượng mRNA).";
        content = Regex.Replace(content, @"(id:\s*""b3_43""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx3_43 + "\"");

        // b4_56
        string ctx4_56 = "Câu 56. Hình sau mô tả sự ảnh hưởng của một loại đột biến điểm đến chuỗi polypeptide:\\n• Mạch mã gốc ban đầu: TAC ACC TTG GCG ACG ACT\\n• mRNA: AUG UGG AAC CGC UGC UGA\\n• Chuỗi polypeptide: Met - Trp - Asn - Arg - Cys - Stop\\n• Mạch mã gốc đột biến: TAC ACC TTG GGA CGA CT\\n• mRNA: AUG UGG AAC CCU GCU GA\\n• Chuỗi polypeptide: Met - Trp - Asn - Pro - Ala\\nMỗi nhận định sau đây là đúng hay sai về đột biến trên?";
        content = Regex.Replace(content, @"(id:\s*""b4_56""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx4_56 + "\"");

        // b4_57
        string ctx4_57 = "Câu 57. Bệnh X là một bệnh di truyền được gây ra bởi một đột biến điểm theo sơ đồ hình bên dưới. Biết rằng Y là một quá trình sinh học, các số (i), (ii) là các mã di truyền, (iii) là một loại amino acid. Phân tích hình và xác định Đúng hay Sai cho mỗi nhận định sau đây:";
        content = Regex.Replace(content, @"(id:\s*""b4_57""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx4_57 + "\"");

        // b4_62
        string q4_62 = "Câu 62. Hai hình dưới đây cho thông tin về liên kết hydrogen theo nguyên tắc bổ sung giữa các base bình thường trong DNA và sự bắt cặp nhầm giữa các base xảy ra trong nhân đôi DNA. Có bao nhiêu base trong hình bắt cặp nhầm ((a), (b), (c), (d)) là base dạng hiếm (hỗ biến)?";
        content = Regex.Replace(content, @"(id:\s*""b4_62""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q4_62 + "\"");

        // b4_63
        string q4_63 = "Câu 63. Một gene ở sinh vật nhân sơ có cấu trúc được thể hiện ở hình bên dưới; trong đó ATG và TAG lần lượt là mã mở đầu và mã kết thúc của gene. Một đột biến thay thế cặp nucleotide làm biến đổi bộ ba CAG thành TAG, dẫn đến xuất hiện mã kết thúc sớm và làm số lượng amino acid của chuỗi polypeptide hoàn chỉnh bị giảm 412 amino acid. Biết rằng, đột biến chỉ xảy ra tại một vị trí duy nhất, amino acid mở đầu (formylmethionine) của chuỗi polypeptide bình thường và chuỗi polypeptide đột biến đều bị cắt khỏi chuỗi sau khi được tổng hợp; quá trình phiên mã và dịch mã diễn ra bình thường. Đột biến xảy ra tại nucleotide ở vị trí số bao nhiêu trong vùng mã hóa của gene (tính từ nucleotide ở vị trí số 1)?";
        content = Regex.Replace(content, @"(id:\s*""b4_63""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q4_63 + "\"");

        // b5_76
        string ctx5_76 = "Câu 76. Hình bên dưới mô tả một quy trình kĩ thuật trong trong chọn giống. Phân tích hình và xác định đúng hay sai cho mỗi phát biểu sau đây:";
        content = Regex.Replace(content, @"(id:\s*""b5_76""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx5_76 + "\"");

        // b5_77
        string ctx5_77 = "Câu 77. Hình bên dưới mô tả hai giai đoạn (1) và (2) trong kĩ thuật tạo DNA tái tổ hợp. Phân tích hình và xác định đúng hay sai cho mỗi nhận định sau đây:";
        content = Regex.Replace(content, @"(id:\s*""b5_77""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx5_77 + "\"");

        // b5_79
        string ctx5_79 = "Câu 79. Hình bên dưới mô tả quy trình công nghệ gene. Theo lý thuyết, mỗi nhận định sau đây là đúng hay sai?";
        content = Regex.Replace(content, @"(id:\s*""b5_79""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx5_79 + "\"");

        // b5_80
        string ctx5_80 = "Câu 80. Công nghệ DNA tái tổ hợp đã có nhiều thành tựu đột phá, như tạo sinh vật biến đổi gene. Hình bên dưới thể hiện các bước tạo DNA tái tổ hợp, trong đó, gene M của một loài nấm sợi được nối với vector plasmid T để tạo thành plasmid Z. Biết rằng, các thí nghiệm được thực hiện trong điều kiện tối ưu, không có đột biến phát sinh. Mỗi nhận định sau đây đúng hay sai?";
        content = Regex.Replace(content, @"(id:\s*""b5_80""[\s\S]*?context:\s*"")[^""]*""", 
            "$1" + ctx5_80 + "\"");

        // b5_82
        string q5_82 = "Câu 82. Hình bên dưới mô tả một số giai đoạn (các giai đoạn được đánh số thứ tự từ 1 đến 4) trong công nghệ DNA tái tổ hợp. Trong các giai đoạn trên, có bao nhiêu giai đoạn cần sử dụng enzyme restrictase?";
        content = Regex.Replace(content, @"(id:\s*""b5_82""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q5_82 + "\"");

        // b5_83
        string q5_83 = "Câu 83. Hình bên dưới mô tả một số giai đoạn (các giai đoạn được đánh số thứ tự từ 1 đến 5) trong công nghệ DNA tái tổ hợp. Trong các giai đoạn trên, giai đoạn số mấy là giai đoạn biến nạp DNA tái tổ hợp vào tế bào nhận?";
        content = Regex.Replace(content, @"(id:\s*""b5_83""[\s\S]*?question:\s*"")[^""]*""", 
            "$1" + q5_83 + "\"");

        File.WriteAllText(path, content, Encoding.UTF8);
        Console.WriteLine("C# Updater: Successfully updated database.js!");
    }
}
