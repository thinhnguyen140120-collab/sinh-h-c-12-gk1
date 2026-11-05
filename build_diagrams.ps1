[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$imgDir = "c:\Users\Admin\Downloads\sinh học12 gk1 (2026-2027)\ảnh"
$webDir = "c:\Users\Admin\Downloads\sinh học12 gk1 (2026-2027)\web sinh học 12 gk1 update2"
$diagramsFile = Join-Path $webDir "diagrams.js"

$oldContent = [System.IO.File]::ReadAllText($diagramsFile, [System.Text.Encoding]::UTF8)
$b5_process = ""
if ($oldContent -match '(?s)"b5_process":\s*`([^`]+)`') {
    $b5_process = $matches[1]
}

$dict = [ordered]@{
    "b1_15" = @{ file = "câu 15 bài 1.jpg"; title = "HÌNH CÂU 15: SƠ ĐỒ ĐƠN VỊ TÁI BẢN DNA (HAI CHẠC ĐỐI XỨNG)" };
    "b1_16" = @{ file = "câu 16 bài 1.jpg"; title = "HÌNH CÂU 16: CƠ CHẾ KÉO DÀI TRÊN 1 CHẠC CHỮ Y TÁI BẢN DNA" };
    "b1_17" = @{ file = "câu 17 bài 1.jpg"; title = "HÌNH CÂU 17: CƠ CHẾ TÁI BẢN DNA TẠI MỘT ĐƠN VỊ NHÂN ĐÔI" };
    "b1_25" = @{ file = "câu 25 bài 1.jpg"; title = "HÌNH CÂU 25: CHẠC THÁO XOẮN TRONG QUÁ TRÌNH NHÂN ĐÔI DNA" };
    "b1_27" = @{ file = "câu 27 bài 1 .jpg"; title = "HÌNH CÂU 27: ĐOẠN PHÂN TỬ DNA VỚI CÁC LIÊN KẾT HYDROGEN" };

    "b2_3"  = @{ file = "câu 3 bài 2.jpg"; title = "HÌNH CÂU 3: CẤU TRÚC GENE Ở SINH VẬT" };
    "b2_14" = @{ file = "câu 14 bài 2.jpg"; title = "HÌNH CÂU 14: QUÁ TRÌNH PHIÊN MÃ RNA VÀ CẤU TRÚC A" };
    "b2_15" = @{ file = "câu 15 bài 2.jpg"; title = "HÌNH CÂU 15: CƠ CHẾ DI TRUYỀN PHÂN TỬ (CẤU TRÚC X)" };
    "b2_39" = @{ file = "câu 39 bài 2.jpg"; title = "HÌNH CÂU 39: SƠ ĐỒ THUYẾT TRUNG TÂM (CENTRAL DOGMA)" };
    "b2_45" = @{ file = "câu 45 bài 2.jpg"; title = "HÌNH CÂU 45: BIỂU HIỆN TÍNH TRẠNG CƠ THỂ QUA CƠ CHẾ 1 VÀ CƠ CHẾ 2" };
    "b2_48" = @{ file = "câu 48 bài 2.jpg"; title = "HÌNH CÂU 48: CÁC BỘ BA MÃ HÓA CỦA XÊRIN, PRÔLIN VÀ ALANIN" };
    "b2_49" = @{ file = "câu 49 bài 2.jpg"; title = "HÌNH CÂU 49: SƠ ĐỒ TÓM TẮT CÁC CƠ CHẾ DI TRUYỀN TRONG THUYẾT TRUNG TÂM" };

    "b3_10" = @{ file = "câu 10 bài 3.jpg"; title = "HÌNH CÂU 10: BẢNG GHÉP NỐI CHỨC NĂNG CÁC THÀNH PHẦN TRÊN OPERON LAC" };
    "b3_23" = @{ file = "câu 23 bài 3.jpg"; title = "HÌNH CÂU 23: SƠ ĐỒ CƠ CHẾ HOẠT ĐỘNG CỦA OPERON LAC Ở E. COLI" };
    "b3_27" = @{ file = "câu 27 bài 3.jpg"; title = "HÌNH CÂU 27: CƠ CHẾ ĐIỀU HÒA HOẠT ĐỘNG OPERON LAC KHI CÓ LACTOSE" };
    "b3_30" = @{ file = "câu 30 bài 3.jpg"; title = "HÌNH CÂU 30: TRÌNH TỰ OPERON TRÊN ĐOẠN NST VÀ 5 ĐỘT BIẾN MẤT ĐOẠN" };
    "b3_32" = @{ file = "câu 32 bài 3.jpg"; title = "HÌNH CÂU 32: BẢNG GHÉP NỐI ỨNG DỤNG ĐIỀU HÒA BIỂU HIỆN GENE (Y DƯỢC, CHĂN NUÔI, TRỒNG TRỌT)" };
    "b3_33" = @{ file = "câu 33 bài 3.jpg"; title = "HÌNH CÂU 33: BẢNG GHÉP NỐI ỨNG DỤNG THỰC TIỄN CỦA ĐIỀU HÒA BIỂU HIỆN GENE" };
    "b3_39" = @{ file = "câu 39 bài 3.jpg"; title = "HÌNH CÂU 39: OPERON LAC Ở 2 CHỦNG E. COLI BÌNH THƯỜNG VÀ ĐỘT BIẾN" };
    "b3_40" = @{ file = "câu 40 bài 3.jpg"; title = "HÌNH CÂU 40: BẢNG KẾT QUẢ NGHIÊN CỨU HOẠT ĐỘNG OPERON LAC Ở 3 CHỦNG E. COLI" };
    "b3_43" = @{ file = "câu 43 bài 3.jpg"; title = "HÌNH CÂU 43: ĐỒ THỊ MỨC BIỂU HIỆN CỦA GENE Z KHI BỔ SUNG LACTOSE" };

    "b4_20" = @{ file = "câu 20 bài 4.jpg"; title = "HÌNH CÂU 20: ĐOẠN DNA TRƯỚC ĐỘT BIẾN VÀ CÁC TRƯỜNG HỢP a, b, c" };
    "b4_32" = @{ file = "câu 32 bài 4.jpg"; title = "HÌNH CÂU 32: ẢNH HƯỞNG CỦA ĐỘT BIẾN ĐIỂM ĐẾN CHUỖI POLYPEPTIDE" };
    "b4_49" = @{ file = "câu 49 bài 4.jpg"; title = "HÌNH CÂU 49: CƠ CHẾ GÂY ĐỘT BIẾN CỦA THYMINE DẠNG HIẾM (T*)" };
    "b4_52" = @{ file = "câu 52 bài 4.jpg"; title = "HÌNH CÂU 52: CƠ CHẾ ĐỘT BIẾN THAY THẾ DO HÓA CHẤT 5-BrU QUA CÁC LẦN NHÂN ĐÔI" };
    "b4_55" = @{ file = "câu 55 bài 4.jpg"; title = "HÌNH CÂU 55: CÁC DẠNG ĐỘT BIẾN GENE (MẤT, THÊM, THAY THẾ CẶP NUCLEOTIDE)" };
    "b4_56" = @{ file = "câu 56 bài 4.jpg"; title = "HÌNH CÂU 56: SO SÁNH TRÌNH TỰ MẠCH GỐC, mRNA VÀ CHUỖI POLYPEPTIDE TRƯỚC VÀ SAU ĐỘT BIẾN" };
    "b4_57" = @{ file = "câu 57 bài 4.jpg"; title = "HÌNH CÂU 57: SƠ ĐỒ ĐỘT BIẾN ĐIỂM GÂY BỆNH X" };
    "b4_62" = @{ file = "câu 62 bài 4.jpg"; title = "HÌNH CÂU 62: BẮT CẶP NUCLEOTIDE BÌNH THƯỜNG VÀ BẮT CẶP NHẦM DO BASE DẠNG HIẾM" };
    "b4_63" = @{ file = "câu 63 bài 4.jpg"; title = "HÌNH CÂU 63: CẤU TRÚC GENE TỪ VỊ TRÍ 1 ĐẾN 3300" };

    "b5_28" = @{ file = "câu 28 bài 5.jpg"; title = "HÌNH CÂU 28: HAI GIAI ĐOẠN TRONG QUY TRÌNH CÔNG NGHỆ GENE (PLASMID + GENE CẦN CHUYỂN)" };
    "b5_29" = @{ file = "câu 29 bài 5.jpg"; title = "HÌNH CÂU 29: QUY TRÌNH TẠO DÊ SẢN XUẤT PROTEIN TƠ NHỆN TRONG SỮA" };
    "b5_30" = @{ file = "câu 30 bài 5.jpg"; title = "HÌNH CÂU 30: NỐI PLASMID VÀ GENE INSULIN TẠO CẤU TRÚC X" };
    "b5_31" = @{ file = "câu 31 bài 5.jpg"; title = "HÌNH CÂU 31: SƠ ĐỒ TOÀN CẢNH CÔNG NGHỆ DNA TÁI TỔ HỢP" };
    "b5_70" = @{ file = "câu 70,71 bài 5.jpg"; title = "HÌNH CÂU 70 & 71: TẠO ĐẦU DÍNH VÀ GHÉP NỐI DNA TÁI TỔ HỢP BẰNG ENZYME CẮT EcoRI" };
    "b5_71" = @{ file = "câu 70,71 bài 5.jpg"; title = "HÌNH CÂU 70 & 71: TẠO ĐẦU DÍNH VÀ GHÉP NỐI DNA TÁI TỔ HỢP BẰNG ENZYME CẮT EcoRI" };
    "b5_72" = @{ file = "câu 72 bài 5.jpg"; title = "HÌNH CÂU 72: GIAI ĐOẠN CẮT VÀ GHÉP NỐI TẠO DNA TÁI TỔ HỢP" };
    "b5_73" = @{ file = "câu 73 bài 5.jpg"; title = "HÌNH CÂU 73: CÀI GENE A VÀO PLASMID TẠO VECTOR CHUYỂN GENE" };
    "b5_76" = @{ file = "câu 76 bài 5.jpg"; title = "HÌNH CÂU 76: QUY TRÌNH CHUYỂN GENE TẾ BÀO NGƯỜI VÀO VI KHUẨN SẢN XUẤT PROTEIN" };
    "b5_77" = @{ file = "câu 77 bài 5.jpg"; title = "HÌNH CÂU 77: HAI GIAI ĐOẠN (1) VÀ (2) TRONG KĨ THUẬT TẠO DNA TÁI TỔ HỢP" };
    "b5_79" = @{ file = "câu 79 bài 5.jpg"; title = "HÌNH CÂU 79: CÁC BƯỚC TRONG QUY TRÌNH CÔNG NGHỆ GENE TỪ (1) ĐẾN (6)" };
    "b5_80" = @{ file = "câu 80 bài 5.jpg"; title = "HÌNH CÂU 80: TẠO PLASMID Z TỪ PLASMID T (3978 bp) VÀ GENE M (1700 bp)" };
    "b5_82" = @{ file = "câu 82 bài 5.jpg"; title = "HÌNH CÂU 82: 4 GIAI ĐOẠN TRONG CÔNG NGHỆ DNA TÁI TỔ HỢP" };
    "b5_83" = @{ file = "câu 83 bài 5.jpg"; title = "HÌNH CÂU 83: 5 GIAI ĐOẠN TRONG QUY TRÌNH CÔNG NGHỆ DNA TÁI TỔ HỢP" };
}

$sb = [System.Text.StringBuilder]::new()
$null = $sb.AppendLine("// =========================================================================")
$null = $sb.AppendLine("// THƯ VIỆN ĐỒ HỌA MINH HỌA CHUẨN 100% ĐỀ CƯƠNG & SGK SINH HỌC 12 GDPT 2018")
$null = $sb.AppendLine("// CHỨA CÁC ẢNH GỐC ĐÃ ĐƯỢC CẮT CHUẨN TỪ ĐỀ CƯƠNG (BASE64 OFFLINE 100%)")
$null = $sb.AppendLine("// CHẠY OFFLINE HOÀN TOÀN - KHÔNG CẦN KẾT NỐI MẠNG HOẶC HOST NGOÀI")
$null = $sb.AppendLine("// =========================================================================")
$null = $sb.AppendLine("window.BIO_DIAGRAMS = {")

$bt = [char]96 # backtick character

foreach ($k in $dict.Keys) {
    $item = $dict[$k]
    $imgPath = Join-Path $imgDir $item.file
    $bytes = [System.IO.File]::ReadAllBytes($imgPath)
    $b64 = "data:image/jpeg;base64," + [Convert]::ToBase64String($bytes)
    $title = $item.title
    
    $entryHtml = "<div class=`"my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center`">`n" +
                 "    <div class=`"text-xs font-bold text-slate-700 mb-2`">$title</div>`n" +
                 "    <img src=`"$b64`" alt=`"$title`" class=`"max-w-full h-auto max-h-72 sm:max-h-96 mx-auto rounded-lg shadow-sm object-contain`" />`n" +
                 "</div>"
                 
    $null = $sb.Append("    `"$k`": $bt")
    $null = $sb.Append($entryHtml)
    $null = $sb.AppendLine("$bt,")
}

# b5_process
$null = $sb.Append("    `"b5_process`": $bt")
$null = $sb.Append($b5_process)
$null = $sb.AppendLine("$bt")

$null = $sb.AppendLine("};")

[System.IO.File]::WriteAllText($diagramsFile, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Success! Generated diagrams.js. Size: $((Get-Item $diagramsFile).Length) bytes"
